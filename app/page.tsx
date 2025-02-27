import Hero from './components/Hero';
import FundingProgress from './components/FundingProgress';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <Hero />
      
      {/* Funding Progress section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <FundingProgress />
        </div>
      </section>
      
      {/* How It Works section */}
      <HowItWorks />
      
      {/* Testimonials section */}
      <Testimonials />
    </div>
  );
}
