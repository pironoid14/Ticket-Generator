import Header from "../components/header"
import About from "../assets/About.svg"
const AboutProject = () => {
  return (
    <div>
      <Header/>
      <img src={About} className="w-full h-full bg-[#05252C] bg-cover bg-no-repeat bg-center"/>

    </div>
  )
}

export default AboutProject
