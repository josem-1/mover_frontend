import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar         from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute    from './components/PublicRoute';

//import Welcome        from './pages/Welcome';
import Signup         from './pages/Signup';
import Login          from './pages/Login';
import Home           from './pages/Home';
import SearchResults  from './pages/SearchResults';
import MediaDetail    from './pages/MediaDetail';
import GenrePage      from './pages/GenrePage';
import DirectorPage   from './pages/DirectorPage';
import Dashboard      from './pages/Dashboard';
import WatchHistory   from './pages/WatchHistory';
import Watchlist      from './pages/Watchlist';
import LogoutSuccess  from './pages/LogoutSuccess';




export default function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/"       element={<PublicRoute><Signup/></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup/></PublicRoute>} />
        <Route path="/login"  element={<PublicRoute><Login/></PublicRoute>} />

        <Route path="/home"             element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/search"           element={<ProtectedRoute><SearchResults/></ProtectedRoute>} />
        <Route path="/media/:type/:id"  element={<ProtectedRoute><MediaDetail key={location.pathname}/></ProtectedRoute>} />
        <Route path="/dashboard"        element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/watch-history"     element={<ProtectedRoute><WatchHistory/></ProtectedRoute>} />
        <Route path="/watchlist"        element={<ProtectedRoute><Watchlist/></ProtectedRoute>} />
        <Route path="/logout"           element={<ProtectedRoute><LogoutSuccess/></ProtectedRoute>} />
        <Route path="/genre/:id"        element={<ProtectedRoute><GenrePage/></ProtectedRoute>} />
        <Route path="/director/:id"     element={<ProtectedRoute><DirectorPage/></ProtectedRoute>} />
        


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
