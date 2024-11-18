import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { MatchDetails } from './pages/MatchDetails';
import { Predictions } from './pages/Predictions';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/match/:id" element={<MatchDetails />} />
          <Route path="/predictions" element={<Predictions />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;