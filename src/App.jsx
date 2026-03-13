import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import ProjectList from './pages/ProjectList';
import DPRForm from './pages/DPRForm';

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/projects" replace /> : <Login />}
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dpr/:projectId"
        element={
          <ProtectedRoute>
            <DPRForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dpr"
        element={
          <ProtectedRoute>
            <DPRForm />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
