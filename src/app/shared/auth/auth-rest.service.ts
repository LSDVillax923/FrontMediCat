import { Injectable } from '@angular/core';
import {
  TratamientoCreateDto,
  TratamientoDto,
  TratamientoUpdateDto,
} from '../../shared/api/backend-contracts';
import { BaseCrudRestService } from '../../shared/api/base-crud-rest.service';
import { REST_ENDPOINTS } from '../../shared/api/rest-endpoints';

@Injectable({ providedIn: 'root' })
export class TratamientoRestService extends BaseCrudRestService<
  TratamientoDto,
  TratamientoCreateDto,
  TratamientoUpdateDto
> {
  constructor() {
    super(REST_ENDPOINTS.tratamientos);
  }
}