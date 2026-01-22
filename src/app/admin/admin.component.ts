import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminStore } from '../stores/admin.store';
import { AdminService, SubmittedEvent } from '../admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './admin.component.html',
  providers: [AdminStore],
})
export class AdminComponent implements AfterViewInit {
  private store = inject(AdminStore);
  private adminService = inject(AdminService);
  displayedColumns = [
    'date',
    'title',
    'organizer',
    'state',
    'agreement',
    'cleaningFee',
    'actions',
  ];
  dataSource = new MatTableDataSource<(SubmittedEvent & { member?: any })>();

  loading$ = this.store.loading$;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.store.events$.subscribe(events => (this.dataSource.data = events));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource)
  }

  /** convenience getters for UI actions */
  openAgreement(url?: string) {
    console.log(url);
    if (url) window.open(url, '_blank');
  }

  openPayment(url?: string) {
    if (url) window.open(url, '_blank');
  }

  approve(eventId: string) {
    console.log('Approve', eventId);
    this.adminService.approveEvent(eventId);
  }

  requestInfo(eventId: string) {
    console.log('Request info', eventId);
  }
}
