import { Injectable } from '@angular/core';
import { Database, listVal, ref, set, update } from '@angular/fire/database';
import { Observable, combineLatest, map } from 'rxjs';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface SubmittedEvent {
  id: string;
  organizer: string;
  title: string;
  date: string;
  start: string;
  end: string;
  description: string;
  state: 'pending approval' | 'approved';
  depositReceived?: boolean;
  agreementSigned?: boolean;
}

export interface EventDocument {
  calendarEventId: string;
  agreementPdfUrl: string;
  agreementUrl: string;
  cleaningFeeUrl: string;
  eventFolderUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private db: Database) {}

  getSubmittedEvents(): Observable<SubmittedEvent[]> {
    const eventsRef = ref(this.db, '/submittedEvents');
    return listVal<SubmittedEvent>(eventsRef, { keyField: 'id' });
  }

  getMembers(): Observable<Member[]> {
    const membersRef = ref(this.db, '/members');
    return listVal<Member>(membersRef, { keyField: 'id' });
  }

  getEventDocuments(): Observable<EventDocument[]> {
    const documentsRef = ref(this.db, '/eventDocuments');
    return listVal<EventDocument>(documentsRef, { keyField: 'calendarEventId' });
  }

  getEnrichedEvents(): Observable<(SubmittedEvent & { member?: Member; document?: EventDocument })[]> {
    return combineLatest([
      this.getSubmittedEvents(),
      this.getMembers(),
      this.getEventDocuments(),
    ]).pipe(
      map(([events, members, documents]) => {
        const memberMap = new Map(members.map(m => [m.id, m]));
        const documentMap = new Map(documents.map(d => [d.calendarEventId, d]));

        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize

        return events
          .filter(e => new Date(e.date) >= today)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map(e => ({
            ...e,
            member: memberMap.get(e.organizer),
            document: documentMap.get(e.id),
          }));
      })
    );
  }

  approveEvent(id: string) {
    const eventRef = ref(this.db, `/submittedEvents/${id}/state`);
    set(eventRef, 'approved').then(() => {
      console.log('Event state updated to approved');
    }).catch((error) => {
      console.log('Failed to update event state with the following error: ', error);
      return error;
    });
    return eventRef;
  }
}
