import { defineStore } from 'pinia'
import { getDatabase, ref, set, onValue } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

const db = getDatabase();

export const useEventsStore = defineStore('events', () => {
  async function getEvents() {
    try {
      const eventsRef = ref(db, 'events/');
      onValue(eventsRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      });
      
    } catch (e) {
      console.error("Could not get events: ", e);
    }
  }

  async function addEvent(event) {
    try {
        let id = uuidv4();
        console.log(event);
        set(ref(db, 'events/' + id + '/'), event);
      
        // console.log("Document written with ID: ", docRef.id);
        console.log("Woo!");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }

  return { getEvents, addEvent }
})
