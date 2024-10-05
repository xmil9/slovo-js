import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-toolbar',
	standalone: true,
	imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterLink],
	templateUrl: './toolbar.component.html',
	styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
}
