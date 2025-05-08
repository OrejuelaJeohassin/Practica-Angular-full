import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { BibliotecaComponent } from './pages/biblioteca/biblioteca.component';
import { ErrorComponent } from './pages/error/error.component';
import { MiapiRoutingModule } from './pages/miapi/miapi-routing.module';

export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",component:HomeComponent},
    {path:"pokemon",component:PokemonComponent},
    {path:"biblioteca",component:BibliotecaComponent},
    {path:"miapi",loadChildren: () => import("./pages/miapi/miapi-routing.module").then(m => MiapiRoutingModule )},
    {path:"**",component:ErrorComponent}

];
