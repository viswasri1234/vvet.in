import Navbar from "./Navbar";
import Footer from "./Footer";
import Carousel from "./Carousel";
import HomeSection1 from "./Home-Section-1";
import MissionVision from "./MissionVision";
import CustomerCountCard from "./CustomerCountCard";
import Marquee from "./Marquee";
import StatsCard from "./StatsCard";
import Donate from './Donate';
import HomeMockSection from "./HomeMockSection";
import "./Home.css";

const Home = () => {
  const images = [
    "https://i.postimg.cc/4NtQrKtZ/Untitled1.jpg",
    "https://i.postimg.cc/MKkybWLL/Untitled2.jpg",
    "https://i.postimg.cc/15pDvkh3/Untitled3.jpg",
    "https://i.postimg.cc/6pcnXCQs/Untitled4.jpg",
    "https://i.postimg.cc/Lssf6hqJ/Untitled5.jpg",
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
