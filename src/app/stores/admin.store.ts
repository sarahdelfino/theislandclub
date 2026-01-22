import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AdminService, SubmittedEvent, EventDocument } from '../admin.service';
import { Observable, switchMap, tap, catchError, of } from 'rxjs';

export interface DashboardState {
  events: (SubmittedEvent & { member?: any })[];
  loading: boolean;
  documents: unknown;
}

@Injectable()
export class AdminStore extends ComponentStore<DashboardState> {
  readonly events$ = this.select(state => state.events);
  readonly loading$ = this.select(state => state.loading);
  readonly documents$ = this.select(state => state.documents);

  constructor(private adminService: AdminService) {
    super({ events: [], loading: true, documents: [] });
    this.loadEvents();
    this.loadDocuments();
  }

  readonly loadEvents = this.effect<void>(trigger$ =>
    trigger$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.adminService.getEnrichedEvents().pipe(
          tap(events => this.patchState({ events, loading: false })),
          catchError(err => {
            console.error(err);
            this.patchState({ loading: false });
            return of(); // return empty observable to complete stream
          })
        )
      )
    )
  );

  readonly loadDocuments = this.effect<void>(trigger$ => 
trigger$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.adminService.getEventDocuments().pipe(
          tap(documents => this.patchState({ documents, loading: false })),
          catchError(err => {
            console.error(err);
            this.patchState({ loading: false });
            return of(); // return empty observable to complete stream
          })
        )
      )
    )
  )
}
