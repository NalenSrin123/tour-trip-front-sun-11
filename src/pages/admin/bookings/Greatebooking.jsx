import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Greatebooking = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customer: '',
    tour: '',
    travelDate: '',
    pax: 1,
    total: '',
    payment: 'Pending',
    status: 'Confirmed'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. ទាញយកទិន្នន័យចាស់ដែលមានក្នុង LocalStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // 2. បង្កើត Booking ថ្មីជាមួយ ID ស្វ័យប្រវត្តិ
    const newBooking = {
      ...formData,
      id: `BK-${Date.now().toString().slice(-4)}`,
      total: `$${formData.total}`
    };

    // 3. បញ្ចូល Booking ថ្មី ហើយ Save ចូល LocalStorage វិញ
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    // 4. ត្រឡប់ទៅទំព័រ Manage Bookings
    navigate('/admin/bookings');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Booking</h1>
        <button
          onClick={() => navigate('/admin/bookings')}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
        >
          Back to Bookings
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Tour</label>
              <input
                type="text"
                name="tour"
                value={formData.tour}
                onChange={handleChange}
                placeholder="Enter tour name"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passengers (Pax)</label>
              <input
                type="number"
                name="pax"
                min="1"
                value={formData.pax}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Price ($)</label>
              <input
                type="number"
                name="total"
                value={formData.total}
                onChange={handleChange}
                placeholder="0.00"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/admin/bookings')}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
            >
              Save Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Greatebooking;