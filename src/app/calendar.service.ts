import { Injectable } from '@angular/core';
import { google } from "googleapis";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() {
  const GOOGLE_PRIVATE_KEY = process.env["private_key"];
  const GOOGLE_CLIENT_EMAIL = process.env["client_email"];
  const GOOGLE_PROJECT_NUMBER = process.env["project_number"];
  const GOOGLE_CALENDAR_ID = process.env["calendar_id"];
  
  const SCOPES = ["https://www.googleapis.com/auth/calendar"];
  
  const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    undefined,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );
  
  // const calendar = google.calendar({
  //   version: "v3",
  //   project: GOOGLE_PROJECT_NUMBER,
  //   auth: jwtClient,
  // });
  
  const auth = new google.auth.GoogleAuth({
    keyFile: "../keys.json",
    scopes: SCOPES,
  });
  
  const calendarEvent = {
    summary: "Test Event added by Node.js",
    description: "This event was created by Node.js",
    start: {
      dateTime: "2022-06-03T09:00:00-02:00",
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: "2022-06-04T17:00:00-02:00",
      timeZone: "Asia/Kolkata",
    },
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };
   }

  


}
