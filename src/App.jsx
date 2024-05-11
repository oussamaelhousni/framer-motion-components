import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SLideshowScreen } from "./screens";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/slider" element={<SLideshowScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
