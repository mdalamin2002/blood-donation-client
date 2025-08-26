import Banner from "../components/Banner";
import CallToAction from "../components/CallToAction";
import ContactUs from "../components/ContactUs";
import FAQ from "../components/FAQ";
import FeaturedSection from "../components/FeaturedSection";

import Footer from "../components/Footer";



const Home = () => {
  return (
    <>
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <ContactUs></ContactUs>
     

    
    <CallToAction></CallToAction>
    <FAQ></FAQ>
      <Footer></Footer>
    </>
  );
};

export default Home;
