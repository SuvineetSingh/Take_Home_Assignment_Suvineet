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
      {/* This will always be displayed regardless of the route */}
      <Routes>
        {" "}
        {/* The Routes component looks through its children Routes and renders the first one that matches the current URL. */}
        <Route path="/" element={<Introduction />} />{" "}
        {/* Note the change here for React Router v6 */}
        <Route path="/everything" element={<NewsArticles />} />
        <Route path="/category/:categoryName" element={<CategoryNews />} />
      </Routes>
    </Router>
  );
}

export default App;
