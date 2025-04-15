import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bot from "./Components/Bot";
import LandingPage from "./Components/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/bot" element={<Bot />} />
      </Routes>
    </Router>
  );
}

export default App;