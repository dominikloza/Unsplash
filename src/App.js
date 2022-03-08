
import MainPage from "./components/MainPage.js";
import './style/main.scss';
import PhotoGallery from "./components/PhotoGallery";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';



function App() {

  const [search, setSearch] = useState("");
  const [photos, setPhotos] = useState([]);
  const [modal, setModal] = useState(false);
  const [result, setResult] = useState("");

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage search={search} setSearch={setSearch} setPhotos={setPhotos} setResult={setResult}/>}/>
          <Route path="/photo" element={<PhotoGallery search={search} setSearch={setSearch} photos={photos} setPhotos={setPhotos} modal={modal} setModal={setModal} setResult={setResult} result={result} />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
