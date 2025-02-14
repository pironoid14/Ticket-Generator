import Section from "../components/SectionTitle";
import { Link } from "react-router-dom";
import { useState } from "react";
interface TicketType {
  name: string;
  price: number | string;
  description: string;
  available: string; // e.g., "20/52"
}


const SelectTicket: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);

  const ticketTypes: TicketType[] = [
    {
      name: "FREE",
      price: "FREE",
      description: "REGULAR ACCESS",
      available: "20/52",
    },
    {
      name: "VIP",
      price: 150,
      description: "VIP ACCESS",
      available: "20/52",
    },
    {
      name: "VVIP",
      price: 150,
      description: "VVIP ACCESS",
      available: "20/52",
    },
  ];

  const handleTicketSelect = (ticket: TicketType) => {
    setSelectedTicket(ticket);
    console.log("Selected Ticket:", ticket);
  };

  function handleOptionChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setSelectedOption(event.target.value);
  }

  return (
    <div className="min-h-screen flex justify-center items-center" style={{ background: "radial-gradient(52.52% 32.71% at 50% 97.66%, rgba(36, 160, 181, 0.20) 0%, rgba(36, 160, 181, 0.00) 100%), #02191D", }}>
      <div className=" w-[700px] mx-auto py-12 px-12 border-2 border-[#0E464F] rounded-[40px] flex flex-col items-center h-[858px]  " >
        <div className="flex justify-between w-full gap-4" >
        <h1 className="text-2xl font-bold text-white ">Ticket Selection</h1>
        <p className="text-white">Step 1/3</p>
        </div>
        <Section className="w-fit"/>
        <div>
        <h3 className="text-white font-bold">Select Ticket Type</h3>
      <div className="flex gap-4 mt-4">
        {ticketTypes.map((ticket) => (
          <div
            key={ticket.name}
            className={`bg-[#0E464F] w-[200px] h-[200px] rounded-[24px] flex flex-col items-center justify-center text-white cursor-pointer ${
              selectedTicket === ticket ? 'border-4 border-yellow-500' : '' // Highlight selected ticket
            }`}
            onClick={() => handleTicketSelect(ticket)}
          >
            <h4 className="text-2xl font-bold">{ticket.price}</h4>
            <p className="text-lg">
              {ticket.description} <br />
              {ticket.available}
            </p>
          </div>
        ))}
      </div>

      {/* Display selected ticket information  */}
      {selectedTicket && (
        <div className="mt-4 text-white">
          <h4 className="text-xl font-bold">You have selected:</h4>
          <p>{selectedTicket.name} - {selectedTicket.price}</p>
          <p>{selectedTicket.description}</p>
        </div>
      )}
          </div>
          <div className="mt-8">
            <h3 className="text-white font-bold">Number of Tickets</h3>
            <div className="flex gap-4 mt-4">
              <select name="quantity" id="" value={selectedOption} onChange={handleOptionChange} className="bg-[#0E464F] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[556px]">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              </select>
            </div>
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="bg-[#0b6945] text-white py-3 px-6 border-2 border-[#24A0B5] w-48 rounded-md hover:bg-blue-600 transition mt-8"
            >
              Cancel
            </button>
            <Link to="/attendee-details">
            <button
              type="button"
              className="bg-[#24A0B5] text-white py-3 px-6 border-2 border-[#24A0B5] w-48 rounded-md hover:bg-blue-600 transition mt-8"
            >
              Next
            </button>
            </Link>  
        </div>
      </div>
      </div>
      
    </div>
  );
}

export default SelectTicket;
