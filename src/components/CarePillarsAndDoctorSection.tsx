import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import {
  CARE_PILLARS,
  CLINIC_INFO,
  Language,
} from '../data/clinicData';
import { ChamsEmblem, ResilientImage } from './ChamsEmblem';

interface CarePillarsAndDoctorSectionProps {
  lang: Language;
  onSelectPillarBooking: (specialtyId: string, requestHomeVisit?: boolean) => void;
}

export const CarePillarsAndDoctorSection: React.FC<CarePillarsAndDoctorSectionProps> = ({
  lang,
  onSelectPillarBooking,
}) => {
  const pillarToDefaultSpecialty: Record<string, { id: string; home: boolean }> = {
    'pillar-cardio-metabolic': { id: 'hta-cardiovasculaire', home: false },
    'pillar-family-maternal': { id: 'sante-mere-enfant', home: false },
    'pillar-digestive-nutrition-corporate': { id: 'maladies-digestives-foie', home: false },
  };

  return (
    <>
      {/* Asymmetric Bento-Grid of Clinical Care Units + Claim-to-Proof Adjacency */}
      <section id="poles-de-soins" className="py-20 lg:py-24 bg-[#F3F1EA] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#0D5C3A] tracking-wide mb-2">
                {lang === 'fr'
                  ? 'Architecture clinique · Groupe CHAMS AFRICA'
                  : 'Clinical Architecture · Groupe CHAMS AFRICA'}
              </p>
              <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#111C18] text-balance">
                {lang === 'fr'
                  ? 'Trois pôles d’excellence médicale au service des patients et des entreprises'
                  : 'Three clinical care units serving patients, families, and enterprises'}
              </h2>
            </div>
            <p className="text-sm text-stone-600 max-w-md leading-relaxed">
              {lang === 'fr'
                ? 'Une approche globale alliant dépistage précoce, suivi des maladies chroniques et réactivité en cas d’urgence médicale à Yoff Diamalaye.'
                : 'A comprehensive approach combining early screening, chronic disease stabilization, and rapid response for medical emergencies in Yoff Diamalaye.'}
            </p>
          </div>

          {/* Asymmetric Bento Grid: 1 Featured Wide Card + 2 Secondary Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {CARE_PILLARS.map((pillar, index) => {
              const isPrimaryFeatured = index === 0;
              const targetSpec = pillarToDefaultSpecialty[pillar.id] || {
                id: 'medecine-generale',
                home: false,
              };

              return (
                <article
                  key={pillar.id}
                  className={`${
                    isPrimaryFeatured ? 'lg:col-span-12' : 'lg:col-span-6'
                  } bg-white border border-stone-200/90 rounded-2xl overflow-hidden flex flex-col ${
                    isPrimaryFeatured ? 'lg:flex-row' : ''
                  }`}
                >
                  {/* Visual Media Slot */}
                  <div
                    className={`${
                      isPrimaryFeatured
                        ? 'lg:w-7/12 min-h-[280px] lg:min-h-[380px]'
                        : 'h-64 sm:h-72'
                    } relative overflow-hidden bg-stone-100`}
                  >
                    <ResilientImage
                      src={pillar.imagePath}
                      alt={pillar.imageAlt[lang]}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <p className="text-xs font-mono-tabular text-white/85">
                          {pillar.index} · {pillar.kicker[lang]}
                        </p>
                        <div className="mt-1 flex items-baseline gap-2.5">
                          <span className="text-2xl font-mono-tabular font-bold text-white">
                            {pillar.metrics.value}
                          </span>
                          <span className="text-xs font-medium text-white/90">
                            {pillar.metrics.label[lang]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text & Action Content */}
                  <div
                    className={`${
                      isPrimaryFeatured ? 'lg:w-5/12' : ' flex-1'
                    } p-6 sm:p-8 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span className="font-mono-tabular font-semibold text-[#0D5C3A]">
                          {pillar.index}.
                        </span>
                        <span>{pillar.kicker[lang]}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#111C18] mt-2.5 text-balance">
                        {pillar.title[lang]}
                      </h3>

                      <p className="text-sm text-stone-600 leading-relaxed mt-3">
                        {pillar.summary[lang]}
                      </p>

                      <ul className="mt-5 pt-4 border-t border-stone-200/80 space-y-2">
                        {pillar.includedSpecialties[lang].map((spec, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2.5 text-xs font-medium text-stone-700"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0D5C3A] shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                      <span className="text-xs text-stone-500">
                        {pillar.metrics.context[lang]}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectPillarBooking(targetSpec.id, targetSpec.home)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0D5C3A] bg-[#EBF3EE] hover:bg-[#0D5C3A] hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>{lang === 'fr' ? 'Planifier' : 'Schedule'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dr. Aboubacry THIAM Official Credentials & Seal Section */}
      <section id="dr-thiam" className="py-20 lg:py-24 bg-[#FAF9F5] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 7 Cols: Physician Biography & Regulatory Governance */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-[#0D5C3A]">{CLINIC_INFO.group}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{CLINIC_INFO.onmsNumber}</span>
                <span aria-hidden="true">·</span>
                <span>Dakar, Sénégal</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#111C18] text-balance">
                {lang === 'fr'
                  ? 'Dr Aboubacry THIAM — Médecin Responsable du Cabinet Médical CHAMS Diamalaye'
                  : 'Dr. Aboubacry THIAM — Lead Physician at Cabinet Médical CHAMS Diamalaye'}
              </h2>

              <p className="text-base text-stone-700 leading-relaxed">
                {lang === 'fr'
                  ? 'Inscrit au Tableau de l’Ordre National des Médecins du Sénégal sous le numéro ONMS B 1217, le Dr Aboubacry THIAM (Dr. Abou THIAM) dirige le Cabinet Médical CHAMS Diamalaye avec une philosophie centrée sur l’écoute clinique, la rigueur diagnostique et la continuité des soins.'
                  : 'Registered with the National Medical Board of Senegal under N° ONMS B 1217, Dr. Aboubacry THIAM (Dr. Abou THIAM) leads Cabinet Médical CHAMS Diamalaye with a practice philosophy built on attentive clinical listening, diagnostic precision, and continuity of care.'}
              </p>

              <p className="text-sm text-stone-600 leading-relaxed">
                {lang === 'fr'
                  ? 'Situé au Rond-Point Brioche Dorée à Yoff Diamalaye, juste au-dessus de la Pharmacie Diam Athie, le cabinet reçoit les patients du lundi au samedi de 09h00 à 18h00 ainsi que sur rendez-vous, et assure les urgences médicales et consultations à domicile.'
                  : 'Located at Rond-Point Brioche Dorée in Yoff Diamalaye, directly above Pharmacie Diam Athie, the clinic welcomes patients from 09:00 to 18:00 and by appointment, while providing rapid medical emergency response and home visits.'}
              </p>

              {/* Official Regulatory Verification Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 bg-white border border-stone-200/90 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A] mb-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {lang === 'fr'
                        ? 'Ordre National des Médecins du Sénégal'
                        : 'National Medical Board of Senegal'}
                    </span>
                  </div>
                  <p className="font-mono-tabular text-lg font-bold text-[#111C18]">
                    {CLINIC_INFO.onmsNumber}
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    {lang === 'fr'
                      ? 'Inscription officielle du Dr Aboubacry THIAM'
                      : 'Official registration of Dr. Aboubacry THIAM'}
                  </p>
                </div>

                <div className="p-5 bg-white border border-stone-200/90 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A] mb-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {lang === 'fr'
                        ? 'Autorisation Ministérielle (MSP)'
                        : 'Ministry of Health Authorization'}
                    </span>
                  </div>
                  <p className="font-mono-tabular text-sm font-bold text-[#111C18] break-words">
                    {CLINIC_INFO.ministerialDecree}
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    {lang === 'fr'
                      ? 'Agrément officiel d’ouverture et d’exploitation médicale'
                      : 'Official ministerial medical practice license'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Official Cabinet Seal & Direct Physician Contact Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-8 flex flex-col items-center text-center">
                <ChamsEmblem size="lg" className="mb-5" />

                <p className="text-xs font-mono-tabular text-stone-500">
                  {CLINIC_INFO.group} · {CLINIC_INFO.onmsNumber}
                </p>

                <h3 className="text-2xl font-display font-semibold text-[#111C18] mt-1">
                  {CLINIC_INFO.doctor}
                </h3>

                <p className="text-xs text-stone-600 mt-1">
                  {CLINIC_INFO.fullName} — Yoff Diamalaye
                </p>

                <div className="w-full my-6 border-t border-stone-200/80" />

                <dl className="w-full space-y-3 text-left text-xs">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-stone-500">
                      {lang === 'fr' ? 'Secrétariat & RDV (Ligne 1)' : 'Clinic Desk (Line 1)'}
                    </dt>
                    <dd className="font-mono-tabular font-semibold text-[#111C18]">
                      <a href={`tel:${CLINIC_INFO.phonePrimaryRaw}`} className="hover:text-[#0D5C3A]">
                        {CLINIC_INFO.phonePrimary}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-stone-500">
                      {lang === 'fr' ? 'Secrétariat & Urgences (Ligne 2)' : 'Direct & Urgent (Line 2)'}
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
                      {lang === 'fr' ? 'Horaires d’ouverture' : 'Consultation Hours'}
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
                    {lang === 'fr' ? 'Appeler le Cabinet' : 'Call the Clinic'}
                  </a>
                  <button
                    type="button"
                    onClick={() => onSelectPillarBooking('medecine-generale', false)}
                    className="px-4 py-2.5 text-xs font-semibold text-[#111C18] bg-[#F2EFE9] hover:bg-stone-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer text-center"
                  >
                    {lang === 'fr' ? 'Réserver en ligne' : 'Book Online'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
