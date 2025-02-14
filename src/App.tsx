
import Home from "./pages/Home"
import AttendeeDetails from "./pages/AttendeeDetails" 
import TicketReady from "./pages/TicketReady"
import { Routes, Route } from "react-router-dom"
import AboutProject from "./pages/AboutProject"
import SelectTicket from "./pages/SelectTicket"
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendee-details" element={<AttendeeDetails />} />
        <Route path="/Ticketready" element={<TicketReady />} />
        <Route path="/AboutProject" element = {<AboutProject/>}/>
        <Route path="/SelectTicket" element={<SelectTicket />} />
      </Routes>
    </div>
  )
}

export default App
