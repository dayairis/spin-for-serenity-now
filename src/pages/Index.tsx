
import React from 'react';
import Layout from '@/components/Layout';
import PrayerWheel from '@/components/PrayerWheel';

const Index = () => {
  return (
    <Layout className="flex flex-col items-center">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-tibetan-maroon mb-6">
          Digital Prayer Wheel
        </h2>
        
        <p className="text-lg mb-8 text-tibetan-earth">
          Spin the prayer wheel to generate merit and spread compassion. 
          Each turn is accompanied by the sacred mantra "Om Mani Padme Hum."
        </p>
        
        <div className="my-12 relative">
          <PrayerWheel />
        </div>
        
        <div className="mt-12 prose prose-lg mx-auto">
          <h3 className="text-2xl font-semibold text-tibetan-maroon mb-4">
            About Prayer Wheels
          </h3>
          
          <p className="mb-4">
            Prayer wheels are cylindrical wheels attached to a pole in Tibetan Buddhist traditions.
            Traditionally, they contain scrolls with written mantras and prayers, and spinning them is believed to have the same effect as reciting the prayers.
          </p>
          
          <p className="mb-4">
            The most common mantra used in prayer wheels is "Om Mani Padme Hum," which is associated with Avalokiteshvara, the bodhisattva of compassion.
            Spinning the wheel with a focused and compassionate mind is believed to spread spiritual blessings and purify negative karma.
          </p>
          
          <p className="mb-4">
            This digital adaptation aims to provide a respectful representation of this traditional practice, making it accessible to those who may not have access to a physical prayer wheel.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
