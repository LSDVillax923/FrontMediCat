import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ModalTipo = 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @Input() visible = false;
  @Input() titulo = 'Confirmar acción';
  @Input() mensaje = '¿Estás seguro de que deseas continuar?';
  @Input() textoBtnConfirmar = 'Confirmar';
  @Input() tipo: ModalTipo = 'danger';

  @Output() confirmado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  get tipoClase(): string {
    return `btn-confirmar--${this.tipo}`;
  }

  confirmar(): void {
    this.confirmado.emit();
    this.visible = false;
  }

  cancelar(): void {
    this.cancelado.emit();
    this.visible = false;
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cancelar();
    }
  }
}