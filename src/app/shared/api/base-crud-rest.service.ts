import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class BaseCrudRestService<TRead, TCreate, TUpdate> {
  protected readonly http = inject(HttpClient);

  protected constructor(protected readonly endpoint: string) {}

  getAll(): Observable<TRead[]> {
    return this.http.get<TRead[]>(this.endpoint);
  }

  getById(id: number): Observable<TRead> {
    return this.http.get<TRead>(`${this.endpoint}/${id}`);
  }

  create(payload: TCreate): Observable<TRead> {
    return this.http.post<TRead>(this.endpoint, payload);
  }

  update(id: number, payload: TUpdate): Observable<TRead> {
    return this.http.put<TRead>(`${this.endpoint}/${id}`, payload);
  }

  patch(id: number, payload: Partial<TUpdate>): Observable<TRead> {
    return this.http.patch<TRead>(`${this.endpoint}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}