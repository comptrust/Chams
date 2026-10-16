/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { CLINIC_INFO, Language, PageId } from './data/clinicData';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { SpecialtiesPage } from './pages/SpecialtiesPage';
import { DoctorPage } from './pages/DoctorPage';
import { CorporatePage } from './pages/CorporatePage';
import { BookingPage } from './pages/BookingPage';
import { AccessContactPage } from './pages/AccessContactPage';
import { BrochurePage } from './pages/BrochurePage';
import { ConsultationMode } from './components/BookingAndAccessSection';
import { ChamsLogoMark } from './components/ChamsEmblem';
import { ExternalLink } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [currentPage, setCurrentPage] = useState<PageId>('accueil');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>('medecine-generale');
  const [selectedBookingMode, setSelectedBookingMode] = useState<ConsultationMode>('cabinet');

  // Synchronize router with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages: PageId[] = [
        'accueil',
        'specialites',
        'dr-thiam',
        'entreprises',
        'rendez-vous',
        'acces-contact',
        'brochure',
      ];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSpecialtyForBooking = (
    specialtyId: string,
    requestHomeVisit: boolean = false
  ) => {
    setSelectedSpecialtyId(specialtyId);
    if (specialtyId === 'medecine-entreprise') {
      setSelectedBookingMode('entreprise');
    } else if (requestHomeVisit || specialtyId === 'urgences-domicile') {
      setSelectedBookingMode('domicile');
    } else {
      setSelectedBookingMode('cabinet');
    }
    navigateTo('rendez-vous');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#111C18]">
      {/* Header with official logo next to title and multi-page nav links */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        lang={lang}
        onToggleLang={setLang}
      />

      {/* Multi-Page Views */}
      <main className="flex-1">
        {currentPage === 'accueil' && (
          <HomePage
            lang={lang}
            onNavigate={navigateTo}
            onSelectSpecialtyForBooking={handleSelectSpecialtyForBooking}
          />
        )}

        {currentPage === 'specialites' && (
          <SpecialtiesPage
            lang={lang}
            onSelectSpecialtyForBooking={handleSelectSpecialtyForBooking}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'dr-thiam' && (
          <DoctorPage lang={lang} onNavigate={navigateTo} />
        )}

        {currentPage === 'entreprises' && (
          <CorporatePage lang={lang} onNavigate={navigateTo} />
        )}

        {currentPage === 'rendez-vous' && (
          <BookingPage
            lang={lang}
            preselectedSpecialtyId={selectedSpecialtyId}
            preselectedMode={selectedBookingMode}
          />
        )}

        {currentPage === 'acces-contact' && (
          <AccessContactPage lang={lang} onNavigate={navigateTo} />
        )}

        {currentPage === 'brochure' && (
          <BrochurePage lang={lang} onNavigate={navigateTo} />
        )}
      </main>

      {/* Multi-Page Institutional Footer */}
      <footer className="bg-[#111C18] text-stone-300 border-t border-stone-800">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-stone-800">
            {/* Col 1: Brand & Logo next to Title */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-3">
                <ChamsLogoMark size="sm" withBackground />
                <span className="text-lg font-display font-bold text-white">
                  {CLINIC_INFO.fullName}
                </span>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                {CLINIC_INFO.group} — {CLINIC_INFO.doctor}.{' '}
                {lang === 'fr'
                  ? 'Cabinet médical agréé à Yoff Diamalaye, Dakar. Consultations de 09h00 à 18h00, sur rendez-vous et urgences médicales à domicile.'
                  : 'Licensed medical clinic in Yoff Diamalaye, Dakar. Consultations from 09:00 to 18:00, by appointment, and home emergencies.'}
              </p>
              <p className="text-xs font-mono-tabular text-emerald-400 pt-1">
                {CLINIC_INFO.onmsNumber} · {CLINIC_INFO.ministerialDecree}
              </p>
            </div>

            {/* Col 2: Navigation Mirror (All Pages) */}
            <div className="md:col-span-3 space-y-2.5 text-xs">
              <p className="font-semibold text-white">
                {lang === 'fr' ? 'Pages du Site' : 'Site Pages'}
              </p>
              <ul className="space-y-2 text-stone-400">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('accueil')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {lang === 'fr' ? 'Accueil' : 'Home'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('specialites')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {lang === 'fr' ? 'Spécialités & Protocoles (9)' : '9 Medical Specialties'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('dr-thiam')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {lang === 'fr' ? 'Dr Aboubacry THIAM (ONMS B 1217)' : 'Dr. Aboubacry THIAM (ONMS B 1217)'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('entreprises')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {lang === 'fr' ? "Médecine d'Entreprise & Conventions" : 'Corporate Medicine'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('rendez-vous')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {lang === 'fr' ? 'Prendre Rendez-vous / Domicile' : 'Book Appointment / Home Visit'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('acces-contact')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {lang === 'fr' ? 'Accès, Horaires & Urgences' : 'Location, Hours & Contact'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('brochure')}
                    className="hover:text-white transition-colors cursor-pointer text-left inline-flex items-center gap-1.5"
                  >
                    <span>{lang === 'fr' ? 'Brochure PDF (Dépliant 3 Volets)' : 'Tri-Fold PDF Brochure'}</span>
                    <span className="px-1.5 py-0.2 text-[9px] font-mono bg-emerald-800 text-emerald-200 rounded">
                      PDF
                    </span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Direct Contact & Address */}
            <div className="md:col-span-4 space-y-2.5 text-xs">
              <p className="font-semibold text-white">
                {lang === 'fr' ? 'Coordonnées & Accès' : 'Contact & Directions'}
              </p>
              <p className="text-stone-400 leading-relaxed">
                {CLINIC_INFO.addressLine1}, {CLINIC_INFO.addressLine2}, {CLINIC_INFO.city}
              </p>
              <p className="font-mono-tabular text-white">
                Tél :{' '}
                <a href={`tel:${CLINIC_INFO.phonePrimaryRaw}`} className="hover:text-emerald-400">
                  {CLINIC_INFO.phonePrimary}
                </a>{' '}
                /{' '}
                <a href={`tel:${CLINIC_INFO.phoneSecondaryRaw}`} className="hover:text-emerald-400">
                  {CLINIC_INFO.phoneSecondary}
                </a>
              </p>
              <p className="font-mono-tabular text-stone-400">
                E-mail :{' '}
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white">
                  {CLINIC_INFO.email}
                </a>
              </p>
              <p className="text-stone-400 pt-1">
                {lang === 'fr' ? 'Ouvert :' : 'Open:'} 09h00 – 18h00 & Sur Rendez-vous
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>
              © {new Date().getFullYear()} {CLINIC_INFO.fullName} ({CLINIC_INFO.group}).{' '}
              {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <p className="font-mono-tabular">
                {CLINIC_INFO.doctor} · {CLINIC_INFO.onmsNumber}
              </p>
              <span className="text-stone-700 hidden sm:inline">·</span>
              <a
                href="https://comptrust.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-stone-400 hover:text-emerald-400 transition-colors font-medium group"
                title="COMPTRUST.TECH"
              >
                <span>{lang === 'fr' ? 'Propulsé par' : 'Powered by'}</span>
                <span className="text-emerald-400 group-hover:text-emerald-300 font-semibold tracking-wider uppercase">
                  COMPTRUST.TECH
                </span>
                <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
