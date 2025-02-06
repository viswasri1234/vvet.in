import Navbar from "./Navbar";
import Footer from "./Footer";
import Carousel from "./Carousel";
import HomeSection1 from "./Home-Section-1";
import MissionVision from "./MissionVision";
import CustomerCountCard from "./CustomerCountCard";
import Marquee from "./Marquee";
import StatsCard from "./StatsCard";
import Donate from './Donate'
import HomeMockSection from "./HomeMockSection";
import "./Home.css";

const Home = () => {
  const images = [
    "https://cdn.pixabay.com/photo/2020/01/09/03/43/mansion-4751778_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/07/25/22/16/trinity-college-2539751_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/01/09/03/43/mansion-4751778_1280.jpg",
    "https://media.istockphoto.com/id/838370892/photo/dublin-ireland-trinity-college.jpg?s=2048x2048&w=is&k=20&c=PzQkgqH3tjpGA2Cac2lmjk70wUQQB1c_YssmCdQ1IGI=",
    "https://cdn.pixabay.com/photo/2020/01/09/03/43/mansion-4751778_1280.jpg",
  ];
  return (
    <>
      <div className="home">
        <Carousel images={images} />
        <Marquee/>
        <HomeSection1 />
        <CustomerCountCard/>
        <MissionVision/>
        <StatsCard/>
        <Donate/>
        <HomeMockSection/>
      </div>
      <Footer />
    </>
  );
};

export default Home;
