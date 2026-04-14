import { Injectable } from '@angular/core';
import {
  MascotaCreateDto,
  MascotaDto,
  MascotaUpdateDto,
} from '../../shared/api/backend-contracts';
import { BaseCrudRestService } from '../../shared/api/base-crud-rest.service';
import { REST_ENDPOINTS } from '../../shared/api/rest-endpoints';

@Injectable({ providedIn: 'root' })
export class MascotaRestService extends BaseCrudRestService<
  MascotaDto,
  MascotaCreateDto,
  MascotaUpdateDto
> {
  constructor() {
    super(REST_ENDPOINTS.mascotas);
  }
}