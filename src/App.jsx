import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContainerPage from "./pages/ContainerPage";
import AdminPage from "./pages/AdminPage";
import ViewerPage from "./pages/ViewerPage";
import ProtectedRoute from "./app/guards/ProtectedRoute";

import ViewerSummary from "./components/viewer/ViewerSummary";
import ViewerPlan from "./components/viewer/ViewerPlan";
import ViewerCatalog from "./components/viewer/ViewerCatalog";
import ViewerTracking from "./components/viewer/ViewerTracking";
import ViewerStats from "./components/viewer/ViewerStats";
import ViewerAI from "./components/viewer/ViewerAI";

import AdminSeriesManagement from "./components/admin/AdminSeriesManagement";
import AdminCategoriesManagement from "./components/admin/AdminCategoriesManagement";
import AdminUsersManagement from "./components/admin/AdminUsersManagement";
import AdminTrackingStats from "./components/admin/AdminTrackingStats";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContainerPage />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="admin" element={<AdminPage />}>
                <Route index element={<Navigate to="series" replace />} />
                <Route path="series" element={<AdminSeriesManagement />} />
                <Route path="categorias" element={<AdminCategoriesManagement />} />
                <Route path="usuarios" element={<AdminUsersManagement />} />
                <Route path="estadisticas" element={<AdminTrackingStats />} />
              </Route>

              <Route path="viewer" element={<ViewerPage />}>
                <Route index element={<Navigate to="resumen" replace />} />
                <Route path="resumen" element={<ViewerSummary />} />
                <Route path="plan" element={<ViewerPlan />} />
                <Route path="catalogo" element={<ViewerCatalog />} />
                <Route path="seguimientos" element={<ViewerTracking />} />
                <Route path="estadisticas" element={<ViewerStats />} />
                <Route path="ia" element={<ViewerAI />} />
              </Route>
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
