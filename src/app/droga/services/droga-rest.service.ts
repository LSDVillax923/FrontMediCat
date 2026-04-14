import { Injectable } from '@angular/core';
import {
  DrogaCreateDto,
  DrogaDto,
  DrogaUpdateDto,
} from '../../shared/api/backend-contracts';
import { BaseCrudRestService } from '../../shared/api/base-crud-rest.service';
import { REST_ENDPOINTS } from '../../shared/api/rest-endpoints';

@Injectable({ providedIn: 'root' })
export class DrogaRestService extends BaseCrudRestService<
  DrogaDto,
  DrogaCreateDto,
  DrogaUpdateDto
> {
  constructor() {
    super(REST_ENDPOINTS.drogas);
  }
}