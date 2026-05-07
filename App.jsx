import React, { useState } from 'react';
import { 
  Menu, X, MapPin, Phone, Mail, Calendar, 
  BookOpen, Dumbbell, Activity, Megaphone, 
  LayoutDashboard, Settings, Plus, Edit, Trash2, LogOut
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col relative">
      {/* Top Info Bar - Stacked on mobile, row on desktop */}
      <div className="bg-orange-600 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><Phone size={12} className="mr-1"/> (022) 3511 2989</span>
            <span className="flex items-center"><Mail size={12} className="mr-1"/> info@lssparle.org.in</span>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => setAppView('admin')} className="hover:bg-orange-800 transition-colors flex items-center bg-orange-700 px-3 py-1 rounded-full font-medium">
               Admin Login
            </button>
            <span className="opacity-50">|</span>
            <button className="hover:underline font-bold text-orange-100">Donate Now</button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo Area */}
            <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-500 mr-3 shrink-0">
                <span className="text-orange-600 font-bold text-lg sm:text-xl">LSS</span>
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-tight">Lokamanya Seva Sangh</h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Tilak Mandir, Vile Parle</p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <NavLink label="Home" active={currentPage === 'home'} onClick={() => navigateTo('home')} />
              <NavLink label="About Us" active={currentPage === 'about'} onClick={() => navigateTo('about')} />
              <NavLink label="Events" active={currentPage === 'events'} onClick={() => navigateTo('events')} />
              <button onClick={() => navigateTo('contact')} className="bg-orange-600 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-700 transition-colors shadow-sm">
                Contact Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-700 hover:text-orange-600 focus:outline-none p-2">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-t border-slate-100 shadow-xl z-40 flex flex-col">
            <MobileNavLink label="Home" active={currentPage === 'home'} onClick={() => navigateTo('home')} />
            <MobileNavLink label="About Us" active={currentPage === 'about'} onClick={() => navigateTo('about')} />
            <MobileNavLink label="Events" active={currentPage === 'events'} onClick={() => navigateTo('events')} />
            <div className="p-4 border-t border-slate-50">
              <button onClick={() => navigateTo('contact')} className="w-full bg-orange-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-sm text-center">
                Contact Us
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Areas */}
      <main className="flex-grow flex flex-col">
        {currentPage === 'home' && <HomeView navigateTo={navigateTo} />}
        {currentPage === 'about' && <div className="p-10 md:p-20 text-center flex-grow flex flex-col justify-center"><h2 className="text-3xl font-bold">About LSS</h2><p className="mt-4 text-slate-600">Founded in 1923 to carry forward the legacy of Lokmanya Tilak.</p></div>}
        {currentPage === 'events' && <div className="p-10 md:p-20 text-center flex-grow flex flex-col justify-center"><h2 className="text-3xl font-bold">Upcoming Events</h2><p className="mt-4 text-slate-600">Join our community programs and cultural festivals.</p></div>}
        {currentPage === 'contact' && <div className="p-10 md:p-20 text-center flex-grow flex flex-col justify-center"><h2 className="text-3xl font-bold">Contact Us</h2><p className="mt-4 text-slate-600">Ram Mandir Road, Vile Parle (East), Mumbai 400057.</p></div>}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="mb-1 font-bold text-white text-lg">Lokamanya Seva Sangh</p>
            <p className="text-sm">Tilak Mandir, Ram Mandir Road, Vile Parle (East)</p>
          </div>
          <div className="text-sm text-slate-500">
            <p>&copy; 2026 LSS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomeView({ navigateTo }) {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-16 md:py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">100+ Years of Social Excellence</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 px-2 md:px-0">Continuing the vision of Lokmanya Bal Gangadhar Tilak through culture, education, and social service since 1923.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-4 sm:px-0">
            <button onClick={() => navigateTo('events')} className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 px-8 py-3 sm:py-4 rounded-full font-bold transition-all shadow-lg text-sm sm:text-base">Explore Programs</button>
            <button onClick={() => navigateTo('about')} className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 sm:py-4 rounded-full font-bold transition-all shadow-lg text-sm sm:text-base">Our History</button>
          </div>
        </div>
      </section>

      {/* Announcements Bar */}
      <div className="bg-orange-100 border-y border-orange-200 py-3 w-full">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <Megaphone className="text-orange-600 mr-3 shrink-0" size={20} />
          <div className="overflow-hidden whitespace-nowrap w-full">
            <p className="inline-block animate-marquee font-medium text-orange-900 text-sm sm:text-base">
              {mockAnnouncements.join(" ••• ")}
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-12 md:py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6">Our Legacy</h3>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed px-2">
            Established on 25th March 1923, Lokamanya Seva Sangh (LSS) is the cultural and social heartbeat of Vile Parle. Founded by devoted followers of Lokmanya Tilak, we have dedicated over a century to empowering the community through educational programs, health services, physical fitness, and the preservation of Marathi literature and arts.
          </p>
        </div>
      </section>

      {/* Facilities Cards */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-8 md:mb-12">Key Facilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <BookOpen className="text-orange-500 mb-4" size={36} />
              <h4 className="text-lg md:text-xl font-bold mb-2">Shree P. V. Dixit Library</h4>
              <p className="text-slate-600 text-sm leading-relaxed">A vast collection of over 70,000 books, providing a haven for readers, researchers, and students.</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <Dumbbell className="text-orange-500 mb-4" size={36} />
              <h4 className="text-lg md:text-xl font-bold mb-2">Dr. A. V. Baliga Gymnasium</h4>
              <p className="text-slate-600 text-sm leading-relaxed">Promoting physical fitness with modern equipment and traditional Indian exercise techniques.</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <Activity className="text-orange-500 mb-4" size={36} />
              <h4 className="text-lg md:text-xl font-bold mb-2">Medical & Health Centre</h4>
              <p className="text-slate-600 text-sm leading-relaxed">Providing accessible healthcare, pathological labs, and specialist consultations to the community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Events Preview */}
      <section className="py-12 md:py-20 bg-white border-t border-slate-200 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 md:mb-8 gap-4">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Featured Events</h3>
            <button onClick={() => navigateTo('events')} className="text-orange-600 font-bold hover:underline hidden sm:block">View All Events &rarr;</button>
          </div>
          <div className="space-y-4">
            {mockEvents.map(event => (
              <div key={event.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 md:p-6 bg-slate-50 rounded-lg border border-slate-100 gap-4">
                <div className="w-full">
                  <h4 className="text-base md:text-lg font-bold text-slate-900">{event.title}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center mt-2 text-slate-500 text-xs sm:text-sm gap-2 sm:gap-0">
                    <span className="flex items-center"><Calendar size={14} className="mr-1 shrink-0"/> {event.date}</span>
                    <span className="hidden sm:inline mx-3">|</span>
                    <span className="flex items-center"><MapPin size={14} className="mr-1 shrink-0"/> {event.venue}</span>
                  </div>
                </div>
                <button className="w-full md:w-auto bg-white border border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg font-medium hover:bg-slate-100 transition-colors shadow-sm">Details</button>
              </div>
            ))}
          </div>
          <button onClick={() => navigateTo('events')} className="w-full mt-6 text-center text-orange-600 font-bold hover:underline sm:hidden">View All Events &rarr;</button>
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

function MobileNavLink({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`block w-full text-left px-6 py-4 font-medium transition-colors border-b border-slate-50 ${active ? 'text-orange-600 bg-orange-50/50' : 'text-slate-700 hover:bg-slate-50'}`}
    >
      {label}
    </button>
  );
}

// ==========================================
// 2. ADMIN PANEL COMPONENT
// ==========================================
function AdminApp({ setAppView }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar on mobile after clicking
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - Hidden on mobile unless toggled */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 
        w-72 lg:w-64 bg-slate-900 text-white flex flex-col shadow-2xl lg:shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wider text-orange-500">LSS ADMIN</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white p-1">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => handleTabChange('dashboard')} 
            className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => handleTabChange('events')} 
            className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${activeTab === 'events' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Calendar size={20} />
            <span className="font-medium">Manage Events</span>
          </button>
          <button 
            onClick={() => handleTabChange('announcements')} 
            className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${activeTab === 'announcements' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Megaphone size={20} />
            <span className="font-medium">Announcements</span>
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => setAppView('public')} className="w-full flex items-center justify-center space-x-2 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white py-3.5 rounded-xl transition-all font-bold">
            <LogOut size={18} /> <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Mobile Header with Hamburger */}
        <header className="bg-white shadow-sm border-b border-slate-200 px-4 md:px-8 py-4 flex items-center sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden mr-4 text-slate-600 hover:text-orange-600 p-1">
            <Menu size={24} />
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 capitalize truncate">{activeTab} Control Center</h2>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <p className="text-slate-500 font-medium mb-1 text-sm md:text-base">Total Events</p>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{mockEvents.length}</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <p className="text-slate-500 font-medium mb-1 text-sm md:text-base">Active Announcements</p>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{mockAnnouncements.length}</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center sm:col-span-2 xl:col-span-1">
                <p className="text-slate-500 font-medium mb-1 text-sm md:text-base">Database Status</p>
                <div className="flex items-center mt-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg w-max font-bold text-sm">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></span> Connected
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 md:p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 text-lg">All Scheduled Events</h3>
                <button className="w-full sm:w-auto bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center shadow-sm hover:bg-orange-700 transition-colors">
                  <Plus size={18} className="mr-2"/> Add Event
                </button>
              </div>
              {/* Responsive Table Wrapper */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-white border-b border-slate-200 text-sm text-slate-500 uppercase tracking-wider">
                      <th className="p-4 font-bold">Event Title</th>
                      <th className="p-4 font-bold">Date</th>
                      <th className="p-4 font-bold">Venue</th>
                      <th className="p-4 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockEvents.map(event => (
                      <tr key={event.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-bold text-slate-900">{event.title}</td>
                        <td className="p-4 text-slate-600 font-medium">{event.date}</td>
                        <td className="p-4 text-slate-600 text-sm">{event.venue}</td>
                        <td className="p-4 flex space-x-2">
                          <button className="text-blue-600 hover:bg-blue-100 bg-blue-50 p-2 rounded-lg transition-colors"><Edit size={16}/></button>
                          <button className="text-red-600 hover:bg-red-100 bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={16}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 md:p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 text-lg">Scrolling Marquee Banner</h3>
                <button className="w-full sm:w-auto bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center shadow-sm hover:bg-orange-700 transition-colors">
                  <Plus size={18} className="mr-2"/> Add New
                </button>
              </div>
              <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                {mockAnnouncements.map((announcement, index) => (
                  <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50 border border-slate-200 rounded-xl gap-4">
                    <p className="text-slate-800 text-sm md:text-base font-medium leading-relaxed">{announcement}</p>
                    <button className="text-red-600 hover:bg-red-100 bg-white border border-red-100 p-2.5 rounded-lg shrink-0 transition-colors w-full sm:w-auto flex justify-center">
                      <Trash2 size={18}/>
                    </button>
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