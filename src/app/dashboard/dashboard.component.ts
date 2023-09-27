import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnimalService } from '../service/animal.service';
import { Animal } from '../common/interfaces/animal.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedType: string = '';
  selectedGender: string = '';
  searchQuery: string = '';
  page: number = 1;
  private destroyRef = inject(DestroyRef);

  constructor(private animalService: AnimalService) {
  }

  animals: Animal[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.animalService.getAll(this.searchQuery, this.selectedType, this.selectedGender, this.page)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((animals: Animal[]) => {
        this.animals = animals;
        this.isLoading = false;
      });
  }

  filter(): void {
    this.page = 1;
    this.fetchData();
  }

  handlePageChange($event: PageEvent): void {
    this.page = $event.pageIndex + 1;
    this.fetchData();
  }
}
