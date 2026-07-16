import Hero from "../components/Hero";
import PresentationHome from "../components/PresentationHome";
import ServiceSection from "../components/ServiceSection";
 

function Home() {
  return ( 
   <div>
      {/* Bannière */}
    
   <Hero titre1='Bienvenue sur' titre2='IRIMATEC' urlImage='./bgHome.avif' paragraph='Un savoir-faire reconnu pour des solutions sur mesure, dans les meilleurs délais.' />
   
    <PresentationHome  />

    <ServiceSection   />
</div> 

  );
}

export default Home;
