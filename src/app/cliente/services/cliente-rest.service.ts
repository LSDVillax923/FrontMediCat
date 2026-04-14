import { Injectable } from '@angular/core';
import {
  ClienteCreateDto,
  ClienteDto,
  ClienteUpdateDto,
} from '../../shared/api/backend-contracts';
import { BaseCrudRestService } from '../../shared/api/base-crud-rest.service';
import { REST_ENDPOINTS } from '../../shared/api/rest-endpoints';

@Injectable({ providedIn: 'root' })
export class ClienteRestService extends BaseCrudRestService<
  ClienteDto,
  ClienteCreateDto,
  ClienteUpdateDto
> {
  constructor() {
    super(REST_ENDPOINTS.clientes);
  }
}