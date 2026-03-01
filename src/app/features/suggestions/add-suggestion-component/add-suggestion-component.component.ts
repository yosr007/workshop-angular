import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-suggestion-component',
  templateUrl: './add-suggestion-component.component.html',
  styleUrl: './add-suggestion-component.component.css'
})
export class AddSuggestionComponentComponent {
  id!: number;
  suggestion: Suggestion = {
    id: 0,
    title: '',
    description: '',
    category: '',
    date: new Date(),
    status: 'en_attente',
    nbLikes: 0
  };

  constructor(
  private suggestionService: SuggestionService,
  private router: Router,
  private route: ActivatedRoute
) {}

  ngOnInit(): void {
  this.id = this.route.snapshot.params['id'];
  if(this.id){
    this.suggestionService.getSuggestionById1(this.id)
    .subscribe(data => {
      this.suggestion = data;
    });
  }
}

  /*addSuggestion(): void {

    this.suggestionService.addSuggestion(this.suggestion)
    .subscribe(() => {

      // Redirection vers la liste
      this.router.navigate(['/suggestions']);

    });

  }*/
 saveSuggestion(): void {

  if(this.id){

    this.suggestionService.updateSuggestion({
      ...this.suggestion,
      id: this.id   // 🔥 on force l'id ici
    })
    .subscribe(() => {
      this.router.navigate(['/suggestions']);
    });

  }else{

    this.suggestionService.addSuggestion(this.suggestion)
    .subscribe(() => {
      this.router.navigate(['/suggestions']);
    });

  }

}
}
