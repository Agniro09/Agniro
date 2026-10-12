import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import AdminDashboard from "../feature/admin/page/AdminDashboard.jsx";
import AdminProjects from "../feature/admin/page/AdminProjects.jsx";
import AdminLogin from "../feature/admin/page/AdminLogin.jsx";
import ContactUs from "../feature/contactUs/page/ContactUs.jsx";
import LandingPage from "../feature/home/Landingpage.jsx";


const ProtectedAdminRoute = () => {
  const [session, setSession] = useState({ status: "checking", admin: null });
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;

    fetch("/api/admin/session", { credentials: "include" })
      .then(async (response) => {
        if (response.status === 401) {
          if (active) setSession({ status: "unauthenticated", admin: null });
          return;
        }

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Unable to verify the admin session.");
        }

        if (active) setSession({ status: "authenticated", admin: result.admin });
      })
      .catch(() => {
        if (active) setSession({ status: "error", admin: null });
      });

    return () => {
      active = false;
    };
  }, [retry]);

  if (session.status === "unauthenticated") {
    return <Navigate replace to="/admin/login" />;
  }

  if (session.status === "error") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#080808] px-5 text-center font-sans text-[#F7F0E5]">
        <p className="text-sm text-rose-300" role="alert">
          Could not verify your admin session. Check that the server is running.
        </p>
        <button
          className="rounded-lg border border-[#29272A] px-4 py-2 text-sm transition hover:border-[#FF6B00]/60 hover:text-[#FFAD33]"
          onClick={() => {
            setSession({ status: "checking", admin: null });
            setRetry((current) => current + 1);
          }}
          type="button"
        >
          Try again
        </button>
      </main>
    );
  }

  if (session.status === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] font-sans text-sm text-[#A6A3A5]">
        Checking admin session…
      </main>
    );
  }

  return <Outlet context={{ admin: session.admin }} />;
};

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<LandingPage />} path="/" />
    
      <Route element={<ContactUs />} path="/contact" />
      <Route element={<AdminLogin />} path="/admin/login" />
      <Route element={<ProtectedAdminRoute />} path="/admin">
        <Route element={<AdminDashboard />} index />
        <Route element={<AdminProjects />} path="projects" />
        <Route element={<Navigate replace to="/admin" />} path="*" />
      </Route>
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
