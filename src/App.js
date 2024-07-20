import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ImageUpload from "./components/ImageUpload";
import Upload from "./pages/Upload";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

function App() {
  return (
    <KindeProvider
    clientId="eba193900e444714b12286af0e5a27d0"
    domain="https://100blockcampaign.kinde.com"
    redirectUri="https://venchers-campaign.vercel.app/"
    logoutUri="https://venchers-campaign.vercel.app/"
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </KindeProvider>
  );
}

export default App;
