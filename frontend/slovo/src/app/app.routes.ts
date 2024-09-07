import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WordListComponent } from './word-list/word-list.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
	{path: '', redirectTo: '/word-list', pathMatch:'full'},
	{path: 'word-list', component: WordListComponent},
	{path: 'quiz', component: QuizComponent}
];
