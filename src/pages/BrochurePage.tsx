import React, { useState } from 'react';
import {
  Printer,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Stethoscope,
  HeartPulse,
  Activity,
  Layers,
  Sparkles,
  HelpCircle,
  X,
} from 'lucide-react';
import { CLINIC_INFO, Language, PageId, SPECIALTIES } from '../data/clinicData';
import {
  ChamsEmblem,
  ChamsLogoMark,
  ChamsMedicalStamp,
  ResilientImage,
} from '../components/ChamsEmblem';

interface BrochurePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

// QR Code vector generator
const renderQrCode = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
    {/* Corner 1 */}
    <rect x="5" y="5" width="26" height="26" rx="3" fill="#0D5C3A" />
    <rect x="9" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
    <rect x="13" y="13" width="10" height="10" rx="1" fill="#0D5C3A" />

    {/* Corner 2 */}
    <rect x="69" y="5" width="26" height="26" rx="3" fill="#0D5C3A" />
    <rect x="73" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
    <rect x="77" y="13" width="10" height="10" rx="1" fill="#0D5C3A" />

    {/* Corner 3 */}
    <rect x="5" y="69" width="26" height="26" rx="3" fill="#0D5C3A" />
    <rect x="9" y="73" width="18" height="18" rx="2" fill="#FFFFFF" />
    <rect x="13" y="77" width="10" height="10" rx="1" fill="#0D5C3A" />

    {/* Data modules */}
    <rect x="36" y="8" width="5" height="5" fill="#183059" />
    <rect x="46" y="8" width="5" height="5" fill="#183059" />
    <rect x="56" y="8" width="5" height="5" fill="#183059" />
    <rect x="36" y="18" width="5" height="5" fill="#183059" />
    <rect x="46" y="24" width="8" height="5" fill="#183059" />
    <rect x="58" y="18" width="5" height="5" fill="#183059" />

    <rect x="8" y="38" width="5" height="5" fill="#183059" />
    <rect x="18" y="44" width="5" height="5" fill="#183059" />
    <rect x="8" y="52" width="5" height="5" fill="#183059" />

    {/* Center cluster */}
    <rect x="38" y="38" width="24" height="24" rx="4" fill="#0D5C3A" opacity="0.1" />
    <rect x="42" y="42" width="6" height="6" fill="#0D5C3A" />
    <rect x="52" y="42" width="6" height="6" fill="#0D5C3A" />
    <rect x="42" y="52" width="6" height="6" fill="#0D5C3A" />
    <rect x="52" y="52" width="6" height="6" fill="#0D5C3A" />

    <rect x="69" y="38" width="6" height="6" fill="#183059" />
    <rect x="80" y="44" width="5" height="5" fill="#183059" />
    <rect x="88" y="38" width="5" height="5" fill="#183059" />
    <rect x="69" y="52" width="6" height="6" fill="#183059" />

    <rect x="38" y="70" width="6" height="6" fill="#183059" />
    <rect x="48" y="76" width="6" height="6" fill="#183059" />
    <rect x="58" y="70" width="6" height="6" fill="#183059" />
    <rect x="38" y="84" width="6" height="6" fill="#183059" />
    <rect x="50" y="86" width="6" height="6" fill="#183059" />
    <rect x="74" y="74" width="6" height="6" fill="#183059" />
    <rect x="84" y="82" width="6" height="6" fill="#183059" />
  </svg>
);

type BrochureViewMode = 'spread' | 'panel' | 'folded';

