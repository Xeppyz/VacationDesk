import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RrhhService } from './core/services/rrhh.service';
import { Departamento } from './core/models/rrhh.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatCardModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'VacationsDesk';

  private rrhhService: RrhhService = inject(RrhhService);
  protected departamentos: Departamento[] = []; // Array de departamentos

  constructor() {}

  protected editar(item: Departamento): void {
    console.log(item);
  }
  ngOnInit(): void {
    this.departamentos = this.rrhhService.getDepartamentos();
    console.log(this.departamentos);
  }
}
