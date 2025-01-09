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
    if (!this.email || !this.password) {
      this.openSnackBar('Por favor, complete todos los campos.');
      return;
    }

    this.userService.validateUser(this.email, this.password).subscribe(
      (data) => {
        this.openSnackBar('Login exitoso.');
        console.log('Validación exitosa:', data);
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.openSnackBar('Credenciales incorrectas o error en el servidor.');
        console.error('Error al validar el usuario:', error);
      }
    );
  }
}
