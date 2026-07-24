import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut, Ticket, CheckCircle2, 
  Sparkles, Crown, Loader2
} from 'lucide-react';
import API from '../api/axios'; 
import toast from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Check Auth
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }

  // 2. Fetch Events from API
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        // Updated route based on your Postman history
        const res = await API.get('/event/events'); 
        
        // Your backend sends { success: true, message: "...", data: [...] }
        // So we need to set state using res.data.data
        setEvents(res.data.data); 
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load events", {
          style: { background: '#EF4444', color: '#FFF' }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-[#090D16] text-white font-sans selection:bg-cyan-500/30 pb-20">
      {/* Background Ambience */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#090D16]/80 backdrop-blur-xl border-b border-slate-800/80 px-6 md:px-10 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-extrabold tracking-tight cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Ticket className="w-4 h-4 text-white -rotate-12" />
          </div>
          <span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Event</span>
            <span className="text-white">Center</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-200">{user?.name || 'User Name'}</span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-400 flex items-center gap-1">
              {user?.role === 'ADMIN' && <Crown className="w-3 h-3" />}
              {user?.role || 'USER'}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center font-bold text-sm text-white shadow-inner">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="group flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-red-400 transition-colors">
            <span className="hidden sm:inline">Logout</span>
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Main Layout */}
      <main className="relative max-w-7xl mx-auto p-6 md:p-10 z-10">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-cyan-400 text-xs font-semibold mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Explore the Future
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Upcoming Events
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl">
            Discover, book, and manage your access to exclusive summits worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Event Cards Grid */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 border border-slate-800 border-dashed rounded-3xl bg-slate-900/30">
                <Loader2 className="w-8 h-8 text-cyan-500 animate-spin mb-4" />
                <p className="text-slate-400 font-medium">Fetching live events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 border border-slate-800 border-dashed rounded-3xl bg-slate-900/30">
                <Ticket className="w-10 h-10 text-slate-600 mb-4" />
                <p className="text-slate-400 font-medium">No events found at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {events.map((event, index) => (
                  <motion.div 
                    key={event._id || event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => navigate(`/event/${event._id || event.id}`)}
                    className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-xl hover:shadow-cyan-500/20 hover:shadow-2xl transition-all duration-500 aspect-[4/3] sm:aspect-[3/4] md:aspect-square border border-slate-800"
                  >
                    {/* Background Image Banner */}
                    <img 
                      src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop'} 
                      alt={event.title || event.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                    />
                    
                    {/* Dark Vignette Overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Only Name / Title Displayed */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-extrabold text-white tracking-tight line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
                        {event.title || event.name}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Side Info Cards */}
          <div className="flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6">Your Passes</h4>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-extrabold text-white">0</span>
                <span className="text-sm font-medium text-slate-400">Active Tickets</span>
              </div>
              <div className="text-xs text-slate-500 text-center border border-slate-800 border-dashed rounded-xl p-4">
                No active bookings yet.
              </div>
            </motion.div>

            {user?.role === 'ADMIN' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 to-cyan-500/40">
                <div className="bg-[#0b1120] backdrop-blur-xl rounded-[23px] p-6 text-center">
                  <Crown className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Host an Event</h3>
                  <button onClick={() => navigate('/admin/dashboard')} className="w-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-all mt-4">Access Admin Panel</button>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Home;