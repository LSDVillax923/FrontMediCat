import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseCrudRestService } from '../../shared/api/base-crud-rest.service';
import { Tratamiento, TratamientoRequest } from '../../shared/api/backend-contracts';
import { ENDPOINTS } from '../../shared/api/rest-endpoints';

@Injectable({ providedIn: 'root' })
export class TratamientoRestService extends BaseCrudRestService<Tratamiento, TratamientoRequest> {
  
  constructor(http: HttpClient) {
    super(http, ENDPOINTS.TRATAMIENTOS);
  }

  override findAll(programados?: boolean): Observable<Tratamiento[]> {
    let params = new HttpParams();
    if (programados) {
      params = params.set('programados', 'true');
    }
    return this.http.get<Tratamiento[]>(this.baseUrl, { params });
  }

  override create(tratamiento: TratamientoRequest, mascotaId: number, veterinarioId: number): Observable<Tratamiento> {
    const params = new HttpParams()
      .set('mascotaId', mascotaId.toString())
      .set('veterinarioId', veterinarioId.toString());
    return this.http.post<Tratamiento>(this.baseUrl, tratamiento, { params });
  }

  findByMascotaId(mascotaId: number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(ENDPOINTS.TRATAMIENTOS_BY_MASCOTA(mascotaId));
  }

  findByVeterinarioId(veterinarioId: number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(ENDPOINTS.TRATAMIENTOS_BY_VETERINARIO(veterinarioId));
  }

  findProgramados(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(ENDPOINTS.TRATAMIENTOS_PROGRAMADOS);
  }

  override findById(id: number): Observable<Tratamiento> {
    return super.findById(id);
  }

  override update(id: number, data: TratamientoRequest): Observable<Tratamiento> {
    return super.update(id, data);
  }

  override delete(id: number): Observable<void> {
    return super.delete(id);
  }
}