import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./dashboards/Dashboard";
import { UserProvider } from "./contexts/UserContext";

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path={'/*'} element={<Dashboard />} />
        </Routes>
      </UserProvider>
    </Router>
  )
}
