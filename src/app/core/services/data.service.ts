import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { DataItem, DataItemStats } from '../models/data-item.model';

@Injectable({
  providedIn: 'root' // Singleton global
})
export class DataService {
  // Datos mock simulando respuesta del servidor
  private mockData: DataItem[] = [
    { id: 1, name: 'Item 1', value: 1500, status: 'Activo', date: new Date('2024-01-15') },
    { id: 2, name: 'Item 2', value: 2300, status: 'Pendiente', date: new Date('2024-02-20') },
    { id: 3, name: 'Item 3', value: 1800, status: 'Activo', date: new Date('2024-03-10') },
    { id: 4, name: 'Item 4', value: 3200, status: 'Completado', date: new Date('2024-04-05') },
    { id: 5, name: 'Item 5', value: 2100, status: 'Activo', date: new Date('2024-05-12') }
  ];

  private mockStats: DataItemStats[] = [
    { label: 'Total Usuarios', value: '1,234', icon: 'users', color: '#3498db' },
    { label: 'Transacciones', value: '5,678', icon: 'activity', color: '#2ecc71' },
    { label: 'Ingresos', value: '$12,345', icon: 'dollar-sign', color: '#f39c12' },
    { label: 'Pendientes', value: '23', icon: 'clock', color: '#e74c3c' }
  ];

  constructor() {}

  /**
   * Obtiene todos los items (simula llamada HTTP)
   * @returns Observable con array de DataItem
   */
  getDataItems(): Observable<DataItem[]> {
    // Simula delay de red (500ms)
    return of(this.mockData).pipe(
      delay(500)
    );
  }

  /**
   * Obtiene un item por ID (simula llamada HTTP)
   * @param id ID del item a buscar
   * @returns Observable con el DataItem o null si no existe
   */
  getDataItemById(id: number): Observable<DataItem | null> {
    const item = this.mockData.find(item => item.id === id);
    return of(item || null).pipe(
      delay(300)
    );
  }

  /**
   * Obtiene las estadísticas
   * @returns Observable con array de DataItemStats
   */
  getStats(): Observable<DataItemStats[]> {
    return of(this.mockStats).pipe(
      delay(400)
    );
  }

  /**
   * Crea un nuevo item (simula POST)
   * @param item Item a crear
   * @returns Observable con el item creado
   */
  createDataItem(item: Omit<DataItem, 'id'>): Observable<DataItem> {
    const newItem: DataItem = {
      ...item,
      id: this.mockData.length + 1,
      date: new Date()
    };
    this.mockData.push(newItem);
    return of(newItem).pipe(
      delay(600)
    );
  }

  /**
   * Actualiza un item existente (simula PUT)
   * @param id ID del item a actualizar
   * @param updates Datos a actualizar
   * @returns Observable con el item actualizado o null si no existe
   */
  updateDataItem(id: number, updates: Partial<DataItem>): Observable<DataItem | null> {
    const index = this.mockData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.mockData[index] = { ...this.mockData[index], ...updates };
      return of(this.mockData[index]).pipe(
        delay(500)
      );
    }
    return of(null).pipe(delay(500));
  }

  /**
   * Elimina un item (simula DELETE)
   * @param id ID del item a eliminar
   * @returns Observable con boolean indicando éxito
   */
  deleteDataItem(id: number): Observable<boolean> {
    const index = this.mockData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.mockData.splice(index, 1);
      return of(true).pipe(delay(400));
    }
    return of(false).pipe(delay(400));
  }

  /**
   * Filtra items por estado
   * @param status Estado a filtrar
   * @returns Observable con items filtrados
   */
  getDataItemsByStatus(status: string): Observable<DataItem[]> {
    const filtered = this.mockData.filter(item => item.status === status);
    return of(filtered).pipe(delay(300));
  }

  /**
   * Busca items por nombre
   * @param searchTerm Término de búsqueda
   * @returns Observable con items que coinciden
   */
  searchDataItems(searchTerm: string): Observable<DataItem[]> {
    const filtered = this.mockData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filtered).pipe(delay(400));
  }
}
