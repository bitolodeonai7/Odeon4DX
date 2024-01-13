import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NowPlayingType } from '../models/movie-app/now-playing-type';
import { TheatresNearYouType } from '../models/movie-app/theatres-near-you-type';
import { MovieListType } from '../models/movie-app/movie-list-type';
import { ShowtimesType } from '../models/movie-app/showtimes-type';
import { TheatresType } from '../models/movie-app/theatres-type';
import { MovieAppService } from '../services/movie-app.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public movieAppNowPlaying: NowPlayingType[] = [];
  public value: string = '1';
  public movieAppMovieList: MovieListType[] = [];
  public movieAppTheatres: TheatresType[] = [];
  public movieAppShowtimes: ShowtimesType[] = [];
  public movieAppTheatresNearYou: TheatresNearYouType[] = [];

  constructor(
    private movieAppService: MovieAppService,
  ) {}

  ngOnInit() {
    this.movieAppService.getNowPlayingList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.movieAppNowPlaying = data,
      error: (_err: any) => this.movieAppNowPlaying = []
    });
    this.movieAppService.getMovieListList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.movieAppMovieList = data,
      error: (_err: any) => this.movieAppMovieList = []
    });
    this.movieAppService.getTheatresList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.movieAppTheatres = data,
      error: (_err: any) => this.movieAppTheatres = []
    });
    this.movieAppService.getShowtimesList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.movieAppShowtimes = data,
      error: (_err: any) => this.movieAppShowtimes = []
    });
    this.movieAppService.getTheatresNearYouList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.movieAppTheatresNearYou = data,
      error: (_err: any) => this.movieAppTheatresNearYou = []
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
