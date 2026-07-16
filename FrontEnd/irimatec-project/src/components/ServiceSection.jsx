import React, { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import { ArrowRightIcon} from '@heroicons/react/24/outline';

export default function ServiceSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('../fakedata/data.json')  // chemin vers ton fichier JSON
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className='text-[30px] font-bold text-center text-yellow-700'>NOS SERVICES</h1>
<div className='grid grid-cols-2 gap-6    md:grid-cols-3 md:justify-items-stretch  m-4'>
        {services.map(service => (
  <div key={service.title} className="flex flex-col">
    {/* Card */}
    <CardComponent 
      title={service.title}
      description={service.description}
      image={service.image}
      isAction={true}    
      end="/services"/>

     
  </div>
))}

      </div>
    </div>
  );
}
