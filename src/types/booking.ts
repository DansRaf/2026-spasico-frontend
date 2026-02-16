// Definisi data utama sesuai database db_spasico
export interface Booking {
    id: number;
    requesterName: string;
    roomName: string;
    bookingDate: string;
    status: 'Waiting' | 'Approved' | 'Rejected'; // Sesuai kriteria status
    isDeleted: boolean; // Untuk mendukung logika Soft Delete
}

// Data yang dibutuhkan saat membuat peminjaman baru
export interface CreateBookingRequest {
    requesterName: string;
    roomName: string;
    bookingDate: string;
}