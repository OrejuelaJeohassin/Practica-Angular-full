import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../interfaces/biblioteca';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CardComponent {
  @Input() book!: Book;
  @Output() cardClicked = new EventEmitter<Book>();

  get coverUrl(): string | null {
    return this.book.cover_i 
      ? `https://covers.openlibrary.org/b/id/${this.book.cover_i}-M.jpg` 
      : 'assets/no-cover.png';
  }

  get authors(): string {
    return this.book.author_name?.join(', ') || 'Autor desconocido';
  }

  onClick(): void {
    this.cardClicked.emit(this.book);
  }
}
