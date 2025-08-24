import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/welcome';
import Explora from './pages/explora';
import Favoritos from './pages/favoritos';
import PlantasList from './pages/plantas/index';
import PlantasCreate from './pages/plantas/create';
import PlantasEdit from './pages/plantas/edit';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/explora" element={<Explora />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/plantas" element={<PlantasList />} />
            <Route path="/plantas/create" element={<PlantasCreate />} />
            <Route path="/plantas/:id/edit" element={<PlantasEdit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}
