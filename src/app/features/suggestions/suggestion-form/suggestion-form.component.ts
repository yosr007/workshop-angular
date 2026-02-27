import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent {

  suggestionForm!: FormGroup;

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
   constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: new Date(), disabled: true }], // readonly
      status: [{ value: 'en attente', disabled: true }], // readonly
    });
  }
  submit(): void {
    if (this.suggestionForm.valid) {
      const newSuggestion: Suggestion = {
        id: Date.now(), // auto-incrément simulé
        title: this.suggestionForm.value.title,
        description: this.suggestionForm.value.description,
        category: this.suggestionForm.value.category,
        date: new Date(),
        status: 'en attente',
        nbLikes: 0
      };
      console.log('Nouvelle suggestion:', newSuggestion);
      alert('Suggestion ajoutée avec succès !');
      this.router.navigate(['/suggestions']); // retour à la liste
    }
  }

  backToList(): void {
    this.router.navigate(['/suggestions']);
  }
}
