import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContainerPage from "./pages/ContainerPage";
import AdminPage from "./pages/AdminPage";
import ViewerPage from "./pages/ViewerPage";
import ProtectedRoute from "./app/guards/ProtectedRoute";

function App() {
  return (  
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContainerPage />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="admin" element={<AdminPage />} />
              <Route path="viewer" element={<ViewerPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter> 

       <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="colored"
      />
       
    </Provider>  
  );
}

export default App;