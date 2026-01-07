
import React from 'react';
import { SCHEMA_DEFINITION } from '../constants';

const SchemaSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Relational Database Schema</h3>
            <p className="text-sm text-slate-500">Normalized structure to simulate Asana's core entity relationships.</p>
          </div>
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
            <i className="fas fa-download mr-2"></i> Export SQL
          </button>
        </div>
        
        <div className="p-0 overflow-x-auto">
          <pre className="p-8 text-sm font-mono text-slate-700 bg-slate-900 text-indigo-300 leading-relaxed">
            {SCHEMA_DEFINITION}
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fas fa-project-diagram text-indigo-500"></i>
            Key Design Decisions
          </h4>
          <ul className="space-y-4 text-sm text-slate-600">
            <li>
              <strong className="text-slate-800 block mb-1">Custom Fields Handling:</strong>
              Implemented using a vertical storage pattern with `custom_field_definitions` and `custom_field_values` to allow per-project flexibility without schema mutations.
            </li>
            <li>
              <strong className="text-slate-800 block mb-1">Task Hierarchy:</strong>
              Self-referencing `parent_task_id` in the `tasks` table supports infinite nesting (subtasks), mirroring Asana's flexible structure.
            </li>
            <li>
              <strong className="text-slate-800 block mb-1">Denormalization Balance:</strong>
              Maintained strict normalization for referential integrity while using timestamps for 'last updated' markers to support RL state snapshots.
            </li>
          </ul>
        </div>
        
        <div className="bg-indigo-900 p-6 rounded-xl text-white shadow-xl shadow-indigo-100">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-shield-halved"></i>
            Data Integrity Rules
          </h4>
          <ul className="space-y-3 text-sm text-indigo-100">
            <li className="flex gap-2">
              <i className="fas fa-check-circle text-indigo-400 mt-1"></i>
              <span>Temporal Consistency: `completed_at` must be null or > `created_at`.</span>
            </li>
             <li className="flex gap-2">
              <i className="fas fa-check-circle text-indigo-400 mt-1"></i>
              <span>Role Hierarchy: Workspace Admins can access all teams; Members restricted to their joined teams.</span>
            </li>
             <li className="flex gap-2">
              <i className="fas fa-check-circle text-indigo-400 mt-1"></i>
              <span>Section Scope: Tasks must belong to a section that is part of the same project.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SchemaSection;
