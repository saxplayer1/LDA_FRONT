import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import LDAstats from "./Pages/LDAStats";
import Consumer from "./Pages/Consumer";
import TitlePage from "./Pages/TitlePage";

function App() {
  return (
    <>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path='/ldastats' element={<LDAstats />} />
        <Route path="/consumer" element={<Consumer />} />
        <Route path="/" element={<TitlePage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
