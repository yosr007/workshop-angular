import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ListSuggestionComponent } from './features/suggestions/list-suggestion/list-suggestion.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { AddSuggestionComponentComponent } from './features/suggestions/add-suggestion-component/add-suggestion-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Route par défaut
  { path: 'home', component: HomeComponent },
  { path: 'listSuggestion', component: ListSuggestionComponent },
  { path: 'suggestions', loadChildren: () => import('./features/suggestions/suggestions.module').then(m => m.SuggestionsModule) },
  { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
  { path: 'suggestions/form/:id', component: AddSuggestionComponentComponent },
  { path: '**', component: NotfoundComponent }          // Catch-all
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
