import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          {/* nested Router */}
          <Route path="movies/:movieType/:movieId" element={<Home />} />
        </Route>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
