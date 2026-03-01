import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { ActivatedRoute } from '@angular/router';
import { SuggestionService } from '../../../core/Services/suggestion.service';
SuggestionService
@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent {

  id!: number;
  suggestionForm!: FormGroup;
  suggestion!: Suggestion;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];
  constructor(
  private service: SuggestionService,
  private router: Router,
  private actR: ActivatedRoute,
  private fb: FormBuilder
) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: new Date(), disabled: true }], // readonly
      status: [{ value: 'en attente', disabled: true }], // readonly
    });
    this.id = this.actR.snapshot.params['id'];
    this.service.getSuggestionById1(this.id).subscribe((data) => {
    this.suggestion = data;
    this.suggestionForm.patchValue(this.suggestion);
});
  }
  submit(): void {

if(this.id){

// UPDATE
this.service.updateSuggestion({
id: this.id,
...this.suggestionForm.value
})
.subscribe(()=>{
this.router.navigate(['/suggestions']);
});

}else{

// ADD
this.service.addSuggestion(this.suggestionForm.value)
.subscribe(()=>{
this.router.navigate(['/suggestions']);
});

}

}

  backToList(): void {
    this.router.navigate(['/suggestions']);
  }

  
}
