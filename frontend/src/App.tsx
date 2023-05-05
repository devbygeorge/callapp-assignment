import { useEffect } from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import usePersonsStore from "@/hooks/usePersonsStore";
import ChartPage from "@/pages/ChartPage";
import TablePage from "@/pages/TablePage";

function App() {
  const { getPersons } = usePersonsStore((state) => state);

  useEffect(() => {
    getPersons();
  }, [getPersons]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TablePage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
