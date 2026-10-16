import React from 'react';
import { Award, BookOpen, CheckCircle, FileText, HeartPulse, ShieldCheck, Stethoscope } from 'lucide-react';
import { CARE_PILLARS, CLINIC_INFO, Language, PageId } from '../data/clinicData';
import { ChamsEmblem, ChamsLogoMark } from '../components/ChamsEmblem';

interface DoctorPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const DoctorPage: React.FC<DoctorPageProps> = ({ lang, onNavigate }) => {
  return (
    <div className="py-12 lg:py-16 bg-[#FAF9F5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Page Header with Logo next to Title */}
        <div className="pb-8 border-b border-stone-200/80">
          <div className="flex items-center gap-3 mb-2">
            <ChamsLogoMark size="sm" />
            <p className="text-xs font-semibold text-[#0D5C3A] tracking-wide uppercase">
              {lang === 'fr' ? 'Médecin Responsable & Déontologie' : 'Lead Physician & Clinical Governance'}
            </p>
          </div>

          <h1 className="text-3xl lg:text-4xl font-display font-semibold text-[#111C18]">
            {lang === 'fr'
              ? 'Dr Aboubacry THIAM — Cabinet Médical CHAMS'
              : 'Dr. Aboubacry THIAM — Cabinet Médical CHAMS'}
          </h1>

          <p className="text-sm text-stone-600 max-w-3xl leading-relaxed mt-2.5">
            {lang === 'fr'
              ? 'Médecin traitant inscrit à l’Ordre National des Médecins du Sénégal sous le N° ONMS B 1217. Une pratique médicale fondée sur l’écoute humaine, la rigueur clinique et la continuité du soin familial.'
              : 'Physician registered with the National Medical Board of Senegal under N° ONMS B 1217. A medical practice anchored in compassionate listening, clinical rigor, and continuous family care.'}
          </p>
        </div>

        {/* Doctor Main Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 items-start">
          {/* Left 7 Columns: Story & Clinical Credentials */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-5">
              <h2 className="text-2xl font-display font-semibold text-[#111C18]">
                {lang === 'fr' ? 'Biographie & Parcours Professionnel' : 'Biography & Clinical Practice'}
              </h2>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {lang === 'fr'
                  ? 'Le Dr Aboubacry THIAM (Dr. Abou THIAM) a fondé le Cabinet Médical CHAMS Diamalaye au sein du Groupe CHAMS AFRICA afin d’offrir à la population de Yoff, Diamalaye et plus largement de Dakar un espace de soins primaires et spécialisés moderne, accessible et profondément humain.'
                  : 'Dr. Aboubacry THIAM (Dr. Abou THIAM) founded Cabinet Médical CHAMS Diamalaye within Groupe CHAMS AFRICA to provide the community of Yoff, Diamalaye, and Dakar with modern, accessible, and deeply humane primary and specialized medical care.'}
              </p>

              <p className="text-sm text-stone-600 leading-relaxed">
                {lang === 'fr'
                  ? 'Fort d’une solide expérience en médecine générale, médecine d’entreprise et pathologies chroniques prévalentes en milieu urbain sénégalais (hypertension artérielle, diabète métabolique, maladies du foie et affections digestives), il privilégie une approche globale du patient : prise en charge aiguë, bilans réguliers, conseils nutritionnels personnalisés et visites médicales à domicile pour les personnes vulnérables.'
                  : 'With extensive clinical experience in general practice, occupational medicine, and prevailing chronic conditions in Senegal (hypertension, diabetes, liver disease, and digestive disorders), he emphasizes holistic patient care: acute management, regular checkups, personalized nutrition, and house calls for vulnerable individuals.'}
              </p>

              <div className="pt-4 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF9F5] border border-stone-200/70 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A] mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{lang === 'fr' ? 'Inscription Ordinale' : 'Board Certification'}</span>
                  </div>
                  <p className="font-mono-tabular font-bold text-lg text-[#111C18]">
                    {CLINIC_INFO.onmsNumber}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {lang === 'fr'
                      ? 'Ordre National des Médecins du Sénégal'
                      : 'National Medical Board of Senegal'}
                  </p>
                </div>

                <div className="p-4 bg-[#FAF9F5] border border-stone-200/70 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A] mb-1">
                    <Award className="w-4 h-4" />
                    <span>{lang === 'fr' ? 'Autorisation Ministérielle' : 'Ministry Decree'}</span>
                  </div>
                  <p className="font-mono-tabular font-bold text-xs text-[#111C18] break-words">
                    {CLINIC_INFO.ministerialDecree}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {lang === 'fr'
                      ? 'Ministère de la Santé et de la Prévention'
                      : 'Ministry of Health and Prevention'}
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values & Practice Ethics */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-display font-semibold text-[#111C18]">
                {lang === 'fr' ? 'Nos Principes Déontologiques' : 'Our Practice Philosophy'}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-stone-700">
                  <CheckCircle className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#111C18]">
                      {lang === 'fr' ? 'Secret Médical Absolu :' : 'Strict Medical Confidentiality:'}
                    </span>{' '}
                    {lang === 'fr'
                      ? 'Toutes les informations confiées font l’objet d’une discrétion professionnelle inviolable, qu’il s’agisse de consultations privées ou de bilans d’entreprise.'
                      : 'All patient records and clinical discussions are protected by absolute medical confidentiality.'}
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-stone-700">
                  <CheckCircle className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#111C18]">
                      {lang === 'fr' ? 'Disponibilité & Proximité :' : 'Availability & Accessibility:'}
                    </span>{' '}
                    {lang === 'fr'
                      ? 'Ouverture continue de 09h00 à 18h00, accueil sur rendez-vous et réactivité téléphonique pour les urgences médicales et déplacements à domicile.'
                      : 'Continuous hours from 09:00 to 18:00, appointment scheduling, and telephone triage for home emergencies.'}
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-stone-700">
                  <CheckCircle className="w-4 h-4 text-[#0D5C3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#111C18]">
                      {lang === 'fr' ? 'Pédagogie & Écoute Thérapeutique :' : 'Patient Education & Listening:'}
                    </span>{' '}
                    {lang === 'fr'
                      ? 'Explication claire des diagnostics, prescriptions expliquées et conseils nutritionnels adaptés aux réalités de la cuisine locale sénégalaise.'
                      : 'Clear explanation of diagnoses, personalized treatment advice, and nutritional guidance adapted to local diets.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Doctor Portrait, Official Seal & Consultation Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs">
              {/* Doctor Official Portrait */}
              <div className="relative aspect-square w-full bg-stone-100">
                <img
                  src={CLINIC_INFO.doctorPortrait}
                  alt={CLINIC_INFO.doctor}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white">
                    <p className="text-xs font-mono-tabular text-emerald-300">
                      {CLINIC_INFO.onmsNumber} · {CLINIC_INFO.group}
                    </p>
                    <h3 className="text-xl font-display font-bold text-white mt-0.5">
                      {CLINIC_INFO.doctor}
                    </h3>
                    <p className="text-white/80 text-xs">
                      {lang === 'fr'
                        ? 'Médecin Responsable · Cabinet Médical CHAMS Diamalaye'
                        : 'Lead Physician · Cabinet Médical CHAMS Diamalaye'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col items-center text-center">
                <div className="flex items-center gap-3 mb-4">
                  <ChamsEmblem size="sm" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#111C18]">{CLINIC_INFO.fullName}</p>
                    <p className="text-[11px] text-stone-500">Yoff Diamalaye · Rond Point Brioche Dorée</p>
                  </div>
                </div>

                <div className="w-full my-2 border-t border-stone-200/80" />

              <dl className="w-full space-y-3 text-left text-xs">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-stone-500">
                    {lang === 'fr' ? 'Ligne 1 Secrétariat' : 'Line 1 Clinic'}
                  </dt>
                  <dd className="font-mono-tabular font-semibold text-[#111C18]">
                    <a href={`tel:${CLINIC_INFO.phonePrimaryRaw}`} className="hover:text-[#0D5C3A]">
                      {CLINIC_INFO.phonePrimary}
                    </a>
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-stone-500">
                    {lang === 'fr' ? 'Ligne 2 Urgences' : 'Line 2 Emergencies'}
                  </dt>
                  <dd className="font-mono-tabular font-semibold text-[#111C18]">
                    <a href={`tel:${CLINIC_INFO.phoneSecondaryRaw}`} className="hover:text-[#0D5C3A]">
                      {CLINIC_INFO.phoneSecondary}
                    </a>
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-stone-500">E-mail</dt>
                  <dd className="font-mono-tabular font-medium text-[#111C18]">
                    <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-[#0D5C3A]">
                      {CLINIC_INFO.email}
                    </a>
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-stone-500">
                    {lang === 'fr' ? 'Horaires d’accueil' : 'Opening Hours'}
                  </dt>
                  <dd className="font-mono-tabular font-semibold text-[#0D5C3A]">
                    09h 00 – 18 h & Sur RDV
                  </dd>
                </div>
              </dl>

              <div className="w-full mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${CLINIC_INFO.phonePrimaryRaw}`}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg transition-colors whitespace-nowrap shrink-0 text-center"
                >
                  {lang === 'fr' ? 'Appeler le Cabinet' : 'Call Clinic'}
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate('rendez-vous')}
                  className="px-4 py-2.5 text-xs font-semibold text-[#111C18] bg-[#F2EFE9] hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer text-center"
                >
                  {lang === 'fr' ? 'Prendre Rendez-vous' : 'Book Online'}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('brochure')}
                  className="sm:col-span-2 px-4 py-2.5 text-xs font-semibold text-[#0D5C3A] bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300/80 rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer text-center inline-flex items-center justify-center gap-2 group shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0D5C3A] group-hover:scale-105 transition-transform" />
                  <span>{lang === 'fr' ? 'Consulter la Brochure Officielle (3 Volets PDF)' : 'View Official 3-Fold Brochure (PDF)'}</span>
                  <span className="text-[10px] font-mono font-bold bg-[#0D5C3A] text-white px-1.5 py-0.5 rounded leading-none">
                    PDF
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Equipment & Clinical Diagnostic Readiness */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-display font-semibold text-[#111C18]">
                {lang === 'fr' ? 'Équipements & Diagnostics au Cabinet' : 'On-Site Diagnostic Capabilities'}
              </h3>

              <ul className="space-y-2.5 text-xs text-stone-600">
                <li className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-[#0D5C3A] shrink-0" />
                  <span>Stéthoscopie & tensiométrie clinique de précision</span>
                </li>
                <li className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-[#0D5C3A] shrink-0" />
                  <span>Triage cardio-vasculaire & automesure tensionnelle</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0D5C3A] shrink-0" />
                  <span>Dépistage glycémique immédiat & bilans métaboliques</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0D5C3A] shrink-0" />
                  <span>Trousse médicale mobile d'urgence pour déplacements à domicile</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Clinical Gallery: The same doctor in practice across formats */}
        <div className="mt-16 pt-12 border-t border-stone-200/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold text-[#0D5C3A] uppercase tracking-wide mb-1">
                {lang === 'fr' ? 'Pratique Clinique en Images' : 'Clinical Practice in Pictures'}
              </p>
              <h3 className="text-2xl font-display font-semibold text-[#111C18]">
                {lang === 'fr'
                  ? 'Le Dr Aboubacry THIAM au Service de vos Soins'
                  : 'Dr. Aboubacry THIAM in Clinical Practice'}
              </h3>
            </div>
            <p className="text-xs text-stone-500 font-mono-tabular">
              {CLINIC_INFO.onmsNumber} · Cabinet Médical CHAMS Diamalaye
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={CLINIC_INFO.doctorConsultation}
                  alt="Dr Aboubacry THIAM en consultation générale au cabinet"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-xs text-[#111C18]">
                  {lang === 'fr' ? 'Dr Aboubacry THIAM en Consultation' : 'Dr. Aboubacry THIAM in Consultation'}
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {lang === 'fr' ? 'Écoute clinique attentive et diagnostic approfondi au cabinet.' : 'Attentive clinical listening and thorough diagnosis at the clinic.'}
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={CLINIC_INFO.doctorPortrait}
                  alt="Dr Aboubacry THIAM au cabinet médical CHAMS Diamalaye"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-xs text-[#111C18]">
                  {lang === 'fr' ? 'Portrait Officiel du Médecin Traitant' : 'Lead Physician Official Portrait'}
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {lang === 'fr' ? 'Suivi coordonné des familles, HTA, diabète et bilans de santé.' : 'Coordinated care for families, hypertension, diabetes, and health checkups.'}
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={CLINIC_INFO.buildingImage}
                  alt="Immeuble du Cabinet Médical CHAMS Diamalaye au-dessus de la Pharmacie Diam Athie"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-xs text-[#111C18]">
                  {lang === 'fr' ? 'Cabinet CHAMS à Yoff Diamalaye' : 'CHAMS Clinic in Yoff Diamalaye'}
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {lang === 'fr' ? 'Au Rond-Point Brioche Dorée, au-dessus de la Pharmacie Diam Athie.' : 'At Rond-Point Brioche Dorée, above Pharmacie Diam Athie.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
