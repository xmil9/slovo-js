import { Component } from '@angular/core';
import { NoWord, Word, WordId, WordService } from '../word.service';
import { concatMap, iif, Observable, of, tap } from 'rxjs';
import { randomInt } from '../util';

function calcRandomWordId(numWords: number): WordId {
	return <WordId>(randomInt(numWords) + 1)
}

@Component({
	selector: 'app-quiz',
	standalone: true,
	imports: [],
	templateUrl: './quiz.component.html',
	styleUrl: './quiz.component.css'
})
export class QuizComponent {
	private numWords = 0;
	word = NoWord;
	
	constructor(private wordService: WordService) { }

	ngOnInit(): void {
		this.updateWord();
	}

	updateWord(): void {
		const wordCount$ = iif(
			() => this.numWords > 0,
			of(this.numWords),
			this.wordService.countWords().pipe(
				tap((count: number) => this.numWords = count)
			)
		);
		wordCount$.pipe(
			concatMap((count: number) => this.wordService.getWord(calcRandomWordId(count)))
		).subscribe((word: Word) => this.word = word );
	}
}
