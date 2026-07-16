import React, { useState } from 'react';
import Hero from '../components/Hero'; 
import FirstService from '../components/FirstService'; 
import SecondService from '../components/SecondService'; 
import { ChevronDownIcon } from '@heroicons/react/24/outline'; 
import ThirdService from '../components/ThirdService';

function CustomAccordion({ title, children, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      <button
        className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset transition-colors duration-200 hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-green-700">
            {title}
          </h1>
          <ChevronDownIcon
            className={`w-8 h-8 text-green-600 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
      
      <div className={`transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="px-8 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
}

// Main Service Component
export default function Service() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero titre1=' Services d ' titre2="'IRIMATEC" urlImage='./bgService.jpg' paragraph='  "Découvrez nos services pour une irrigation performante et durable."' />
      
      
      <div className="max-w-7xl mx-auto px-1 py-1 space-y-">
        {/* Premier Accordion */}
        <CustomAccordion 
          title="GESTION DE L'EAU" 
          defaultExpanded={true}
        >
          <FirstService />
        </CustomAccordion>

        {/* Deuxième Accordion */}
      <CustomAccordion 
          title="TRAITEMENT DE L'EAU"
        >
          <SecondService />
        </CustomAccordion>
          <CustomAccordion 
          title="IRRIGATION"
        >
          <ThirdService />
        </CustomAccordion>
      </div>
    </div>
  );
}
