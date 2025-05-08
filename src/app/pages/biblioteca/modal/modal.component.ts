import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../interfaces/biblioteca';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true, // Si estás usando componentes standalone
  imports: [CommonModule] // Solo necesario para componentes standalone
})
export class ModalComponent {
  @Input() book!: Book;
  @Output() close = new EventEmitter<void>();

  get coverUrl(): string {
    return this.book.cover_i 
      ? `https://covers.openlibrary.org/b/id/${this.book.cover_i}-L.jpg` 
      : 'assets/no-cover.png';
  }

  get authors(): string {
    return this.book.author_name?.join(', ') || 'Autor desconocido';
  }

  get firstIsbn(): string | null {
    return this.book.isbn?.[0] || null;
  }

  onClose(): void {
    this.close.emit();
  }
}

