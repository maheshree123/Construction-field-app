import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DarkModeToggle from '../components/DarkModeToggle';
import projects from '../data/projects';

const STATUS_COLORS = {
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'On Hold': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Planning: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};

const STATUSES = ['All', 'In Progress', 'Completed', 'On Hold', 'Planning'];

export default function ProjectList() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const filtered = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏗️</span>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Projects
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <DarkModeToggle />
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
          />
          <div className="flex gap-2 flex-wrap">
            {STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <span className="text-4xl block mb-3">📋</span>
            No projects found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/dpr/${project.id}`)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h2>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                      STATUS_COLORS[project.status] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <span>📍</span> {project.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📅</span> Started:{' '}
                    {new Date(project.startDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                    Open DPR Form →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
