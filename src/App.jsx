import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  SLideshowScreen,
  TextParallaxContentScreen,
  StickyCardsScreen,
} from "./screens";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="bg-zinc-900 flex items-center justify-center w-screen h-screen">
                <h1 className="text-white text-2xl md:text-4xl">
                  React Components with Framer motion and tailwind
                </h1>
              </div>
            }
          />
          <Route path="/slider" element={<SLideshowScreen />} />
          <Route
            path="/parallax-text"
            element={<TextParallaxContentScreen />}
          />
          <Route path="/sticky-cards" element={<StickyCardsScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
