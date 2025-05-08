import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book, SearchResults } from '../interfaces/biblioteca';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private apiUrl = 'https://openlibrary.org/search.json';
  private randomSubjects = [
    'fiction', 'science', 'history', 
    'biography', 'technology', 'art'
  ];

  constructor(private http: HttpClient) {}

  searchBooks(query: string, page: number = 1, limit: number = 10): Observable<SearchResults> {
    const params = {
      q: query,
      page: page.toString(),
      limit: limit.toString()
    };
    return this.http.get<SearchResults>(this.apiUrl, { params });
  }

  // Modificado para aceptar página
  getRandomBooks(limit: number = 12, page: number = 1): Observable<{books: Book[], total: number}> {
    const randomSubject = this.randomSubjects[
      Math.floor(Math.random() * this.randomSubjects.length)
    ];
    return this.http.get<SearchResults>(
      `${this.apiUrl}?subject=${randomSubject}&limit=${limit}&page=${page}`
    ).pipe(
      map(response => ({
        books: response.docs.sort(() => 0.5 - Math.random()),
        total: response.numFound
      }))
    );
  }

  getBookCover(coverId: number, size: 'S' | 'M' | 'L' = 'M'): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  }
}