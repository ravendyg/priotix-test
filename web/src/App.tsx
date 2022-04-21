import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import { StationPage } from './modules/station/pages/station';
import { StationsPage } from './modules/station/pages/stations';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<StationsPage />} />
      <Route path='/station/:id' element={<StationPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
