import Section from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface TicketType {
  name: string;
  price: number | string;
  description: string;
  available: string; // e.g., "20/52"
}

const SelectTicket: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
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
      <div className="w-full max-w-[700px] mx-auto py-12 px-6 sm:px-12 border-2 border-[#0E464F] rounded-[40px] flex flex-col items-center h-auto sm:h-[858px] bg-[#02191D] shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between w-full gap-4 mb-8">
          <h1 className="text-3xl font-bold font-JejuMyeongjo text-white">Ticket Selection</h1>
          <p className="text-lg font-JejuMyeongjo text-white">Step 1/3</p>
        </div>
        <Section className="w-fit mb-8"/>
        <div className="w-full">
          <h3 className="text-xl font-bold font-JejuMyeongjo text-white mb-4">Select Ticket Type</h3>
          <div className="flex md:flex-row flex-col gap-4 justify-center">
            {ticketTypes.map((ticket) => (
              <div
                key={ticket.name}
                className={`bg-[#0E464F] w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-[24px] flex flex-col items-center justify-center text-white cursor-pointer transition-transform transform hover:scale-105 ${
                  selectedTicket === ticket ? 'border-4 border-yellow-500' : ''
                }`}
                onClick={() => handleTicketSelect(ticket)}
              >
                <h4 className="text-2xl font-bold">{ticket.price}</h4>
                <p className="text-lg text-center">
                  {ticket.description} <br />
                  {ticket.available}
                </p>
              </div>
            ))}
          </div>
          {selectedTicket && (
            <div className="mt-8 text-white">
              <h4 className="text-xl font-bold">You have selected:</h4>
              <p>{selectedTicket.name} - {selectedTicket.price}</p>
              <p>{selectedTicket.description}</p>
            </div>
          )}
        </div>
        <div className="mt-8 w-full">
          <h3 className="text-xl font-bold text-white mb-4">Number of Tickets</h3>
          <div className="flex gap-4">
            <select name="quantity" value={selectedOption} onChange={handleOptionChange} className="bg-[#0E464F] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
            <button
              type="button"
              className="bg-red-600 text-white py-3 px-6 border-2 border-red-600 w-full sm:w-48 rounded-md hover:bg-red-700 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-[#24A0B5] text-white py-3 px-6 border-2 border-[#24A0B5] w-full sm:w-48 rounded-md hover:bg-blue-600 transition"
              onClick={() => navigate("/AttendeeDetails", { state: { selectedTicket, selectedOption } })}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectTicket;
