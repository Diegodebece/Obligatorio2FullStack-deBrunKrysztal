import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContainerPage from './pages/ContainerPage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<ContainerPage />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
    </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;