import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ArtworkPage from './pages/ArtworkPage'
import GalleryPage from './pages/GalleryPage'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GalleryPage />} />
                <Route path="/artwork/:id" element={<ArtworkPage />} />
                <Route path="*" element={<GalleryPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
