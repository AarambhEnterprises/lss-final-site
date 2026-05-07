import React, { useState, useEffect } from 'react';
import { 
  Menu, X, MapPin, Phone, Mail, Calendar, 
  BookOpen, Dumbbell, Users, ChevronRight, 
  Building2, HeartHandshake, Image as ImageIcon,
  LayoutDashboard, Megaphone, FileText, Settings, Plus, Edit, Trash2, LogOut
} from 'lucide-react';

// --- MOCK DATA ---
const mockAnnouncements = [
  "Centenary Year Special: LSS Vasant Vyakhyanmala 2026 scheduled for next month.",
  "Admissions open for Dr. A. V. Baliga Gymnasium - Special batches for ladies.",
  "New extensive collection of Marathi literature added to Shree P. V. Dixit Library."
];

const mockEvents = [
  { id: 1, title: "Vasant Vyakhyanmala", date: "2026-05-15", venue: "Tilak Mandir, Main Hall", desc: "Annual spring lecture series featuring prominent thinkers, authors, and social workers.", imgUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80" },
  { id: 2, title: "Lokmanya Tilak Punyatithi", date: "2026-08-01", venue: "LSS Ground", desc: "Tribute to Lokmanya Tilak with cultural programs and social service initiatives.", imgUrl: "https://images.unsplash.com/photo-1521622340576-a07e4d8fb875?auto=format&fit=crop&w=600&q=80" },
  { id: 3, title: "Sarvajanik Ganeshotsav", date: "2026-09-07", venue: "Tilak Mandir Sabhagriha", desc: "Traditional Ganeshotsav celebration focusing on eco-friendly idols and cultural roots.", imgUrl: "https://images.unsplash.com/photo-1566810237731-155ce8c8e1d5?auto=format&fit=crop&w=600&q=80" }
];

// --- MAIN APP ROUTER ---
export default function App() {
  const [currentAppView, setCurrentAppView] = useState('public');

  if (currentAppView === 'admin') {
    return <AdminApp setAppView={setCurrentAppView} />;
  }

  return <PublicWebsite setAppView={setCurrentAppView} />;
}

// ==========================================
// 1. PUBLIC WEBSITE COMPONENT
// ==========================================
function PublicWebsite({ setAppView }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* Top Info Bar */}
      <div className="bg-orange-600 text-white text-xs md:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><Phone size={14} className="mr-1"/> (022) 3511 2989</span>
            <span className="flex items-center"><Mail size={14} className="mr-1"/> info@lssparle.org.in</span>
          </div>
          <div className="flex space-x-3">
            <button onClick={() => setAppView('admin')} className="hover:underline flex items-center bg-orange-700 px-2 py-1 rounded">
               Admin Login
            </button>
            <span className="py-1">|</span>
            <button className="hover:underline font-semibold text-orange-100 py-1">Donate Now</button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-500 mr-3">
                <span className="text-orange-600 font-bold text-xl">LSS</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">Lokamanya Seva Sangh</h1>
                <p className="text-sm text-slate-500 font-medium">Tilak Mandir, Vile Parle</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <NavLink label="Home" active={currentPage === 'home'} onClick={() => navigateTo('home')} />
              <NavLink label="About Us" active={currentPage === 'about'} onClick={() => navigateTo('about')} />
              <NavLink label="Events" active={currentPage === 'events'} onClick={() => navigateTo('events')} />
              <button onClick={() => navigateTo('contact')} className="bg-orange-600 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-700 transition-colors shadow-sm">
                Contact Us
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 focus:outline-none">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {currentPage === 'home' && <HomeView navigateTo={navigateTo} />}
        {currentPage === 'about' && <div className="p-20 text-center"><h2 className="text-3xl font-bold">About LSS</h2><p className="mt-4">Founded in 1923 to carry forward the legacy of Lokmanya Tilak.</p></div>}
        {currentPage === 'events' && <div className="p-20 text-center"><h2 className="text-3xl font-bold">Upcoming Events</h2><p className="mt-4">Join our community programs and cultural festivals.</p></div>}
        {currentPage === 'contact' && <div className="p-20 text-center"><h2 className="text-3xl font-bold">Contact Us</h2><p className="mt-4">Ram Mandir Road, Vile Parle (East), Mumbai 400057.</p></div>}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2">Lokamanya Seva Sangh, Tilak Mandir, Vile Parle (East), Mumbai</p>
          <p>&copy; 2026 LSS. Designed for Lokmanya Seva Sangh.</p>
        </div>
      </footer>
    </div>
  );
}

function HomeView({ navigateTo }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">100+ Years of Social Excellence</h2>
          <p className="text-xl text-slate-300 mb-8">Continuing the vision of Lokmanya Bal Gangadhar Tilak through culture, education, and service.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigateTo('events')} className="bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-full font-bold transition-all">Explore Programs</button>
            <button onClick={() => navigateTo('about')} className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 rounded-full font-bold transition-all">Our History</button>
          </div>
        </div>
      </section>

      {/* Announcements Bar */}
      <div className="bg-orange-100 border-y border-orange-200 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <Megaphone className="text-orange-600 mr-3 shrink-0" size={20} />
          <div className="overflow-hidden whitespace-nowrap">
            <p className="inline-block animate-marquee font-medium text-orange-900">
              {mockAnnouncements.join(" • ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={`font-medium transition-colors border-b-2 py-1 ${active ? 'text-orange-600 border-orange-600' : 'text-slate-600 border-transparent hover:text-orange-600'}`}>
      {label}
    </button>
  );
}

// ==========================================
// 2. ADMIN PANEL COMPONENT
// ==========================================
function AdminApp({ setAppView }) {
  const [user, setUser] = useState({ uid: 'demo-admin', email: 'admin@lssparle.org' }); 

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-wider text-orange-500">LSS ADMIN</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="bg-slate-800 p-3 rounded-lg flex items-center space-x-3 cursor-pointer">
            <LayoutDashboard size={18} />
            <span className="font-medium">Dashboard</span>
          </div>
          <div className="p-3 flex items-center space-x-3 text-slate-400 hover:text-white cursor-not-allowed">
            <Calendar size={18} />
            <span>Manage Events</span>
          </div>
          <div className="p-3 flex items-center space-x-3 text-slate-400 hover:text-white cursor-not-allowed">
            <Megaphone size={18} />
            <span>Announcements</span>
          </div>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => setAppView('public')} className="w-full flex items-center justify-center space-x-2 bg-red-900/30 text-red-400 hover:bg-red-900/50 py-3 rounded-xl transition-all font-bold">
            <LogOut size={18} /> <span>Exit Admin</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm px-8 py-6">
          <h2 className="text-2xl font-bold text-slate-800">Control Center</h2>
        </header>
        <div className="p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center max-w-2xl mx-auto mt-12">
            <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Settings size={40} className="animate-spin-slow" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Welcome, Administrator</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              The backend infrastructure for Lokmanya Seva Sangh is now active. 
              The Cloud Database connection is ready to be linked for dynamic event management.
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Status</p>
                <p className="text-green-600 font-bold flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Online</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">User ID</p>
                <p className="text-slate-900 font-bold">LSS-ADMIN-01</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}