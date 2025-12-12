import { api } from "./api";

export const getPlanes = async () => (await api.get("/planes")).data;
export const createPlan = async (nuevo) => (await api.post("/planes", nuevo)).data;
export const updatePlan = async (id, data) => (await api.put(`/planes/${id}`, data)).data;
export const deletePlan = async (id) => api.delete(`/planes/${id}`);
