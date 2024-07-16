import Introduction from "./Components/Introduction";
import NewsArticles from "./Components/NewsArticles";
import NavigationBar from "./Components/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryNews from "./Components/CategoryNews";

function App() {
  return (
    <Router>
      <NavigationBar />{" "}
      <Routes>
        <Route path="/" element={<Introduction />} />{" "}
        <Route path="/everything" element={<NewsArticles />} />
        <Route path="/category/:categoryName" element={<CategoryNews />} />
      </Routes>
    </Router>
  );
}

export default App;
