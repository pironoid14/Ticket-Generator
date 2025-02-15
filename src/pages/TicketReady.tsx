import Header from "../components/header";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import img from '../components/TICKET.png';

const captureTicket = async () => {
  const ticketElement = document.getElementById('ticket');
  if (ticketElement) {
    const canvas = await html2canvas(ticketElement);
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'ticket.png';
    link.click();
  }
};

const TicketReady = () => {
  const location = useLocation();
  const { ticketData } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#02191d] to-[#12464E]">
      <Header />
      <div className="max-w-lg mx-auto p-8 mt-20">
        <div className="bg-[#041E23] p-6 rounded-lg shadow-lg flex flex-col items-center relative">
          {ticketData && (
            <div
              id="ticket"
              className="text-white text-center relative z-10"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '20px',
                borderRadius: '10px'
              }}
            >
              <h3 className="text-2xl font-bold">Conference Ticket</h3>
              <img src={ticketData.photoUrl} alt="Avatar" className="w-24 h-24 mx-auto rounded-full mt-4" />
              <p className="text-lg font-semibold mt-2">{ticketData.name}</p>
              <p className="text-sm text-gray-400">{ticketData.email}</p>
              <p className="text-sm text-gray-400">{ticketData.selectedTicket.name} - {ticketData.selectedTicket.price}</p>
              <p className="text-sm text-gray-400">Quantity: {ticketData.selectedOption}</p>
            </div>
          )}
          <div className="flex justify-between mt-6 w-full relative z-10">
            <Link to="/SelectTicket">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition"
              >
                Book another ticket
              </button>
            </Link>
            <button
              type="button"
              className="bg-gray-800 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition"
              onClick={captureTicket}
            >
              Download Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketReady;