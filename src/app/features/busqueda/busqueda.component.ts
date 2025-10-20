import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent {
  searchTerm: string = '';
  searchResults: any[] = [];

  search() {
    if (this.searchTerm.trim()) {
      // Simulación de búsqueda
      this.searchResults = [
        { id: 1, title: 'Resultado 1', description: 'Descripción del resultado 1', date: new Date() },
        { id: 2, title: 'Resultado 2', description: 'Descripción del resultado 2', date: new Date() },
        { id: 3, title: 'Resultado 3', description: 'Descripción del resultado 3', date: new Date() }
      ];
    } else {
      this.searchResults = [];
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchResults = [];
  }
}
