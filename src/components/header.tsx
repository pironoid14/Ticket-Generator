import {Link} from 'react-router-dom'
import Button from './button'
import ticc from '../assets/ticc.svg'

const Header = () => {
  return (
    <div className="absolute box-border flex flex-row justify-between items-center px-4 py-3 bg-[#05252C] border border-[#197686] backdrop-blur-[2px] rounded-[24px] top-[20px] left-1/2 -translate-x-1/2 w-full h-[76px] max-w-screen-lg ">
      <div className="flex flex-row items-center justify-between gap-4">
        <img src={ticc} alt="ticc" className="w-20 h-20" />
        <nav className="box-border flex flex-row items-center justify-center">
          <ul className="flex gap-4 px-20 text-center">
            <li><span className='text-2xl font-bold text-[#ffffff] font-JejuMyeongjo'>Events</span></li>
            <li className='text-xl text-[#B3B3B3] font-JejuMyeongjo'>My Tickets</li>
            <li className='text-xl text-[#B3B3B3] font-JejuMyeongjo'>About Project</li>
          </ul>
        </nav>
      </div>
      <div className='flex flex-row items-center gap-4'>
        <Link to="/TicketReady"> <Button /></Link>
      </div>
    </div>
  )
}

export default Header
