import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  lang = inject(LanguageService);
}
