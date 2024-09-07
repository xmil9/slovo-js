import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { makeUrl } from './util';

export type WordId = number;

export interface Word {
	id: WordId;
	ru: string;
	en: string;
	wordClass: string;
};

export const NoWord = <Word>{
	id: 0,
	ru: '',
	en: '',
	wordClass: ''
};

@Injectable({
	providedIn: 'root'
})
export class WordService {
	private readonly apiUrl = 'http://localhost:3000/api';

	constructor(private http: HttpClient) { }

	getWords(): Observable<Word[]> {
		return this.http.get<Word[]>(makeUrl(this.apiUrl, 'words'));
	}

	countWords(): Observable<number> {
		return this.http.get<number>(makeUrl(this.apiUrl, 'word-count'));
	}

	getWord(id: WordId): Observable<Word> {
		return this.http.get<Word>(makeUrl(this.apiUrl, 'word', id.toString()));
	}
}
