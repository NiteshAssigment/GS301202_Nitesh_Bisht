import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Store from "./pages/Store";
import Sku from "./pages/Sku";
import Planning from "./pages/Planning";
import Charts from "./pages/Charts";

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true); // New loading state
  const [activeSection, setActiveSection] = useState<"store" | "sku" | "planning" | "chart">(() => {
    return (localStorage.getItem("activeSection") as "store" | "sku" | "planning" | "chart") || "store";
  });
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsAuthChecking(false); // Stop loading after authentication check
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  // Show a loading indicator while checking authentication
  if (isAuthChecking) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            user ? (
              <div className="flex flex-col h-screen">
                <Header />
                <div className="flex flex-1">
                  <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
                  <main className="p-6 bg-gray-100 flex-1">
                    {activeSection === "store" && <Store />}
                    {activeSection === "sku" && <Sku />}
                    {activeSection === "planning" && <Planning />}
                    {activeSection === "chart" && <Charts />}
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
