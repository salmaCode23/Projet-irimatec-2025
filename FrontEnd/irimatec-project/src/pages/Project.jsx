import Hero from '../components/Hero'
import CardComponent from '../components/CardComponent'
import React, { useEffect, useState } from 'react';

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projets') // Appel API Laravel
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors du chargement des projets:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Hero 
        titre1='Projet d ' 
        titre2="'IRIMATEC" 
        urlImage='./bgProjet.jpg' 
        paragraph='Découvrez nos réalisations innovantes à travers le Maroc' 
      />

      <div>
        <h1 className='text-center text-green-700 font-serif font-bold p-5 text-[25px] md:text-[30px]'>
          NOS RÉALISATIONS
        </h1>
        <p className='text-[20px] md:px-16 mb-6 text-center px-7'>
          « Chez <span className='text-green-700 font-bold'>IRIMATEC</span>, nous réalisons des projets innovants alliant expertise technique
          et solutions sur-mesure pour répondre aux besoins spécifiques de nos clients,
          avec un engagement fort pour la qualité et la performance. »
        </p>
      </div>  

      {loading ? (
        <p className="text-center text-gray-500">Chargement des projets...</p>
      ) : (
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:justify-items-stretch m-4'>
          {projects.map((project) => (
            <CardComponent 
              key={project.id}
              title={project.title}
              description={project.description}
              image={`http://127.0.0.1:8000/storage/${project.image}`} // Image depuis Laravel storage
              action={
                <button className='text-green-700 font-bold'>
                  <a href="/contact">Voir plus</a> 
                </button>
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}
