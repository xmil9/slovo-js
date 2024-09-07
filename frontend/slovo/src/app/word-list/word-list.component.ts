import { Component } from '@angular/core';
import { Word, WordService } from '../word.service';
import { MatTableModule } from '@angular/material/table';

@Component({
	selector: 'app-word-list',
	standalone: true,
	imports: [MatTableModule],
	templateUrl: './word-list.component.html',
	styleUrl: './word-list.component.css'
})
export class WordListComponent {
	readonly columns: string[] = ['id', 'english', 'russian', 'word-class'];
	words: Word[] = [];

	constructor(private wordService: WordService) { }

	ngOnInit() {
		this.updateWords();
	}

	updateWords() {
		this.wordService.getWords().subscribe((words: Word[]) => {
			this.words = words;
		});
	}
}
