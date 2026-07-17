// ✅ Importation des icônes + ajout de InformationCircleIcon pour "MS LES INFO"
import { PhoneIcon, EnvelopeIcon, MapPinIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import axios from "axios";
import AlertS from '../components/AlertS';

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    phone: ""
  });
  const [status, setStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

   

  try {
    await axios.post("http://127.0.0.1:3000/api/contact", form);
    setStatus("Message envoyé avec succès !");
    setShowAlert(true);

    // ✅ Masquer l’alerte après 3 secondes
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    setForm({ name: "", email: "", message: "", phone: "" });
  } catch (error) {
    console.error(error);
    setStatus("Erreur lors de l'envoi. Réessayez !");
    alert("Erreur lors de l'envoi. Réessayez !");
  }


  };

  return (
    <div>
      <header className="relative h-[100px] md:h-[200px] bg-cover bg-center bg-[url('./bgContact.png')]" />

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Section header */}
          <div className="text-center mb-16 ">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Contactez IRIMATEC dès aujourd'hui !
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
              Chez IRIMATEC, nous nous engageons à vous offrir un accompagnement 
              personnalisé et réactif. Que ce soit pour obtenir des informations sur nos 
              services, demander un devis sur mesure ou bénéficier d'un conseil technique.
            </p>
          </div>

          {/* ✅ Ici px-2 au lieu de px-4 pour réduire la marge sur mobile, mais md: reste inchangé */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 px-2 sm:px-6 lg:px-8">
            
            {/* Formulaire de contact */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Formulaire de contact
              </h2>
              <p className="text-gray-600 mb-7 text-sm">
                Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Nom complet *
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <div className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="votre.email@exemple.com"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                    <div className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Telephone *
                    </div>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="0700000000"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition-all text-sm"
                    />
                  </div>
                

                <div>
                  <div className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Décrivez votre projet ou votre demande..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition-all resize-none text-sm"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={status === "Envoi en cours..."}
                  className="w-full bg-green-700 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <EnvelopeIcon className="w-4 h-4" />
                  {status === "Envoi en cours..." ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </div>
            </div>

            {/* Infos + Map */}
            <div className="space-y-4">
              
               <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 space-y-4">
                {/* Adresse */}
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <MapPinIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Adresse</h3>
                    <p className="text-gray-600 text-sm">SIDI YAHIA ZAERS TAMESNA</p>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <PhoneIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Téléphone</h3>
                    <p className="text-gray-600 text-sm">0537619595</p>
                    <p className="text-xs text-gray-500">Lun - Ven: 8h00 - 18h00</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <EnvelopeIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Email</h3>
                    <p className="text-gray-600 text-sm">irimatec2@gmail.com</p>
                    <p className="text-xs text-gray-500">Réponse sous 24h</p>
                  </div>
                </div>

              
              </div>

              {/* Carte Google Map */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPinIcon className="w-4 h-4 text-green-600" />
                  <h3 className="font-semibold text-gray-900 text-sm">Notre localisation</h3>
                </div>
                 <div className="relative h-48 sm:h-64 md:h-32 bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d877.8862812543839!2d-6.907179108294146!3d33.831532405883316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda711006a51166b%3A0x3329e29749b76a41!2sSTE%20IRIMATEC%20SARL!5e1!3m2!1sen!2sma!4v1756288244453!5m2!1sen!2sma"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Affichage de l’alerte en cas de succès */}
        {showAlert && <AlertS />}
      </div>
    </div>
  );
}

export default Contact;
