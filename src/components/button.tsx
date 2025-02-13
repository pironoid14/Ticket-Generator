import { HiArrowNarrowRight } from "react-icons/hi";


export const button = () => {
  return (
    <div>
      <button type="submit" className="bg-[#FFFFFF] text-[#0A0C11] rounded-lg p-4">
        My Tickets
        <HiArrowNarrowRight className="inline-block ml-2 size-5"/>
        </button>

      
    </div>
  )
}

export default button
