import { Route, Routes } from "react-router-dom";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";
import ProtectedRoute from "../components/ProtectedRoute";
import { lazy, Suspense } from "react";
import Loader from "../components/Loader";
import Home from "../pages/home/Home";

const LazyDashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const LazySend = lazy(() => import("../pages/send/Send"));
const LazyProfile = lazy(() => import("../pages/profile/Profile"));
const LazyQrScanner = lazy(() => import("../pages/QrScanner/QrScanner"));
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/dashboard"
        element={
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <Loader />
              </div>
            }
          >
            <ProtectedRoute>
              <LazyDashboard />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/send"
        element={
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <Loader />
              </div>
            }
          >
            <ProtectedRoute>
              <LazySend />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <Loader />
              </div>
            }
          >
            <ProtectedRoute>
              <LazyProfile />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/qrScanner"
        element={
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <Loader />
              </div>
            }
          >
            <ProtectedRoute>
              <LazyQrScanner />
            </ProtectedRoute>
          </Suspense>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
