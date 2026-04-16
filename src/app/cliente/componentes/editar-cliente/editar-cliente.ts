import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cliente, ClienteRequest } from '../../../shared/api/backend-contracts';
import { ClienteRestService } from '../../services/cliente-rest.service';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editar-cliente.html',
  styleUrls: ['./editar-cliente.css']
})
export class EditarClienteComponent implements OnInit {
  
  clienteForm: FormGroup;
  loading = false;
  error: string | null = null;
  clienteId: number | null = null;
  cliente: Cliente | null = null;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteRestService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.minLength(10)]],
      contrasenia: ['', Validators.minLength(6)]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clienteId = +id;
      this.cargarCliente();
    }
  }

  cargarCliente(): void {
    if (!this.clienteId) return;
    
    this.loading = true;
    this.clienteService.findById(this.clienteId).subscribe({
      next: (cliente: Cliente) => {
        this.cliente = cliente;
        this.clienteForm.patchValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          celular: cliente.celular
        });
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = 'Error al cargar el cliente';
        console.error(err);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.clienteForm.invalid || !this.clienteId) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const clienteData: ClienteRequest = {
      ...this.clienteForm.value
    };

    // No enviar contraseña si está vacía
    if (!clienteData.contrasenia) {
      delete clienteData.contrasenia;
    }

    this.clienteService.update(this.clienteId, clienteData).subscribe({
      next: () => {
        this.router.navigate(['/clientes']);
      },
      error: (err: Error) => {
        this.error = 'Error al actualizar el cliente';
        console.error(err);
        this.loading = false;
      }
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.clienteForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}