import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Mascota } from '../../../mascota/mascota';
import { Veterinario } from '../../../veterinario/veterinario';
import { Droga } from '../../../droga/droga';
import { TratamientoDroga } from '../../../tratamiento-droga/tratamiento-droga';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { TratamientoRestService } from '../../services/tratamiento-rest.service';
import { MascotaRestService } from '../../../mascota/services/mascota-rest.service';
import { VeterinarioRestService } from '../../../veterinario/services/veterinario-rest.service';
import { DrogaRestService } from '../../../droga/services/droga-rest.service';
import { DrogaMapper, MascotaMapper, VeterinarioMapper } from '../../../shared/api/model-mappers';


interface NuevoTratamientoForm {
  mascotaId: number;
  mascota: string;
  clienteId: number;
  veterinarioId: number;
  veterinario: string;
  diagnostico: string;
  observaciones: string;
  fecha: string;
  estado: 'Activo' | 'Completado' | 'Pendiente' | 'Cancelado';
  drogas: TratamientoDroga[];
}

@Component({
  selector: 'app-nuevo-tratamiento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './nuevo-tratamiento.html',
  styleUrl: './nuevo-tratamiento.css',
})
export class NuevoTratamiento implements OnInit {
  mensaje = '';
  error = '';
  cargando = false;

  mascotas: Mascota[] = [];
  veterinarios: Veterinario[] = [];
  drogas: Droga[] = [];

  formData: NuevoTratamientoForm = this.crearFormularioInicial();


  constructor(
        private readonly tratamientoRestService: TratamientoRestService,
    private readonly mascotaRestService: MascotaRestService,
    private readonly veterinarioRestService: VeterinarioRestService,
    private readonly drogaRestService: DrogaRestService,
  ) {}

  ngOnInit(): void {
    this.cargarCatalogos();
  }

  private crearFormularioInicial(): NuevoTratamientoForm {
    return {
      mascotaId: 0,
      mascota: '',
      clienteId: 0,
      veterinarioId: 0,
      veterinario: '',
      diagnostico: '',
      observaciones: '',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      drogas: [],
    };
  }

  private cargarCatalogos(): void {
    this.cargando = true;
    this.error = '';

    this.mascotaRestService.getAll().subscribe({
      next: (mascotasDto) => {
        this.mascotas = mascotasDto.map(MascotaMapper.fromDto);
      },
      error: () => {
        this.error = 'No se pudieron cargar las mascotas.';
      },
    });

    this.veterinarioRestService.getAll().subscribe({
      next: (veterinariosDto) => {
        this.veterinarios = veterinariosDto.map(VeterinarioMapper.fromDto);
      },
      error: () => {
        this.error = 'No se pudieron cargar los veterinarios.';
      },
    });

    this.drogaRestService.getAll().subscribe({
      next: (drogasDto) => {
        this.drogas = drogasDto.map(DrogaMapper.fromDto);
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las drogas.';
        this.cargando = false;
      },
    });
  }

  onMascotaChange(id: number): void {
    const mascota = this.mascotas.find((m) => m.id === id);
    if (mascota) {
      this.formData.mascota = mascota.nombre;
      this.formData.clienteId = mascota.clienteId;
    }
  }

  onVetChange(id: number): void {
    const vet = this.veterinarios.find((v) => v.id === id);
    if (vet) {
      this.formData.veterinario = `${vet.nombre} ${vet.apellido}`;
    }
  }

  agregarDroga(): void {
    const nuevoId = Math.max(0, ...this.formData.drogas.map((d) => d.id || 0)) + 1;
    this.formData.drogas.push({
      id: nuevoId,
      drogaId: 0,
      nombreDroga: '',
      dosis: '',
      frecuencia: '',
      duracion: '',
    });
  }

  onDrogaChange(index: number, id: number): void {
    const droga = this.drogas.find((d) => d.id === id);
    if (droga) {
      this.formData.drogas[index].nombreDroga = droga.nombre;
      this.formData.drogas[index].dosis = droga.dosis ?? '';
    }
  }

  quitarDroga(index: number): void {
    this.formData.drogas.splice(index, 1);
  }

  guardarTratamiento(): void {
    const { mascotaId, veterinarioId, diagnostico, fecha } = this.formData;

    if (!mascotaId || !veterinarioId || !diagnostico || !fecha) {
      this.error = 'Mascota, veterinario, diagnóstico y fecha son obligatorios.';
      return;
    }

    this.cargando = true;
    this.tratamientoRestService.create({ ...this.formData }).subscribe({
      next: () => {
        this.mensaje = 'El tratamiento fue registrado correctamente.';
        this.error = '';
        this.formData = this.crearFormularioInicial();
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo registrar el tratamiento en el servidor.';
        this.cargando = false;
      },
    });

  }
}