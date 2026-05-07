import React, { useState } from 'react';
import { 
  Menu, X, MapPin, Phone, Mail, Calendar, 
  BookOpen, Dumbbell, Users, ChevronRight, 
  Building2, HeartHandshake, Image as ImageIcon,
  LayoutDashboard, Megaphone, FileText, Settings, Plus, Edit, Trash2, LogOut, Activity
} from 'lucide-react';

// --- MOCK DATA ---
const mockAnnouncements = [
  "Centenary Year Special: LSS Vasant Vyakhyanmala 2026 scheduled for next month.",
  "Admissions open for Dr. A. V. Baliga Gymnasium - Special batches for ladies.",
  "New extensive collection of Marathi literature added to Shree P. V. Dixit Library."
];

const mockEvents = [
  { id: 1, title: "Vasant Vyakhyanmala", date: "2026-05-15", venue: "Tilak Mandir, Main Hall", status: "Upcoming" },
  { id: 2, title: "Lokmanya Tilak Punyatithi", date: "2026-08-01", venue: "LSS Ground", status: "Planning" },
  { id: 3, title: "Sarvajanik Ganeshotsav", date: "2026-09-07", venue: "Tilak Mandir Sabhagriha", status: "Planning" }
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
          <p className="mb-2 font-bold text-white">Lokamanya Seva Sangh</p>
          <p className="mb-6">Tilak Mandir, Ram Mandir Road, Vile Parle (East), Mumbai - 400057</p>
          <p>&copy; 2026 LSS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function HomeView({ navigateTo }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">100+ Years of Social Excellence</h2>
          <p className="text-xl text-slate-300 mb-8">Continuing the vision of Lokmanya Bal Gangadhar Tilak through culture, education, and social service since 1923.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigateTo('events')} className="bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-full font-bold transition-all shadow-lg">Explore Programs</button>
            <button onClick={() => navigateTo('about')} className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 rounded-full font-bold transition-all shadow-lg">Our History</button>
          </div>
        </div>
      </section>

      {/* Announcements Bar */}
      <div className="bg-orange-100 border-y border-orange-200 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <Megaphone className="text-orange-600 mr-3 shrink-0" size={20} />
          <div className="overflow-hidden whitespace-nowrap">
            <p className="inline-block animate-marquee font-medium text-orange-900">
              {mockAnnouncements.join(" ••• ")}
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-6">Our Legacy</h3>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Established on 25th March 1923, Lokamanya Seva Sangh (LSS) is the cultural and social heartbeat of Vile Parle. Founded by devoted followers of Lokmanya Tilak, we have dedicated over a century to empowering the community through educational programs, health services, physical fitness, and the preservation of Marathi literature and arts.
          </p>
        </div>
      </section>

      {/* Facilities Cards */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">Key Facilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <BookOpen className="text-orange-500 mb-4" size={40} />
              <h4 className="text-xl font-bold mb-2">Shree P. V. Dixit Library</h4>
              <p className="text-slate-600 text-sm">A vast collection of over 70,000 books, providing a haven for readers, researchers, and students.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <Dumbbell className="text-orange-500 mb-4" size={40} />
              <h4 className="text-xl font-bold mb-2">Dr. A. V. Baliga Gymnasium</h4>
              <p className="text-slate-600 text-sm">Promoting physical fitness with modern equipment and traditional Indian exercise techniques.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <Activity className="text-orange-500 mb-4" size={40} />
              <h4 className="text-xl font-bold mb-2">Medical & Health Centre</h4>
              <p className="text-slate-600 text-sm">Providing accessible healthcare, pathological labs, and specialist consultations to the community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Events Preview */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-3xl font-bold text-slate-900">Featured Events</h3>
            <button onClick={() => navigateTo('events')} className="text-orange-600 font-bold hover:underline hidden md:block">View All Events &rarr;</button>
          </div>
          <div className="space-y-4">
            {mockEvents.map(event => (
              <div key={event.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{event.title}</h4>
                  <p className="text-slate-500 text-sm flex items-center mt-1"><Calendar size={14} className="mr-1"/> {event.date} | <MapPin size={14} className="ml-3 mr-1"/> {event.venue}</p>
                </div>
                <button className="mt-4 md:mt-0 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded font-medium hover:bg-slate-100">Details</button>
              </div>
            ))}
          </div>
        </div>
      </section>
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
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-wider text-orange-500">LSS ADMIN</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={18} />
            <span className="font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('events')} 
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'events' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Calendar size={18} />
            <span className="font-medium">Manage Events</span>
          </button>
          <button 
            onClick={() => setActiveTab('announcements')} 
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'announcements' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Megaphone size={18} />
            <span className="font-medium">Announcements</span>
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => setAppView('public')} className="w-full flex items-center justify-center space-x-2 bg-slate-800 text-slate-300 hover:bg-slate-700 py-3 rounded-xl transition-all font-bold">
            <LogOut size={18} /> <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm px-8 py-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 capitalize">{activeTab} Control Center</h2>
        </header>
        
        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-slate-500 font-medium mb-1">Total Events</p>
                <h3 className="text-3xl font-bold text-slate-900">{mockEvents.length}</h3>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-slate-500 font-medium mb-1">Active Announcements</p>
                <h3 className="text-3xl font-bold text-slate-900">{mockAnnouncements.length}</h3>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-slate-500 font-medium mb-1">Database Status</p>
                <h3 className="text-xl font-bold text-green-600 mt-2 flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span> Connected</h3>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-800">All Scheduled Events</h3>
                <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center"><Plus size={16} className="mr-1"/> Add Event</button>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200 text-sm text-slate-500">
                    <th className="p-4 font-medium">Event Title</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Venue</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockEvents.map(event => (
                    <tr key={event.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900">{event.title}</td>
                      <td className="p-4 text-slate-600">{event.date}</td>
                      <td className="p-4 text-slate-600">{event.venue}</td>
                      <td className="p-4 flex space-x-2">
                        <button className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={18}/></button>
                        <button className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-800">Scrolling Marquee Banner</h3>
                <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center"><Plus size={16} className="mr-1"/> Add New</button>
              </div>
              <div className="p-4 space-y-4">
                {mockAnnouncements.map((announcement, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-slate-800">{announcement}</p>
                    <button className="text-red-600 hover:bg-red-100 p-2 rounded ml-4 shrink-0"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}