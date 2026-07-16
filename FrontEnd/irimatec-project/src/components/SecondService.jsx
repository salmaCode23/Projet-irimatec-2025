import React from 'react'
import CardComponent from "./CardComponent";

export default function SecondService() {
  return (
    <div className="px-2 sm:px-4 lg:px-6 space-y-4 sm:space-y-6 pb-6">
      
      {/* Filtration */}
      <div className="md:m-5 ">
        <div className="text-justify space-y-3 order-2 lg:order-1 md:m-5 py-2">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-800 md:m-5">🌀 Filtration</h3>
          <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
            La filtration est indispensable pour protéger les systèmes
            d'irrigation contre les obstructions causées par les impuretés
            présentes dans l'eau (sable, algues, débris…). Le choix du système
            de filtration dépend de la qualité de la source d'eau et du type de
            culture.
          </p>
        </div>
        <div className="grid md:grid-cols-2  gap-3 sm:gap-4">
               
               <CardComponent
                image="/filtrationManuel.jpg"
                 title="🛠️ Filtration manuelle"
                    />
              <CardComponent
                image="/filtrationAuto.jpg"
              title="⚙️ Filtration automatique"
                          />
                    
              </div>
      </div>
       
      {/* Separator */}
      <hr className="border-1 border-gray-300 mx-2 " />

      {/* Fertigation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6  lg:p-3">
        <div className="text-justify space-y-3 order-2 lg:order-1">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-800">🌿 Fertigation</h3>
          <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
            La fertigation est la technique qui consiste à injecter des
            fertilisants solubles directement dans l'eau d'irrigation, permettant
            ainsi une nutrition précise et continue des plantes. 
          </p>
           
          
        </div>
        <div className="order-1 lg:order-2">
          <div
            className="bg-[url('/fertigation.jpg')] h-32 sm:h-48 lg:h-64 bg-cover bg-center rounded-lg sm:rounded-xl shadow-md"
          ></div>
        </div>
      </div>
      
    </div>
  )
}