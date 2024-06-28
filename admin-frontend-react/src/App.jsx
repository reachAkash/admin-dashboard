import { useEffect, useState } from "react";

import Loader from "./components/Loader";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import UnderDevelopment from "./components/UnderDevelopment";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<UnderDevelopment />} />
    </Routes>
  );
}

export default App;
