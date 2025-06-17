import api from "./api";

export const getProperties = async () => {
  const response = await api.get("/properties");
  return response.data;
};

export const getBookings = async () => {
  const response = await api.get("/bookings");
  return response.data;
};

export const bookProperty = async (bookingData: any) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

export const cancelBooking = async (bookingId: string) => {
  const response = await api.patch(`/bookings/${bookingId}`, {
    status: "cancelled",
  });
  return response.data;
};

