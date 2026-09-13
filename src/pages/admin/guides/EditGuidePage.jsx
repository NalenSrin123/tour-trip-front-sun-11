import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, Award, Globe, CheckCircle2 } from "lucide-react";

function EditGuidePage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        specialty: "",
        languages: "",
        status: "Active"
    });

    useEffect(() => {
        const existingGuides = JSON.parse(localStorage.getItem("guidesList")) || [];
        const guideToEdit = existingGuides.find((g) => g.id.toString() === id);
        
        if (guideToEdit) {
            setFormData(guideToEdit);
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingGuides = JSON.parse(localStorage.getItem("guidesList")) || [];
        
        const updatedGuides = existingGuides.map((guide) => 
            guide.id.toString() === id ? { ...guide, ...formData } : guide
        );

        localStorage.setItem("guidesList", JSON.stringify(updatedGuides));
        navigate("/admin/guides");
    };

    return (
        <div className="p-8 bg-gray-50/50 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Guides</span>
                </button>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 dashboard-header">
                        <h1 className="text-xl font-bold text-gray-900">Edit Guide</h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Update the professional profile details of the guide.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <User size={14} className="text-blue-500" />
                                    <span>Guide Name</span>
                                </label>
                                <input 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <Award size={14} className="text-blue-500" />
                                    <span>Specialty</span>
                                </label>
                                <input 
                                    name="specialty" 
                                    value={formData.specialty} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all" 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <Globe size={14} className="text-blue-500" />
                                    <span>Languages</span>
                                </label>
                                <input 
                                    name="languages" 
                                    value={formData.languages} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <CheckCircle2 size={14} className="text-blue-500" />
                                    <span>Status</span>
                                </label>
                                <select 
                                    name="status" 
                                    value={formData.status} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-gray-700"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                            <button 
                                type="button" 
                                onClick={() => navigate(-1)} 
                                className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-sm font-medium transition-colors shadow-sm"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-blue-500/20"
                            >
                                Update Guide
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditGuidePage;