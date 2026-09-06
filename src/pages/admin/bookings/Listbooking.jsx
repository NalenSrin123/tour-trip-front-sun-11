import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Plus, Search, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const Listbooking = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTour, setSelectedTour] = useState('All Tours');
  const [selectedDate, setSelectedDate] = useState('');

  const [statusFilters, setStatusFilters] = useState({
    Confirmed: true,
    Pending: true,
    Completed: true,
    Canceled: true,
  });

  const [paymentFilters, setPaymentFilters] = useState({
    Paid: true,
    Pending: true,
    Refunded: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 1. Fetch & Normalize Data ពី localStorage
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(savedBookings);
  }, []);

  const handleStatusToggle = (statusKey) => {
    setStatusFilters(prev => ({ ...prev, [statusKey]: !prev[statusKey] }));
    setCurrentPage(1);
  };

  const handlePaymentToggle = (paymentKey) => {
    setPaymentFilters(prev => ({ ...prev, [paymentKey]: !prev[paymentKey] }));
    setCurrentPage(1);
  };

  // 2. Dynamic Filtering ដែលគាំទ្រ Key សព្វគ្រប់ប្រភេទ
  const filteredBookings = bookings.filter((item) => {
    const customerName = item.customer || item.customerName || item.name || '';
    const bookingId = item.id || item.bookingId || '';
    const tourName = item.tour || item.tourName || item.packageName || '';
    const date = item.travelDate || item.date || item.startDate || '';
    const status = item.status || 'Pending';
    const payment = item.payment || item.paymentStatus || 'Pending';

    const matchesSearch = 
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookingId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTour = 
      selectedTour === 'All Tours' || tourName.toLowerCase().includes(selectedTour.toLowerCase());

    const matchesDate = !selectedDate || date === selectedDate;

    // Filter status បើមាន
    const activeStatuses = Object.keys(statusFilters).filter(k => statusFilters[k]);
    const matchesStatus = activeStatuses.length === 0 || activeStatuses.some(s => s.toLowerCase() === status.toLowerCase());

    const activePayments = Object.keys(paymentFilters).filter(k => paymentFilters[k]);
    const matchesPayment = activePayments.length === 0 || activePayments.some(p => p.toLowerCase() === payment.toLowerCase());

    return matchesSearch && matchesTour && matchesDate && matchesStatus && matchesPayment;
  });

  // 3. Pagination Logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  // CSV Export
  const handleExportCSV = () => {
    if (filteredBookings.length === 0) return alert('មិនមានទិន្នន័យសម្រាប់ Export ទេ!');
    
    const headers = ["Booking ID", "Customer", "Tour", "Travel Date", "Pax", "Total", "Payment", "Status"];
    const rows = filteredBookings.map(b => [
      b.id || b.bookingId || '',
      b.customer || b.customerName || b.name || '',
      `"${b.tour || b.tourName || ''}"`,
      b.travelDate || b.date || '',
      b.pax || b.guests || 1,
      b.total || b.price || '$0.00',
      b.payment || b.paymentStatus || 'Pending',
      b.status || 'Pending'
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bookings_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 bg-slate-50/50 min-h-screen text-slate-700 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Manage Bookings</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          
          <button 
            onClick={() => navigate('/admin/bookings/Greatebooking')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Booking
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 mb-4">Filter & Search</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">Search</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Booking ID, Customer"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 bg-slate-50/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">Date Range</label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-2 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 bg-slate-50/30 text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">Tour</label>
              <select 
                value={selectedTour}
                onChange={(e) => { setSelectedTour(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 bg-slate-50/30 text-slate-700"
              >
                <option value="All Tours">All Tours</option>
                <option value="Seim Reap">Seim Reap</option>
                
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-1 flex-wrap">
            <span className="text-xs font-semibold text-slate-700 mr-1">Status:</span>
            {['Confirmed', 'Pending', 'Completed', 'Canceled'].map((st) => (
              <label key={st} className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={statusFilters[st]}
                  onChange={() => handleStatusToggle(st)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                />
                {st}
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 mb-4">Payment Status</h2>
          <div className="space-y-3">
            {[
              { name: 'Paid', color: 'bg-emerald-500' },
              { name: 'Pending', color: 'bg-amber-500' },
              { name: 'Refunded', color: 'bg-slate-400' }
            ].map((pm) => (
              <label key={pm.name} className="flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${pm.color}`}></span>
                  <span className="text-xs font-medium text-slate-700">{pm.name}</span>
                </div>
                <input
                  type="checkbox"
                  checked={paymentFilters[pm.name]}
                  onChange={() => handlePaymentToggle(pm.name)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-medium">
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Tour</th>
                <th className="py-3.5 px-4">Travel Date</th>
                <th className="py-3.5 px-4">Pax</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    មិនទាន់មានទិន្នន័យនៅឡើយទេ។ សូមចុច "+ New Booking" ដើម្បីបន្ថែម!
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => {
                  // Fallbacks for flexible object structure
                  const id = item.id || item.bookingId || `TB-${1000 + index}`;
                  const customer = item.customer || item.customerName || item.name || 'N/A';
                  const tour = item.tour || item.tourName || item.packageName || 'N/A';
                  const travelDate = item.travelDate || item.date || 'N/A';
                  const pax = item.pax || item.guests || 1;
                  const total = item.total || (item.price ? `$${item.price}` : '$0.00');
                  const payment = item.payment || item.paymentStatus || 'Pending';
                  const status = item.status || 'Pending';

                  const initials = item.initials || customer.slice(0, 2).toUpperCase();

                  return (
                    <tr key={id + index} className="hover:bg-slate-50/50 transition">
                      <td className="py-3.5 px-4 font-medium text-slate-400">{id}</td>
                      
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full ${item.avatarBg || 'bg-blue-100 text-blue-600'} flex items-center justify-center text-[10px] font-bold`}>
                            {initials}
                          </div>
                          <span className="font-semibold text-slate-700">{customer}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 max-w-[180px] truncate">{tour}</td>
                      <td className="py-3.5 px-4 text-slate-500">{travelDate}</td>
                      <td className="py-3.5 px-4 text-slate-500">{pax}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">{total}</td>
                      
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wider ${
                          payment.toLowerCase() === 'paid' ? 'bg-emerald-50 text-emerald-600' :
                          payment.toLowerCase() === 'pending' ? 'bg-amber-50 text-amber-600' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {payment.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wider ${
                          status.toLowerCase() === 'confirmed' ? 'bg-blue-50 text-blue-600' :
                          status.toLowerCase() === 'pending' ? 'bg-amber-50 text-amber-600' :
                          'bg-rose-50 text-rose-500'
                        }`}>
                          {status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-xs text-slate-400 px-1">
        <div>
          Showing {filteredBookings.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredBookings.length)} of {filteredBookings.length} entries
        </div>

        <div className="flex items-center gap-1">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="w-7 h-7 flex items-center justify-center border border-slate-200 rounded-md bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 flex items-center justify-center border rounded-md font-medium transition ${
                currentPage === page
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="w-7 h-7 flex items-center justify-center border border-slate-200 rounded-md bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listbooking;