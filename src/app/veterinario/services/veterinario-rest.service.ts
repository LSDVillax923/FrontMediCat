import { Injectable } from '@angular/core';
import {
  VeterinarioCreateDto,
  VeterinarioDto,
  VeterinarioUpdateDto,
} from '../../shared/api/backend-contracts';
import { BaseCrudRestService } from '../../shared/api/base-crud-rest.service';
import { REST_ENDPOINTS } from '../../shared/api/rest-endpoints';

@Injectable({ providedIn: 'root' })
export class VeterinarioRestService extends BaseCrudRestService<
  VeterinarioDto,
  VeterinarioCreateDto,
  VeterinarioUpdateDto
> {
  constructor() {
    super(REST_ENDPOINTS.veterinarios);
  }
}