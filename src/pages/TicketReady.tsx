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
      <div className="max-w-lg mx-auto p-4 sm:p-8 mt-10 sm:mt-20">
        <div className="bg-[#041E23] p-4 sm:p-6 rounded-lg shadow-lg flex flex-col items-center relative">
          {ticketData && (
            <div
              id="ticket"
              className="text-white text-center relative z-10 font-JejuMyeongjo"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '20px',
                borderRadius: '10px'
              }}
            >
              <h3 className="text-xl sm:text-2xl font-bold font-JejuMyeongjo">Conference Ticket</h3>
              <img src={ticketData.photoUrl} alt="Avatar" className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full mt-4" />
              <p className="text-base sm:text-lg font-semibold font-JejuMyeongjo mt-2">{ticketData.name}</p>
              <p className="text-xs sm:text-sm text-gray-400 font-JejuMyeongjo">{ticketData.email}</p>
              <p className="text-xs sm:text-sm text-gray-400 font-JejuMyeongjo">{ticketData.selectedTicket.name} - {ticketData.selectedTicket.price}</p>
              <p className="text-xs sm:text-sm text-gray-400 font-JejuMyeongjo">Quantity: {ticketData.selectedOption}</p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-between mt-6 w-full relative z-10">
            <Link to="/SelectTicket" className="mb-4 sm:mb-0 sm:mr-4">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
              >
                Book another ticket
              </button>
            </Link>
            <button
              type="button"
              className="bg-gray-800 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-md hover:bg-gray-700 transition w-full sm:w-auto"
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