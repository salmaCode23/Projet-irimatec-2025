import React from 'react'

export default function PresentationHome() {
  return (

    <div>

    <div className=" md:px-1 md:grid grid-cols-2   p-8 md:ml-16  ">
      
      <div className="  md:pl-16 text-justify">
        <h1 className=" text-green-700  font-bold md:text-[30px] ">QUI SOMMES NOUS?</h1>

        <p className="text-justify">
          IRIMATEC - Société d’étude Hydraulique et réalisation de projets
          Créée en 11/10/2007, propose de nombreux services.
          Nous sommes constitués d’un ensemble de compétences.
          Nous sommes une entreprise dynamique capable de répondre efficacement aux exigences d’un marché en constante évolution.
          Notre capital est basé sur ces valeurs : le sérieux, l’engagement, la rigueur.
          Dans notre engagement, pour répondre au mieux à vos besoins, lorsque nous sommes sollicités, notre premier souci est de personnaliser les besoins de notre client, et la finalité de nos produits.
          Notre ultime objectif est de fournir une solution de qualité, rentable économiquement, dans un délai Optimal.
        </p>
      </div>
      <div className="  bg-[url('/quiSomme.png')]  bg-no-repeat  h-64  bg-center     "></div>

    </div>
    <div className=" bg-[#FFFFF2] md:grid grid-cols-2   p-8  ">
<img  src='logoNV.png' />
      <div className="   text-justify md:mr-16 ">
        <h1 className=" text-green-700  font-bold md:text-[20px] py-4  ">MALKI MOULAY HABIB– Gérant & Directeur Technique</h1>

        <p className="text-justify">
          

          MALKI MOULAY HABIB est un professionnel reconnu dans le domaine de
           l’ingénierie hydraulique et de la mécanique appliquée. Fort d’une 
           solide expertise technique, il a dirigé et supervisé des projets 
           
           d’envergure dans les secteurs de l’irrigation, de la transformation 
           des matériaux plastiques et de la conception de systèmes hydrauliques.

          Grâce à sa vision stratégique et à ses compétences en management,
           MALKI MOULAY HABIB a su mener à bien des réalisations complexes et 
           innovantes, contribuant ainsi au développement de solutions performantes 
           et durables pour ses clients.
                  </p>
      </div>

    </div>
    </div>
  )
}
