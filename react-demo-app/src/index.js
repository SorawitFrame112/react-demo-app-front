import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/feature/common/Home';
import ImportRate from './components/feature/common/ImportRate';
import SetupCurrency from './components/feature/master/currentcy/SetupCurrency';
import GetReportRate from './components/feature/report/GetReportRate';
import { Stack } from '@mui/material';
import ResponsiveAppBar from './components/common/ResponsiveAppBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <ResponsiveAppBar /> 
          <Stack justifyItems={"center"} alignItems="center" sx={{ height: '100vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/importrate" element={<ImportRate />} />
              <Route path="/setupcurrency" element={<SetupCurrency />} />
              <Route path="/ratereport" element={<GetReportRate />} />
            </Routes>
          </Stack>
        </Stack>
      </BrowserRouter>
  </React.StrictMode>
);



