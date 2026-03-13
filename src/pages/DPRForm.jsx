import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';
import Toast from '../components/Toast';
import projects from '../data/projects';

const WEATHER_OPTIONS = ['Sunny', 'Cloudy', 'Rainy'];

export default function DPRForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    projectId: projectId || '',
    date: new Date().toISOString().split('T')[0],
    weather: '',
    workDescription: '',
    workerCount: '',
  });
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 3) {
      setErrors((prev) => ({
        ...prev,
        photos: 'You can upload a maximum of 3 photos',
      }));
      return;
    }

    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
    if (errors.photos) setErrors((prev) => ({ ...prev, photos: '' }));
    // Reset input so the same file can be selected again
    e.target.value = '';
  };

  const removePhoto = (index) => {
    setPhotos((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.projectId) newErrors.projectId = 'Please select a project';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.weather) newErrors.weather = 'Please select weather condition';
    if (!form.workDescription.trim()) {
      newErrors.workDescription = 'Work description is required';
    } else if (form.workDescription.trim().length < 10) {
      newErrors.workDescription =
        'Work description must be at least 10 characters';
    }
    if (!form.workerCount) {
      newErrors.workerCount = 'Worker count is required';
    } else if (Number(form.workerCount) < 1) {
      newErrors.workerCount = 'Worker count must be at least 1';
    } else if (!Number.isInteger(Number(form.workerCount))) {
      newErrors.workerCount = 'Worker count must be a whole number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setToast({ message: 'Daily Progress Report submitted successfully!', type: 'success' });
      setSubmitting(false);
      // Reset form after short delay
      setTimeout(() => {
        setForm({
          projectId: projectId || '',
          date: new Date().toISOString().split('T')[0],
          weather: '',
          workDescription: '',
          workerCount: '',
        });
        setPhotos([]);
      }, 1000);
    }, 800);
  };

  const closeToast = useCallback(() => setToast(null), []);

  const selectedProject = projects.find(
    (p) => p.id === Number(form.projectId)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/projects')}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Daily Progress Report
            </h1>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8"
        >
          {/* Project Selector */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project <span className="text-red-500">*</span>
            </label>
            <select
              value={form.projectId}
              onChange={(e) => handleChange('projectId', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.projectId
                  ? 'border-red-400'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors`}
            >
              <option value="">Select a project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.projectId && (
              <p className="mt-1 text-sm text-red-500">{errors.projectId}</p>
            )}
            {selectedProject && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                📍 {selectedProject.location} · {selectedProject.status}
              </p>
            )}
          </div>

          {/* Date & Weather - side by side on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.date
                    ? 'border-red-400'
                    : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-500">{errors.date}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Weather <span className="text-red-500">*</span>
              </label>
              <select
                value={form.weather}
                onChange={(e) => handleChange('weather', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.weather
                    ? 'border-red-400'
                    : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors`}
              >
                <option value="">Select weather</option>
                {WEATHER_OPTIONS.map((w) => (
                  <option key={w} value={w}>
                    {w === 'Sunny' ? '☀️' : w === 'Cloudy' ? '☁️' : '🌧️'} {w}
                  </option>
                ))}
              </select>
              {errors.weather && (
                <p className="mt-1 text-sm text-red-500">{errors.weather}</p>
              )}
            </div>
          </div>

          {/* Work Description */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Work Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={form.workDescription}
              onChange={(e) => handleChange('workDescription', e.target.value)}
              placeholder="Describe the work completed today..."
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.workDescription
                  ? 'border-red-400'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors resize-vertical`}
            />
            {errors.workDescription && (
              <p className="mt-1 text-sm text-red-500">
                {errors.workDescription}
              </p>
            )}
          </div>

          {/* Worker Count */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Worker Count <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={form.workerCount}
              onChange={(e) => handleChange('workerCount', e.target.value)}
              placeholder="Number of workers on site"
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.workerCount
                  ? 'border-red-400'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors`}
            />
            {errors.workerCount && (
              <p className="mt-1 text-sm text-red-500">{errors.workerCount}</p>
            )}
          </div>

          {/* Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Site Photos (max 3)
            </label>
            <div className="flex flex-wrap gap-3 mb-3">
              {photos.map((photo, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={photo.preview}
                    alt={`Site photo ${idx + 1}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  >
                    ×
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate w-24 sm:w-28">
                    {photo.name}
                  </p>
                </div>
              ))}
              {photos.length < 3 && (
                <label className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                  <span className="text-2xl text-gray-400">+</span>
                  <span className="text-xs text-gray-400 mt-1">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {errors.photos && (
              <p className="text-sm text-red-500">{errors.photos}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Report'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
