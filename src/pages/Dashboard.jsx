import { useState, useEffect } from "react";
import {
  Package,
  Briefcase,
  TrendingUp,
  Clock,
  MapPin,
  Tag,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Users,
  Box,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import * as productService from "../services/productService";
import * as jobService from "../services/jobService";
import * as testimonialService from "../services/testimonialService";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [productsData, jobsData, testimonialsData] = await Promise.all([
        productService.getProducts().catch(() => []),
        jobService.getJobs().catch(() => []),
        testimonialService.getTestimonials().catch(() => [])
      ]);

      setProducts(Array.isArray(productsData) ? productsData : []);
      setJobs(Array.isArray(jobsData) ? jobsData : []);
      setTestimonials(Array.isArray(testimonialsData) ? testimonialsData : []);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalProducts = products.length;
  const totalJobs = jobs.length;
  const totalTestimonials = testimonials.length;
  const activeJobs = jobs.filter(job => job.daysLeft > 0).length;
  const totalPositions = jobs.reduce((sum, job) => sum + (job.positions || 0), 0);

  // Get product categories
  const productCategories = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Get job categories
  const jobCategories = jobs.reduce((acc, job) => {
    const category = job.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Recent products (last 3) - sorted by newest first
  const recentProducts = [...products]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt || 0);
      const dateB = new Date(b.createdAt || b.updatedAt || 0);
      return dateB - dateA; // Newest first
    })
    .slice(0, 3);

  // Recent testimonials (last 3)
  const recentTestimonials = [...testimonials]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Recent jobs (last 3) - sorted by newest first
  const recentJobs = [...jobs]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt || 0);
      const dateB = new Date(b.createdAt || b.updatedAt || 0);
      return dateB - dateA; // Newest first
    })
    .slice(0, 3);

  // Calculate remaining counts
  const remainingProducts = products.length > 3 ? products.length - 3 : 0;
  const remainingJobs = jobs.length > 3 ? jobs.length - 3 : 0;

  // Stats cards
  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/admin/productlist"
    },
    {
      label: "Active Jobs",
      value: activeJobs,
      icon: Briefcase,
      color: "bg-purple-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "/admin/jobs"
    },
    {
      label: "Testimonials",
      value: totalTestimonials,
      icon: MessageSquare,
      color: "bg-pink-500",
      textColor: "text-pink-600",
      bgColor: "bg-pink-50",
      link: "/admin/testimonials"
    },
    {
      label: "Open Positions",
      value: totalPositions,
      icon: Users,
      color: "bg-amber-500",
      textColor: "text-amber-600",
      bgColor: "bg-amber-50",
      link: "/admin/jobs"
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 mt-2 text-sm font-medium">
          Overview of your products, jobs, and testimonials
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-red-600" size={20} />
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon size={24} className={stat.textColor} />
              </div>
              <ArrowUpRight className="text-slate-400 group-hover:text-slate-600 transition-colors" size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column 1: Product Categories */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Box size={20} className="text-blue-600" />
              Categories
            </h2>
            <Link to="/admin/productlist" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              All →
            </Link>
          </div>
          {Object.keys(productCategories).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(productCategories).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="font-medium text-slate-700">{category}</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <p>No data</p>
            </div>
          )}
        </div>

        {/* Column 2: Recent Products */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Package size={20} className="text-emerald-600" />
              Recent Products
            </h2>
          </div>
          <div className="space-y-3">
            {recentProducts.length > 0 ? (
              recentProducts.map((product) => (
                <div key={product._id || product.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold shrink-0">
                    P
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-900 truncate">{product.name}</h4>
                    <p className="text-xs text-slate-500 truncate">{product.category}</p>
                  </div>
                </div>
              ))
            ) : (<p className="text-slate-400 text-center py-4">No products</p>)}
          </div>
        </div>

        {/* Column 3: Recent Testimonials */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare size={20} className="text-pink-600" />
              Testimonials
            </h2>
            <Link to="/admin/testimonials" className="text-sm text-pink-600 hover:text-pink-700 font-semibold">
              All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentTestimonials.length > 0 ? (
              recentTestimonials.map((t) => (
                <div key={t.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <img src={t.imageSrc} alt="" className="w-10 h-10 rounded-full object-cover bg-pink-100" />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-900 truncate">{t.title}</h4>
                    <p className="text-xs text-slate-500 truncate">{t.name}</p>
                  </div>
                </div>
              ))
            ) : (<p className="text-slate-400 text-center py-4">No testimonials</p>)}
          </div>
        </div>

      </div>
    </div>
  );
}
