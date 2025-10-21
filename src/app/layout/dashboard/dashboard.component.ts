import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  children?: { label: string; route: string }[];
  mobileOpen: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Obtener el nombre del usuario autenticado
  userName = computed(() => this.authService.currentUser()?.name || 'Usuario');

  // Estado del menú móvil
  mobileMenuOpen = signal(false);

  menuItems: MenuItem[] = [
    {
      label: 'Búsqueda',
      route: '/dashboard/busqueda',
      icon: 'search',
      mobileOpen: false
    },
    {
      label: 'Búsqueda Garra',
      route: '/dashboard/busqueda-garra',
      icon: 'database',
      mobileOpen: false
    },
    {
      label: 'Feature 1',
      route: '', // Sin ruta, solo contenedor de menú
      icon: 'bar-chart',
      mobileOpen: false,
      children: [
        { label: 'Opción 1.1', route: '/dashboard/feature1/opcion1' },
        { label: 'Opción 1.2', route: '/dashboard/feature1/opcion2' },
        { label: 'Opción 1.3', route: '/dashboard/feature1/opcion3' }
      ]
    },
    {
      label: 'Feature 2',
      route: '', // Sin ruta, solo contenedor de menú
      icon: 'settings',
      mobileOpen: false,
      children: [
        { label: 'Configuración General', route: '/dashboard/feature2/general' },
        { label: 'Configuración Avanzada', route: '/dashboard/feature2/avanzada' }
      ]
    },
    {
      label: 'Feature 3',
      route: '/dashboard/feature3',
      icon: 'file-text',
      mobileOpen: false
    },
    {
      label: 'Feature 4',
      route: '/dashboard/feature4',
      icon: 'filter',
      mobileOpen: false
    }
  ];

  constructor(private authService: AuthService) {}

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(val => !val);
  }

  toggleSubmenu(item: MenuItem): void {
    // Toggle del submenú (funciona tanto en móvil como desktop)
    if (item.children) {
      item.mobileOpen = !item.mobileOpen;
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    // Cerrar todos los submenús
    this.menuItems.forEach(item => item.mobileOpen = false);
  }

  isRouteActive(route: string): boolean {
    // Si no tiene ruta (es solo contenedor), no marcar directamente
    if (!route || route === '') {
      return false;
    }
    // Verificar si alguna subruta está activa
    return location.pathname.startsWith(route);
  }

  isMenuItemActive(item: MenuItem): boolean {
    // Si tiene ruta propia, verificar esa ruta
    if (item.route && item.route !== '') {
      return location.pathname.startsWith(item.route);
    }

    // Si no tiene ruta pero tiene hijos, verificar si algún hijo está activo
    if (item.children && item.children.length > 0) {
      return item.children.some(child =>
        location.pathname.startsWith(child.route)
      );
    }

    return false;
  }

  logout(): void {
    this.authService.logout();
  }
}