export const BrochurePage: React.FC<BrochurePageProps> = ({ lang, onNavigate }) => {
  const [viewMode, setViewMode] = useState<BrochureViewMode>('spread');
  const [activeSide, setActiveSide] = useState<'outside' | 'inside'>('outside');
  const [activePanelIdx, setActivePanelIdx] = useState<number>(0);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handlePrint = () => {
    setShowPrintModal(false);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Brochure Cabinet Médical CHAMS Diamalaye',
          text: 'Dépliant officiel 3 volets du Cabinet Médical CHAMS Diamalaye — Dr Aboubacry THIAM',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const panelsData = [
    {
      id: 'p1',
      title: lang === 'fr' ? '1. Rabat Intérieur (Volet Plié)' : '1. Inside Flap (Folded In)',
      subtitle: lang === 'fr' ? 'Extérieur Gauche · Atouts & Prise en charge' : 'Outside Left · Clinic Commitments',
      side: 'outside',
    },
    {
      id: 'p2',
      title: lang === 'fr' ? '2. Dos de Dépliant (Centre Arrière)' : '2. Back Cover (Center Rear)',
      subtitle: lang === 'fr' ? 'Extérieur Centre · Accès, Contacts & QR Code' : 'Outside Center · Directions & QR Code',
      side: 'outside',
    },
    {
      id: 'p3',
      title: lang === 'fr' ? '3. Couverture Principale (Façade)' : '3. Front Cover (Main Face)',
      subtitle: lang === 'fr' ? 'Extérieur Droit · Identité & Titre officiel' : 'Outside Right · Official Identity',
      side: 'outside',
    },
    {
      id: 'p4',
      title: lang === 'fr' ? '4. Volet Intérieur Gauche' : '4. Inside Left Panel',
      subtitle: lang === 'fr' ? 'Intérieur · Soins Primaires & Mère-Enfant' : 'Inside · Primary & Maternal Care',
      side: 'inside',
    },
    {
      id: 'p5',
      title: lang === 'fr' ? '5. Volet Intérieur Centre' : '5. Inside Center Panel',
      subtitle: lang === 'fr' ? 'Intérieur · Maladies Chroniques & Nutrition' : 'Inside · Chronic Diseases & Liver',
      side: 'inside',
    },
    {
      id: 'p6',
      title: lang === 'fr' ? '6. Volet Intérieur Droit' : '6. Inside Right Panel',
      subtitle: lang === 'fr' ? 'Intérieur · Entreprise & Urgences Domicile' : 'Inside · Corporate & Emergencies',
      side: 'inside',
    },
  ];

  return (
    <div className="bg-[#EFECE6] min-h-screen py-8 lg:py-12">
      {/* Non-print Top Controls Bar */}
      <div className="no-print max-w-[1280px] mx-auto px-6 lg:px-10 mb-8">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200/80">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => onNavigate('accueil')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#0D5C3A] bg-stone-100 hover:bg-stone-200/80 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{lang === 'fr' ? 'Retour au site' : 'Back to site'}</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A] uppercase tracking-wide">
                  <ChamsLogoMark size="xs" />
                  <span>
                    {lang === 'fr'
                      ? 'Support d’Édition Officiel · A4 Paysage 3 Volets (Tri-Fold)'
                      : 'Official Print Collateral · A4 Landscape 3-Fold (Tri-Fold)'}
                  </span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-[#111C18]">
                {lang === 'fr'
                  ? 'Brochure Médicale Dépliant 3 Volets (Format PDF & Print)'
                  : 'Cabinet Medical Tri-Fold Brochure (PDF & Print)'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                {lang === 'fr'
                  ? 'Conçue spécialement pour les patients, les familles et les partenaires d’entreprise. Conforme aux standards d’impression A4 paysage recto/verso avec repères de pliage précis.'
                  : 'Designed for patients, families, and corporate partners. Formatted for standard A4 landscape double-sided printing with precision fold lines.'}
              </p>
            </div>

            {/* Print & Download Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Imprimer / Exporter PDF' : 'Print / Export PDF'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-stone-700 hover:text-[#0D5C3A] bg-[#FAF9F5] hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedLink ? (lang === 'fr' ? 'Lien copié !' : 'Link copied!') : (lang === 'fr' ? 'Partager' : 'Share')}</span>
              </button>
            </div>
          </div>

          {/* View Mode Selectors */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-stone-500 mr-1">
                {lang === 'fr' ? 'Mode d’affichage :' : 'View Mode:'}
              </span>
              <button
                type="button"
                onClick={() => setViewMode('spread')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'spread'
                    ? 'bg-[#0D5C3A] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Vue Dépliée (Planches A4)' : 'Unfolded Spread (A4)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('panel')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'panel'
                    ? 'bg-[#0D5C3A] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Volet par Volet (6 Volets)' : 'Panel by Panel'}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('folded')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'folded'
                    ? 'bg-[#0D5C3A] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Simulation Pliage 3D' : '3D Fold Simulator'}</span>
              </button>
            </div>

            {/* Side switcher for spread mode */}
            {viewMode === 'spread' && (
              <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200/80">
                <button
                  type="button"
                  onClick={() => setActiveSide('outside')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeSide === 'outside'
                      ? 'bg-white text-[#111C18] shadow-2xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {lang === 'fr' ? 'Extérieur (Recto)' : 'Outside (Side 1)'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSide('inside')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeSide === 'inside'
                      ? 'bg-white text-[#111C18] shadow-2xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {lang === 'fr' ? 'Intérieur Déplié (Verso)' : 'Inside Spread (Side 2)'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRINT HELPER MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D5C3A] flex items-center justify-center">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-[#111C18]">
                    {lang === 'fr' ? 'Imprimer ou Sauvegarder en PDF' : 'Print or Save as PDF'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {lang === 'fr' ? 'Recommandations pour un résultat parfait' : 'Best settings for crisp output'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-[#FAF9F5] p-4 rounded-xl border border-stone-200/80 text-xs text-stone-700 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
                <span>
                  <strong>Destination :</strong> {lang === 'fr' ? 'Choisissez "Enregistrer au format PDF" ou votre imprimante couleur.' : 'Choose "Save as PDF" or color printer.'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
                <span>
                  <strong>Disposition :</strong> {lang === 'fr' ? 'Sélectionnez "Paysage" (Landscape).' : 'Select "Landscape".'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
                <span>
                  <strong>Marges :</strong> {lang === 'fr' ? 'Définissez sur "Aucune" (None) pour un plein écran 297mm × 210mm.' : 'Set to "None" for edge-to-edge tri-fold.'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
                <span>
                  <strong>Graphismes d’arrière-plan :</strong> {lang === 'fr' ? 'Cochez impérativement la case pour conserver les couleurs vert forêt et crèmes.' : 'Check the box to print full background colors.'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
              >
                {lang === 'fr' ? 'Annuler' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-xl transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Ouvrir l’impression PDF' : 'Open Print to PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. SPREAD VIEW (SIDE 1 OUTSIDE & SIDE 2 INSIDE)           */}
      {/* ======================================================== */}
      {viewMode === 'spread' && (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="text-center no-print">
            <p className="text-xs font-mono-tabular text-stone-500">
              {activeSide === 'outside'
                ? lang === 'fr'
                  ? 'Planche Extérieure (Recto) : [Volet 1 : Rabat Intérieur] · [Volet 2 : Dos / Contacts] · [Volet 3 : Couverture Principale]'
                  : 'Outside Spread: [Panel 1: Inside Flap] · [Panel 2: Back Cover] · [Panel 3: Front Cover]'
                : lang === 'fr'
                  ? 'Planche Intérieure (Verso Déplié) : [Volet 4 : Soins Primaires] · [Volet 5 : Maladies Chroniques] · [Volet 6 : Entreprise & Urgences]'
                  : 'Inside Spread: [Panel 4: Primary Care] · [Panel 5: Chronic Diseases] · [Panel 6: Corporate & Emergencies]'}
            </p>
          </div>

          {/* Outer or Inner 3-Fold Sheet */}
          <div className="overflow-x-auto pb-6">
            <div className="min-w-[960px] max-w-[1180px] mx-auto bg-white rounded-2xl shadow-xl border border-stone-300/80 overflow-hidden">
              {activeSide === 'outside' ? renderOutsideSpread(lang) : renderInsideSpread(lang)}
            </div>
          </div>

          <div className="flex justify-center gap-4 no-print">
            <button
              type="button"
              onClick={() => setActiveSide(activeSide === 'outside' ? 'inside' : 'outside')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#0D5C3A] bg-white border border-[#0D5C3A]/30 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <span>
                {activeSide === 'outside'
                  ? lang === 'fr' ? 'Voir la Planche Intérieure (Verso Déplié) →' : 'View Inside Spread (Side 2) →'
                  : lang === 'fr' ? '← Voir la Planche Extérieure (Recto)' : '← View Outside Spread (Side 1)'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PANEL-BY-PANEL CAROUSEL VIEW                         */}
      {/* ======================================================== */}
      {viewMode === 'panel' && (
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <div className="flex items-center justify-between bg-white border border-stone-200/80 rounded-2xl p-4 shadow-xs">
            <button
              type="button"
              onClick={() => setActivePanelIdx((prev) => (prev > 0 ? prev - 1 : panelsData.length - 1))}
              className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 cursor-pointer"
              aria-label="Volet précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <p className="text-xs font-mono-tabular font-bold text-[#0D5C3A]">
                {panelsData[activePanelIdx].title}
              </p>
              <p className="text-xs text-stone-500">
                {panelsData[activePanelIdx].subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActivePanelIdx((prev) => (prev < panelsData.length - 1 ? prev + 1 : 0))}
              className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 cursor-pointer"
              aria-label="Volet suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Current Panel Zoom Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-stone-300/80 overflow-hidden aspect-[99/210] max-h-[750px] mx-auto">
            {activePanelIdx === 0 && renderPanel1(lang)}
            {activePanelIdx === 1 && renderPanel2(lang)}
            {activePanelIdx === 2 && renderPanel3(lang)}
            {activePanelIdx === 3 && renderPanel4(lang)}
            {activePanelIdx === 4 && renderPanel5(lang)}
            {activePanelIdx === 5 && renderPanel6(lang)}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. 3D FOLD SIMULATOR                                     */}
      {/* ======================================================== */}
      {viewMode === 'folded' && (
        <div className="max-w-4xl mx-auto px-6 space-y-8 text-center">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-display font-semibold text-[#111C18]">
              {lang === 'fr' ? 'Comment se plie la brochure en main ?' : 'How does the physical brochure fold?'}
            </h3>
            <p className="text-xs text-stone-600 mt-1 max-w-xl mx-auto">
              {lang === 'fr'
                ? 'Un pli roulé classique à 3 volets : le volet droit (Couverture) s’ouvre en premier, révélant le rabat intérieur, qui s’ouvre à son tour pour découvrir les 3 volets de soins intérieurs.'
                : 'Standard tri-fold (roll fold): the front cover opens first to reveal the inside flap, which opens completely to unveil the full 3-column medical spread.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
              <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5 space-y-3">
                <span className="text-xs font-mono-tabular font-bold text-[#0D5C3A] bg-emerald-100/60 px-2.5 py-1 rounded-md">
                  Étape 1 · Pliée
                </span>
                <h4 className="text-sm font-semibold text-[#111C18]">
                  {lang === 'fr' ? 'Format Fermé (99 × 210 mm)' : 'Closed Format (99 × 210 mm)'}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'fr'
                    ? 'Le patient découvre la couverture prestige avec le logo CHAMS, le Dr Aboubacry THIAM et les grands domaines de soins.'
                    : 'The patient sees the prestige front cover featuring the CHAMS seal, Dr. Aboubacry THIAM, and core clinical areas.'}
                </p>
                <div className="h-44 rounded-lg overflow-hidden border border-stone-200">
                  {renderPanel3(lang)}
                </div>
              </div>

              <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5 space-y-3">
                <span className="text-xs font-mono-tabular font-bold text-[#0D5C3A] bg-emerald-100/60 px-2.5 py-1 rounded-md">
                  Étape 2 · Premier Pli
                </span>
                <h4 className="text-sm font-semibold text-[#111C18]">
                  {lang === 'fr' ? 'Ouverture du Rabat' : 'Flap Unfolding'}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'fr'
                    ? 'En soulevant la couverture, on lit les engagements cliniques, les horaires et les équipements diagnostiques.'
                    : 'Opening the cover reveals clinic standards, consultation hours, and modern diagnostic capabilities.'}
                </p>
                <div className="h-44 rounded-lg overflow-hidden border border-stone-200">
                  {renderPanel1(lang)}
                </div>
              </div>

              <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5 space-y-3">
                <span className="text-xs font-mono-tabular font-bold text-[#0D5C3A] bg-emerald-100/60 px-2.5 py-1 rounded-md">
                  Étape 3 · Dépliée
                </span>
                <h4 className="text-sm font-semibold text-[#111C18]">
                  {lang === 'fr' ? 'Grand Dépliant Ouvert' : 'Fully Open Spread'}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'fr'
                    ? 'Vision panoramique complète des 9 spécialités médicales coordonnées sur toute la largeur.'
                    : 'Full panoramic view of all 9 coordinated medical specialties and clinical protocols.'}
                </p>
                <div className="h-44 rounded-lg overflow-hidden border border-stone-200">
                  {renderInsideSpread(lang)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. HIDDEN PRINT CONTAINER (FOR PERFECT WINDOW.PRINT)     */}
      {/* ======================================================== */}
      <div className="hidden print:block print-container">
        {/* Page 1 : Outside Spread */}
        <div className="print-sheet">
          {renderOutsideSpread(lang)}
        </div>

        {/* Page 2 : Inside Spread */}
        <div className="print-sheet">
          {renderInsideSpread(lang)}
        </div>
      </div>
    </div>
  );
};

/* ==================================================================== */
/* SPREAD COMPOSERS                                                     */
/* ==================================================================== */

function renderOutsideSpread(lang: Language) {
  return (
    <div className="grid grid-cols-3 divide-x divide-dashed divide-stone-300 relative w-full aspect-[297/210] bg-white">
      {/* Fold marker indicators at top */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 -translate-y-full text-[10px] font-mono text-stone-400 no-print flex items-center gap-1">
        <span>↓ Pliure 1 (Fold 1)</span>
      </div>
      <div className="absolute top-0 left-2/3 -translate-x-1/2 -translate-y-full text-[10px] font-mono text-stone-400 no-print flex items-center gap-1">
        <span>↓ Pliure 2 (Fold 2)</span>
      </div>

      {/* Panel 1: Inside Flap (Rabat Intérieur) */}
      <div className="h-full overflow-hidden">
        {renderPanel1(lang)}
      </div>

      {/* Panel 2: Back Cover (Dos de couverture) */}
      <div className="h-full overflow-hidden">
        {renderPanel2(lang)}
      </div>

      {/* Panel 3: Front Cover (Couverture Principale) */}
      <div className="h-full overflow-hidden">
        {renderPanel3(lang)}
      </div>
    </div>
  );
}

function renderInsideSpread(lang: Language) {
  return (
    <div className="grid grid-cols-3 divide-x divide-dashed divide-stone-300 relative w-full aspect-[297/210] bg-[#FAF9F5]">
      {/* Panel 4: Inside Left (Primary & Maternal Care) */}
      <div className="h-full overflow-hidden">
        {renderPanel4(lang)}
      </div>

      {/* Panel 5: Inside Center (Chronic Diseases, Nutrition & Liver) */}
      <div className="h-full overflow-hidden">
        {renderPanel5(lang)}
      </div>

      {/* Panel 6: Inside Right (Corporate Medicine & Emergencies) */}
      <div className="h-full overflow-hidden">
        {renderPanel6(lang)}
      </div>
    </div>
  );
}

/* ==================================================================== */
/* INDIVIDUAL PANELS (99mm × 210mm PROPORTION)                          */
/* ==================================================================== */

/** Panel 1: Inside Flap (Rabat Intérieur - Atouts & Équipements) */
function renderPanel1(lang: Language) {
  return (
    <div className="h-full p-6 sm:p-7 flex flex-col justify-between bg-[#F8F7F2] text-[#111C18]">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ChamsLogoMark size="xs" />
          <span className="text-[11px] font-mono-tabular font-semibold text-[#0D5C3A] uppercase tracking-wider">
            {lang === 'fr' ? 'Notre Démarche' : 'Our Practice'}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-display font-semibold text-[#111C18] leading-tight mb-2">
          {lang === 'fr' ? 'Une Médecine Humaine & de Haute Rigueur' : 'Compassionate & High-Rigor Medicine'}
        </h3>

        <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed mb-4">
          {lang === 'fr'
            ? 'Au Cabinet Médical CHAMS Diamalaye, chaque patient bénéficie d’une écoute attentive et d’une prise en charge globale continue.'
            : 'At Cabinet Médical CHAMS Diamalaye, every patient receives dedicated attention, thorough clinical diagnosis, and continuous personalized care.'}
        </p>

        {/* 3 Core Commitments */}
        <div className="space-y-3 pt-3 border-t border-stone-200/80">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0D5C3A] shrink-0 mt-0.5" />
            <div className="text-[11px] leading-snug">
              <span className="font-bold text-[#111C18]">
                {lang === 'fr' ? 'Secret Médical Inviolable' : 'Strict Confidentiality'}
              </span>
              <p className="text-stone-500 mt-0.5">
                {lang === 'fr' ? 'Discrétion professionnelle totale pour consultations et bilans.' : 'Total confidentiality for private visits and corporate records.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0D5C3A] shrink-0 mt-0.5" />
            <div className="text-[11px] leading-snug">
              <span className="font-bold text-[#111C18]">
                {lang === 'fr' ? 'Continuité du Soin Familial' : 'Continuous Family Care'}
              </span>
              <p className="text-stone-500 mt-0.5">
                {lang === 'fr' ? 'Un médecin référent unique qui connaît l’histoire de votre foyer.' : 'A primary physician knowing your entire family medical history.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0D5C3A] shrink-0 mt-0.5" />
            <div className="text-[11px] leading-snug">
              <span className="font-bold text-[#111C18]">
                {lang === 'fr' ? 'Réactivité & Déplacements' : 'Responsive House Calls'}
              </span>
              <p className="text-stone-500 mt-0.5">
                {lang === 'fr' ? 'Consultations au cabinet ou à domicile pour seniors et urgences.' : 'Clinic appointments or equipped home visits for mobility needs.'}
              </p>
            </div>
          </div>
        </div>

        {/* Equipment Box */}
        <div className="mt-4 p-3 bg-white rounded-xl border border-stone-200/80">
          <p className="text-[10px] font-bold text-[#0D5C3A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Plateau Clinique sur Place' : 'On-Site Diagnostic Suite'}</span>
          </p>
          <ul className="text-[10px] text-stone-600 space-y-0.5">
            <li>• Tensiométrie clinique & automesure HTA</li>
            <li>• Dépistage glycémique immédiat & HbA1c</li>
            <li>• Bilan hépatique & suivi des hépatites</li>
            <li>• Trousse d’intervention d’urgence à domicile</li>
          </ul>
        </div>

        {/* Official Medical Stamp Seal */}
        <div className="mt-3 pt-2.5 border-t border-stone-200/80 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-[#0D5C3A] uppercase tracking-wide">
              {lang === 'fr' ? 'Cachet Médical Agréé' : 'Registered Medical Stamp'}
            </p>
            <p className="text-[9px] text-stone-500 font-mono-tabular">
              {CLINIC_INFO.doctor} · {CLINIC_INFO.onmsNumber}
            </p>
          </div>
          <ChamsMedicalStamp size="sm" variant="green" />
        </div>
      </div>

      {/* Panel Bottom Footer */}
      <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-[10px] text-stone-500 font-mono-tabular">
        <span>{CLINIC_INFO.group}</span>
        <span>09h 00 – 18 h 00</span>
      </div>
    </div>
  );
}

/** Panel 2: Back Cover (Dos de couverture - Plan, Contacts & QR Code) */
function renderPanel2(lang: Language) {
  return (
    <div className="h-full p-6 sm:p-7 flex flex-col justify-between bg-white text-[#111C18]">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono-tabular font-semibold text-[#0D5C3A] uppercase tracking-wider">
            {lang === 'fr' ? 'Accès & Contact' : 'Directions & Contact'}
          </span>
          <ChamsEmblem size="sm" />
        </div>

        <h3 className="text-lg sm:text-xl font-display font-semibold text-[#111C18] leading-tight mb-2">
          {lang === 'fr' ? 'Nous Trouver & Nous Joindre' : 'Location & Contacts'}
        </h3>

        {/* Landmark Info */}
        <div className="space-y-3 my-4 p-3.5 bg-[#FAF9F5] rounded-xl border border-stone-200/80 text-[11px]">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#111C18]">{CLINIC_INFO.addressLine1}</p>
              <p className="text-stone-600 mt-0.5 leading-snug">{CLINIC_INFO.addressLine2}</p>
              <p className="text-stone-500 font-medium">{CLINIC_INFO.city}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2 border-t border-stone-200/60">
            <Clock className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#111C18]">
                {lang === 'fr' ? 'Lundi au Samedi :' : 'Monday to Saturday:'} 09h00 – 18h00
              </p>
              <p className="text-stone-500 text-[10px]">
                {lang === 'fr' ? 'Et sur rendez-vous · Urgences à domicile' : 'And by appointment · Home visits'}
              </p>
            </div>
          </div>
        </div>

        {/* Phone numbers */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between p-2.5 bg-emerald-50/70 border border-emerald-200/60 rounded-lg text-xs font-mono-tabular">
            <span className="text-stone-600 font-sans text-[11px] font-medium">
              {lang === 'fr' ? 'Secrétariat & RDV :' : 'Clinic Desk:'}
            </span>
            <span className="font-bold text-[#0D5C3A]">{CLINIC_INFO.phonePrimary}</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono-tabular">
            <span className="text-stone-600 font-sans text-[11px] font-medium">
              {lang === 'fr' ? 'Urgences & Déplacements :' : 'Urgent & Home:'}
            </span>
            <span className="font-bold text-[#111C18]">{CLINIC_INFO.phoneSecondary}</span>
          </div>
        </div>

        {/* QR Code Card */}
        <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200 flex items-center gap-3.5">
          <div className="w-16 h-16 shrink-0 bg-white p-1 rounded-lg border border-stone-200 shadow-2xs">
            {renderQrCode()}
          </div>
          <div className="text-[10px] leading-tight">
            <p className="font-bold text-[#0D5C3A] uppercase tracking-wide">
              {lang === 'fr' ? 'Rendez-vous WhatsApp' : 'WhatsApp Booking'}
            </p>
            <p className="text-stone-600 mt-1">
              {lang === 'fr'
                ? 'Scannez pour écrire directement au Dr Aboubacry THIAM.'
                : 'Scan to message Dr. Aboubacry THIAM directly.'}
            </p>
            <p className="font-mono-tabular text-stone-500 mt-0.5">
              +221 78 538 20 20
            </p>
          </div>
        </div>
      </div>

      {/* Regulatory Licenses & Legal Footnote */}
      <div className="pt-4 border-t border-stone-200 text-[9px] text-stone-500 space-y-1 font-mono-tabular">
        <p className="font-semibold text-stone-700">
          {CLINIC_INFO.doctor} · {CLINIC_INFO.onmsNumber}
        </p>
        <p className="leading-snug">{CLINIC_INFO.ministerialDecree}</p>
        <p className="text-stone-400">© Cabinet Médical CHAMS · Dakar, Sénégal</p>
      </div>
    </div>
  );
}

/** Panel 3: Front Cover (Couverture Principale - Façade Prestige) */
function renderPanel3(lang: Language) {
  return (
    <div className="h-full p-6 sm:p-7 flex flex-col justify-between bg-[#0D5C3A] text-white relative overflow-hidden">
      {/* Subtle decorative background gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-emerald-500/20 via-transparent to-transparent pointer-events-none" />

      {/* Top Brand Lockup */}
      <div className="relative z-10">
        <div className="flex items-center justify-between pb-4 border-b border-emerald-700/60">
          <div className="flex items-center gap-2.5">
            <ChamsLogoMark size="sm" withBackground />
            <div>
              <p className="text-[10px] font-mono-tabular tracking-wider text-emerald-200 uppercase font-semibold">
                {CLINIC_INFO.group}
              </p>
              <p className="text-xs font-bold text-white tracking-tight">
                {CLINIC_INFO.name}
              </p>
            </div>
          </div>
          <span className="text-[9px] font-mono-tabular text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-600/40">
            {CLINIC_INFO.onmsNumber}
          </span>
        </div>

        {/* Main Cover Title */}
        <div className="mt-6 mb-4">
          <p className="text-[10px] font-mono-tabular text-amber-300 uppercase tracking-widest font-bold mb-1">
            {lang === 'fr' ? 'GUIDE DE SOINS MÉDICAUX' : 'MEDICAL CARE GUIDE'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-[1.12] tracking-tight">
            Cabinet Médical CHAMS
          </h2>
          <p className="text-sm font-medium text-emerald-100 mt-1">
            Diamalaye · Yoff · Dakar
          </p>
        </div>

        {/* Doctor Identity Plaque */}
        <div className="p-3 bg-emerald-900/70 border border-emerald-700/80 rounded-xl mb-4 backdrop-blur-xs">
          <p className="text-xs font-bold text-white">
            {CLINIC_INFO.doctor}
          </p>
          <p className="text-[10px] text-emerald-200/90 mt-0.5">
            {lang === 'fr'
              ? 'Médecin Traitant · Médecine Générale, Famille & Entreprise'
              : 'Primary Physician · General, Family & Corporate Medicine'}
          </p>
        </div>

        {/* Visual Media Badge: Doctor in Consultation */}
        <div className="relative rounded-xl overflow-hidden border border-emerald-600/50 h-32 sm:h-36 shadow-lg bg-emerald-950">
          <ResilientImage
            src={CLINIC_INFO.doctorPortrait}
            alt={CLINIC_INFO.doctor}
            className="w-full h-full object-cover object-[62%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
            <p className="text-[10px] font-medium text-emerald-100 font-mono-tabular">
              Au-dessus Pharmacie Diam Athie · Brioche Dorée
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Core Pillars Summary */}
      <div className="relative z-10 pt-4 border-t border-emerald-700/60 space-y-1.5">
        <p className="text-[9px] font-mono-tabular text-emerald-300 uppercase tracking-wider font-bold">
          {lang === 'fr' ? 'PÔLES D’EXPERTISE CLINIQUE :' : 'CORE CLINICAL AREAS:'}
        </p>
        <p className="text-[10px] text-white/90 leading-tight">
          • Médecine Générale & Famille · Mère-Enfant
        </p>
        <p className="text-[10px] text-white/90 leading-tight">
          • HTA · Diabète · Foie & Conseils Nutritionnels
        </p>
        <p className="text-[10px] text-white/90 leading-tight">
          • Médecine d'Entreprise · Urgences & Domicile
        </p>

        <div className="pt-2 flex items-center justify-between text-[10px] text-emerald-200 font-mono-tabular">
          <span>Tél : {CLINIC_INFO.phonePrimary}</span>
          <span className="font-semibold text-amber-300">09h – 18h & RDV</span>
        </div>
      </div>
    </div>
  );
}

/** Panel 4: Inside Left (Volet Intérieur Gauche - Soins Primaires & Famille) */
function renderPanel4(lang: Language) {
  return (
    <div className="h-full p-6 sm:p-7 flex flex-col justify-between bg-white text-[#111C18]">
      <div>
        <div className="pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#0D5C3A] font-bold text-[10px] flex items-center justify-center">
              1
            </span>
            <p className="text-[10px] font-mono-tabular uppercase tracking-wider font-bold text-[#0D5C3A]">
              Pôle Soins Primaires
            </p>
          </div>
          <h3 className="text-base sm:text-lg font-display font-semibold text-[#111C18]">
            {lang === 'fr' ? 'Médecine Générale, Famille & Mère-Enfant' : 'General, Family & Maternal-Child Care'}
          </h3>
        </div>

        <div className="space-y-4 mt-4">
          {/* 01. Médecine générale */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#111C18]">
                01. Médecine Générale
              </h4>
              <span className="text-[9px] font-mono text-stone-500">Sans ou avec RDV</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-snug">
              {lang === 'fr'
                ? 'Consultations adultes et adolescents : infections aiguës, bilans biologiques complets, certificats d’aptitude et coordination des soins spécialisés.'
                : 'Acute care, comprehensive adult checkups, lab panels, and medical certificates.'}
            </p>
          </div>

          {/* 02. Médecine de famille */}
          <div className="space-y-1 pt-3 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#111C18]">
                02. Médecine de Famille
              </h4>
              <span className="text-[9px] font-mono text-stone-500">Longitudinal</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-snug">
              {lang === 'fr'
                ? 'Suivi continu de toutes les générations du foyer, prévention des facteurs de risque héréditaires et accompagnement bienveillant des personnes âgées.'
                : 'Longitudinal healthcare for all household generations and compassionate senior support.'}
            </p>
          </div>

          {/* 08. Mère et enfant */}
          <div className="space-y-1 pt-3 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#111C18]">
                03. Santé Mère & Enfant
              </h4>
              <span className="text-[9px] font-mono text-stone-500">Pédiatrie</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-snug">
              {lang === 'fr'
                ? 'Suivi staturo-pondéral du nourrisson, calendrier vaccinal, conseils d’allaitement, diversification alimentaire et suivi médical pré/post-natal.'
                : 'Infant growth tracking, pediatric care, breastfeeding and nutritional advice.'}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-stone-200 text-[10px] text-stone-500 flex items-center justify-between font-mono-tabular">
        <span>Cabinet Médical CHAMS</span>
        <span>Volet 1 / 3 Intérieur</span>
      </div>
    </div>
  );
}

/** Panel 5: Inside Center (Volet Intérieur Centre - HTA, Diabète, Foie, Nutrition) */
function renderPanel5(lang: Language) {
  return (
    <div className="h-full p-6 sm:p-7 flex flex-col justify-between bg-[#FAF9F5] text-[#111C18]">
      <div>
        <div className="pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#0D5C3A] font-bold text-[10px] flex items-center justify-center">
              2
            </span>
            <p className="text-[10px] font-mono-tabular uppercase tracking-wider font-bold text-[#0D5C3A]">
              Pôle Cardio-Métabolique
            </p>
          </div>
          <h3 className="text-base sm:text-lg font-display font-semibold text-[#111C18]">
            {lang === 'fr' ? 'HTA, Diabète, Foie & Nutrition' : 'Hypertension, Diabetes, Liver & Nutrition'}
          </h3>
        </div>

        <div className="space-y-3 mt-4 text-[11px]">
          {/* HTA */}
          <div className="space-y-0.5">
            <h4 className="font-bold text-[#111C18] flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-[#0D5C3A]" />
              <span>04. HTA & Risque Cardio-Vasculaire</span>
            </h4>
            <p className="text-stone-600 leading-snug">
              {lang === 'fr'
                ? 'Stabilisation de la pression artérielle, protocole d’automesure à domicile, bilans lipidiques et prévention des accidents vasculaires.'
                : 'Blood pressure control, home BP monitoring protocols, and cardiovascular risk reduction.'}
            </p>
          </div>

          {/* Diabète */}
          <div className="space-y-0.5 pt-2.5 border-t border-stone-200/70">
            <h4 className="font-bold text-[#111C18] flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#0D5C3A]" />
              <span>05. Diabète & Endocrinologie</span>
            </h4>
            <p className="text-stone-600 leading-snug">
              {lang === 'fr'
                ? 'Suivi trimestriel de l’HbA1c, équilibre glycémique, éducation à l’insulinothérapie, prévention podologique et bilans thyroïdiens.'
                : 'Quarterly HbA1c tracking, glycemic balancing, insulin education, and thyroid care.'}
            </p>
          </div>

          {/* Foie & Digestion */}
          <div className="space-y-0.5 pt-2.5 border-t border-stone-200/70">
            <h4 className="font-bold text-[#111C18]">
              06. Maladies Digestives & du Foie
            </h4>
            <p className="text-stone-600 leading-snug">
              {lang === 'fr'
                ? 'Gastro-entérologie médicale : gastrites, ulcères, colopathies, stéatose et dépistage/suivi rigoureux des hépatites virales B et C.'
                : 'GERD, ulcers, irritable bowel, fatty liver disease, and viral Hepatitis B & C monitoring.'}
            </p>
          </div>

          {/* Nutrition */}
          <div className="space-y-0.5 pt-2.5 border-t border-stone-200/70">
            <h4 className="font-bold text-[#111C18]">
              07. Nutrition & Conseils Diététiques
            </h4>
            <p className="text-stone-600 leading-snug">
              {lang === 'fr'
                ? 'Rééquilibrage alimentaire médicalisé adapté aux habitudes culinaires sénégalaises (régimes sans sel, diabétique, stéatose).'
                : 'Medical dietary counseling tailored to Senegalese culinary habits and metabolic needs.'}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-stone-200 text-[10px] text-stone-500 flex items-center justify-between font-mono-tabular">
        <span>Dr Aboubacry THIAM</span>
        <span>Volet 2 / 3 Intérieur</span>
      </div>
    </div>
  );
}

/** Panel 6: Inside Right (Volet Intérieur Droit - Médecine d'Entreprise & Urgences Domicile) */
function renderPanel6(lang: Language) {
  return (
    <div className="h-full p-6 sm:p-7 flex flex-col justify-between bg-white text-[#111C18]">
      <div>
        <div className="pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#0D5C3A] font-bold text-[10px] flex items-center justify-center">
              3
            </span>
            <p className="text-[10px] font-mono-tabular uppercase tracking-wider font-bold text-[#0D5C3A]">
              Pôle Entreprise & Urgences
            </p>
          </div>
          <h3 className="text-base sm:text-lg font-display font-semibold text-[#111C18]">
            {lang === 'fr' ? 'Santé au Travail & Soins à Domicile' : 'Occupational Health & Home Emergencies'}
          </h3>
        </div>

        <div className="space-y-4 mt-4">
          {/* Médecine d'Entreprise */}
          <div className="space-y-1.5 p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/70">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#0D5C3A]">
                08. Médecine d'Entreprise
              </h4>
              <span className="text-[9px] font-mono text-emerald-800 font-semibold">Conventions PME</span>
            </div>
            <p className="text-[11px] text-stone-700 leading-snug">
              {lang === 'fr'
                ? 'Partenaire santé des sociétés dakaroises : visites médicales d’embauche, visites périodiques annuelles, certificats d’aptitude réglementaires et conventions de soins pour salariés.'
                : 'Healthcare partner for corporations: statutory pre-employment and annual staff exams, fitness certificates, and healthcare agreements.'}
            </p>
          </div>

          {/* Urgences Médicales et Domicile */}
          <div className="space-y-1.5 p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/70">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#92400E]">
                09. Urgences & Visites à Domicile
              </h4>
              <span className="text-[9px] font-mono text-[#92400E] font-semibold">Réactivité Dakar</span>
            </div>
            <p className="text-[11px] text-stone-700 leading-snug">
              {lang === 'fr'
                ? 'Intervention réactive au cabinet ou déplacement équipé à votre domicile (Yoff, Diamalaye, Virage, Ngor, Almadies) pour aînés, enfants fébriles et urgences médicales non chirurgicales.'
                : 'Equipped physician house calls across Yoff, Diamalaye, Virage, Ngor, and Almadies for seniors and urgent medical needs.'}
            </p>
          </div>

          {/* Direct Line Badge */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[10px] space-y-1">
            <p className="font-bold text-[#111C18]">Prise de Rendez-vous Rapide :</p>
            <p className="text-stone-600">
              Appelez le secrétariat au <span className="font-mono font-bold text-[#0D5C3A]">{CLINIC_INFO.phonePrimary}</span> ou écrivez sur WhatsApp.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-stone-200 text-[10px] text-stone-500 flex items-center justify-between font-mono-tabular">
        <span>Yoff Diamalaye</span>
        <span>Volet 3 / 3 Intérieur</span>
      </div>
    </div>
  );
}
