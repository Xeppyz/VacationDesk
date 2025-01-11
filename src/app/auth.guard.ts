import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Verifica si el usuario está autenticado
    if (!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    // Obtiene el rol requerido de la ruta
    const requiredRole = route.data['role'];

    // Obtiene el rol del usuario desde el servicio
    const userRole = this.userService.getRole();

    // Verifica si el rol del usuario coincide con el rol requerido
    if (requiredRole && userRole !== requiredRole) {
      this.router.navigateByUrl('/unauthorized'); // Redirige si el rol no coincide
      return false;
    }

    return true; // Permite el acceso si el usuario está autenticado y tiene el rol correcto
  }
}
