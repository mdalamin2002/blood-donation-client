import Banner from "../components/Banner";
import CallToAction from "../components/CallToAction";
import ContactUs from "../components/ContactUs";
import FAQ from "../components/FAQ";
import FeaturedSection from "../components/FeaturedSection";

import Footer from "../components/Footer";
import FundCollection from "../components/FundCollection";
import HomeSection from "../components/HomeSection";
import HowToDonate from "../components/HowToDonate";
import TeamSection from "../components/HowItWorks";
import RecentDonors from "./RecentDonors";



const Home = () => {
  return (
    <>
      <Banner></Banner>
      {/* <RecentDonors></RecentDonors> */}
      <FeaturedSection></FeaturedSection>
      <HowToDonate></HowToDonate>
     
      <FundCollection></FundCollection>
      <ContactUs></ContactUs>

    
    <CallToAction></CallToAction>
    <TeamSection></TeamSection>
    <HomeSection></HomeSection>
    <FAQ></FAQ>
      <Footer></Footer>
    </>
  );
};

export default Home;
