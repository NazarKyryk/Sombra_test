import { Component, Input } from '@angular/core';
import { Animal } from '../../common/interfaces/animal.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() animal!: Animal;
}
