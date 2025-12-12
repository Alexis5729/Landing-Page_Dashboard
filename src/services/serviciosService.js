import { api } from "./api";

export const getServicios = async () => (await api.get("/servicios")).data;
export const createServicio = async (nuevo) => (await api.post("/servicios", nuevo)).data;
export const updateServicio = async (id, data) => (await api.put(`/servicios/${id}`, data)).data;
export const deleteServicio = async (id) => api.delete(`/servicios/${id}`);
