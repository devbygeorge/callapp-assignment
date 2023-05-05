import axios from "axios";
import { create } from "zustand";

import { Person } from "@/types/person";

interface PersonsState {
  persons: Person[];
  getPersons: () => Promise<void>;
  addPerson: (person: Person) => Promise<void>;
  updatePerson: (person: Person) => Promise<void>;
  deletePerson: (id: number | null) => Promise<void>;
}

const usePersonsStore = create<PersonsState>()((set) => ({
  persons: [],
  getPersons: async () => {
    try {
      const { data } = await axios.get("/api/persons");
      set({ persons: data });
    } catch (err) {
      console.error("Failed to retrieve persons data from server.", err);
    }
  },
  addPerson: async (person) => {
    try {
      const { data: newUniqueId } = await axios.post("/api/person", person);
      set(({ persons }) => ({
        persons: [{ ...person, id: newUniqueId }, ...persons],
      }));
    } catch (err) {
      console.error("Failed to add person to the database.", err);
    }
  },
  updatePerson: async (person) => {
    try {
      await axios.put("/api/person", person);
      set(({ persons }) => ({
        persons: persons.map((p) => (p.id === person.id ? person : p)),
      }));
    } catch (err) {
      console.error("Failed to edit person with ID: " + person.id, err);
    }
  },
  deletePerson: async (id) => {
    try {
      await axios.delete(`/api/person/${id}`);
      set(({ persons }) => ({
        persons: persons.filter((person) => person.id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete person with ID: " + id, err);
    }
  },
}));

export default usePersonsStore;
