import Banner from "../components/Banner";
import CallToAction from "../components/CallToAction";
import ContactUs from "../components/ContactUs";
import FAQ from "../components/FAQ";
import FeaturedSection from "../components/FeaturedSection";

import Footer from "../components/Footer";
import FundCollection from "../components/FundCollection";
import HomeSection from "../components/HomeSection";
import HowToDonate from "../components/HowToDonate";



const Home = () => {
  return (
    <>
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <HowToDonate></HowToDonate>
      <ContactUs></ContactUs>
      <FundCollection></FundCollection>
     

    
    <CallToAction></CallToAction>
    <HomeSection></HomeSection>
    <FAQ></FAQ>
      <Footer></Footer>
    </>
  );
};

export default Home;
