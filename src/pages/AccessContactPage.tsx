import React, { useState } from 'react';
import {
  Building,
  Check,
  Clock,
  Compass,
  Copy,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { CLINIC_INFO, Language, PageId } from '../data/clinicData';
import { ChamsEmblem, ChamsLogoMark } from '../components/ChamsEmblem';
import { GeolocationMap } from '../components/GeolocationMap';

interface AccessContactPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const AccessContactPage: React.FC<AccessContactPageProps> = ({
  lang,
  onNavigate,
}) => {
  const [name, setName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !senderPhone.trim()) return;
    setSentSuccess(true);
  };

  const getWhatsAppMessageUrl = () => {
    const text = [
      `Bonjour Cabinet Médical CHAMS Diamalaye (Dr Aboubacry THIAM),`,
      `Message de: ${name}`,
      `Tél: ${senderPhone}`,
      senderEmail ? `Email: ${senderEmail}` : '',
      `Message: ${message}`,
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="py-12 lg:py-16 bg-[#FAF9F5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-10">
        {/* Page Header with Logo next to Title */}
        <div className="pb-8 border-b border-stone-200/80">
          <div className="flex items-center gap-3 mb-2">
            <ChamsLogoMark size="sm" />
            <p className="text-xs font-semibold text-[#0D5C3A] tracking-wide uppercase">
              {lang === 'fr' ? 'Localisation, Horaires & Contact' : 'Location, Hours & Direct Contact'}
            </p>
          </div>

          <h1 className="text-3xl lg:text-4xl font-display font-semibold text-[#111C18]">
            {lang === 'fr'
              ? 'Accès au Cabinet Médical CHAMS & Coordonnées'
              : 'Directions to Cabinet Médical CHAMS & Contact'}
          </h1>

          <p className="text-sm text-stone-600 max-w-3xl leading-relaxed mt-2.5">
            {lang === 'fr'
              ? 'Le Cabinet Médical CHAMS est idéalement situé au Rond Point Brioche Dorée à Yoff Diamalaye, juste au-dessus de la Pharmacie Diam Athie. Ouvert du lundi au samedi de 09h00 à 18h00 et sur rendez-vous.'
              : 'Cabinet Médical CHAMS is ideally located at Rond Point Brioche Dorée in Yoff Diamalaye, directly above Pharmacie Diam Athie. Open Monday to Saturday from 09:00 to 18:00 and by appointment.'}
          </p>
        </div>

        {/* Interactive Geolocation & Navigation Map Component */}
        <GeolocationMap lang={lang} />

        {/* 2-Column Split: Detailed Location & Hours + Interactive Message / Urgent Dispatch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 items-start">
          {/* Left 6 Columns: Access Guide, Photo of Building & Landmarks */}
          <div className="lg:col-span-6 space-y-6">
            {/* Visual Photo Card of the Actual Building */}
            <div className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs">
              <div className="relative h-64 sm:h-72 w-full bg-stone-100">
                <img
                  src={CLINIC_INFO.buildingImage}
                  alt="Dr Aboubacry THIAM au Cabinet Médical CHAMS à Yoff Diamalaye Dakar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                {/* Visual Location Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular text-emerald-200 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>YOFF DIAMALAYE · ROND POINT BRIOCHE DORÉE</span>
                  </div>
                  <p className="text-white font-display font-semibold text-base sm:text-lg">
                    {lang === 'fr'
                      ? 'Cabinet Médical CHAMS · Dr Aboubacry THIAM (1er étage)'
                      : 'Cabinet Médical CHAMS · Dr. Aboubacry THIAM (1st Floor)'}
                  </p>
                  <p className="text-white/85 text-xs mt-0.5">
                    {lang === 'fr'
                      ? 'Au-dessus de la Pharmacie Diam Athie · Rond Point Brioche Dorée'
                      : 'Above Pharmacie Diam Athie · Rond Point Brioche Dorée'}
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A]">
                  <MapPin className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'Adresse Officielle & Accès' : 'Official Address & Directions'}</span>
                </div>

                <h2 className="text-xl font-display font-semibold text-[#111C18]">
                  {CLINIC_INFO.addressLine1}
                </h2>

                <p className="text-sm text-stone-700 leading-relaxed">
                  {CLINIC_INFO.addressLine2}, {CLINIC_INFO.city}
                </p>

                {/* Step-by-step Wayfinding Guide */}
                <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-2.5 text-xs">
                  <p className="font-semibold text-[#111C18]">
                    {lang === 'fr' ? 'Itinéraire simplifié en 3 étapes :' : 'Simple 3-step directions:'}
                  </p>

                  <div className="space-y-2 text-stone-700">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-[#0D5C3A]">1.</span>
                      <span>
                        <strong>Rond Point Brioche Dorée :</strong>{' '}
                        {lang === 'fr'
                          ? 'Rejoignez le carrefour de la Brioche Dorée à Yoff Diamalaye.'
                          : 'Reach the Brioche Dorée roundabout at Yoff Diamalaye.'}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="font-bold text-[#0D5C3A]">2.</span>
                      <span>
                        <strong>Pharmacie Diam Athie :</strong>{' '}
                        {lang === 'fr'
                          ? 'Repérez la pharmacie au rez-de-chaussée du bâtiment vert.'
                          : 'Spot Pharmacie Diam Athie at the ground floor of the green building.'}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="font-bold text-[#0D5C3A]">3.</span>
                      <span>
                        <strong>Cabinet Médical CHAMS :</strong>{' '}
                        {lang === 'fr'
                          ? 'Montez au premier étage (Dr Aboubacry THIAM).'
                          : 'Head up to the first floor (Dr. Aboubacry THIAM).'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          'Cabinet Médical CHAMS Diamalaye, Yoff Diamalaye, Rond Point Brioche Dorée, au dessus de la Pharmacie Diam Athie, Dakar',
                          'addr'
                        )
                      }
                      className="inline-flex items-center gap-1.5 font-semibold text-[#0D5C3A] hover:underline cursor-pointer"
                    >
                      {copiedKey === 'addr' ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {copiedKey === 'addr'
                          ? lang === 'fr'
                            ? 'Adresse copiée !'
                            : 'Copied!'
                          : lang === 'fr'
                          ? 'Copier l’adresse complète pour taxi'
                          : 'Copy full address for taxi'}
                      </span>
                    </button>
                    <span className="font-mono-tabular text-stone-500">Yoff · Dakar</span>
                  </div>
                </div>

                {/* Consultation Hours */}
                <div className="p-4 bg-[#EBF3EE] border border-[#0D5C3A]/20 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A]">
                    <Clock className="w-4 h-4" />
                    <span>{lang === 'fr' ? 'Horaires d’Accueil' : 'Consultation Hours'}</span>
                  </div>
                  <p className="font-mono-tabular text-base font-bold text-[#111C18]">
                    09h 00 – 18 h 00 & Sur Rendez-vous
                  </p>
                  <p className="text-xs text-stone-700">
                    {lang === 'fr'
                      ? 'Du Lundi au Samedi · Urgences médicales et visites à domicile sur appel direct.'
                      : 'Monday to Saturday · Medical emergencies & house calls via direct call.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Telephone Numbers Card */}
            <div className="bg-[#0D5C3A] text-white rounded-2xl p-6 sm:p-8 space-y-4">
              <p className="text-xs font-mono-tabular text-emerald-200">
                LIGNES TÉLÉPHONIQUES DIRECTES
              </p>
              <h3 className="text-xl font-display font-semibold text-white">
                Secrétariat & Urgences Médicales
              </h3>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <div>
                    <span className="block text-xs text-emerald-100">Ligne Principale :</span>
                    <span className="font-mono-tabular text-sm font-bold text-white">
                      {CLINIC_INFO.phonePrimary}
                    </span>
                  </div>
                  <a
                    href={`tel:${CLINIC_INFO.phonePrimaryRaw}`}
                    className="px-3 py-1.5 text-xs font-bold bg-[#D9E852] text-[#0D5C3A] rounded-lg"
                  >
                    Appeler
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <div>
                    <span className="block text-xs text-emerald-100">Ligne Directe / Domicile :</span>
                    <span className="font-mono-tabular text-sm font-bold text-white">
                      {CLINIC_INFO.phoneSecondary}
                    </span>
                  </div>
                  <a
                    href={`tel:${CLINIC_INFO.phoneSecondaryRaw}`}
                    className="px-3 py-1.5 text-xs font-bold bg-[#D9E852] text-[#0D5C3A] rounded-lg"
                  >
                    Appeler
                  </a>
                </div>
              </div>

              <div className="pt-2 text-xs text-emerald-100 flex items-center justify-between">
                <span>E-mail direct :</span>
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="font-mono-tabular font-medium text-white hover:underline"
                >
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Direct Message & Triage Form */}
          <div className="lg:col-span-6 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <h3 className="text-xl font-display font-semibold text-[#111C18]">
                {lang === 'fr' ? 'Envoyer un Message au Cabinet' : 'Send a Message to the Clinic'}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {lang === 'fr'
                  ? 'Pour toute question administrative, demande de renseignements ou suivi.'
                  : 'For administrative inquiries, clinic questions, or patient follow-up.'}
              </p>
            </div>

            {sentSuccess ? (
              <div className="p-6 bg-[#F1F6F3] border border-[#0D5C3A]/25 rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A]">
                  <Check className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'MESSAGE ENREGISTRÉ' : 'MESSAGE LOGGED'}</span>
                </div>
                <p className="text-sm text-stone-800">
                  {lang === 'fr'
                    ? `Merci ${name}. Votre message a été préparé pour le Dr Aboubacry THIAM.`
                    : `Thank you ${name}. Your message is ready for Dr. Aboubacry THIAM.`}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={getWhatsAppMessageUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'fr' ? 'Envoyer sur WhatsApp' : 'Send via WhatsApp'}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSentSuccess(false)}
                    className="px-3.5 py-2.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    {lang === 'fr' ? 'Nouveau message' : 'New message'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'fr' ? 'Votre Nom complet *' : 'Your Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Awa Diagne"
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] focus:outline-none focus:border-[#0D5C3A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {lang === 'fr' ? 'Téléphone *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder="+221 77 000 00 00"
                      className="w-full px-3.5 py-2 text-sm font-mono-tabular bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] focus:outline-none focus:border-[#0D5C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {lang === 'fr' ? 'Adresse E-mail' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="nom@exemple.sn"
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] focus:outline-none focus:border-[#0D5C3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'fr' ? 'Votre Message ou Question *' : 'Your Message or Question *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      lang === 'fr'
                        ? 'Posez votre question concernant les consultations, les visites à domicile ou la médecine d’entreprise...'
                        : 'Ask your question regarding clinic visits, home visits, or corporate healthcare...'
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] focus:outline-none focus:border-[#0D5C3A]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-stone-500">
                    {lang === 'fr'
                      ? 'Réponse rapide par téléphone ou WhatsApp.'
                      : 'Prompt reply by telephone or WhatsApp.'}
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg transition-colors cursor-pointer"
                  >
                    {lang === 'fr' ? 'Envoyer le message' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}

            {/* Official Credentials Box */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 flex items-center gap-4">
              <ChamsEmblem size="sm" className="shrink-0" />
              <div className="text-xs text-stone-600 space-y-0.5">
                <p className="font-semibold text-[#111C18]">{CLINIC_INFO.doctor}</p>
                <p className="font-mono-tabular text-stone-500">{CLINIC_INFO.onmsNumber}</p>
                <p className="text-[11px] text-stone-500">{CLINIC_INFO.ministerialDecree}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
