
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', icon: 'fa-book', label: 'Overview' },
    { id: 'schema', icon: 'fa-sitemap', label: 'Database Schema' },
    { id: 'methodology', icon: 'fa-flask', label: 'Methodology' },
    { id: 'generator', icon: 'fa-microchip', label: 'Data Generator' },
    { id: 'browser', icon: 'fa-database', label: 'Data Browser' },
    { id: 'submission', icon: 'fa-file-signature', label: 'Final Submission' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <i className="fas fa-layer-group"></i>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">AsanaRL Architect</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <i className={`fas ${tab.icon} w-5`}></i>
              {tab.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
              <i className="fas fa-user-tie"></i>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">Research Scientist</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Internship Assignment</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h2>
          <div className="flex gap-4">
             <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Gemini Powered
            </span>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
              v1.0.4
            </span>
          </div>
        </header>
        
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
