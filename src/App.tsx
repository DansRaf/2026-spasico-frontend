import { useEffect, useState } from 'react';
import { BookingTable } from './components/BookingTable'; // Memperbaiki baris 2
import { bookingService } from './services/bookingService';
import type { Booking } from './types/booking';

function App() {
  // Memperbaiki baris 9 & 10
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await bookingService.getAll();
      setBookings(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Memperbaiki baris 29
  const handleUpdateStatus = async (id: number, status: string) => {
    if (confirm(`Ubah status menjadi ${status}?`)) {
      await bookingService.updateStatus(id, status);
      loadData(); 
    }
  };

  // Memperbaiki baris 36
  const handleDelete = async (id: number) => {
    if (confirm("Hapus data peminjaman ini?")) {
      await bookingService.delete(id);
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Spasico Dashboard</h1>

        {/* MENGGUNAKAN 'loading' (Memperbaiki warning baris 10) */}
        {loading ? (
          <div className="text-center py-10">Memuat data dari database...</div>
        ) : (
          /* MENGGUNAKAN 'BookingTable', 'bookings', 'handleUpdateStatus', & 'handleDelete' 
             (Memperbaiki warning baris 2, 9, 29, dan 36) */
          <BookingTable 
            bookings={bookings} 
            onUpdateStatus={handleUpdateStatus} 
            onDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  );
}

export default App;