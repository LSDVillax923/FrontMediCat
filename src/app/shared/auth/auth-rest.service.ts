import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    
    AuthLoginRequestDto,
  AuthLoginResponseDto,
  AuthRegisterRequestDto,
} from '../api/backend-contracts';
import { REST_ENDPOINTS } from '../../shared/api/rest-endpoints';

@Injectable({ providedIn: 'root' })
export class AuthRestService {
  constructor(private readonly http: HttpClient) {}

  login(payload: AuthLoginRequestDto): Observable<AuthLoginResponseDto> {
    return this.http.post<AuthLoginResponseDto>(`${REST_ENDPOINTS.auth}/login`, payload);
  }

  register(payload: AuthRegisterRequestDto): Observable<void> {
    return this.http.post<void>(`${REST_ENDPOINTS.auth}/register`, payload);
  }
}