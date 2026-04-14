import { Cliente } from '../../cliente/cliente';
import { Droga } from '../../droga/droga';
import { Mascota } from '../../mascota/mascota';
import { Tratamiento } from '../../tratamiento/tratamiento';
import { TratamientoDroga } from '../../tratamiento-droga/tratamiento-droga';
import { Veterinario } from '../../veterinario/veterinario';
import {
  ClienteDto,
  DrogaDto,
  MascotaDto,
  TratamientoDto,
  TratamientoDrogaDto,
  VeterinarioDto,
} from './backend-contracts';

export const ClienteMapper = {
  fromDto(dto: ClienteDto): Cliente {
    return {
      ...dto,
      mascotas: [],
    };
  },
  toDto(model: Omit<Cliente, 'mascotas'>): ClienteDto {
    return { ...model };
  },
};

export const VeterinarioMapper = {
  fromDto(dto: VeterinarioDto): Veterinario {
    return { ...dto };
  },
  toDto(model: Veterinario): VeterinarioDto {
    return { ...model };
  },
};

export const MascotaMapper = {
  fromDto(dto: MascotaDto): Mascota {
    return {
      ...dto,
      propietario: undefined,
      cliente: undefined,
    };
  },
  toDto(model: Mascota): MascotaDto {
    const { cliente, propietario, ...dto } = model;
    void cliente;
    void propietario;
    return dto;
  },
};

export const DrogaMapper = {
  fromDto(dto: DrogaDto): Droga {
    return { ...dto };
  },
  toDto(model: Droga): DrogaDto {
    return { ...model };
  },
};

export const TratamientoDrogaMapper = {
  fromDto(dto: TratamientoDrogaDto): TratamientoDroga {
    return { ...dto };
  },
  toDto(model: TratamientoDroga): TratamientoDrogaDto {
    return { ...model };
  },
};

export const TratamientoMapper = {
  fromDto(dto: TratamientoDto): Tratamiento {
    return {
      ...dto,
      drogas: dto.drogas.map(TratamientoDrogaMapper.fromDto),
    };
  },
  toDto(model: Tratamiento): TratamientoDto {
    return {
      ...model,
      drogas: model.drogas.map(TratamientoDrogaMapper.toDto),
    };
  },
};