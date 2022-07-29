import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Favorite from "./Routes/Favorite";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          {/* nested route */}
          <Route path="movies/:movieType/:movieId" element={<Home />} />
        </Route>
        <Route path="/tv" element={<Tv />}>
          <Route path=":tvId" element={<Tv />} />
        </Route>
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
