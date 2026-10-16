import React from 'react';
import { ArrowRight, CheckCircle2, Clock, FileText, MapPin, Phone, ShieldCheck, Stethoscope } from 'lucide-react';
import { CLINIC_INFO, Language, PageId, SPECIALTIES } from '../data/clinicData';
import { ChamsEmblem, ChamsLogoMark, ResilientImage } from '../components/ChamsEmblem';
import { CarePillarsAndDoctorSection } from '../components/CarePillarsAndDoctorSection';
import { GeolocationMap } from '../components/GeolocationMap';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onSelectSpecialtyForBooking: (specialtyId: string, requestHomeVisit?: boolean) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  onSelectSpecialtyForBooking,
}) => {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-stone-200/80 bg-[#FAF9F5]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          {/* Top Trust Kicker Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-200/80">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
              <span className="font-semibold text-[#0D5C3A]">{CLINIC_INFO.group}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular font-medium text-[#111C18]">
                {CLINIC_INFO.onmsNumber}
              </span>
              <span aria-hidden="true">·</span>
              <span>Yoff Diamalaye, Rond Point Brioche Dorée (Au-dessus Pharmacie Diam Athie)</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono-tabular text-stone-600">
              <span className="text-[#0D5C3A] font-semibold">09h00 – 18h00</span>
              <span>& sur Rendez-vous</span>
            </div>
          </div>

          {/* 2-Column Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left 6 Columns */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div>
                {/* Title Lockup with Logo next to Title */}
                <div className="flex items-center gap-3.5 mb-5">
                  <ChamsLogoMark size="md" className="shrink-0" />
                  <div className="text-xs text-stone-600 space-y-0.5">
                    <p className="font-semibold text-[#111C18] text-sm">
                      {CLINIC_INFO.fullName}
                    </p>
                    <p className="font-mono-tabular text-stone-500">
                      {CLINIC_INFO.doctor} · {CLINIC_INFO.onmsNumber}
                    </p>
                  </div>
                </div>

                <h1
                  className="font-display font-semibold tracking-tight text-[#111C18] text-balance leading-[1.14]"
                  style={{ fontSize: 'clamp(2.15rem, 3.6vw, 3.4rem)' }}
                >
                  {lang === 'fr'
                    ? 'Soins médicaux de proximité, suivi spécialisé et consultations à domicile à Dakar.'
                    : 'Primary medical care, chronic disease management, and physician house calls in Dakar.'}
                </h1>

                <p className="text-base sm:text-lg text-stone-600 leading-relaxed mt-5 max-w-[62ch]">
                  {lang === 'fr'
                    ? 'Sous la direction du Dr Aboubacry THIAM, le Cabinet Médical CHAMS Diamalaye assure vos consultations de médecine générale et familiale, le suivi de l’HTA, du diabète, des maladies digestives, ainsi que les urgences médicales et déplacements à domicile.'
                    : 'Led by Dr. Aboubacry THIAM, Cabinet Médical CHAMS Diamalaye provides general and family medicine, hypertension, diabetes, and digestive care, corporate health agreements, and physician home visits.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-stone-200/80">
                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => onNavigate('rendez-vous')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                  >
                    <span>
                      {lang === 'fr'
                        ? 'Prendre Rendez-vous (Cabinet ou Domicile)'
                        : 'Schedule Consultation (Clinic or Home)'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('specialites')}
                    className="px-4 py-3.5 text-xs font-semibold text-stone-800 hover:text-[#0D5C3A] bg-white border border-stone-200 hover:border-stone-300 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {lang === 'fr' ? '9 Spécialités →' : '9 Specialties →'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('brochure')}
                    className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-semibold text-[#0D5C3A] bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300/80 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-2xs group"
                  >
                    <FileText className="w-4 h-4 text-[#0D5C3A] group-hover:scale-110 transition-transform" />
                    <span>{lang === 'fr' ? 'Brochure PDF (3 Volets)' : 'PDF Brochure (3-Fold)'}</span>
                    <span className="text-[10px] font-mono font-bold bg-[#0D5C3A] text-white px-1.5 py-0.5 rounded leading-none">
                      PDF
                    </span>
                  </button>
                </div>

                <p className="text-xs text-stone-500 font-mono-tabular mt-4">
                  {CLINIC_INFO.ministerialDecree}
                </p>
              </div>
            </div>

            {/* Right 6 Columns: Hero Image */}
            <div className="lg:col-span-6 flex">
              <div className="relative w-full rounded-2xl overflow-hidden border border-stone-200/90 bg-stone-100 min-h-[320px] lg:min-h-[460px]">
                <ResilientImage
                  src={CLINIC_INFO.heroImage}
                  alt={
                    lang === 'fr'
                      ? 'Consultation médicale au Cabinet Médical CHAMS Diamalaye à Dakar'
                      : 'Medical consultation at Cabinet Médical CHAMS Diamalaye in Dakar'
                  }
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <div className="text-white max-w-lg">
                    <p className="text-xs font-mono-tabular text-emerald-200">
                      {CLINIC_INFO.hoursStandard} · {lang === 'fr' ? 'ET SUR RENDEZ-VOUS' : 'AND BY APPOINTMENT'}
                    </p>
                    <p className="text-base sm:text-lg font-display font-medium text-white mt-1">
                      {lang === 'fr'
                        ? 'Yoff Diamalaye, Rond Point Brioche Dorée — Au-dessus de la Pharmacie Diam Athie'
                        : 'Yoff Diamalaye, Rond Point Brioche Dorée — Above Pharmacie Diam Athie'}
                    </p>
                    <p className="text-xs font-mono-tabular text-white/85 mt-1.5">
                      Tél : {CLINIC_INFO.phonePrimary} · {CLINIC_INFO.phoneSecondary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Key Pillars Strip */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-stone-200/80">
            <div className="bg-white border border-stone-200/90 rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A] mb-1">
                <Clock className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Horaires de consultation' : 'Consultation Hours'}</span>
              </div>
              <p className="font-mono-tabular text-lg font-bold text-[#111C18]">
                09h 00 – 18 h 00
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                {lang === 'fr'
                  ? 'Et sur Rendez-vous · Urgences à domicile'
                  : 'And by Appointment · Home Emergencies'}
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A] mb-1">
                <MapPin className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Adresse à Yoff Diamalaye' : 'Yoff Diamalaye Address'}</span>
              </div>
              <p className="text-sm font-bold text-[#111C18]">
                Rond Point Brioche Dorée
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                {lang === 'fr'
                  ? 'Au-dessus de la Pharmacie Diam Athie'
                  : 'Above Pharmacie Diam Athie, Dakar'}
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A] mb-1">
                <Phone className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Lignes directes Secrétariat' : 'Direct Clinic Lines'}</span>
              </div>
              <p className="font-mono-tabular text-sm font-bold text-[#111C18]">
                {CLINIC_INFO.phonePrimary}
              </p>
              <p className="font-mono-tabular text-xs text-stone-600 mt-0.5">
                {CLINIC_INFO.phoneSecondary}
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A] mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Médecin Responsable' : 'Lead Physician'}</span>
              </div>
              <p className="text-sm font-bold text-[#111C18]">
                {CLINIC_INFO.doctor}
              </p>
              <p className="font-mono-tabular text-xs text-stone-500 mt-0.5">
                {CLINIC_INFO.onmsNumber} · Groupe CHAMS AFRICA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9 Core Medical Specialties Quick Grid */}
      <section className="py-16 lg:py-20 border-b border-stone-200/80 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-stone-200/80">
            <div>
              <p className="text-xs font-medium text-[#0D5C3A] tracking-wide mb-1.5">
                {lang === 'fr' ? 'Catalogue Médical Complet' : 'Complete Medical Catalog'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#111C18]">
                {lang === 'fr'
                  ? '9 Spécialités Médicales Coordonnées'
                  : '9 Coordinated Medical Disciplines'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('specialites')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D5C3A] hover:underline cursor-pointer"
            >
              <span>{lang === 'fr' ? 'Voir tous les protocoles détaillés' : 'View full clinical protocols'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {SPECIALTIES.map((spec) => (
              <div
                key={spec.id}
                className="bg-[#FAF9F5] border border-stone-200/90 rounded-xl p-5 flex flex-col justify-between hover:border-[#0D5C3A]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-mono-tabular font-bold text-[#0D5C3A]">{spec.index}.</span>
                    <span>{spec.typicalDuration}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#111C18] mb-1.5">
                    {spec.title[lang]}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {spec.subtitle[lang]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/70 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-medium">
                    {spec.homeVisitEligible
                      ? lang === 'fr' ? 'Cabinet & Domicile' : 'Clinic & Home'
                      : lang === 'fr' ? 'Au Cabinet' : 'At Clinic'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectSpecialtyForBooking(spec.id, false)}
                    className="text-xs font-semibold text-[#0D5C3A] hover:underline cursor-pointer"
                  >
                    {lang === 'fr' ? 'Prendre RDV →' : 'Book →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid: 3 Care Pillars */}
      <CarePillarsAndDoctorSection
        lang={lang}
        onSelectPillarBooking={(specId, home) => onSelectSpecialtyForBooking(specId, home)}
      />

      {/* Geolocation Map & Clinic Building Landmark Section */}
      <section className="py-16 lg:py-20 bg-[#F4F2EB] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#0D5C3A] uppercase tracking-wide mb-1">
                {lang === 'fr' ? 'Accès Immédiat & Repère Visuel' : 'Directions & Visual Landmark'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#111C18]">
                {lang === 'fr'
                  ? 'Localisez le Cabinet Médical CHAMS à Dakar'
                  : 'Locate Cabinet Médical CHAMS in Dakar'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('acces-contact')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D5C3A] hover:underline cursor-pointer"
            >
              <span>{lang === 'fr' ? 'Détails complets d’accès →' : 'Full directions & contact →'}</span>
            </button>
          </div>

          <GeolocationMap lang={lang} />
        </div>
      </section>

      {/* Official 3-Fold Brochure CTA Section */}
      <section className="py-14 bg-gradient-to-b from-[#FAF9F5] to-[#F2EFE8] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-[#0D5C3A] text-xs font-semibold">
                <FileText className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'DOCUMENTATION OFFICIELLE & SUPPORT PATIENTS' : 'OFFICIAL DOCUMENTATION & PATIENT GUIDE'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#111C18]">
                {lang === 'fr'
                  ? 'Consultez le Dépliant 3 Volets du Cabinet Médical CHAMS'
                  : 'View the Cabinet Médical CHAMS Official 3-Fold Brochure'}
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                {lang === 'fr'
                  ? 'Retrouvez toutes les informations essentielles sur notre brochure dépliant au format 3 volets : parcours du Dr Aboubacry THIAM, liste des 9 spécialités médicales, consultations à domicile, santé au travail pour entreprises et plan d’accès avec QR code direct.'
                  : 'Find all essential healthcare information in our 3-fold printed leaflet: Dr. Aboubacry THIAM profile, the 9 medical specialties, home visits, occupational health services, and directions with direct QR code.'}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2 justify-center lg:justify-start">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono-tabular bg-stone-100 text-stone-700 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-[#0D5C3A]" />
                  A4 Paysage (Tri-Fold)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono-tabular bg-stone-100 text-stone-700 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-[#0D5C3A]" />
                  {lang === 'fr' ? 'Recto & Verso' : 'Front & Inside'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono-tabular bg-stone-100 text-stone-700 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-[#0D5C3A]" />
                  {lang === 'fr' ? 'Prêt pour impression / PDF' : 'Print-ready / PDF'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onNavigate('brochure')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-xl transition-all hover:shadow-md cursor-pointer whitespace-nowrap shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Ouvrir & Télécharger le PDF (3 Volets)' : 'Open & Download 3-Fold PDF'}</span>
                <span className="text-[10px] font-mono font-bold bg-white/20 px-1.5 py-0.5 rounded ml-1">
                  PDF
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('brochure')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{lang === 'fr' ? 'Aperçu Interactif du Dépliant →' : 'Interactive Brochure Preview →'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Callout & Appointment Banner */}
      <section className="py-14 bg-[#0D5C3A] text-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <p className="text-xs font-mono-tabular text-emerald-200">
              URGENCES MÉDICALES & VISITES À DOMICILE · DAKAR
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white">
              {lang === 'fr'
                ? 'Besoin d’une consultation rapide à Yoff Diamalaye ou à votre domicile ?'
                : 'Need urgent medical attention in Yoff Diamalaye or a home visit?'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {lang === 'fr'
                ? 'Contactez directement le secrétariat médical du Dr Aboubacry THIAM au +221 78 538 20 20 ou +221 77 834 15 04.'
                : 'Contact Dr. Aboubacry THIAM’s medical desk directly at +221 78 538 20 20 or +221 77 834 15 04.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href={`tel:${CLINIC_INFO.phonePrimaryRaw}`}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-[#0D5C3A] bg-white hover:bg-emerald-50 rounded-xl transition-colors font-mono-tabular"
            >
              <Phone className="w-3.5 h-3.5 text-[#0D5C3A]" />
              <span>{CLINIC_INFO.phonePrimary}</span>
            </a>

            <button
              type="button"
              onClick={() => onNavigate('rendez-vous')}
              className="px-5 py-3 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 border border-emerald-600 rounded-xl transition-colors cursor-pointer"
            >
              {lang === 'fr' ? 'Planifier en Ligne' : 'Book Online'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
