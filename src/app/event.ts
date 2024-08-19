export class Event {
    id: number;
    title: string;
    description: string;
    organizer: string;
    email: string;
    date: string;
    start: string;
    end: string;
    state: string;
    phone: string;

    constructor(
        id: number,
        title: string,
        description: string,
        organizer: string,
        email: string,
        date: string,
        start: string,
        end: string,
        state: string,
        phone: string
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
