import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Ticket, Calendar, MapPin, 
  Clock, Share2, Heart, Loader2, Sparkles, CheckCircle2, ShieldCheck
} from 'lucide-react';
import API from '../api/axios'; 
import toast from 'react-hot-toast';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        // Updated endpoint to match your Postman route
        const res = await API.get(`/event/events/${id}`);
        // Pointing exactly to the nested data object
        setEvent(res.data.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load event details", {
          style: { background: '#EF4444', color: '#FFF' }
        });
        navigate('/'); 
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchEventDetails();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090D16] flex items-center justify-center flex-col gap-5">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin relative z-10" />
        </div>
        <p className="text-slate-400 font-semibold uppercase tracking-widest text-sm animate-pulse">Decrypting Pass...</p>
      </div>
    );
  }

  if (!event) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative min-h-screen bg-[#090D16] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800/60 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-2xl group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Cinematic Hero Section */}
      <div className="relative w-full h-[60vh] sm:h-[70vh]">
        {/* Seamless Fade Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090D16]/60 to-[#090D16] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent,rgba(9,13,22,1))] z-10" />
        
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop"} 
          alt={event.title} 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-20 max-w-6xl mx-auto px-6 -mt-48 sm:-mt-64 pb-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column: Details & Bento Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex-1"
          >
            {/* Header Info */}
            <motion.div variants={itemVariants} className="mb-10">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 text-cyan-400 text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Featured
                </span>
                <span className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 text-slate-300 text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full">
                  ID: {id?.substring(0, 8)}
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                {event.title}
              </h1>
            </motion.div>

            {/* 2026 Bento Grid for Event Meta */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-5 flex flex-col gap-3 hover:bg-slate-800/40 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Date</p>
                  <p className="text-sm sm:text-base font-bold text-white">
                    {event.date ? new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'TBA'}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-5 flex flex-col gap-3 hover:bg-slate-800/40 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Time</p>
                  <p className="text-sm sm:text-base font-bold text-white">{event.time || 'TBA'}</p>
                </div>
              </div>

              <div className="col-span-2 md:col-span-1 bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-5 flex flex-col gap-3 hover:bg-slate-800/40 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Location</p>
                  <p className="text-sm sm:text-base font-bold text-white truncate" title={event.location}>{event.location || 'TBA'}</p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="prose prose-invert max-w-none mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">About this Event</h3>
              <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                {event.description || "No description provided for this event. Stay tuned for more details."}
              </p>
            </motion.div>

            {/* Policy */}
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-slate-900/80 to-transparent p-6 rounded-3xl border-l-2 border-indigo-500">
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" /> Event Policy
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-slate-400 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" /> 
                  Tickets are strictly non-refundable and non-transferable.
                </li>
                <li className="flex items-start gap-3 text-slate-400 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" /> 
                  Please carry a valid government-issued ID proof matching the ticket name.
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Booking Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-[400px] shrink-0"
          >
            <div className="sticky top-28 group relative">
              {/* Animated Glow Behind Card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative bg-[#0b1120]/90 backdrop-blur-3xl border border-slate-700/60 rounded-[2rem] p-8 shadow-2xl">
                
                <div className="text-center mb-8 pb-8 border-b border-slate-800/80">
                  <p className="text-sm text-slate-400 font-semibold uppercase tracking-widest mb-2">Total Price</p>
                  <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
                    {event.price === 0 || event.price === 'Free' || !event.price ? 'Free Entry' : `₹${event.price}`}
                  </h2>
                </div>

                <button 
                  onClick={() => toast.success("Redirecting to secure gateway...", { style: { background: '#10B981', color: '#FFF' }})}
                  className="w-full relative overflow-hidden group/btn bg-white text-[#090D16] font-bold text-lg py-5 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:shadow-[0_0_60px_rgba(34,211,238,0.5)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 mb-4"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                  <Ticket className="w-6 h-6 relative z-10" /> 
                  <span className="relative z-10">Claim Your Pass</span>
                </button>
                
                <div className="flex gap-4 mt-6">
                  <button className="flex-1 bg-slate-800/50 hover:bg-slate-700 text-white py-4 rounded-2xl flex justify-center items-center gap-2 text-sm font-bold transition-colors border border-slate-700/50">
                    <Heart className="w-4 h-4" /> Save
                  </button>
                  <button className="flex-1 bg-slate-800/50 hover:bg-slate-700 text-white py-4 rounded-2xl flex justify-center items-center gap-2 text-sm font-bold transition-colors border border-slate-700/50">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default EventDetails;