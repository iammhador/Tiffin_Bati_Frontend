"use client";

import AboutUsPage from "@/components/ui/aboutUs";
import AvailableService from "@/components/ui/availableService";
import BannerPage from "@/components/ui/banner";
import ContactUsPage from "@/components/ui/contactUs";
import FooterPage from "@/components/ui/footer";
import FrequentlyAskQusPage from "@/components/ui/frequentlyAskQus";
import Navbar from "@/components/ui/navbar";
import PricingPage from "@/components/ui/pricing";
import TestimonialsPage from "@/components/ui/testimonial";

const App = () => {
  return (
    <div>
      <Navbar />
      <BannerPage />
      <AboutUsPage />
      <AvailableService />
      <PricingPage />
      <TestimonialsPage />
      <FrequentlyAskQusPage />
      <ContactUsPage />
      <FooterPage />
    </div>
  );
};

export default App;
