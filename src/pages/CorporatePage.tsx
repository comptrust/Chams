import React, { useState } from 'react';
import { Building2, Check, CheckCircle2, FileCheck, FileText, Phone, Send, ShieldCheck, Users } from 'lucide-react';
import { CLINIC_INFO, Language, PageId } from '../data/clinicData';
import { ChamsLogoMark, ResilientImage } from '../components/ChamsEmblem';

interface CorporatePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const CorporatePage: React.FC<CorporatePageProps> = ({ lang, onNavigate }) => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [headcount, setHeadcount] = useState('10-50');
  const [requestedServices, setRequestedServices] = useState<string[]>([
    'visites-annuelles',
    'conventions-soins',
  ]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (serviceId: string) => {
    setRequestedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const getWhatsAppProposalUrl = () => {
    const text = [
      `Bonjour Dr Aboubacry THIAM (Cabinet Médical CHAMS Diamalaye),`,
      `Demande de Partenariat Santé / Médecine d'Entreprise`,
      `Entreprise: ${companyName}`,
      `Contact: ${contactPerson}`,
      `Tél: ${phone}`,
      `E-mail: ${email || 'Non renseigné'}`,
      `Effectif estimé: ${headcount} salariés`,
      `Services souhaités: ${requestedServices.join(', ')}`,
      notes ? `Précisions: ${notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="py-12 lg:py-16 bg-[#FAF9F5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Page Header with Logo next to Title */}
        <div className="pb-8 border-b border-stone-200/80">
          <div className="flex items-center gap-3 mb-2">
            <ChamsLogoMark size="sm" />
            <p className="text-xs font-semibold text-[#0D5C3A] tracking-wide uppercase">
              {lang === 'fr' ? 'Médecine d’Entreprise & Conventions' : 'Corporate & Occupational Health'}
            </p>
          </div>

          <h1 className="text-3xl lg:text-4xl font-display font-semibold text-[#111C18]">
            {lang === 'fr'
              ? 'Santé au Travail & Conventions Médicales d’Entreprise'
              : 'Occupational Health & Corporate Healthcare Partnerships'}
          </h1>

          <p className="text-sm text-stone-600 max-w-3xl leading-relaxed mt-2.5">
            {lang === 'fr'
              ? 'Le Cabinet Médical CHAMS Diamalaye accompagne les entreprises, institutions, PME et représentations à Dakar pour la conformité légale, le suivi de santé du personnel et les conventions de soins pour salariés et ayants droit.'
              : 'Cabinet Médical CHAMS Diamalaye supports enterprises, institutions, and SMEs across Dakar with statutory occupational exams, employee health screenings, and corporate healthcare conventions.'}
          </p>

          <div className="mt-4 pt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('brochure')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0D5C3A] bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300/80 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-2xs group"
            >
              <FileText className="w-4 h-4 text-[#0D5C3A] group-hover:scale-105 transition-transform" />
              <span>{lang === 'fr' ? 'Télécharger la Brochure Officielle (3 Volets PDF)' : 'Download Official 3-Fold Brochure (PDF)'}</span>
              <span className="text-[10px] font-mono font-bold bg-[#0D5C3A] text-white px-1.5 py-0.5 rounded leading-none">
                PDF
              </span>
            </button>
          </div>
        </div>

        {/* 4 Pillars of Corporate Medicine */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          <div className="bg-white border border-stone-200/90 rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF3EE] text-[#0D5C3A] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-semibold text-[#111C18]">
              {lang === 'fr' ? 'Visites d’Embauche' : 'Pre-Employment Visits'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'fr'
                ? 'Évaluation d’aptitude médicale au poste de travail, dépistage et délivrance rapide de certificat réglementaire.'
                : 'Medical job fitness assessment, screening, and prompt regulatory certificate issuance.'}
            </p>
          </div>

          <div className="bg-white border border-stone-200/90 rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF3EE] text-[#0D5C3A] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-semibold text-[#111C18]">
              {lang === 'fr' ? 'Bilans Périodiques Annuels' : 'Annual Health Screenings'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'fr'
                ? 'Examens systématiques pour l’ensemble des collaborateurs : tension, glycémie, vision, ergonomie et santé générale.'
                : 'Systematic checkups for all staff: blood pressure, glucose, ergonomics, and general wellness.'}
            </p>
          </div>

          <div className="bg-white border border-stone-200/90 rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF3EE] text-[#0D5C3A] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-semibold text-[#111C18]">
              {lang === 'fr' ? 'Conventions Cadres de Soins' : 'Corporate Care Agreements'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'fr'
                ? 'Prise en charge directe et prioritaire des salariés et de leurs familles au Cabinet Médical CHAMS avec facturation mensuelle groupée.'
                : 'Direct and priority care for staff and families at Cabinet Médical CHAMS with consolidated monthly billing.'}
            </p>
          </div>

          <div className="bg-white border border-stone-200/90 rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF3EE] text-[#0D5C3A] flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="text-base font-semibold text-[#111C18]">
              {lang === 'fr' ? 'Campagnes de Dépistage sur Site' : 'On-Site Health Days'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'fr'
                ? 'Intervention de l’équipe médicale directement au sein de votre entreprise à Dakar pour des journées de santé et de sensibilisation.'
                : 'Medical team deployment directly on company premises across Dakar for wellness and screening days.'}
            </p>
          </div>
        </div>

        {/* 2-Column Split: Regulatory Proof + Interactive Convention Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-start">
          {/* Left 5 Columns */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-display font-semibold text-[#111C18]">
                {lang === 'fr'
                  ? 'Pourquoi choisir le Cabinet Médical CHAMS ?'
                  : 'Why Partner with Cabinet Médical CHAMS?'}
              </h3>

              <ul className="space-y-3.5 text-xs text-stone-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
                  <span>
                    <strong>{lang === 'fr' ? 'Agrément officiel :' : 'Official licensing:'}</strong>{' '}
                    Cabinet agréé par le Ministère de la Santé (Arrêté N° MSP/DGES/DPRS/DR 03 Août 2022*023125) et N° ONMS B 1217.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
                  <span>
                    <strong>{lang === 'fr' ? 'Emplacement stratégique :' : 'Strategic location:'}</strong>{' '}
                    À Yoff Diamalaye, accès aisé depuis les zones aéroportuaires, Virage, Ngor, Almadies, Plateau et VDN.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
                  <span>
                    <strong>{lang === 'fr' ? 'Réactivité en cas d’urgence :' : 'Emergency readiness:'}</strong>{' '}
                    Possibilité d’intervention médicale d’urgence sur site ou à domicile pour vos collaborateurs clés.
                  </span>
                </li>
              </ul>

              <div className="pt-4 border-t border-stone-200/80">
                <p className="text-xs text-stone-500 mb-2 font-medium">
                  {lang === 'fr' ? 'Contact Direct Entreprise :' : 'Direct Corporate Desk:'}
                </p>
                <p className="font-mono-tabular font-bold text-sm text-[#0D5C3A]">
                  {CLINIC_INFO.phonePrimary} / {CLINIC_INFO.phoneSecondary}
                </p>
                <p className="text-xs text-stone-600 mt-1 font-mono-tabular">
                  {CLINIC_INFO.email}
                </p>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Interactive Convention Proposal Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-display font-semibold text-[#111C18] mb-1">
              {lang === 'fr'
                ? 'Demande de Convention ou Devis Entreprise'
                : 'Request a Corporate Healthcare Agreement / Quote'}
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              {lang === 'fr'
                ? 'Recevez une proposition adaptée à la taille et aux spécificités de votre structure sous 24h ouvrées.'
                : 'Receive a proposal tailored to your company size within 24 working hours.'}
            </p>

            {submitted ? (
              <div className="p-6 bg-[#F1F6F3] border border-[#0D5C3A]/25 rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A]">
                  <Check className="w-4 h-4" />
                  <span>
                    {lang === 'fr'
                      ? 'DEMANDE ENREGISTRÉE AVEC SUCCÈS'
                      : 'PROPOSAL REQUEST SUBMITTED'}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[#111C18]">
                  {companyName}
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {lang === 'fr'
                    ? `Merci ${contactPerson}. Le Dr Aboubacry THIAM et le secrétariat médical du Cabinet Médical CHAMS ont bien reçu votre demande pour ${headcount} collaborateurs.`
                    : `Thank you ${contactPerson}. Dr. Aboubacry THIAM has received your inquiry for ${headcount} employees.`}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={getWhatsAppProposalUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'fr' ? 'Transmettre via WhatsApp' : 'Send via WhatsApp'}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-3.5 py-2.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    {lang === 'fr' ? 'Modifier' : 'Edit'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {lang === 'fr' ? 'Nom de l’Entreprise / Organisation *' : 'Company Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ex: Société Sahélienne de Transit"
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] focus:outline-none focus:border-[#0D5C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {lang === 'fr' ? 'Interlocuteur / Responsable RH *' : 'Contact Person / HR Lead *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Ex: M. Oumar Sow (DRH)"
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] focus:outline-none focus:border-[#0D5C3A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {lang === 'fr' ? 'Téléphone de contact *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+221 77 000 00 00"
                      className="w-full px-3.5 py-2 text-sm font-mono-tabular bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] focus:outline-none focus:border-[#0D5C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {lang === 'fr' ? 'E-mail professionnel' : 'Work Email'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rh@entreprise.sn"
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] focus:outline-none focus:border-[#0D5C3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'fr' ? 'Effectif approximatif' : 'Estimated Headcount'}
                  </label>
                  <select
                    value={headcount}
                    onChange={(e) => setHeadcount(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] focus:outline-none focus:border-[#0D5C3A]"
                  >
                    <option value="1-10">Moins de 10 collaborateurs</option>
                    <option value="10-50">10 à 50 collaborateurs</option>
                    <option value="50-150">50 à 150 collaborateurs</option>
                    <option value="150+">Plus de 150 collaborateurs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {lang === 'fr' ? 'Prestations souhaitées' : 'Requested Services'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'visites-embauche', label: 'Visites d’embauche' },
                      { id: 'visites-annuelles', label: 'Bilans de santé annuels' },
                      { id: 'conventions-soins', label: 'Convention cadre de soins' },
                      { id: 'depistage-site', label: 'Dépistage sur site (HTA/Diabète)' },
                    ].map((item) => (
                      <label
                        key={item.id}
                        className="flex items-center gap-2 p-2 bg-[#FAF9F5] rounded border border-stone-200 cursor-pointer text-stone-700"
                      >
                        <input
                          type="checkbox"
                          checked={requestedServices.includes(item.id)}
                          onChange={() => toggleService(item.id)}
                          className="accent-[#0D5C3A]"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'fr' ? 'Besoins particuliers ou notes' : 'Additional Notes'}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      lang === 'fr'
                        ? 'Précisez votre activité, localisation de vos locaux, délais souhaités...'
                        : 'Describe your industry, branch location, preferred timeline...'
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9F5] border border-stone-300 rounded-lg text-[#111C18] focus:outline-none focus:border-[#0D5C3A]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg transition-colors cursor-pointer"
                  >
                    {lang === 'fr' ? 'Envoyer la demande de convention' : 'Submit Corporate Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
