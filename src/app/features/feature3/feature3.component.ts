import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

@Component({
  selector: 'app-feature3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature3.component.html',
  styleUrls: ['./feature3.component.scss']
})
export class Feature3Component {
  products: Product[] = [
    {
      id: 1,
      title: 'Producto Premium',
      description: 'Un excelente producto con características premium para tus necesidades.',
      price: 99.99,
      image: 'https://via.placeholder.com/300x200/EC0000/FFFFFF?text=Producto+1',
      category: 'Premium',
      rating: 4.5
    },
    {
      id: 2,
      title: 'Producto Estándar',
      description: 'Producto de alta calidad a un precio accesible para todos.',
      price: 49.99,
      image: 'https://via.placeholder.com/300x200/3498db/FFFFFF?text=Producto+2',
      category: 'Estándar',
      rating: 4.0
    },
    {
      id: 3,
      title: 'Producto Básico',
      description: 'La opción perfecta para comenzar con nuestra línea de productos.',
      price: 29.99,
      image: 'https://via.placeholder.com/300x200/2ecc71/FFFFFF?text=Producto+3',
      category: 'Básico',
      rating: 3.5
    },
    {
      id: 4,
      title: 'Producto Deluxe',
      description: 'Lo mejor de lo mejor, con todas las características que necesitas.',
      price: 149.99,
      image: 'https://via.placeholder.com/300x200/f39c12/FFFFFF?text=Producto+4',
      category: 'Deluxe',
      rating: 5.0
    },
    {
      id: 5,
      title: 'Producto Especial',
      description: 'Edición especial con características únicas y exclusivas.',
      price: 79.99,
      image: 'https://via.placeholder.com/300x200/9b59b6/FFFFFF?text=Producto+5',
      category: 'Especial',
      rating: 4.2
    },
    {
      id: 6,
      title: 'Producto Pro',
      description: 'Para profesionales que buscan el máximo rendimiento.',
      price: 119.99,
      image: 'https://via.placeholder.com/300x200/e74c3c/FFFFFF?text=Producto+6',
      category: 'Pro',
      rating: 4.8
    }
  ];

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }
}
