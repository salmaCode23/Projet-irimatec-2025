import BtnContact from "./BtnContact";

export default function hero({ titre1,titre2, urlImage, paragraph }){
    return(
            <div>
        <header
        className="relative h-[520px] bg-cover bg-center"
        style={{
          backgroundImage:`url(${urlImage})`,
         }}
      >
       
 <div className="absolute inset-0 bg-black/40"></div>
        {/* Contenu texte */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-7xl mx-auto px-16  text-white">
         <div className="  p-6"> <h1 className="text-4xl md:text-5xl font-bold">
            {titre1}{" "}
            <span className="text-green-500">{titre2}</span>
          </h1>
          <p className="mt-4 text-lg max-w-xl ">
            {paragraph}
          </p>
        <BtnContact/>
          </div>
        </div>
      </header>
    </div>
    )
}