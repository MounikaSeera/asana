
import React from 'react';

const MethodologySection: React.FC = () => {
  const strategies = [
    {
      table: 'users',
      strategies: [
        { col: 'user_id', type: 'UUID', strategy: 'Generated', desc: 'UUIDv4 to simulate GID format.' },
        { col: 'name', type: 'TEXT', strategy: 'Census-based', desc: 'Generated via LLM using census data for realistic demographic distribution.' },
        { col: 'role', type: 'TEXT', strategy: 'Industry Distribution', desc: '80% ICs, 15% Managers, 5% Leadership based on SaaS team ratios.' },
      ]
    },
    {
      table: 'tasks',
      strategies: [
        { col: 'name', type: 'TEXT', strategy: 'LLM + Templates', desc: 'Pattern-matched names (e.g., "[Backend] - Implement API Auth") derived from GitHub issues.' },
        { col: 'due_date', type: 'DATE', strategy: 'Distribution Heuristic', desc: '25% within 1wk, 40% 1mo, 10% no due date. Weekend-aware.' },
        { col: 'assignee_id', type: 'TEXT', strategy: 'Workload-weighted', desc: 'Assigned based on team membership; 15% unassigned (Asana benchmark).' },
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
      <section>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800">Seed Data Strategy</h3>
          <p className="text-slate-500">Our methodology combines real-world distribution research with LLM-powered context generation.</p>
        </div>

        <div className="space-y-8">
          {strategies.map((group) => (
            <div key={group.table} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                <h4 className="font-mono text-indigo-600 font-bold uppercase tracking-wider">Table: {group.table}</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-3 border-b border-slate-200">Column</th>
                      <th className="px-6 py-3 border-b border-slate-200">Type</th>
                      <th className="px-6 py-3 border-b border-slate-200">Source Strategy</th>
                      <th className="px-6 py-3 border-b border-slate-200">Methodology & Justification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {group.strategies.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 font-mono text-slate-800">{s.col}</td>
                        <td className="px-6 py-4 text-slate-500">{s.type}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{s.strategy}</td>
                        <td className="px-6 py-4 text-slate-600 leading-relaxed">{s.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Real-World Benchmarks Used</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-indigo-600 mb-2"><i className="fas fa-clock text-2xl"></i></div>
            <h5 className="font-bold text-slate-800 mb-2">Cycle Time Distribution</h5>
            <p className="text-sm text-slate-500">Logged task completion follows a log-normal distribution (1-14 days) based on Lean management studies.</p>
          </div>
          <div>
            <div className="text-pink-600 mb-2"><i className="fas fa-users text-2xl"></i></div>
            <h5 className="font-bold text-slate-800 mb-2">Team Composition</h5>
            <p className="text-sm text-slate-500">Engineering teams utilize a 7±2 size rule, while Marketing teams are modeled with higher role variability.</p>
          </div>
          <div>
            <div className="text-amber-600 mb-2"><i className="fas fa-calendar-check text-2xl"></i></div>
            <h5 className="font-bold text-slate-800 mb-2">Task Volatility</h5>
            <p className="text-sm text-slate-500">10% of tasks are deleted or archived within 48h, representing 'ideation churn' in real workflows.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MethodologySection;
