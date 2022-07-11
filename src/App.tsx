import React from 'react';
import './App.css';

import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/main'
import GettingStart from './components/gettingStart'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GettingStart/>}/>
          <Route path="/main" element={<Main/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
