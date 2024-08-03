import { defineStore } from 'pinia'
// import { db } from "@/firebase";
import { ref } from 'vue';
import db from "@/firebase";
import { getDatabase, ref as sRef, set, onValue } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import events from "./events.json";


export const useEventsStore = defineStore('events', {
  state: () => ({
    eventList: [],
    latestEvents: [],
    event: []
  }),
  actions: {
    async getEvents() {
      // let data = [];
      this.eventList = events;
      // console.log(this.eventList);
      return this.eventList;
      // try {
      //   const eventsRef = sRef(db, 'events/');
      //   onValue(eventsRef, (snapshot) => {
      //     data = snapshot.val();
      //     for(let x in data) {
      //       this.eventList.push(data[x]);
      //     }
      //   });
      //   return this.eventList;
      // } catch (e) {
      //   console.error("Could not get events: ", e);
      // }
    },
    async getLatestEvents() {
      // console.log(this.eventList)
      if (this.eventList.length > 0) {
        i = 0;
        while (i < 2) {
          this.latestEvents.push(this.eventList[i]);
          i++
        }
        // console.log(this.latestEvents);
        return this.latestEvents;
      } else {
        await this.getEvents().then(() => {
          this.getLatestEvents();
        })
      }
      return this.latestEvents;
    },
    async addEvent(event) {
      try {
        let id = uuidv4();
        // console.log(event);
        set(sRef(db, 'events/' + id + '/'), event);

        // console.log("Document written with ID: ", docRef.id);
        // console.log("Woo!");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async getEventById(id) {
      this.event = this.eventList[id];
      return this.event;
    }
  }
});
