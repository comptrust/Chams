import React, { useState } from 'react';
import { ArrowUpRight, Check, Search } from 'lucide-react';
import {
  Language,
  SPECIALTIES,
  SpecialtyCategory,
  SpecialtyItem,
} from '../data/clinicData';

interface SpecialtiesSectionProps {
  lang: Language;
  onSelectSpecialtyForBooking: (specialtyId: string, requestHomeVisit?: boolean) => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  lang,
  onSelectSpecialtyForBooking,
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
    <section id="specialites" className="py-20 lg:py-24 border-b border-stone-200/80">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-stone-200/80">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#0D5C3A] tracking-wide mb-2">
              {lang === 'fr'
                ? 'Offre de soins médicaux · Yoff Diamalaye, Dakar'
                : 'Clinical Care Portfolio · Yoff Diamalaye, Dakar'}
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#111C18] text-balance">
              {lang === 'fr'
                ? 'Neuf disciplines médicales coordonnées sous la direction du Dr Aboubacry THIAM'
                : 'Nine coordinated medical disciplines led by Dr. Aboubacry THIAM'}
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md leading-relaxed">
            {lang === 'fr'
              ? 'Sélectionnez une spécialité ci-dessous pour consulter le protocole clinique détaillé et planifier directement votre consultation au cabinet ou à domicile.'
              : 'Select any specialty below to inspect the clinical protocol and schedule your clinic appointment or physician house call.'}
          </p>
        </div>

        {/* Interactive Filter Controls & Search Bar */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 py-6">
          {/* Interactive Segmented Filter Bar (Functional Buttons) */}
          <div
            className="flex flex-wrap items-center gap-1 p-1.5 bg-[#EFECE4] rounded-xl border border-stone-200/70"
            role="tablist"
            aria-label={lang === 'fr' ? 'Filtrer par pôle médical' : 'Filter by medical unit'}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    const firstInCat =
                      cat.id === 'all'
                        ? SPECIALTIES[0]
                        : SPECIALTIES.find((s) => s.category === cat.id);
                    if (firstInCat) setSelectedSpecialtyId(firstInCat.id);
                  }}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#0D5C3A] text-white shadow-xs'
                      : 'text-stone-700 hover:text-[#111C18] hover:bg-white/60'
                  }`}
                >
                  {cat.label[lang]}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'fr'
                  ? 'Rechercher (ex: HTA, diabète, foie, domicile)...'
                  : 'Search specialty (e.g. hypertension, diabetes, liver)...'
              }
              className="w-full pl-10 pr-8 py-2 text-sm bg-white border border-stone-300/90 rounded-lg text-[#111C18] placeholder:text-stone-400 focus:outline-none focus:border-[#0D5C3A]"
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

        {/* Asymmetric Master-Detail Layout (7 Cols List + 5 Cols Clinical Protocol Inspector) */}
        {filteredSpecialties.length === 0 ? (
          <div className="py-12 px-6 bg-white border border-stone-200/80 rounded-xl text-center">
            <p className="text-base font-medium text-[#111C18] mb-1">
              {lang === 'fr'
                ? 'Aucune spécialité ne correspond à votre recherche.'
                : 'No medical specialty matches your search.'}
            </p>
            <p className="text-sm text-stone-500 mb-4">
              {lang === 'fr'
                ? 'Réinitialisez les filtres pour afficher les 9 spécialités du Cabinet Médical CHAMS.'
                : 'Reset filters to view all 9 specialties at Cabinet Médical CHAMS.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium bg-[#0D5C3A] text-white rounded-lg hover:bg-[#09472C] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {lang === 'fr' ? 'Afficher toutes les spécialités' : 'Show all specialties'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
            {/* Left Column: Numbered Editorial Service List */}
            <div className="lg:col-span-7 divide-y divide-stone-200/80 border-t border-b border-stone-200/80 bg-white rounded-xl overflow-hidden">
              {filteredSpecialties.map((item) => {
                const isSelected = activeDetail.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedSpecialtyId(item.id)}
                    className={`w-full text-left p-5 sm:p-6 transition-colors duration-150 flex items-start justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F1F6F3]'
                        : 'bg-white hover:bg-stone-50/90'
                    }`}
                  >
                    <div className="space-y-1.5 pr-2">
                      {/* Clean unboxed metadata with typographic separators */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                        <span className="font-mono-tabular font-semibold text-[#0D5C3A]">
                          {item.index}.
                        </span>
                        <span>{item.availability[lang]}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{item.typicalDuration}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-[#111C18]">
                        {item.index}. {item.title[lang]}
                      </h3>

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

            {/* Right Column: Active Specialty Clinical Protocol Card */}
            <div className="lg:col-span-5 bg-white border border-stone-200/90 rounded-xl p-6 sm:p-8 lg:sticky lg:top-24">
              <div className="flex items-center gap-2 text-xs text-stone-500 pb-4 border-b border-stone-200/80">
                <span className="font-mono-tabular font-semibold text-[#0D5C3A]">
                  {lang === 'fr' ? `Spécialité ${activeDetail.index} / 09` : `Specialty ${activeDetail.index} / 09`}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeDetail.availability[lang]}</span>
              </div>

              <h3 className="text-2xl font-display font-semibold text-[#111C18] mt-4 text-balance">
                {activeDetail.title[lang]}
              </h3>

              <p className="text-sm text-stone-600 leading-relaxed mt-3">
                {activeDetail.description[lang]}
              </p>

              {/* Protocol Checklist */}
              <div className="mt-6 pt-5 border-t border-stone-200/80">
                <p className="text-xs font-semibold text-[#111C18] mb-3.5">
                  {lang === 'fr'
                    ? 'Déroulement & Protocole de prise en charge'
                    : 'Clinical Care Protocol & Workflow'}
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

              {/* Metadata Summary Row */}
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
                    {lang === 'fr' ? 'Lieu de consultation' : 'Consultation Mode'}
                  </span>
                  <span className="font-semibold text-[#111C18] mt-0.5 block">
                    {activeDetail.homeVisitEligible
                      ? lang === 'fr'
                        ? 'Au cabinet ou à domicile'
                        : 'Clinic or Home Visit'
                      : lang === 'fr'
                      ? 'Au cabinet (Yoff Diamalaye)'
                      : 'At the Clinic (Yoff Diamalaye)'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onSelectSpecialtyForBooking(activeDetail.id, false)}
                  className="flex-1 px-4 py-2.5 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 text-center"
                >
                  {lang === 'fr' ? 'Prendre RDV au Cabinet' : 'Book Clinic Appointment'}
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
        )}
      </div>
    </section>
  );
};
