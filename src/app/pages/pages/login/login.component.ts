import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserResponse } from '../../../core/models/user.mode';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  selectedOption: string = '';
  horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'center';
  verticalPosition: 'top' | 'bottom' = 'top';

  options = [
    { value: '1', viewValue: 'CASAVISION' },
    { value: '2', viewValue: 'IBC' },
    { value: '3', viewValue: 'LANDTERRA' },
    { value: '4', viewValue: 'ALCASA' },
    { value: '5', viewValue: 'ALEHXSA' },
    { value: '6', viewValue: 'DEBOCASA' },
  ];

  private userService: UserService = inject(UserService);

  constructor(public router: Router, private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'Cerrar') {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000, // Duración en milisegundos (3 segundos)
    });
  }
  login() {
    this.userService.validateUser(this.email, this.password).subscribe(
      (data: UserResponse[]) => {
        console.log('Datos recibidos del servidor:', data);

        if (Array.isArray(data) && data.length > 0) {
          const user = data[0]; // Accedemos al primer usuario
          console.log('Primer objeto de la respuesta:', user);

          const token = user.CREFCH;
          const role = user.ROLPAQ;

          console.log('Token recibido:', token);
          console.log('ROLPAQ recibido:', role);

          this.userService.setToken(token, role);

          const mappedRole = this.userService.mapRole(role);
          console.log('Rol mapeado después de guardar:', mappedRole);

          // Redirige según el rol
          switch (mappedRole) {
            case '3':
              this.router.navigateByUrl('dashboard');
              break;
            case '2':
              this.router.navigateByUrl('superior-dashboard');
              break;
            case '1':
              this.router.navigateByUrl('colaborador-dashboard');
              break;
            default:
              this.router.navigateByUrl('unauthorized');
              break;
          }
        } else {
          console.error(
            'Respuesta inesperada del servidor. No hay datos disponibles.'
          );
          this.openSnackBar(
            'Error: No se recibieron datos válidos del servidor.'
          );
        }
      },
      (error) => {
        console.error('Error al validar el usuario:', error);
        this.openSnackBar('Credenciales incorrectas o error en el servidor.');
      }
    );
  }
}
