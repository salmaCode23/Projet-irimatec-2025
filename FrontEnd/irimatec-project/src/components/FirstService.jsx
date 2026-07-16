import * as React from "react";
import CardComponent from "./CardComponent";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function FirstService() {
  return (
   <div className="space-y-6  lg:space-y-12  lg:px-6 ">
      {/* Pompage Section */}
      <div className="space-y-4 sm:space-y-6">
        <div className="text-justify ">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800 ">💧 Pompage</h2>
          <p className="text-sm sm:text-base text-gray-700   leading-relaxed">
            Le pompage est une étape cruciale pour garantir l'acheminement efficace
            de l'eau vers les systèmes d'irrigation. IRIMATEC propose des pompes
            adaptées à chaque besoin selon la surface à irriguer, le type de
            culture, la profondeur de la nappe ou le débit souhaité.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
         
         <CardComponent
          image="/pompeHori.jpg"
          title="Pompes à axe horizontal"
          description="Pour une utilisation en surface."
           end="Marques: KSB, Lowara, Saer ,Pedrollo"
            isAction={false}
         />
        <CardComponent
          image="/pompeImmerge.jpg"
          title="Pompes immergées"
          description="Pour les puits profonds."
         end="Marques: Willo, Lowara, Grundfos ,Pedrollo"
          isAction={false}
        />
        <CardComponent
          image="/pompePicine.jpg"
          title="Pompes de piscine"
          description="Adaptées aux circuits fermés."
         
         end=" Marques: Astral Pool, Aqualux."
          isAction={false}
         />
        </div>
      </div>

      {/* Bassin d'accumulation */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-2 lg:p-8 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
            <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-green-800">🏞️ Bassin d'accumulation</h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed text-justify">
              Les bassins d'accumulation permettent de stocker de grandes quantités d'eau afin de gérer son utilisation de manière rationnelle. Ils servent d'intermédiaire entre la source d'eau (puits, forage, rivière) et le système d'irrigation.
              Leur capacité varie selon les besoins de l'exploitation agricole.
            </p>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/bassinService.webp"
                alt="Bassin d'accumulation"
                className="w-full h-32 sm:h-48 lg:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Système solaire */}
      <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-2 lg:p-8 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          <div className="space-y-3 sm:space-y-4 order-2 lg:order-2">
            <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-green-800">☀️ Système solaire (pompage/irrigation)</h2>
             <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed text-justify">
              Pour une agriculture durable et autonome, l'utilisation de l'énergie solaire dans le pompage et l'irrigation est fortement recommandée. IRIMATEC propose des systèmes solaires photovoltaïques adaptés à chaque type d'installation.
            </p>
          </div>
          <div className="relative order-1 lg:order-1">
            <div className="rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/solaireService.jpg"
                alt="Système solaire"
                className="w-full h-32 sm:h-48 lg:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}