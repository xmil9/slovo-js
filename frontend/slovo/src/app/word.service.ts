import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Word {
	id: number;
    ru: string;
    en: string;
    wordClass: string;
}

@Injectable({
  providedIn: 'root'
})
export class WordService {
	private apiUrl = 'http://localhost:3000/api/data';
	
	constructor(private http: HttpClient) { }
  
	getWords(): Observable<Word[]> {
	  return this.http.get<Word[]>(this.apiUrl);
	}
  }
