export class Blog {
    id: number;
    title: string;
    date: string;
    description: string;

    constructor(id: number, title: string, date: string, description: string) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
    }
}