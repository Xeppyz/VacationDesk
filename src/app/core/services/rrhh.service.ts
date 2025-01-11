import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Departamento } from '../models/rrhh.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RrhhService {
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  public getDepartamentos(): Departamento[] {
    const listDepartamentos: Departamento[] = [];
    const { apiUrl, apiCredentials } = environment;

    this.httpClient
      .get<Departamento[]>(
        `${apiUrl}ObtenerDepartamento/?username=${
          apiCredentials.username
        }&password=${encodeURIComponent(apiCredentials.password)}`
      )
      .subscribe((data: Departamento[]) => {
        data.forEach((element: Departamento) => {
          listDepartamentos.push(element);
        });
      });

    return listDepartamentos;
  }
}
