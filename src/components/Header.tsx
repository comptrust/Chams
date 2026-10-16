import React, { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { CLINIC_INFO, Language, NAV_ITEMS, PageId } from '../data/clinicData';
import { ChamsLogoMark } from './ChamsEmblem';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  lang: Language;
  onToggleLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  lang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80">
      {/* Top micro emergency & phone utility ribbon */}
      <div className="bg-[#0D5C3A] text-white text-[11px] py-1 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-semibold text-emerald-200">
              {lang === 'fr' ? 'Cabinet Ouvert :' : 'Clinic Open:'}
            </span>
            <span>09h 00 – 18 h 00 & Sur RDV</span>
            <span className="hidden md:inline" aria-hidden="true">·</span>
            <span className="hidden md:inline font-mono-tabular">
              {CLINIC_INFO.onmsNumber}
            </span>
            <span className="hidden lg:inline" aria-hidden="true">·</span>
            <span className="hidden lg:inline">
              Yoff Diamalaye (Au-dessus Pharmacie Diam Athie)
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${CLINIC_INFO.phonePrimaryRaw}`}
              className="inline-flex items-center gap-1.5 font-mono-tabular font-semibold text-emerald-100 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D9E852]" />
              <span>{CLINIC_INFO.phonePrimary}</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/10 rounded px-1.5 py-0.5">
              <button
                type="button"
                onClick={() => onToggleLang('fr')}
                className={`text-[10px] font-bold px-1 rounded transition-colors cursor-pointer ${
                  lang === 'fr' ? 'bg-white text-[#0D5C3A]' : 'text-emerald-100 hover:text-white'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('en')}
                className={`text-[10px] font-bold px-1 rounded transition-colors cursor-pointer ${
                  lang === 'en' ? 'bg-white text-[#0D5C3A]' : 'text-emerald-100 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-10 py-3.5">
        {/* Brand Zone: Official Logo next to Title */}
        <button
          type="button"
          onClick={() => handleNavClick('accueil')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          {/* Logo Mark next to title */}
          <ChamsLogoMark size="md" className="transition-transform group-hover:scale-105" />
          
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-display font-bold tracking-tight text-[#0D5C3A] leading-tight">
              Cabinet Médical CHAMS
            </span>
            <span className="text-[11px] text-stone-500 font-medium leading-none mt-0.5">
              Diamalaye · Dr Aboubacry THIAM
            </span>
          </div>
        </button>

        {/* Desktop Multi-Page Nav Links */}
        <nav
          aria-label={lang === 'fr' ? 'Navigation multi-pages' : 'Multi-page navigation'}
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold text-stone-700"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`py-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 relative ${
                  isActive
                    ? 'text-[#0D5C3A] font-bold'
                    : 'text-stone-700 hover:text-[#0D5C3A]'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span>{item.label[lang]}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-emerald-100 text-[#0D5C3A] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D5C3A] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Primary Action Button & Mobile Burger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('rendez-vous')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            {lang === 'fr' ? 'Prendre Rendez-vous' : 'Book Appointment'}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="lg:hidden p-2 text-stone-700 hover:text-[#0D5C3A] hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200/80 bg-[#FAF9F5] px-6 py-5 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between p-3 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#EBF3EE] text-[#0D5C3A]'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span>{item.label[lang]}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-emerald-100 text-[#0D5C3A] rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#0D5C3A]" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-5 pt-4 border-t border-stone-200 space-y-3">
            <button
              type="button"
              onClick={() => handleNavClick('rendez-vous')}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg text-center cursor-pointer shadow-xs transition-colors"
            >
              {lang === 'fr' ? 'Prendre un Rendez-vous en Ligne' : 'Book Appointment Online'}
            </button>
            <a
              href={`tel:${CLINIC_INFO.phonePrimaryRaw}`}
              className="block w-full py-2.5 text-xs font-semibold text-stone-800 bg-white border border-stone-200 rounded-lg text-center font-mono-tabular hover:bg-stone-50 transition-colors"
            >
              {lang === 'fr' ? 'Appeler :' : 'Call:'} {CLINIC_INFO.phonePrimary}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
