import type { Booking } from '../types/booking'; // Menggunakan type-only import

interface Props {
  bookings: Booking[];
  onUpdateStatus: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}

export const BookingTable = ({ bookings, onUpdateStatus, onDelete }: Props) => {
  // Fungsi pembantu untuk warna status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pemohon</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruangan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.requesterName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.roomName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(booking.bookingDate).toLocaleDateString('id-ID')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyle(booking.status)}`}>
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                <button 
                  onClick={() => onUpdateStatus(booking.id, 'Approved')}
                  className="text-green-600 hover:text-green-900 font-bold"
                >
                  Approve
                </button>
                <button 
                  onClick={() => onUpdateStatus(booking.id, 'Rejected')}
                  className="text-orange-600 hover:text-orange-900 font-bold"
                >
                  Reject
                </button>
                <button 
                  onClick={() => onDelete(booking.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};