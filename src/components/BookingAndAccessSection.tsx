import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Check,
  Clock,
  Copy,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import {
  CLINIC_INFO,
  Language,
  SPECIALTIES,
} from '../data/clinicData';

export type ConsultationMode = 'cabinet' | 'domicile' | 'entreprise';

interface BookingAndAccessSectionProps {
  lang: Language;
  preselectedSpecialtyId: string;
  preselectedMode: ConsultationMode;
}

interface SubmittedAppointment {
  referenceCode: string;
  patientName: string;
  phone: string;
  email: string;
  mode: ConsultationMode;
  specialtyTitle: string;
  preferredDate: string;
  preferredTime: string;
  neighborhoodOrCompany: string;
  notes: string;
}

const TIME_SLOTS = [
  '09h00',
  '10h00',
  '11h00',
  '12h00',
  '14h30',
  '15h30',
  '16h30',
  '17h30',
  'Urgence / Sur RDV',
];

export const BookingAndAccessSection: React.FC<BookingAndAccessSectionProps> = ({
  lang,
  preselectedSpecialtyId,
  preselectedMode,
}) => {
  const [mode, setMode] = useState<ConsultationMode>(preselectedMode);
  const [specialtyId, setSpecialtyId] = useState<string>(preselectedSpecialtyId);
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-10-14');
  const [preferredTime, setPreferredTime] = useState('10h00');
  const [neighborhoodOrCompany, setNeighborhoodOrCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedBooking, setSubmittedBooking] = useState<SubmittedAppointment | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    setSpecialtyId(preselectedSpecialtyId);
  }, [preselectedSpecialtyId]);

  useEffect(() => {
    setMode(preselectedMode);
  }, [preselectedMode]);

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = patientName.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setFormError(
        lang === 'fr'
          ? 'Veuillez renseigner votre nom complet.'
          : 'Please enter your full name.'
      );
      return;
    }

    const phoneRegex = /^[+\d\s()-]{7,20}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      setFormError(
        lang === 'fr'
          ? 'Veuillez saisir un numéro de téléphone valide (ex: +221 77 000 00 00).'
          : 'Please enter a valid phone number (e.g. +221 77 000 00 00).'
      );
      return;
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError(
        lang === 'fr'
          ? 'Format d’adresse e-mail invalide.'
          : 'Invalid email address format.'
      );
      return;
    }

    if ((mode === 'domicile' || mode === 'entreprise') && neighborhoodOrCompany.trim().length < 3) {
      setFormError(
        lang === 'fr'
          ? mode === 'domicile'
            ? 'Veuillez préciser votre quartier ou adresse à Dakar pour la visite à domicile.'
            : 'Veuillez indiquer le nom de votre entreprise ou organisation.'
          : mode === 'domicile'
          ? 'Please specify your neighborhood or address in Dakar for the house call.'
          : 'Please specify your company or organization name.'
      );
      return;
    }

    const selectedSpec =
      SPECIALTIES.find((s) => s.id === specialtyId) || SPECIALTIES[0];
    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    setSubmittedBooking({
      referenceCode: `CHAMS-${randomDigits}`,
      patientName: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      mode,
      specialtyTitle: selectedSpec.title[lang],
      preferredDate,
      preferredTime,
      neighborhoodOrCompany: neighborhoodOrCompany.trim(),
      notes: notes.trim(),
    });
  };

  const getWhatsAppUrl = (booking: SubmittedAppointment) => {
    const modeLabel =
      booking.mode === 'cabinet'
        ? 'Consultation au Cabinet (Yoff Diamalaye)'
        : booking.mode === 'domicile'
        ? 'Visite Médicale à Domicile / Urgence'
        : "Convention Médecine d'Entreprise";

    const message = [
      `Bonjour Dr Aboubacry THIAM (Cabinet Médical CHAMS Diamalaye),`,
      `Réf: ${booking.referenceCode}`,
      `Patient / Contact: ${booking.patientName}`,
      `Tél: ${booking.phone}`,
      `Type: ${modeLabel}`,
      `Spécialité: ${booking.specialtyTitle}`,
      `Date & Créneau souhaités: ${booking.preferredDate} à ${booking.preferredTime}`,
      booking.neighborhoodOrCompany ? `Lieu / Entreprise: ${booking.neighborhoodOrCompany}` : '',
      booking.notes ? `Précisions: ${booking.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="rendez-vous" className="py-20 lg:py-24 bg-[#FAF9F5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-stone-200/80">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#0D5C3A] tracking-wide mb-2">
              {lang === 'fr'
                ? 'Prise de Rendez-vous & Accès · 09h00 – 18h00'
                : 'Appointments & Clinic Access · 09:00 – 18:00'}
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#111C18] text-balance">
              {lang === 'fr'
                ? 'Planifiez votre consultation au cabinet, une visite à domicile ou un bilan d’entreprise'
                : 'Schedule a clinic visit, physician house call, or corporate medical checkup'}
            </h2>
          </div>
          <div className="text-xs text-stone-600 font-mono-tabular">
            <span>Tél: {CLINIC_INFO.phonePrimary}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{CLINIC_INFO.phoneSecondary}</span>
          </div>
        </div>

        {/* Main 2-Column Split: 7 Cols Interactive Booking Form + 5 Cols Yoff Diamalaye Access Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 items-start">
          {/* Left 7 Columns: Interactive Appointment Engine */}
          <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8">
            {/* Mode Selector Tabs */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-stone-700 mb-2.5">
                {lang === 'fr' ? '1. Choisissez le mode de prise en charge' : '1. Select consultation mode'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-[#EFECE4] rounded-xl border border-stone-200/70">
                <button
                  type="button"
                  onClick={() => {
                    setMode('cabinet');
                    setSubmittedBooking(null);
                  }}
                  className={`px-3 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    mode === 'cabinet'
                      ? 'bg-[#0D5C3A] text-white shadow-xs'
                      : 'text-stone-700 hover:text-[#111C18]'
                  }`}
                >
                  {lang === 'fr' ? 'Au Cabinet (Diamalaye)' : 'At the Clinic'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('domicile');
                    setSubmittedBooking(null);
                  }}
                  className={`px-3 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    mode === 'domicile'
                      ? 'bg-[#0D5C3A] text-white shadow-xs'
                      : 'text-stone-700 hover:text-[#111C18]'
                  }`}
                >
                  {lang === 'fr' ? 'Visite à Domicile / Urgence' : 'Home Visit / Urgent'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('entreprise');
                    setSpecialtyId('medecine-entreprise');
                    setSubmittedBooking(null);
                  }}
                  className={`px-3 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    mode === 'entreprise'
                      ? 'bg-[#0D5C3A] text-white shadow-xs'
                      : 'text-stone-700 hover:text-[#111C18]'
                  }`}
                >
                  {lang === 'fr' ? "Médecine d'Entreprise" : 'Corporate Medicine'}
                </button>
              </div>
            </div>

            {submittedBooking ? (
              <div className="p-6 bg-[#F1F6F3] border border-[#0D5C3A]/25 rounded-xl space-y-5">
                <div className="flex items-start justify-between gap-4 border-b border-[#0D5C3A]/15 pb-4">
                  <div>
                    <p className="text-xs font-mono-tabular font-semibold text-[#0D5C3A]">
                      {lang === 'fr' ? 'DEMANDE ENREGISTRÉE' : 'APPOINTMENT REQUEST LOGGED'} · {submittedBooking.referenceCode}
                    </p>
                    <h3 className="text-xl font-display font-semibold text-[#111C18] mt-1">
                      {lang === 'fr'
                        ? `Merci, ${submittedBooking.patientName}`
                        : `Thank you, ${submittedBooking.patientName}`}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyText(submittedBooking.referenceCode, 'ref')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tabular font-medium bg-white border border-stone-200 rounded-lg text-stone-700 hover:text-[#0D5C3A] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedKey === 'ref' ? <Check className="w-3.5 h-3.5 text-[#0D5C3A]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'ref' ? (lang === 'fr' ? 'Copié' : 'Copied') : submittedBooking.referenceCode}</span>
                  </button>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <dt className="text-stone-500">{lang === 'fr' ? 'Spécialité médicale' : 'Medical Specialty'}</dt>
                    <dd className="font-semibold text-[#111C18] mt-0.5">{submittedBooking.specialtyTitle}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">{lang === 'fr' ? 'Date & Créneau souhaités' : 'Preferred Date & Slot'}</dt>
                    <dd className="font-mono-tabular font-semibold text-[#111C18] mt-0.5">
                      {submittedBooking.preferredDate} · {submittedBooking.preferredTime}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">{lang === 'fr' ? 'Téléphone de contact' : 'Contact Phone'}</dt>
                    <dd className="font-mono-tabular font-semibold text-[#111C18] mt-0.5">{submittedBooking.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">{lang === 'fr' ? 'Mode de consultation' : 'Consultation Mode'}</dt>
                    <dd className="font-semibold text-[#0D5C3A] mt-0.5">
                      {submittedBooking.mode === 'cabinet'
                        ? lang === 'fr'
                          ? 'Au Cabinet — Yoff Diamalaye'
                          : 'At the Clinic — Yoff Diamalaye'
                        : submittedBooking.mode === 'domicile'
                        ? lang === 'fr'
                          ? `À Domicile (${submittedBooking.neighborhoodOrCompany})`
                          : `Home Visit (${submittedBooking.neighborhoodOrCompany})`
                        : lang === 'fr'
                        ? `Entreprise (${submittedBooking.neighborhoodOrCompany})`
                        : `Corporate (${submittedBooking.neighborhoodOrCompany})`}
                    </dd>
                  </div>
                </dl>

                <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-[#0D5C3A]/15">
                  {lang === 'fr'
                    ? 'Vous pouvez transmettre immédiatement ce récapitulatif au secrétariat du Dr Aboubacry THIAM par WhatsApp ou par e-mail, ou appeler directement pour une urgence.'
                    : 'You can send this summary directly to Dr. Aboubacry THIAM’s desk via WhatsApp or email, or call directly for urgent care.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={getWhatsAppUrl(submittedBooking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'fr'
                        ? 'Envoyer par WhatsApp (+221 78 538 20 20)'
                        : 'Send via WhatsApp (+221 78 538 20 20)'}
                    </span>
                  </a>

                  <a
                    href={`mailto:${CLINIC_INFO.email}?subject=${encodeURIComponent(
                      `Demande de RDV ${submittedBooking.referenceCode} - ${submittedBooking.patientName}`
                    )}&body=${encodeURIComponent(
                      `Patient: ${submittedBooking.patientName}\nTéléphone: ${submittedBooking.phone}\nSpécialité: ${submittedBooking.specialtyTitle}\nDate & Heure: ${submittedBooking.preferredDate} à ${submittedBooking.preferredTime}\nNotes: ${submittedBooking.notes}`
                    )}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#111C18] bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{lang === 'fr' ? 'Envoyer par E-mail' : 'Send via Email'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedBooking(null)}
                    className="px-3.5 py-2.5 text-xs font-medium text-stone-600 hover:text-[#111C18] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {lang === 'fr' ? 'Modifier la demande' : 'Edit Request'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {formError && (
                  <div
                    role="alert"
                    className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-800"
                  >
                    {formError}
                  </div>
                )}

                {/* Specialty Select */}
                <div>
                  <label
                    htmlFor="specialty-select"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    {lang === 'fr' ? '2. Spécialité ou motif médical' : '2. Medical Specialty or Reason'}
                  </label>
                  <select
                    id="specialty-select"
                    value={specialtyId}
                    onChange={(e) => setSpecialtyId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] focus:outline-none focus:border-[#0D5C3A]"
                  >
                    {SPECIALTIES.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.index}. {spec.title[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Patient Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="patient-name"
                      className="block text-xs font-semibold text-stone-700 mb-1.5"
                    >
                      {lang === 'fr' ? 'Nom et Prénom *' : 'Full Name *'}
                    </label>
                    <input
                      id="patient-name"
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder={lang === 'fr' ? 'Ex: Moussa Diop' : 'e.g. Moussa Diop'}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] placeholder:text-stone-400 focus:outline-none focus:border-[#0D5C3A]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="patient-phone"
                      className="block text-xs font-semibold text-stone-700 mb-1.5"
                    >
                      {lang === 'fr' ? 'Téléphone (Appel / WhatsApp) *' : 'Phone Number (Call / WhatsApp) *'}
                    </label>
                    <input
                      id="patient-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+221 77 000 00 00"
                      className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] placeholder:text-stone-400 focus:outline-none focus:border-[#0D5C3A]"
                    />
                  </div>
                </div>

                {/* Conditional Address / Company Field when Home Visit or Corporate is selected */}
                {(mode === 'domicile' || mode === 'entreprise') && (
                  <div>
                    <label
                      htmlFor="location-company"
                      className="block text-xs font-semibold text-stone-700 mb-1.5"
                    >
                      {mode === 'domicile'
                        ? lang === 'fr'
                          ? 'Quartier & Point de repère à Dakar (pour visite à domicile) *'
                          : 'Neighborhood & Landmark in Dakar (for Home Visit) *'
                        : lang === 'fr'
                        ? 'Nom de l’entreprise & Effectif estimé *'
                        : 'Company Name & Estimated Headcount *'}
                    </label>
                    <input
                      id="location-company"
                      type="text"
                      value={neighborhoodOrCompany}
                      onChange={(e) => setNeighborhoodOrCompany(e.target.value)}
                      placeholder={
                        mode === 'domicile'
                          ? lang === 'fr'
                            ? 'Ex: Yoff Diamalaye, Cité Djily Mbaye, Virage, Ngor...'
                            : 'e.g. Yoff Diamalaye, Cité Djily Mbaye, Virage, Ngor...'
                          : lang === 'fr'
                          ? 'Ex: Société Atlantique Dakar — 25 collaborateurs'
                          : 'e.g. Atlantic Logistics Dakar — 25 employees'
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] placeholder:text-stone-400 focus:outline-none focus:border-[#0D5C3A]"
                    />
                  </div>
                )}

                {/* Date & Time Slot Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="preferred-date"
                      className="block text-xs font-semibold text-stone-700 mb-1.5"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0D5C3A]" />
                        <span>{lang === 'fr' ? 'Date souhaitée' : 'Preferred Date'}</span>
                      </span>
                    </label>
                    <input
                      id="preferred-date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] focus:outline-none focus:border-[#0D5C3A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="preferred-email"
                      className="block text-xs font-semibold text-stone-700 mb-1.5"
                    >
                      {lang === 'fr' ? 'E-mail (optionnel)' : 'Email Address (optional)'}
                    </label>
                    <input
                      id="preferred-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patient@exemple.sn"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] placeholder:text-stone-400 focus:outline-none focus:border-[#0D5C3A]"
                    />
                  </div>
                </div>

                {/* Time Slot Buttons */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#0D5C3A]" />
                      <span>
                        {lang === 'fr'
                          ? 'Créneau horaire (Ouvert de 09h00 à 18h00 & sur Rendez-vous)'
                          : 'Preferred Time Slot (Open 09:00 to 18:00 & by Appointment)'}
                      </span>
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const active = preferredTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setPreferredTime(slot)}
                          className={`px-3 py-1.5 text-xs font-mono-tabular rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            active
                              ? 'bg-[#0D5C3A] border-[#0D5C3A] text-white font-semibold'
                              : 'bg-[#FAF9F5] border-stone-300 text-stone-700 hover:border-[#0D5C3A]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Clinical Notes */}
                <div>
                  <label
                    htmlFor="clinical-notes"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    {lang === 'fr'
                      ? 'Symptômes ou informations utiles pour le Dr Aboubacry THIAM (optionnel)'
                      : 'Symptoms or helpful context for Dr. Aboubacry THIAM (optional)'}
                  </label>
                  <textarea
                    id="clinical-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      lang === 'fr'
                        ? 'Précisez votre demande (renouvellement ordonnance, contrôle HTA/diabète, douleurs digestives, suivi pédiatrique...)'
                        : 'Describe your request (prescription renewal, BP/diabetes check, digestive symptoms, pediatric visit...)'
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] placeholder:text-stone-400 focus:outline-none focus:border-[#0D5C3A]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-stone-500">
                    {lang === 'fr'
                      ? 'Secret médical strictement respecté · Confirmation rapide par téléphone.'
                      : 'Strict medical confidentiality · Fast confirmation by telephone.'}
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-3 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {lang === 'fr' ? 'Valider la demande de RDV' : 'Confirm Appointment Request'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right 5 Columns: Access Landmark Guide, Hours & Direct Telephone Lines */}
          <div id="acces-horaires" className="lg:col-span-5 space-y-6">
            {/* Location & Landmark Card with Real Building Image */}
            <div className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs">
              <div className="relative h-48 sm:h-52 w-full bg-stone-100">
                <img
                  src={CLINIC_INFO.buildingImage}
                  alt="Dr Aboubacry THIAM au Cabinet Médical CHAMS"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 text-white text-xs">
                  <p className="font-semibold text-xs">
                    {lang === 'fr'
                      ? 'Dr Aboubacry THIAM · Cabinet Médical CHAMS (1er étage)'
                      : 'Dr. Aboubacry THIAM · Cabinet Médical CHAMS (1st Floor)'}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A] mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {lang === 'fr' ? 'Localisation exacte à Dakar' : 'Exact Clinic Location in Dakar'}
                  </span>
                </div>

                <h3 className="text-xl font-display font-semibold text-[#111C18]">
                  Yoff Diamalaye — Rond Point Brioche Dorée
                </h3>

                <p className="text-sm text-stone-700 mt-2 leading-relaxed">
                  {lang === 'fr'
                    ? 'Au-dessus de la Pharmacie Diam Athie (juste à côté de la Brioche Dorée), Yoff Diamalaye, Dakar, Sénégal.'
                    : 'Directly above Pharmacie Diam Athie (right next to Brioche Dorée), Yoff Diamalaye, Dakar, Senegal.'}
                </p>

                {/* Architectural Schematic Landmark Map */}
                <div className="mt-5 p-4 bg-[#F3F1EA] border border-stone-200/90 rounded-xl">
                <p className="text-xs font-semibold text-[#111C18] mb-3">
                  {lang === 'fr' ? 'Repères d’accès immédiats' : 'Immediate Access Landmarks'}
                </p>
                <div className="space-y-2.5 text-xs text-stone-700">
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-stone-200/80">
                    <span className="text-stone-500">
                      {lang === 'fr' ? 'Carrefour principal' : 'Primary Junction'}
                    </span>
                    <span className="font-semibold text-[#111C18] text-right">
                      Rond Point Brioche Dorée (Yoff Diamalaye)
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-stone-200/80">
                    <span className="text-stone-500">
                      {lang === 'fr' ? 'Rez-de-chaussée' : 'Ground Floor Landmark'}
                    </span>
                    <span className="font-semibold text-[#111C18] text-right">
                      Pharmacie Diam Athie
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-stone-500">
                      {lang === 'fr' ? 'Étage du Cabinet' : 'Clinic Floor'}
                    </span>
                    <span className="font-semibold text-[#0D5C3A] text-right">
                      {lang === 'fr'
                        ? 'Au-dessus de la Pharmacie Diam Athie'
                        : 'Above Pharmacie Diam Athie'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(
                        'Cabinet Médical CHAMS Diamalaye, Yoff Diamalaye, Rond Point Brioche Dorée, au dessus de la Pharmacie Diam Athie, Dakar',
                        'address'
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D5C3A] hover:underline cursor-pointer"
                  >
                    {copiedKey === 'address' ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {copiedKey === 'address'
                        ? lang === 'fr'
                          ? 'Adresse copiée'
                          : 'Address copied'
                        : lang === 'fr'
                        ? 'Copier l’adresse complète'
                        : 'Copy full address'}
                    </span>
                  </button>
                  <span className="text-xs font-mono-tabular text-stone-500">Dakar · Yoff</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Phone & Hours Card */}
            <div className="bg-[#0D5C3A] text-white rounded-2xl p-6 sm:p-8">
              <p className="text-xs font-mono-tabular text-emerald-100/90">
                {lang === 'fr'
                  ? 'HORAIRES & URGENCES MÉDICALES'
                  : 'CLINIC HOURS & MEDICAL EMERGENCIES'}
              </p>
              <h3 className="text-2xl font-display font-semibold mt-1">
                9h 00 – 18 h & Sur Rendez-vous
              </h3>
              <p className="text-xs text-emerald-50/90 leading-relaxed mt-2">
                {lang === 'fr'
                  ? 'Pour toute urgence médicale ou demande de consultation à domicile à Yoff Diamalaye et environs, appelez directement nos lignes médicales :'
                  : 'For any medical emergency or physician home visit request in Yoff Diamalaye and surrounding Dakar areas, call our direct medical lines:'}
              </p>

              <div className="mt-5 space-y-3">
                <a
                  href={`tel:${CLINIC_INFO.phonePrimaryRaw}`}
                  className="flex items-center justify-between p-3.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#D9E852] shrink-0" />
                    <div>
                      <span className="block text-xs text-emerald-100">
                        {lang === 'fr' ? 'Ligne Principale Secrétariat' : 'Primary Clinic Line'}
                      </span>
                      <span className="font-mono-tabular text-sm font-bold text-white">
                        {CLINIC_INFO.phonePrimary}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#D9E852] whitespace-nowrap shrink-0">
                    {lang === 'fr' ? 'Appeler' : 'Call'}
                  </span>
                </a>

                <a
                  href={`tel:${CLINIC_INFO.phoneSecondaryRaw}`}
                  className="flex items-center justify-between p-3.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#D9E852] shrink-0" />
                    <div>
                      <span className="block text-xs text-emerald-100">
                        {lang === 'fr' ? 'Ligne Directe & Urgences' : 'Direct & Emergency Line'}
                      </span>
                      <span className="font-mono-tabular text-sm font-bold text-white">
                        {CLINIC_INFO.phoneSecondary}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#D9E852] whitespace-nowrap shrink-0">
                    {lang === 'fr' ? 'Appeler' : 'Call'}
                  </span>
                </a>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-emerald-100">
                <span>E-mail :</span>
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="font-mono-tabular font-medium text-white hover:underline"
                >
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
