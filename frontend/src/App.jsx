import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Level from './Pages/Level';
import Preloader from './components/Preloader';
import Leaderboard from './Pages/Leaderboard';
import ContestPage from './auth'; 
import ProtectedRoute from './components/ProtectedRoute';
import FAQ from './Pages/FAQ';
import RulesPage from './components/Rules';
import About from './Pages/About';
import HashAnswer from './components/Hashanswer';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Test the HashAnswer function directly
    HashAnswer(3); // Pass the question ID (3 in this case) to test
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ContestPage />} />
          <Route path="/sherlock" element={<Home />} />
          <Route path="/level" element={<ProtectedRoute><Level /></ProtectedRoute>} />
          <Route path="rules" element={<RulesPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path='/leaderboard' element={<Leaderboard/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path="/map" element={<Navigate to="/level" replace />} />
          <Route path="*" element={<Navigate to="/sherlock" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

