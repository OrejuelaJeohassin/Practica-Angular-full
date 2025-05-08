import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Input() query: string = '';
  @Output() search = new EventEmitter<void>();
  @Output() queryChange = new EventEmitter<string>(); // Nuevo output para two-way binding

  onSearch(): void {
    this.search.emit();
  }

  updateQuery(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.query = target.value;
    this.queryChange.emit(this.query);
  }
} 
