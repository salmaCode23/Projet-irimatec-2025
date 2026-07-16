import { PhoneIcon, EnvelopeIcon ,MapPinIcon} from '@heroicons/react/24/outline';


function Footer() {

  return (
    <div >
    <div className="bg-black md:grid grid-cols-3  ">
        <div className=" p-4 ">
            <img src='./logoF.png' className='w-1/2'></img>
            <p className="text-white text-justify px-6">IRIMATEC - Société d’étude Hydraulique et
               réalisation de projets Créée en 11/10/2007, 
               propose de nombreux services. Nous sommes
               constitués d’un ensemble de compétences.</p>
        </div>

    <div className='px-9 py-4'>
        <h1 className=" text-green-700  font-bold py-4" >CONTACT</h1>
        <ul className=" text-white ">
          <li className='flex '><MapPinIcon className="w-6 h-6 text-white-500 mr-3 "/> SIDI YAHIA ZAERS TAMESNA</li>
          <li className='flex '>
            <EnvelopeIcon className="w-6 h-6 text-white-500 mr-3" />
            <span>irimatec2@gmail.com</span></li>
          <li className='flex'><PhoneIcon className="w-6 h-6 text-white-500 mr-3" /> 0537619595</li>
 
        </ul>
    </div>

 <div className="w-full max-w-4xl mx-auto">
  <div className="w-full">
    <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d877.8862812543839!2d-6.907179108294146!3d33.831532405883316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda711006a51166b%3A0x3329e29749b76a41!2sSTE%20IRIMATEC%20SARL!5e1!3m2!1sen!2sma!4v1756288244453!5m2!1sen!2sma"
    className="w-full h-[200px] border-0"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
   </div>
</div>

 </div>

    <footer className="bg-green-800 text-white text-center p-4">
      © 2025 IRIMATEC - Tous droits réservés
    </footer>
    </div> 
  );
}

export default Footer;

