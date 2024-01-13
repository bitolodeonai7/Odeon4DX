import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MyPurchasesType } from '../models/movie-app/my-purchases-type';
import { MovieAppService } from '../services/movie-app.service';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.scss']
})
export class MyPurchasesComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public movieAppMyPurchases: MyPurchasesType[] = [];

  constructor(
    private movieAppService: MovieAppService,
  ) {}

  ngOnInit() {
    this.movieAppService.getMyPurchasesList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.movieAppMyPurchases = data,
      error: (_err: any) => this.movieAppMyPurchases = []
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
