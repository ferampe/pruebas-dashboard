import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ResultadoBusqueda {
  id: string;
  fechaEvaluacion: Date;
  sistema: string;
  tipo: string; // Para identificar de qué búsqueda viene
}

@Component({
  selector: 'app-busqueda-garra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busqueda-garra.component.html',
  styleUrls: ['./busqueda-garra.component.scss']
})
export class BusquedaGarraComponent {
  // Formulario Garra
  garraForm = {
    anio: '',
    centro: '',
    nroSolicitud: ''
  };

  // Formularios Otros Canales
  idExterno: string = '';
  imcid: string = '';

  // Resultados compartidos
  resultados: ResultadoBusqueda[] = [];
  buscandoGarra: boolean = false;
  buscandoIdExterno: boolean = false;
  buscandoImcid: boolean = false;

  buscarPorGarra() {
    if (!this.garraForm.anio || !this.garraForm.centro || !this.garraForm.nroSolicitud) {
      alert('Por favor complete todos los campos de Garra');
      return;
    }

    this.buscandoGarra = true;

    // Simulación de búsqueda
    setTimeout(() => {
      this.resultados = [
        {
          id: `${this.garraForm.anio}${this.garraForm.centro}${this.garraForm.nroSolicitud}`,
          fechaEvaluacion: new Date('2024-01-15'),
          sistema: 'GARRA',
          tipo: 'Garra'
        },
        {
          id: `${this.garraForm.anio}${this.garraForm.centro}${this.garraForm.nroSolicitud}`,
          fechaEvaluacion: new Date('2024-02-20'),
          sistema: 'GARRA',
          tipo: 'Garra'
        }
      ];
      this.buscandoGarra = false;
    }, 800);
  }

  buscarPorIdExterno() {
    if (!this.idExterno.trim()) {
      alert('Por favor ingrese un Id Externo');
      return;
    }

    this.buscandoIdExterno = true;

    // Simulación de búsqueda
    setTimeout(() => {
      this.resultados = [
        {
          id: this.idExterno,
          fechaEvaluacion: new Date('2024-03-10'),
          sistema: 'EXTERNO',
          tipo: 'Id Externo'
        }
      ];
      this.buscandoIdExterno = false;
    }, 800);
  }

  buscarPorImcid() {
    if (!this.imcid.trim()) {
      alert('Por favor ingrese un Imcid');
      return;
    }

    this.buscandoImcid = true;

    // Simulación de búsqueda
    setTimeout(() => {
      this.resultados = [
        {
          id: this.imcid,
          fechaEvaluacion: new Date('2024-04-05'),
          sistema: 'IMCID',
          tipo: 'Imcid'
        },
        {
          id: this.imcid,
          fechaEvaluacion: new Date('2024-04-12'),
          sistema: 'IMCID',
          tipo: 'Imcid'
        }
      ];
      this.buscandoImcid = false;
    }, 800);
  }

  verDetalle(resultado: ResultadoBusqueda) {
    console.log('Ver detalle:', resultado);
    alert(`Ver detalle de: ${resultado.id}\nSistema: ${resultado.sistema}`);
  }

  limpiarResultados() {
    this.resultados = [];
    this.garraForm = { anio: '', centro: '', nroSolicitud: '' };
    this.idExterno = '';
    this.imcid = '';
  }
}
