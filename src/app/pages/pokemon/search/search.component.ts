import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    standalone:true,
    imports:[],
    selector: 'pokemon-search',
    template:`
      <div class="col-12">
      <div class="input-group mb-3">
        <input 
        #txtsearch 
        type="text" 
        class="form-control" 
        placeholder="Escribe el nombre del pokemon" 
        aria-label="Escribe el nombre del pokemon"
        (keydown)="SearchPokemon(txtsearch.value)"
        aria-describedby="button-addon2">
        <button 
        class="btn btn-outline-secondary" 
        type="button" 
        (click)="SearchPokemon(txtsearch.value)" 
        id="button-addon2"><i class="bi bi-search"></i>
        </button>
        </div>
      </div>
    ` ,
    styles:[]

})




export class SearchComponent{
    @Output() public eventSearch = new EventEmitter<string>();

SearchPokemon(temino:string | number):void{
    const temSearch = temino.toString().trim();
    //if(temSearch.length === 0){
     //   return;
    //}
    this.eventSearch.emit(temSearch);
}

}
    
