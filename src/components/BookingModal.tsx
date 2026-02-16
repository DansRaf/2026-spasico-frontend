import { useState } from 'react';
import type { CreateBookingRequest } from '../types/booking'; //

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateBookingRequest) => void;
}

export const BookingModal = ({ isOpen, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState<CreateBookingRequest>({
    requesterName: '',
    roomName: '',
    bookingDate: new Date().toISOString().split('T')[0]
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ requesterName: '', roomName: '', bookingDate: new Date().toISOString().split('T')[0] });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Tambah Peminjaman Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Pemohon</label>
            <input
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.requesterName}
              onChange={(e) => setFormData({...formData, requesterName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ruangan</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.roomName}
              onChange={(e) => setFormData({...formData, roomName: e.target.value})}
            >
              <option value="Ruang Rapat A">Ruang Rapat A</option>
              <option value="Ruang Rapat B">Ruang Rapat B</option>
              <option value="Aula Utama">Aula Utama</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tanggal Peminjaman</label>
            <input
              type="date"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.bookingDate}
              onChange={(e) => setFormData({...formData, bookingDate: e.target.value})}
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};