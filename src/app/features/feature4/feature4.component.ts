import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { DataItem } from '../../core/models/data-item.model';

@Component({
  selector: 'app-feature4',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feature4.component.html',
  styleUrls: ['./feature4.component.scss']
})
export class Feature4Component {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);

  // Formulario reactivo
  searchForm: FormGroup;

  // Signals para manejar el estado
  data = signal<DataItem[]>([]);
  isLoading = signal<boolean>(false);
  hasSearched = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    // Inicializar formulario con validaciones
    this.searchForm = this.fb.group({
      campo1: ['', [Validators.required, Validators.minLength(2)]],
      campo2: ['', [Validators.required, Validators.minLength(2)]],
      campo3: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  // No necesitamos getters para acceder a los controles
  // Se accede directamente desde el template con searchForm.get('campo')

  /**
   * Maneja el submit del formulario y carga los datos
   */
  onSearch(): void {
    if (!this.searchForm.valid) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    this.hasSearched.set(true);

    const formValues = this.searchForm.value;
    console.log('Valores del formulario:', formValues);

    // Llamada al servicio para obtener datos
    this.dataService.getDataItems().subscribe({
      next: (items) => {
        this.data.set(items);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los datos. Por favor, intente nuevamente.');
        this.isLoading.set(false);
        this.data.set([]);
        console.error('Error al cargar datos:', err);
      }
    });
  }

  /**
   * Limpia el formulario y los resultados
   */
  clearForm(): void {
    this.searchForm.reset();
    this.data.set([]);
    this.hasSearched.set(false);
    this.error.set(null);
  }

  /**
   * Obtiene la clase CSS para el badge de estado
   */
  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'Activo': 'badge bg-success',
      'Pendiente': 'badge bg-warning text-dark',
      'Completado': 'badge bg-info'
    };
    return classes[status] || 'badge bg-secondary';
  }
}
