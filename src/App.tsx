import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Game from "./pages/Game";

import './App.css';
import NotFoundPage from "./pages/404";
import Find from "./pages/Find";

function App() {
  return (
      <BrowserRouter basename="/cisco-exam">
        <Routes>
          <Route path="/" element={<Find />} />
          <Route path="/train" element={<Home />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
