import { Component, DestroyRef, inject, numberAttribute, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnimalService } from '../service/animal.service';
import { SnackbarService } from '../service/snackbar.service';
import { Animal } from '../common/interfaces/animal.interface';

@Component({
  selector: 'app-animal-profile',
  templateUrl: './animal-profile.component.html',
  styleUrls: ['./animal-profile.component.css']
})
export class AnimalProfileComponent implements OnInit {
  animal!: Animal;
  adopted: boolean = false;
  isLoading: boolean = true;
  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!!;
    this.animalService.getAnimal(id)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((animal: Animal) => {
        this.animal = animal;
        this.isLoading = false;
      });
  }

  adoptAnimal(): void {
    this.animalService.updateAnimal(this.animal)
    this.adopted = true;
    this.snackbarService.showNotification('You have adopted ' + this.animal.name);
  }
}
