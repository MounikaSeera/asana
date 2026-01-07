
import React, { useState, useEffect } from 'react';
import { SimulationConfig, GenerationStatus, User, Team, Project, Task, Section } from '../types';
import { DEPARTMENTS, PROJECT_TYPES, SECTION_TEMPLATES } from '../constants';
import { generateUserNames, generateRealisticTasks } from '../services/geminiService';

interface GeneratorDashboardProps {
  onComplete: (data: {
    users: User[];
    teams: Team[];
    projects: Project[];
    sections: Section[];
    tasks: Task[];
  }) => void;
}

const GeneratorDashboard: React.FC<GeneratorDashboardProps> = ({ onComplete }) => {
  const [config, setConfig] = useState<SimulationConfig>({
    companyName: 'Lumina SaaS',
    employeeCount: 50, // Reduced for demo speed
    timeframeMonths: 6,
  });

  const [status, setStatus] = useState<GenerationStatus>({
    step: 'Idle',
    progress: 0,
    logs: ['Waiting for configuration...'],
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const addLog = (msg: string) => {
    setStatus(prev => ({ ...prev, logs: [msg, ...prev.logs].slice(0, 50) }));
  };

  const runSimulation = async () => {
    setIsGenerating(true);
    setStatus({ step: 'Initializing', progress: 5, logs: ['Simulation started...'] });

    try {
      // 1. Generate Teams
      setStatus({ step: 'Generating Teams', progress: 10, logs: ['Creating organizational structure...'] });
      const teams: Team[] = DEPARTMENTS.map((dept, i) => ({
        id: `team-${i}`,
        name: `${dept} Core Team`,
        department: dept
      }));
      addLog(`Created ${teams.length} primary departments.`);

      // 2. Generate Users via Gemini
      setStatus({ step: 'Seeding Users', progress: 25, logs: ['Fetching realistic identity data from Gemini...'] });
      const names = await generateUserNames(config.employeeCount);
      const users: User[] = names.map((name, i) => ({
        id: `user-${i}`,
        name,
        email: `${name.toLowerCase().replace(' ', '.')}@${config.companyName.toLowerCase().replace(' ', '')}.com`,
        role: i % 5 === 0 ? 'Manager' : 'Contributor',
        team_id: teams[i % teams.length].id
      }));
      addLog(`Provisioned ${users.length} unique user identities.`);

      // 3. Generate Projects
      setStatus({ step: 'Building Projects', progress: 45, logs: ['Mapping workflows to projects...'] });
      const projects: Project[] = [];
      teams.forEach((team) => {
        const types = PROJECT_TYPES[team.department];
        types.slice(0, 2).forEach((name, idx) => {
          projects.push({
            id: `proj-${team.id}-${idx}`,
            name,
            team_id: team.id,
            status: 'Active'
          });
        });
      });
      addLog(`Defined ${projects.length} strategic projects.`);

      // 4. Generate Sections
      const sections: Section[] = [];
      projects.forEach(proj => {
        const template = SECTION_TEMPLATES.Kanban;
        template.forEach((name, idx) => {
          sections.push({
            id: `sec-${proj.id}-${idx}`,
            name,
            project_id: proj.id
          });
        });
      });
      addLog(`Sectioned projects into Kanban swimlanes.`);

      // 5. Generate Tasks via Gemini (Sample for a few projects to keep it fast)
      setStatus({ step: 'Generating Tasks', progress: 70, logs: ['Synthesizing realistic tasks with Gemini reasoning...'] });
      const allTasks: Task[] = [];
      const now = new Date();
      
      // We'll generate for the first project as a sample
      const sampleProject = projects[0];
      const dept = teams.find(t => t.id === sampleProject.team_id)?.department || 'Engineering';
      const geminiTasks = await generateRealisticTasks(sampleProject.name, dept, 12);
      
      geminiTasks.forEach((gt, i) => {
        const createdDate = new Date(now.getTime() - (Math.random() * 30 * 24 * 60 * 60 * 1000));
        const completed = Math.random() > 0.4;
        const completedAt = completed ? new Date(createdDate.getTime() + (Math.random() * 5 * 24 * 60 * 60 * 1000)) : null;

        allTasks.push({
          id: `task-${i}`,
          name: gt.name,
          description: gt.description,
          project_id: sampleProject.id,
          section_id: sections.find(s => s.project_id === sampleProject.id)?.id || '',
          assignee_id: users[Math.floor(Math.random() * users.length)].id,
          due_date: new Date(now.getTime() + (Math.random() * 14 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
          created_at: createdDate.toISOString(),
          completed,
          completed_at: completedAt ? completedAt.toISOString() : null
        });
      });
      addLog(`Generated ${allTasks.length} high-fidelity tasks for ${sampleProject.name}.`);

      setStatus({ step: 'Finalizing', progress: 100, logs: ['Simulation data ready! Syncing to browser storage...'] });
      setIsGenerating(false);
      
      onComplete({ users, teams, projects, sections, tasks: allTasks });

    } catch (err) {
      console.error(err);
      setStatus(prev => ({ ...prev, step: 'Error', logs: [`Error: ${String(err)}`, ...prev.logs] }));
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in zoom-in-95 duration-300">
      {/* Configuration Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fas fa-sliders-h text-indigo-500"></i>
            Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Company Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                value={config.companyName}
                onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                disabled={isGenerating}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Employee Count ({config.employeeCount})</label>
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                className="w-full accent-indigo-600"
                value={config.employeeCount}
                onChange={(e) => setConfig({ ...config, employeeCount: parseInt(e.target.value) })}
                disabled={isGenerating}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Timeframe (Months)</label>
              <select
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={config.timeframeMonths}
                onChange={(e) => setConfig({ ...config, timeframeMonths: parseInt(e.target.value) })}
                disabled={isGenerating}
              >
                <option value={3}>3 Months</option>
                <option value={6}>6 Months</option>
                <option value={12}>12 Months</option>
              </select>
            </div>
            <button
              onClick={runSimulation}
              disabled={isGenerating}
              className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition-all ${
                isGenerating ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
              }`}
            >
              {isGenerating ? (
                <><i className="fas fa-circle-notch fa-spin mr-2"></i> Generating...</>
              ) : (
                'Run Simulation'
              )}
            </button>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
           <h4 className="font-bold text-indigo-800 mb-2">Simulation Engine</h4>
           <p className="text-sm text-indigo-600 leading-relaxed">
             This module utilizes Gemini 3.0 Flash to synthesize realistic entity metadata. 
             It strictly enforces temporal logic (e.g., creation dates precede completion) 
             and organizational hierarchies.
           </p>
        </div>
      </div>

      {/* Progress & Logs Panel */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
          <div className="flex justify-between items-center mb-6">
             <div>
                <h3 className="font-bold text-slate-800">Generation Pipeline</h3>
                <p className="text-sm text-slate-500">{status.step}</p>
             </div>
             <span className="text-2xl font-black text-indigo-600">{status.progress}%</span>
          </div>
          
          <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${status.progress}%` }}
            ></div>
          </div>

          <div className="flex-1 bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
            {status.logs.map((log, i) => (
              <div key={i} className="mb-1">
                <span className="text-emerald-500">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-slate-300 ml-3">{log}</span>
              </div>
            ))}
            {isGenerating && (
                <div className="flex items-center gap-2 text-indigo-400 mt-2">
                    <span className="animate-pulse">_</span>
                    <span className="text-xs uppercase tracking-widest">Processing</span>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorDashboard;
