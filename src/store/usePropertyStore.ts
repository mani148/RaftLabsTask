import { create } from "zustand";
import { Property } from "../types/types";

type PropertyState = {
  properties: Property[];
  selectedProperty: Property | null;
  bookingIds: string[];

  setProperties: (items: Property[]) => void;
  setSelectedProperty: (item: Property) => void;
  setBookingIds: (ids: string[]) => void;
  removeBookingId: (ids: string) => void;
};

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  selectedProperty: null,
  bookingIds: [],
  setProperties: (items) => set((prev) => ({ ...prev, properties: items })),
  setSelectedProperty: (item) =>
    set((prev) => ({ ...prev, selectedProperty: item })),
  setBookingIds: (ids) =>
    set((prev) => ({
      bookingIds: [...new Set([...prev.bookingIds, ...ids])], // prevent duplicates
    })),
  removeBookingId: (id: string) =>
    set((prev) => ({
      bookingIds: prev.bookingIds.filter((pid) => pid !== id),
    })),
}));