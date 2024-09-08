export class Event {
    id: string;
    title: string;
    date: string;
    start: string;
    end: string;
    description?: string;
    organizer?: string;
    email?: string;
    state?: string;
    phone?: string;

    constructor(
        id: string,
        title: string,
        date: string,
        start: string,
        end: string,
        description?: string,
        organizer?: string,
        email?: string,
        state?: string,
        phone?: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.organizer = organizer;
        this.email = email;
        this.date = date;
        this.start = start;
        this.end = end;
        this.state = state;
        this.phone = phone;
    }
}
