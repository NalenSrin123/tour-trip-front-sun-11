import React, { useState } from 'react';
import { ArrowLeft, Upload, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Createdestination = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    country: 'Cambodia',
    status: 'Active',
    description: '',
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // ត្រឡប់ទៅទំព័រ Destinations វិញបន្ទាប់ពី Submit
    navigate('/destinations');
  };

  return (
    <div className="w-full p-6 bg-slate-50 min-h-screen">
      {/* Header Bar */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          to="/destinations" 
          className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition text-slate-600"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Add New Destination</h2>
          <p className="text-slate-500 text-sm">Create a new location for your travel package.</p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Inputs Section */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Destination Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Siem Reap"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Write a brief overview about this destination..."
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Cover Image</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-slate-50 min-h-[220px] relative">
              {previewUrl ? (
                <div className="w-full h-full relative group">
                  <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <label className="cursor-pointer bg-white text-slate-800 text-xs px-3 py-1.5 rounded-md font-medium">
                      Change Image
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full py-6">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                    <Upload size={20} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Click to upload image</span>
                  <span className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3 mt-8 pt-4 border-t border-slate-100">
          <Link
            to="/destinations"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition shadow-sm"
          >
            <CheckCircle2 size={16} /> Save Destination
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createdestination;