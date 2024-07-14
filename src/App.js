
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
// import Navbar from './components/Navbar';
import{
  BrowserRouter as Router,
  Routes,
  Route
}from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;




