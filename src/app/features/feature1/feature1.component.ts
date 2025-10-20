import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { DataItem, DataItemStats } from '../../core/models/data-item.model';

@Component({
  selector: 'app-feature1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature1.component.html',
  styleUrls: ['./feature1.component.scss']
})
export class Feature1Component implements OnInit {
  // Inyección del servicio usando inject() (estilo moderno Angular 18)
  private dataService = inject(DataService);

  // Signals para manejar datos y estado de carga
  stats = signal<DataItemStats[]>([]);
  data = signal<DataItem[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Signal público para rastrear la fila seleccionada (accesible desde el template)
  selectedItemId = signal<number | null>(null);

  // Computed signal para obtener el item completo seleccionado
  selectedItem = computed(() => {
    const id = this.selectedItemId();
    const items = this.data();
    return id !== null ? items.find(item => item.id === id) || null : null;
  });

  ngOnInit(): void {
    this.loadData();
    this.loadStats();
  }

  /**
   * Carga los datos desde el servicio
   */
  loadData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.dataService.getDataItems().subscribe({
      next: (items) => {
        this.data.set(items);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los datos');
        this.isLoading.set(false);
        console.error('Error:', err);
      }
    });
  }

  /**
   * Carga las estadísticas desde el servicio
   */
  loadStats(): void {
    this.dataService.getStats().subscribe({
      next: (stats) => {
        this.stats.set(stats);
      },
      error: (err) => {
        console.error('Error al cargar stats:', err);
      }
    });
  }

  /**
   * Refresca los datos
   */
  refreshData(): void {
    this.loadData();
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'Activo': 'badge bg-success',
      'Pendiente': 'badge bg-warning',
      'Completado': 'badge bg-info'
    };
    return classes[status] || 'badge bg-secondary';
  }

  // Método para seleccionar/deseleccionar una fila
  selectRow(item: DataItem): void {
    // Si se hace clic en la misma fila, se deselecciona
    if (this.selectedItemId() === item.id) {
      this.selectedItemId.set(null);
    } else {
      this.selectedItemId.set(item.id);
    }
    console.log('Fila seleccionada:', this.selectedItem());
  }

  // Método para limpiar la selección (opcional)
  clearSelection(): void {
    this.selectedItemId.set(null);
  }
}
