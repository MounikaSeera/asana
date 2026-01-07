
import React, { useState } from 'react';
import Layout from './components/Layout';
import SchemaSection from './components/SchemaSection';
import MethodologySection from './components/MethodologySection';
import GeneratorDashboard from './components/GeneratorDashboard';
import DataBrowser from './components/DataBrowser';
import SubmissionSection from './components/SubmissionSection';
import { User, Team, Project, Task, Section } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [simData, setSimData] = useState<{
    users: User[];
    teams: Team[];
    projects: Project[];
    sections: Section[];
    tasks: Task[];
  } | null>(null);

  const handleGenerationComplete = (data: any) => {
    setSimData(data);
    setActiveTab('browser');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/asana/1200/400" 
                className="w-full h-full object-cover brightness-[0.4]"
                alt="Banner"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
                <span className="text-indigo-400 font-bold uppercase tracking-[0.2em] mb-2">Internal Assignment</span>
                <h1 className="text-4xl font-black mb-4">Creating High-Quality Seed Data <br/> for Asana RL Environment</h1>
                <p className="max-w-2xl text-slate-300">
                  A comprehensive methodology for generating enterprise-grade synthetic datasets to evaluate 
                  and fine-tune computer-use AI agents in complex project management workflows.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                    <i className="fas fa-database text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">Robust Schema</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    A fully normalized SQLite-ready relational structure supporting organizations, 
                    nested tasks, custom fields, and real-time collaboration signals.
                  </p>
               </div>
               <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                    <i className="fas fa-robot text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">LLM Synthesis</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Uses Gemini 3.0 to generate semantic, contextually relevant task names and 
                    descriptions that avoid common synthetic patterns like "Task 1".
                  </p>
               </div>
               <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
                    <i className="fas fa-chart-line text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">Real Distributions</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Based on Asana's "Anatomy of Work" research, we simulate realistic 
                    completion rates, due date patterns, and team workloads.
                  </p>
               </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-10 text-white flex flex-col md:flex-row items-center gap-10">
               <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Ready to build the environment?</h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Configure your target organization size and timeframe, then run the simulation engine 
                    to generate a high-fidelity dataset ready for training RL agents.
                  </p>
                  <button 
                    onClick={() => setActiveTab('generator')}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold transition-colors shadow-lg shadow-indigo-500/20"
                  >
                    Launch Generator
                  </button>
               </div>
               <div className="w-full md:w-1/3 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">System Status</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-xs">API Connectivity</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-xs">Model Availability (Gemini 3)</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-xs">Sandbox Mode</span>
                        <span className="text-[10px] font-bold text-amber-500 uppercase">Active</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'schema':
        return <SchemaSection />;
      case 'methodology':
        return <MethodologySection />;
      case 'generator':
        return <GeneratorDashboard onComplete={handleGenerationComplete} />;
      case 'browser':
        return <DataBrowser data={simData} />;
      case 'submission':
        return <SubmissionSection />;
      default:
        return <div>Tab under construction...</div>;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
