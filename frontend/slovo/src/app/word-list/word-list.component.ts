import { Component } from '@angular/core';
import { NgFor } from '@angular/common'
import { Word, WordService } from '../word.service';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [ MatTableModule, NgFor ],
  templateUrl: './word-list.component.html',
  styleUrl: './word-list.component.css'
})
export class WordListComponent {
	readonly columns: string[] = ['id', 'english', 'russian', 'word-class'];
	words!: Word[];

	constructor(private wordService: WordService) { }
  
	ngOnInit(): void {
	  this.wordService.getWords().subscribe((words: Word[]) => {
		this.words = words;
	  });
	}
}
