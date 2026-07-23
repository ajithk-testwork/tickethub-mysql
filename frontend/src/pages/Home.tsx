// Home.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-textMain font-sans">
      {/* Top Navigation Bar */}
      <nav className="bg-card border-b border-borderCol px-6 md:px-10 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-primary">Event</span>Center
        </div>
        
        <div className="flex items-center gap-5">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-textMain">{user?.name || 'User Name'}</span>
            <span className="text-xs font-semibold text-primary">{user?.role || 'USER'}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-background border border-borderCol flex items-center justify-center font-bold text-sm text-textMain">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <button 
            onClick={() => { localStorage.clear(); navigate('/login'); }}
            className="text-sm font-medium text-textSecondary hover:text-error transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-6 md:p-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
          <p className="text-textSecondary text-sm">Discover and manage your event bookings.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Event Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-2 bg-card border border-borderCol rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="h-48 bg-borderCol w-full relative">
               <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop" 
                alt="Event Banner" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-4 left-4 bg-card/90 backdrop-blur border border-borderCol text-xs font-semibold px-3 py-1.5 rounded-full text-textMain">
                Technology
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-textMain">Tech Innovators Summit 2026</h3>
                  <span className="text-lg font-bold text-primary">₹1,999</span>
                </div>
                <p className="text-textSecondary text-sm mb-6 leading-relaxed">
                  Join the largest gathering of tech enthusiasts, full-stack developers, and industry leaders. Network with the best in the field.
                </p>
              </div>
              
              <div className="flex justify-between items-center border-t border-borderCol pt-4 mt-auto">
                <div className="text-sm text-textSecondary">
                  <span className="block text-textMain font-medium">15 Oct 2026</span>
                  Chennai, India
                </div>
                <button className="bg-primary hover:bg-secondary text-textMain text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
                  Book Ticket
                </button>
              </div>
            </div>
          </motion.div>

          {/* Side Info Cards */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-card border border-borderCol rounded-2xl p-6"
            >
              <h4 className="text-sm font-medium text-textSecondary mb-4">Your Dashboard</h4>
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-bold text-textMain">3</span>
                <span className="text-sm text-textSecondary mb-1">Active Tickets</span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-background border border-borderCol rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-textMain">React Meetup</p>
                    <p className="text-xs text-success mt-0.5">Confirmed</p>
                  </div>
                  <div className="text-textSecondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-background border border-primary/30 rounded-2xl p-6 text-center"
            >
              <h3 className="text-base font-bold text-textMain mb-1">Host an Event</h3>
              <p className="text-xs text-textSecondary mb-4">Switch to admin controls to create events.</p>
              <button className="w-full bg-card border border-borderCol hover:border-primary text-textMain text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
                Admin Access
              </button>
            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Home;