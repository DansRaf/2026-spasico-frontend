import { useEffect, useState } from 'react';
import { BookingTable } from './components/BookingTable';
import { bookingService } from './services/bookingService';
import type { Booking } from './types/booking'; //

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari Backend
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

  const handleUpdateStatus = async (id: number, status: string) => {
    if (confirm(`Ubah status menjadi ${status}?`)) {
      await bookingService.updateStatus(id, status);
      loadData(); // Refresh data setelah update
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      await bookingService.delete(id);
      loadData(); // Refresh data setelah soft delete
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Spasico Dashboard</h1>
            <p className="text-gray-600">Manajemen Peminjaman Ruangan</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Tambah Peminjaman
          </button>
        </header>

        {loading ? (
          <p className="text-center py-10">Memuat data dari server...</p>
        ) : (
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