import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DisneyState, disney$, getCharacters } from '../core/store/disney';
import { Subject, debounceTime, distinctUntilChanged, filter, takeUntil, tap } from 'rxjs';
import { Character } from '../core/models/character';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDetailsDialogComponent } from '../character-details-dialog/character-details-dialog.component';

@Component({
  selector: 'pf-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('resultsWrapper') resultsWrapper: ElementRef;

  page = 1;
  totalPages = 0;
  tableColumns = ['name', 'tv-shows', 'video-games', 'allies', 'enemies'];
  searchForm: FormGroup;
  dataSource = new MatTableDataSource<Character>([]);
  isLoading = false;

  onDestroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) {

    this.createForm();
  }

  ngOnInit() {
    this.listenToStoreChanges();
    this.listenToUrlParamsChanges();
    this.listenToSearchFormChanges();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /**
   * Craete the reactive form for the filters
   */
  createForm() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      tvShows: new FormControl(''),
      pageSize: new FormControl()
    });
  }

  /**
   * Listen to state changes in the Disney store and update the UI accordingly
   */
  listenToStoreChanges() {
    this.store.select(disney$).pipe(
      tap(() => { this.isLoading = false }),
      filter(state => state.characters.length > 0),
      takeUntil(this.onDestroy$)
    ).subscribe(state => {
      this.updatePageWithState(state);
    });
  }

  /**
   * Update the page data
   */
  updatePageWithState(state: DisneyState) {
    this.dataSource.data = state.characters;
    this.totalPages = state.info?.totalPages || 0;
  }

  /**
   * Listen to url changes so that the page responds to navigation changes
   */
  listenToUrlParamsChanges() {
    this.route.queryParamMap.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      this.page = Number(params.get('page')) || 1;

      this.searchForm.patchValue(
        {
          pageSize: params.get('pageSize') || '50',
          name: params.get('name') || '',
          tvShows: params.get('tvShows') || ''
        },
        { emitEvent: false }
      );

      this.search();
    });
  }

  /**
   * Perform a search when the filters change
   */
  listenToSearchFormChanges() {
    this.searchForm.valueChanges.pipe(distinctUntilChanged(), debounceTime(350), takeUntil(this.onDestroy$)).subscribe(() => {
      this.page = 1;

      this.updateQueryParams();
    });
  }

  /**
   * Update the query params to trigger a new search
   */
  updateQueryParams() {
    const queryParams = {
      ...this.searchForm.value,
      page: this.page
    }

    this.router.navigate([''], { queryParams });
  }

  /**
   * Perform a search
   */
  search() {
    this.isLoading = true;
    this.dataSource.data = [];

    this.resultsWrapper?.nativeElement.scrollTo(0, 0);

    this.store.dispatch(getCharacters({
      page: this.page,
      pageSize: this.searchForm.get('pageSize')?.value,
      name: this.searchForm.get('name')?.value,
      tvShows: this.searchForm.get('tvShows')?.value
    }));
  }

  /**
   * Go to the previous page using the current filters
   */
  goToPreviousPage() {
    if (this.page === 1 || this.isLoading) { return; }

    this.page--;
    this.updateQueryParams();
  }

  /**
   * Go to the next page using the current filters
   */
  goToNextPage() {
    if (this.page >= (this.totalPages || 0) || this.isLoading) { return; }

    this.page++;
    this.updateQueryParams();
  }

  /**
   * Navigate to a specific page
   */
  goToPage(page: number) {
    if (this.isLoading) { return; }

    this.page = page;
    this.updateQueryParams();
  }

  /**
   * Show the character details
   */
  characterSelected(character: Character) {

    this.dialog.open(CharacterDetailsDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: character
    });
  }
}
