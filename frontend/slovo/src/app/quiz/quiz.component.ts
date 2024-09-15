import { Component, ElementRef, ViewChild } from '@angular/core';
import { NoWord, Word, WordId, WordService } from '../word.service';
import { concatMap, iif, of, tap } from 'rxjs';
import { randomInt } from '../util';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

function calcRandomWordId(numWords: number): WordId {
	return <WordId>(randomInt(numWords) + 1)
}

@Component({
	selector: 'app-quiz',
	standalone: true,
	imports: [
		FormsModule,
		MatButton,
		MatCardModule,
		MatFormFieldModule,
		MatIconButton,
		MatIconModule,
		MatInputModule,
		NgIf
	],
	templateUrl: './quiz.component.html',
	styleUrl: './quiz.component.css'
})
export class QuizComponent {
	private numWords = 0;
	word = NoWord;
	translation = '';
	isCorrect = false;
	isEvaluated = false;
	@ViewChild('translationInput') translationInput!: ElementRef;
	
	constructor(private wordService: WordService) { }

	ngOnInit(): void {
		this.updateWord();
	}

	next() {
		this.translation = '';
		this.clearEvaluate();
		this.updateWord();
	}

	evaluate() {
		this.isEvaluated = true;
		this.isCorrect = this.translation === this.word.ru;
		if (!this.isCorrect)
			this.focusOnTranslation();
	}

	reveal() {
		this.clearEvaluate();
		this.translation = this.word.ru;
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
		).subscribe((word: Word) => {
			this.word = word;
			this.focusOnTranslation();
		});
	}
	
	private clearEvaluate() {
		this.isEvaluated = false;
		this.isCorrect = false;
	}

	private focusOnTranslation() {
		if (this.translationInput)
			this.translationInput.nativeElement.focus();
	}
}
