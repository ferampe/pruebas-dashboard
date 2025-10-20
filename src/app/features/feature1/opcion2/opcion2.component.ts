import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opcion2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h2>Feature 1 - Opción 1.2</h2>
      <p>Contenido de la opción 1.2</p>
      <div class="card">
        <h3>Ejemplo de contenido</h3>
        <p>Esta es una página de ejemplo para demostrar el submenú.</p>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 1rem;
    }

    h2 {
      color: #1a1a1a;
      margin-bottom: 1rem;
    }

    .card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-top: 1rem;
    }

    h3 {
      color: #ec0000;
      margin-bottom: 0.5rem;
    }
  `]
})
export class Opcion2Component {}
