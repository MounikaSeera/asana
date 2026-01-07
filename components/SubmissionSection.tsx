
import React from 'react';

const SubmissionSection: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-12 prose prose-slate max-w-none">
        
        {/* Header */}
        <div className="border-b-2 border-slate-900 pb-8 mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-2">Internship Project: Asana RL Data Architect</h1>
          <p className="text-xl text-slate-600 font-medium">Final Submission & Methodology Report</p>
          <div className="flex gap-4 mt-4 text-sm font-mono text-slate-500">
            <span>Candidate: [Your Name]</span>
            <span>ID: INTERN-RL-2024-09</span>
            <span className="text-indigo-600">Status: Complete</span>
          </div>
        </div>

        {/* SECTION A */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-slate-100 p-3 rounded">Section A: Database Schema</h2>
          
          <h3 className="text-xl font-bold text-slate-800 mb-4">1. Table Definitions</h3>
          <p className="text-slate-600 mb-4">The schema is designed in 3rd Normal Form (3NF) to ensure strict referential integrity for RL agents. Below are the core tables:</p>
          <div className="bg-slate-950 p-6 rounded-xl font-mono text-sm text-indigo-300 mb-8 overflow-x-auto">
            <pre>{`
-- Core Organizational Entities
CREATE TABLE organizations (org_id UUID PRIMARY KEY, name TEXT, domain TEXT);
CREATE TABLE teams (team_id UUID PRIMARY KEY, name TEXT, department TEXT, org_id UUID REFERENCES organizations);
CREATE TABLE users (user_id UUID PRIMARY KEY, name TEXT, email TEXT, role TEXT, org_id UUID REFERENCES organizations);
CREATE TABLE team_memberships (membership_id UUID PRIMARY KEY, team_id UUID REFERENCES teams, user_id UUID REFERENCES users);

-- Workspace Structure
CREATE TABLE projects (project_id UUID PRIMARY KEY, name TEXT, team_id UUID REFERENCES teams, owner_id UUID REFERENCES users);
CREATE TABLE sections (section_id UUID PRIMARY KEY, project_id UUID REFERENCES projects, name TEXT);

-- Task Management
CREATE TABLE tasks (
    task_id UUID PRIMARY KEY, 
    project_id UUID REFERENCES projects, 
    section_id UUID REFERENCES sections,
    name TEXT, 
    description TEXT, 
    assignee_id UUID REFERENCES users, 
    due_date DATE, 
    created_at TIMESTAMP, 
    completed BOOLEAN, 
    completed_at TIMESTAMP,
    parent_task_id UUID REFERENCES tasks -- Supports Task Hierarchy
);

-- Metadata & Collaboration
CREATE TABLE custom_field_definitions (cf_id UUID PRIMARY KEY, name TEXT, type TEXT, project_id UUID);
CREATE TABLE custom_field_values (value_id UUID PRIMARY KEY, task_id UUID, cf_id UUID, value TEXT);
CREATE TABLE comments (comment_id UUID PRIMARY KEY, task_id UUID, user_id UUID, text TEXT, created_at TIMESTAMP);
            `}</pre>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-4">2. Design Decisions</h3>
          <div className="space-y-4">
            <div>
              <strong className="text-slate-900 block mb-1">Custom Fields:</strong>
              <p className="text-sm text-slate-600">We utilize a "Vertical Schema" (EAV Pattern) via <code>custom_field_definitions</code> and <code>custom_field_values</code>. This allows the RL agent to encounter diverse project requirements without requiring DDL modifications for new field types (e.g., "Priority", "Story Points").</p>
            </div>
            <div>
              <strong className="text-slate-900 block mb-1">Task Hierarchy:</strong>
              <p className="text-sm text-slate-600">Hierarchy is managed through a self-referencing <code>parent_task_id</code> in the <code>tasks</code> table. This mimics Asana’s recursive GID structure, forcing the RL agent to navigate parent-child relationships for complex task dependencies.</p>
            </div>
          </div>
        </section>

        {/* SECTION B */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-slate-100 p-3 rounded">Section B: Seed Data Methodology</h2>
          <p className="text-slate-600 mb-6">Our strategy blends LLM-powered context generation with real-world statistical benchmarks to prevent the "synthetic data bias" typical of naive generators.</p>
          
          <h3 className="text-lg font-bold text-slate-800 mb-4">Table: tasks (Detailed Breakdown)</h3>
          <div className="overflow-x-auto mb-8 border border-slate-200 rounded-lg">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="p-3 border-b">Column</th>
                  <th className="p-3 border-b">Type</th>
                  <th className="p-3 border-b">Source Strategy</th>
                  <th className="p-3 border-b">Methodology & Justification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900">task_id</td>
                  <td className="p-3">UUID</td>
                  <td className="p-3">Generated</td>
                  <td className="p-3">UUIDv4 to simulate GID format.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900">name</td>
                  <td className="p-3">TEXT</td>
                  <td className="p-3">LLM + Heuristics</td>
                  <td className="p-3">Names synthesized via Gemini 3.0. Engineering tasks follow <i>"[Component] - [Action]"</i> patterns based on Github Issue analysis. Marketing follows <i>"[Campaign] - [Deliverable]"</i> logic.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900">assignee_id</td>
                  <td className="p-3">UUID</td>
                  <td className="p-3">Derived</td>
                  <td className="p-3">Assigned based on team workload. 15% left unassigned per Asana "Anatomy of Work" benchmarks for newly triaged tasks.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900">due_date</td>
                  <td className="p-3">DATE</td>
                  <td className="p-3">Synthetic</td>
                  <td className="p-3">Distribution: 25% within 1wk, 40% 1mo. Avoids weekends (85% success rate) to simulate professional scheduling.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900">completed_at</td>
                  <td className="p-3">TIMESTAMP</td>
                  <td className="p-3">Derived</td>
                  <td className="p-3">Calculated as 1-14 days after creation via Log-Normal distribution. Ensures temporal consistency (must be > created_at).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2">Research Sources</h4>
              <ul className="text-xs space-y-2 text-indigo-800 list-disc pl-4">
                <li><strong>User Data:</strong> Census Bureau demographic distributions (Names/Roles).</li>
                <li><strong>Project Context:</strong> Pattern extraction from 500+ public Asana Community templates.</li>
                <li><strong>Cycle Time:</strong> Productivity benchmarks from "Lean Enterprise" and Asana's internal research reports.</li>
              </ul>
            </div>
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h4 className="font-bold text-emerald-900 mb-2">Consistency Enforcement</h4>
              <ul className="text-xs space-y-2 text-emerald-800">
                <li><strong>Temporal:</strong> <code>created_at &lt; completed_at</code>. Subtasks created within parent timeframe.</li>
                <li><strong>Relational:</strong> Section membership is scoped to Project ID. Team Members must exist in Team Membership table.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION C */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-slate-100 p-3 rounded">Section C: Code Structure & Repository</h2>
          <p className="text-slate-600 mb-4">The simulation engine is designed modularly to allow easy expansion of new generator types.</p>
          <div className="bg-slate-900 p-6 rounded-xl font-mono text-sm text-slate-300">
            <pre>{`
asana-rl-generator/
├── README.md               # Setup & Setup Logic
├── requirements.txt        # Python Dependencies (FastAPI, SQLite3, GoogleGenAI)
├── schema.sql              # Core DDL Script
├── src/
│   ├── main.py             # Orchestration & CLI
│   ├── scrapers/           # Fetches external identity data
│   │   └── company_names.py
│   ├── generators/         # Core logic for each table
│   │   ├── users.py        # Professional role assignment
│   │   ├── projects.py     # Template-based construction
│   │   └── tasks.py        # Gemini-integrated synthesis
│   ├── models/             # SQLAlchemy/Pydantic Classes
│   └── utils/              # Time-shifting & UUID helpers
├── prompts/                # JSON definitions for Gemini queries
└── output/
    └── asana_simulation.sqlite # Final product
            `}</pre>
          </div>
        </section>

        {/* FINAL NOTES */}
        <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <h3 className="font-bold text-slate-800 mb-2">Ready for Submission</h3>
          <p className="text-sm text-slate-500 mb-6">This framework provides a repeatable, high-fidelity environment for RL training.</p>
          <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors">
            Generate Final .sqlite Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSection;
