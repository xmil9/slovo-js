import { Component } from '@angular/core';
import { NoWord, Word, WordId, WordService } from '../word.service';
import { concatMap, iif, of, tap } from 'rxjs';
import { randomInt } from '../util';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

function calcRandomWordId(numWords: number): WordId {
	return <WordId>(randomInt(numWords) + 1)
}

@Component({
	selector: 'app-quiz',
	standalone: true,
	imports: [ FormsModule, MatButton, MatCardModule, MatFormFieldModule, NgIf ],
	templateUrl: './quiz.component.html',
	styleUrl: './quiz.component.css'
})
export class QuizComponent {
	private numWords = 0;
	word = NoWord;
	translation = '';
	isCorrect = false;
	isEvaluated = false;
	isRevealed = false;
	
	constructor(private wordService: WordService) { }

	ngOnInit(): void {
		this.updateWord();
	}

	next() {
		this.translation = '';
		this.clearEvaluate();
		this.clearReveal();
		this.updateWord();
	}

	evaluate() {
		this.clearReveal();
		this.isEvaluated = true;
		this.isCorrect = this.translation === this.word.ru;
	}

	reveal() {
		this.clearEvaluate();
		this.isRevealed = true;
	}
	
	private updateWord(): void {
		const wordCount$ = iif(
			() => this.numWords > 0,
			of(this.numWords),
			this.wordService.countWords().pipe(
				tap((count: number) => this.numWords = count)
			)
		);
		wordCount$.pipe(
			concatMap((count: number) => this.wordService.getWord(calcRandomWordId(count)))
		).subscribe((word: Word) => this.word = word);
	}
	
	private clearEvaluate() {
		this.isEvaluated = false;
		this.isCorrect = false;
	}
	
	private clearReveal() {
		this.isRevealed = false;
	}
}
