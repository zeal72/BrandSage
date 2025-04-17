import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatBot from "./Components/Bot copy";
import LandingPage from "./Components/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/bot" element={< ChatBot />} />
      </Routes>
    </Router>
  );
}

export default App;