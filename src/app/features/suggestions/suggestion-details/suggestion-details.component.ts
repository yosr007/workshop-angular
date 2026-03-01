import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Router ajouté
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';
@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css'] // corrigé
})
export class SuggestionDetailsComponent implements OnInit { // implements OnInit ajouté
  suggestionId!: number;
  suggestion!: Suggestion | undefined;
  suggestions: Suggestion[] = [];

  //constructor(private route: ActivatedRoute, private router: Router) { }

  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private suggestionService: SuggestionService  
   ) { }

  ngOnInit(): void {

  // Récupération id depuis URL
  this.suggestionId = Number(this.route.snapshot.paramMap.get('id'));

  // Appel du service pour récupérer une suggestion
  this.suggestionService.getSuggestionById1(this.suggestionId)
  .subscribe(data => {
    console.log("DATA :", data);
    this.suggestion = data.suggestion;
  });

}

  backToList(): void {
    this.router.navigate(['../'], { relativeTo: this.route }); // retourne à /suggestions
  }
  goToUpdate(id: number): void {
  this.router.navigate(['/suggestions/form', id]);
}

}