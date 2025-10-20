import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  categoria: string;
  mensaje: string;
}

@Component({
  selector: 'app-feature2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feature2.component.html',
  styleUrls: ['./feature2.component.scss']
})
export class Feature2Component {
  formData: FormData = {
    nombre: '',
    email: '',
    telefono: '',
    categoria: '',
    mensaje: ''
  };

  categorias = [
    'Consulta General',
    'Soporte Técnico',
    'Ventas',
    'Facturación',
    'Otro'
  ];

  submitForm() {
    console.log('Formulario enviado:', this.formData);
    alert('Formulario enviado correctamente');
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      nombre: '',
      email: '',
      telefono: '',
      categoria: '',
      mensaje: ''
    };
  }
}
