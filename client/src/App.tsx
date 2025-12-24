import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Game from "./pages/Game";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen bg-slate-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
