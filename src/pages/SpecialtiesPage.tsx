import React, { useState } from 'react';
import { ArrowUpRight, Check, CheckCircle2, FileText, Search } from 'lucide-react';
import {
  Language,
  PageId,
  SPECIALTIES,
  SpecialtyCategory,
  SpecialtyItem,
} from '../data/clinicData';
import { ChamsLogoMark } from '../components/ChamsEmblem';

interface SpecialtiesPageProps {
  lang: Language;
  onSelectSpecialtyForBooking: (specialtyId: string, requestHomeVisit?: boolean) => void;
  onNavigate?: (page: PageId) => void;
}

export const SpecialtiesPage: React.FC<SpecialtiesPageProps> = ({
  lang,
  onSelectSpecialtyForBooking,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<SpecialtyCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>(SPECIALTIES[0].id);

  const categories: { id: SpecialtyCategory; label: { fr: string; en: string }; count: number }[] = [
    {
      id: 'all',
      label: { fr: 'Toutes les spécialités (9)', en: 'All Specialties (9)' },
      count: SPECIALTIES.length,
    },
    {
      id: 'primary',
      label: { fr: 'Médecine Générale, Famille & Entreprise', en: 'General, Family & Corporate' },
      count: SPECIALTIES.filter((s) => s.category === 'primary').length,
    },
    {
      id: 'chronic',
      label: { fr: 'HTA, Diabète, Foie & Nutrition', en: 'Cardio, Diabetes, Liver & Nutrition' },
      count: SPECIALTIES.filter((s) => s.category === 'chronic').length,
    },
    {
      id: 'maternal_urgent',
      label: { fr: 'Mère-Enfant & Urgences Domicile', en: 'Maternal-Child & Home Urgent Care' },
      count: SPECIALTIES.filter((s) => s.category === 'maternal_urgent').length,
    },
  ];

  const filteredSpecialties = SPECIALTIES.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;
    const titleMatch = item.title[lang].toLowerCase().includes(query);
    const subtitleMatch = item.subtitle[lang].toLowerCase().includes(query);
    const descMatch = item.description[lang].toLowerCase().includes(query);
    return matchesCategory && (titleMatch || subtitleMatch || descMatch);
  });

  const activeDetail: SpecialtyItem =
    filteredSpecialties.find((s) => s.id === selectedSpecialtyId) ||
    filteredSpecialties[0] ||
    SPECIALTIES[0];

  return (
    <div className="py-12 lg:py-16 bg-[#FAF9F5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Page Header with Logo next to Title */}
        <div className="pb-8 border-b border-stone-200/80">
          <div className="flex items-center gap-3 mb-2">
            <ChamsLogoMark size="sm" />
            <p className="text-xs font-semibold text-[#0D5C3A] tracking-wide uppercase">
              {lang === 'fr' ? 'Pôles de Soins & Spécialités' : 'Care Units & Medical Specialties'}
            </p>
          </div>

          <h1 className="text-3xl lg:text-4xl font-display font-semibold text-[#111C18]">
            {lang === 'fr'
              ? 'Les 9 Spécialités du Cabinet Médical CHAMS Diamalaye'
              : 'The 9 Medical Specialties of Cabinet Médical CHAMS'}
          </h1>

          <p className="text-sm text-stone-600 max-w-3xl leading-relaxed mt-2.5">
            {lang === 'fr'
              ? 'Toutes les disciplines médicales sont assurées avec rigueur sous la responsabilité du Dr Aboubacry THIAM (N° ONMS B 1217). Consultez les indications cliniques, la durée estimée et planifiez votre rendez-vous au cabinet ou à domicile.'
              : 'All medical disciplines are provided under the direct clinical leadership of Dr. Aboubacry THIAM (N° ONMS B 1217). Review clinical protocols, estimated consultation durations, and book at the clinic or at home.'}
          </p>

          {onNavigate && (
            <div className="mt-4 pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('brochure')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0D5C3A] bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300/80 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-2xs group"
              >
                <FileText className="w-4 h-4 text-[#0D5C3A] group-hover:scale-105 transition-transform" />
                <span>
                  {lang === 'fr'
                    ? 'Consulter le Dépliant 3 Volets Récapitulatif (PDF)'
                    : 'View Complete 3-Fold Summary Leaflet (PDF)'}
                </span>
                <span className="text-[10px] font-mono font-bold bg-[#0D5C3A] text-white px-1.5 py-0.5 rounded leading-none">
                  PDF
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 py-6">
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFECE4] rounded-xl border border-stone-200/70"
            role="tablist"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    const firstInCat =
                      cat.id === 'all'
                        ? SPECIALTIES[0]
                        : SPECIALTIES.find((s) => s.category === cat.id);
                    if (firstInCat) setSelectedSpecialtyId(firstInCat.id);
                  }}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#0D5C3A] text-white shadow-xs font-semibold'
                      : 'text-stone-700 hover:text-[#111C18] hover:bg-white/60'
                  }`}
                >
                  {cat.label[lang]}
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'fr'
                  ? 'Rechercher une spécialité (HTA, diabète, foie)...'
                  : 'Search specialty (cardio, diabetes, liver)...'
              }
              className="w-full pl-10 pr-8 py-2 text-sm bg-white border border-stone-300 rounded-lg text-[#111C18] placeholder:text-stone-400 focus:outline-none focus:border-[#0D5C3A]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-800 px-1.5 py-0.5 cursor-pointer"
              >
                {lang === 'fr' ? 'Effacer' : 'Clear'}
              </button>
            )}
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: List */}
          <div className="lg:col-span-7 divide-y divide-stone-200/80 border-t border-b border-stone-200/80 bg-white rounded-xl overflow-hidden shadow-2xs">
            {filteredSpecialties.map((item) => {
              const isSelected = activeDetail.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedSpecialtyId(item.id)}
                  className={`w-full text-left p-5 sm:p-6 transition-colors duration-150 flex items-start justify-between gap-4 cursor-pointer ${
                    isSelected ? 'bg-[#F1F6F3]' : 'bg-white hover:bg-stone-50/90'
                  }`}
                >
                  <div className="space-y-1.5 pr-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                      <span className="font-mono-tabular font-bold text-[#0D5C3A]">
                        {item.index}.
                      </span>
                      <span>{item.availability[lang]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{item.typicalDuration}</span>
                      {item.homeVisitEligible && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#0D5C3A] font-medium">
                            {lang === 'fr' ? 'Visite à domicile possible' : 'Home visit available'}
                          </span>
                        </>
                      )}
                    </div>

                    <h2 className="text-lg font-semibold text-[#111C18]">
                      {item.index}. {item.title[lang]}
                    </h2>

                    <p className="text-sm text-stone-600 leading-relaxed">
                      {item.subtitle[lang]}
                    </p>
                  </div>

                  <div className="shrink-0 pt-1">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-colors ${
                        isSelected
                          ? 'bg-[#0D5C3A] border-[#0D5C3A] text-white'
                          : 'border-stone-200 text-stone-500'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 5 Columns: Detailed Protocol Inspector Card */}
          <div className="lg:col-span-5 bg-white border border-stone-200/90 rounded-xl p-6 sm:p-8 lg:sticky lg:top-24 shadow-2xs">
            <div className="flex items-center gap-2 text-xs text-stone-500 pb-4 border-b border-stone-200/80">
              <span className="font-mono-tabular font-bold text-[#0D5C3A]">
                {lang === 'fr' ? `Spécialité ${activeDetail.index} / 09` : `Specialty ${activeDetail.index} / 09`}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activeDetail.availability[lang]}</span>
            </div>

            <h3 className="text-2xl font-display font-semibold text-[#111C18] mt-4">
              {activeDetail.title[lang]}
            </h3>

            <p className="text-sm text-stone-600 leading-relaxed mt-3">
              {activeDetail.description[lang]}
            </p>

            {/* Protocol Steps */}
            <div className="mt-6 pt-5 border-t border-stone-200/80">
              <p className="text-xs font-semibold text-[#111C18] mb-3">
                {lang === 'fr'
                  ? 'Protocole clinique & Déroulement de la consultation'
                  : 'Clinical Care Protocol & Consultation Steps'}
              </p>
              <ul className="space-y-3">
                {activeDetail.clinicalProtocol[lang].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-stone-700 leading-snug">
                    <Check className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Information */}
            <div className="mt-6 pt-5 border-t border-stone-200/80 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-500 block">
                  {lang === 'fr' ? 'Durée indicative' : 'Typical Duration'}
                </span>
                <span className="font-mono-tabular font-semibold text-[#111C18] mt-0.5 block">
                  {activeDetail.typicalDuration}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block">
                  {lang === 'fr' ? 'Mode de consultation' : 'Consultation Mode'}
                </span>
                <span className="font-semibold text-[#111C18] mt-0.5 block">
                  {activeDetail.homeVisitEligible
                    ? lang === 'fr'
                      ? 'Au cabinet ou à domicile'
                      : 'Clinic or Home Visit'
                    : lang === 'fr'
                    ? 'Au cabinet (Yoff Diamalaye)'
                    : 'Clinic (Yoff Diamalaye)'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onSelectSpecialtyForBooking(activeDetail.id, false)}
                className="flex-1 px-4 py-2.5 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 text-center shadow-xs"
              >
                {lang === 'fr' ? 'Prendre RDV au Cabinet' : 'Book Clinic Visit'}
              </button>
              {activeDetail.homeVisitEligible && (
                <button
                  type="button"
                  onClick={() => onSelectSpecialtyForBooking(activeDetail.id, true)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#0D5C3A] bg-[#EBF3EE] hover:bg-[#DCEBE2] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 text-center"
                >
                  {lang === 'fr' ? 'Demander à domicile' : 'Request Home Visit'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Patient Consultation Preparation Guide */}
        <div className="mt-16 p-8 bg-white border border-stone-200/90 rounded-2xl">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0D5C3A] mb-2">
            <FileText className="w-4 h-4" />
            <span>
              {lang === 'fr' ? 'Conseils Pratiques aux Patients' : 'Patient Preparation Advice'}
            </span>
          </div>

          <h3 className="text-xl font-display font-semibold text-[#111C18]">
            {lang === 'fr'
              ? 'Comment préparer votre consultation au Cabinet Médical CHAMS ?'
              : 'How to prepare for your appointment at Cabinet Médical CHAMS?'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-xs text-stone-700 leading-relaxed">
            <div className="p-4 bg-[#FAF9F5] border border-stone-200/70 rounded-xl space-y-2">
              <p className="font-semibold text-[#111C18]">
                {lang === 'fr' ? '1. Documents & Carnet de Santé' : '1. Medical Documents & History'}
              </p>
              <p>
                {lang === 'fr'
                  ? 'Apportez vos ordonnances récentes, vos derniers bilans sanguins, vos comptes-rendus d’échographie ou de scanner, ainsi que le carnet de santé pour les enfants.'
                  : 'Bring recent prescriptions, latest blood panels, ultrasound or scan reports, and child health booklets.'}
              </p>
            </div>

            <div className="p-4 bg-[#FAF9F5] border border-stone-200/70 rounded-xl space-y-2">
              <p className="font-semibold text-[#111C18]">
                {lang === 'fr' ? '2. Suivi HTA & Diabète' : '2. Blood Pressure & Diabetes Log'}
              </p>
              <p>
                {lang === 'fr'
                  ? 'Si vous effectuez des auto-mesures tensionnelles ou glycémiques à la maison, notez les valeurs des 7 derniers jours pour permettre au Dr Thiam d’ajuster votre traitement avec précision.'
                  : 'If you log blood pressure or glucose readings at home, write down the last 7 days of readings to enable accurate treatment adjustments.'}
              </p>
            </div>

            <div className="p-4 bg-[#FAF9F5] border border-stone-200/70 rounded-xl space-y-2">
              <p className="font-semibold text-[#111C18]">
                {lang === 'fr' ? '3. Visite à Domicile' : '3. House Call Preparation'}
              </p>
              <p>
                {lang === 'fr'
                  ? 'Pour une visite à domicile, indiquez un repère précis dans Yoff Diamalaye ou votre quartier à Dakar pour faciliter l’arrivée rapide du médecin avec son matériel.'
                  : 'For home visits, provide a clear landmark in Yoff Diamalaye or your Dakar neighborhood to facilitate prompt arrival.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
