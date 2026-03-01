import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { Router, ActivatedRoute } from '@angular/router'; 
import { SuggestionService } from '../../../core/Services/suggestion.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  
  // Liste récupérée depuis le service
  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];
  searchText: string = '';

 ngOnInit(): void {

  this.suggestionService.getSuggestionsListByURL()
  .subscribe(data => {
    this.suggestions = data;
  });

}

  // Increment likes
  like(suggestion: Suggestion) {

  suggestion.nbLikes++;

  this.suggestionService.updateLikes(
    suggestion.id,
    suggestion.nbLikes
  ).subscribe();

}

  // Add to favorites
  addToFavorites(suggestion: Suggestion) {
    if (!this.favorites.includes(suggestion)) {
      this.favorites.push(suggestion);
      alert(`"${suggestion.title}" ajouté aux favoris !`);
    }
  }

  // Filter suggestions by title or category
  get filteredSuggestions() {
    if (!this.searchText) return this.suggestions;
    const search = this.searchText.toLowerCase();
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(search) ||
      s.category.toLowerCase().includes(search)
    );
  }
  
  // Injection du Router et du ActivatedRoute
  //constructor(private router: Router, private route: ActivatedRoute) { }
  
  constructor(
  private router: Router,
  private route: ActivatedRoute,
  private suggestionService: SuggestionService
  ) { }

  goToDetails(id: number): void {
  this.router.navigate(['/suggestions', id]);
}
goToForm(): void {
  // navigation vers le formulaire
  this.router.navigate(['/suggestions/form']); 
}

deleteSuggestion(id: number): void {

  this.suggestionService.deleteSuggestion(id)
  .subscribe(() => {

    // Recharger la liste après suppression
    this.suggestionService.getSuggestionsListByURL()
    .subscribe(data => {
      this.suggestions = data;
    });

    // Redirection vers la liste
    this.router.navigate(['/suggestions']);

  });

}

}