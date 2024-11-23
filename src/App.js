import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AchatsForm from './AchatsForm';
import Facture from './Factures';

function App() {
    return (
        <Router>
          <div className="bg-gray-100 min-h-screen">
            <nav className="bg-blue-500 p-4">
              <ul className="flex space-x-4">
                <li>
                  <Link to="/facture" className="text-white hover:text-blue-200">Afficher la Facture</Link>
                </li>
                <li>
                  <Link to="/achatsForm" className="text-white hover:text-blue-200">Ajouter</Link>
                </li>
              </ul>
            </nav>
    
            <div className="p-6">
              <Routes>
                <Route path="/facture" element={<Facture />} />
                <Route path="/achatsForm" element={<AchatsForm />} />
              </Routes>
            </div>
          </div>
        </Router>
      );
}

export default App;

