import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import SignUp from './components/SignUp';
import Login from "./components/Login";
import EmployeeList from "./components/Empdashboard";
import Mandashboard from "./components/Mandashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/empdashboard" element={<EmployeeList />} />
          <Route path="/mandashboard" element={<Mandashboard />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
