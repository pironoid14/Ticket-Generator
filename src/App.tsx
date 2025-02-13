
import Home from "./pages/Home"
import AttendeeDetails from "./pages/AttendeeDetails" 
import TicketReady from "./pages/TicketReady"
import { Routes, Route } from "react-router-dom"
import AboutProject from "./pages/AboutProject"
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendee-details" element={<AttendeeDetails />} />
        <Route path="/ticket-ready" element={<TicketReady />} />
        <Route path="/AboutProject" element = {<AboutProject/>}/>
      </Routes>
    </div>
  )
}

export default App
