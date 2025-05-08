import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componentes hijos
import { SearchComponent } from './search/search.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './paginacion/paginacion.component';
import { ModalComponent } from './modal/modal.component';

// Servicio
import { BibliotecaService } from './servises/biblioteca.service';
import { Book, SearchResults } from './interfaces/biblioteca';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SearchComponent,
    CardComponent,
    PaginationComponent,
    ModalComponent
  ],
  providers: [BibliotecaService]
})
export class BibliotecaComponent implements OnInit {
  books: Book[] = [];
  randomBooks: Book[] = [];
  isLoading = false;
  searchQuery = '';
  currentPage = 1;
  currentRecommendedPage = 1; // Nueva propiedad para página de recomendados
  totalItems = 0;
  totalRecommendedItems = 0; // Nuevo total para recomendados
  itemsPerPage = 10;
  selectedBook: Book | null = null;

  constructor(private bibliotecaService: BibliotecaService) {}

  ngOnInit(): void {
    this.loadRandomBooks();
  }

  loadRandomBooks(page: number = 1): void {
    this.isLoading = true;
    this.currentRecommendedPage = page;
    this.bibliotecaService.getRandomBooks(this.itemsPerPage, page).subscribe({
      next: ({books, total}) => {
        this.randomBooks = books;
        this.totalRecommendedItems = total;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading random books:', err);
        this.isLoading = false;
      }
    });
  }

  nextRecommendedPage(): void {
    if (this.currentRecommendedPage * this.itemsPerPage < this.totalRecommendedItems) {
      this.loadRandomBooks(this.currentRecommendedPage + 1);
    }
  }

  prevRecommendedPage(): void {
    if (this.currentRecommendedPage > 1) {
      this.loadRandomBooks(this.currentRecommendedPage - 1);
    }
  }

  searchBooks(): void {
    if (!this.searchQuery.trim()) {
      this.loadRandomBooks();
      return;
    }
    
    this.isLoading = true;
    this.bibliotecaService.searchBooks(this.searchQuery, this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (results: SearchResults) => {
          this.books = results.docs;
          this.totalItems = results.numFound;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching books:', err);
          this.isLoading = false;
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.searchBooks();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.searchBooks();
  }
  getTotalRecommendedPages(): number {
    return Math.ceil(this.totalRecommendedItems / this.itemsPerPage);
  }
}


