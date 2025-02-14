import Header from "../components/header"
import Ticket from "../components/Ticket.tsx"
import {Link} from "react-router-dom"

const TicketReady = () => {
  return (
    <div className="min-h-screen" style={{ background: "radial-gradient(52.52% 32.71% at 50% 97.66%, rgba(36, 160, 181, 0.20) 0%, rgba(36, 160, 181, 0.00) 100%), #02191D", }}>
      <Header/>
      <div className=" max-w-lg mx-auto p-8" >
        <div className="bg-[#041E23] p-4 rounded-md shadow-md flex flex-col items-center">
          <Ticket/>
        
        <div className="flex justify-between mt-4">
            <Link to="/SelectTicket"> 
            <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition"
              >
                Book another ticket
              </button>
              </Link> 
              <button
                type="button"
                className="bg-gray-700 text-white py-3 px-6 rounded-md hover:bg-gray-600 transition"
              >
                Download Ticket
              </button>
            </div>
            </div>
      </div>
    
      </div>
  )
}

export default TicketReady
