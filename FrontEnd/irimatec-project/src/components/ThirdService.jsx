import React from 'react'
import CardComponent from './CardComponent'

export default function ThirdService() {
  return (
    <div className="px-2 sm:px-4 lg:px-6 space-y-4 sm:space-y-6 pb-6">
      
      {/* Aspersion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6  lg:p-3">
        <div className="text-justify space-y-3 order-2 lg:order-1">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-800">💦 Aspersion</h3>
          
          <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
            L’aspersion simule la pluie naturelle en projetant l’eau au-dessus des cultures à l’aide d’asperseurs. 
            Les systèmes peuvent être fixes ou mobiles, avec des buses réglables selon le type de culture.
 
          </p>
        </div>
        <div className="order-1 lg:order-2">
          <div
            className="bg-[url('/aspersion.jpg')] h-32 sm:h-48 lg:h-64 bg-cover bg-center rounded-lg sm:rounded-xl shadow-md"
          ></div>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-1 border-gray-300 mx-2" />

      {/* Arrosage goutte-à-goutte */}
      <div className=" lg:p-3">
        <div className="text-justify space-y-3 order-2 lg:order-1">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-800">🌾 Arrosage goutte-à-goutte</h3>
          <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
            L'arrosage goutte-à-goutte est la méthode la plus efficace pour économiser l'eau et apporter les nutriments 
            au plus près des racines. Elle utilise des gaines et goutteurs conçus pour offrir un débit uniforme. 
             
          </p>
          
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
          
          <CardComponent
            image="/goutteurInteg.jpg"
            title="Goutteur integre turbulent"
            description="Haute résistance au colmatage grâce à sa géométrie en labyrinthe."
          />
          <CardComponent
            image="/goutteurDeriv.png"
            title="Goutteur en dérivation"
            description="Système flexible, fixé sur la rampe avec embout simple ou double."
            />
          <CardComponent
            image="/gaine.jpg"
           title="Gaine goutte-à-goutte"
            description="Idéale pour l’irrigation des cultures en ligne comme tomates, pastèques ou fraisiers."
            />
        </div>
         

        </div>
        
      </div>

    </div>
  )
}