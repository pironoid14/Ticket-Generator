import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AttendeeDetails from './pages/AttendeeDetails';
import TicketReady from './pages/TicketReady';
import AboutProject from "./pages/AboutProject"
import SelectTicket from './pages/SelectTicket';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectTicket />} />
        <Route path="/SelectTicket" element={<SelectTicket />} />
        <Route path="/AttendeeDetails" element={<AttendeeDetails />} />
        <Route path="/TicketReady" element={<TicketReady />} />
        <Route path="/AboutProject" element = {<AboutProject/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
