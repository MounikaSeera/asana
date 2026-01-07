
import React, { useState } from 'react';
import { User, Team, Project, Task } from '../types';

interface DataBrowserProps {
  data: {
    users: User[];
    teams: Team[];
    projects: Project[];
    tasks: Task[];
  } | null;
}

const DataBrowser: React.FC<DataBrowserProps> = ({ data }) => {
  const [activeTable, setActiveTable] = useState<'users' | 'teams' | 'projects' | 'tasks'>('tasks');

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white border border-dashed border-slate-300 rounded-2xl">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
          <i className="fas fa-database text-3xl"></i>
        </div>
        <h3 className="text-lg font-bold text-slate-800">No data generated yet</h3>
        <p className="text-slate-500">Head over to the Data Generator tab to build your dataset.</p>
      </div>
    );
  }

  const renderTable = () => {
    switch (activeTable) {
      case 'users':
        return (
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.users.map(u => (
                <tr key={u.id} className="text-sm hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-mono text-xs">{u.id}</td>
                  <td className="px-6 py-4 font-medium">{u.name}</td>
                  <td className="px-6 py-4 text-slate-500">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${u.role === 'Manager' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'tasks':
        return (
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Assignee</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.tasks.map(t => (
                <tr key={t.id} className="text-sm hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-500 truncate max-w-xs">{t.description}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {data.users.find(u => u.id === t.assignee_id)?.name || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">{t.due_date}</td>
                  <td className="px-6 py-4">
                    {t.completed ? (
                      <span className="inline-flex items-center gap-1 text-green-600 font-bold text-xs">
                        <i className="fas fa-check-circle"></i> Done
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-600 font-bold text-xs">
                        <i className="fas fa-clock"></i> Active
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return <div className="p-8 text-center text-slate-400">View coming soon...</div>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {(['users', 'teams', 'projects', 'tasks'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTable(tab)}
            className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTable === tab
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            <span className="ml-2 text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
              {(data as any)[tab]?.length || 0}
            </span>
          </button>
        ))}
      </div>
      
      <div className="flex-1 overflow-auto">
        {renderTable()}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
        <span>Rows: {(data as any)[activeTable]?.length}</span>
        <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
          <i className="fas fa-file-export"></i> Export CSV
        </button>
      </div>
    </div>
  );
};

export default DataBrowser;
