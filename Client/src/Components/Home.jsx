import Banner from "./Banner"
import ChooseUs from "./ChooseUs"
import HowItWorks from "./HowItWorks";
import TestimonialCard from "./testimonialCard";

const Home = () => {
  return (
    <div className="">
      <Banner/>
      <HowItWorks/>
      <ChooseUs/>
      <TestimonialCard />
    </div>
  )
}

export default Home;