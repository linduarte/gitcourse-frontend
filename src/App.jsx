import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import Topic from "./pages/Topic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:slug" element={<Topic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
