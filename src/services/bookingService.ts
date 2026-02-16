import axiosInstance from '../api/axiosInstance';
import type { Booking, CreateBookingRequest } from '../types/booking';

export const bookingService = {
    // Ambil semua data yang tidak di-soft delete
    getAll: async (): Promise<Booking[]> => {
        const response = await axiosInstance.get<Booking[]>('/Booking');
        return response.data;
    },

    // Tambah data baru
    create: async (data: CreateBookingRequest): Promise<Booking> => {
        const response = await axiosInstance.post<Booking>('/Booking', data);
        return response.data;
    },

    // Update status peminjaman
    updateStatus: async (id: number, status: string): Promise<void> => {
        await axiosInstance.put(`/Booking/${id}/status`, JSON.stringify(status));
    },

    // Soft delete data
    delete: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/Booking/${id}`);
    }
};