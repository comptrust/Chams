import React from 'react';
import { CLINIC_INFO, Language } from '../data/clinicData';
import { ChamsLogoMark } from '../components/ChamsEmblem';
import {
  BookingAndAccessSection,
  ConsultationMode,
} from '../components/BookingAndAccessSection';
import { HelpCircle, PhoneCall, ShieldCheck } from 'lucide-react';

interface BookingPageProps {
  lang: Language;
  preselectedSpecialtyId: string;
  preselectedMode: ConsultationMode;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  lang,
  preselectedSpecialtyId,
  preselectedMode,
}) => {
  return (
    <div className="py-12 lg:py-16 bg-[#FAF9F5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Page Header with Logo next to Title */}
        <div className="pb-8 border-b border-stone-200/80">
          <div className="flex items-center gap-3 mb-2">
            <ChamsLogoMark size="sm" />
            <p className="text-xs font-semibold text-[#0D5C3A] tracking-wide uppercase">
              {lang === 'fr' ? 'Prise de Rendez-vous & Domicile' : 'Bookings & House Calls'}
            </p>
          </div>

          <h1 className="text-3xl lg:text-4xl font-display font-semibold text-[#111C18]">
            {lang === 'fr'
              ? 'Prendre Rendez-vous au Cabinet ou Demander une Visite à Domicile'
              : 'Book an Appointment at the Clinic or Request a House Call'}
          </h1>

          <p className="text-sm text-stone-600 max-w-3xl leading-relaxed mt-2.5">
            {lang === 'fr'
              ? 'Consultations du lundi au samedi de 09h00 à 18h00 et sur rendez-vous au Cabinet Médical CHAMS (Yoff Diamalaye). Pour les personnes alitées ou en cas d’urgence, le Dr Aboubacry THIAM effectue également des visites médicales à domicile à Dakar.'
              : 'Consultations from Monday to Saturday, 09:00 to 18:00 and by appointment at Cabinet Médical CHAMS (Yoff Diamalaye). For bedridden patients or urgent family needs, Dr. Aboubacry THIAM also makes physician house calls across Dakar.'}
          </p>
        </div>

        {/* Immediate Emergency Phone Triage Banner */}
        <div className="mt-8 p-5 bg-[#EBF3EE] border border-[#0D5C3A]/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#0D5C3A] text-white rounded-lg">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0D5C3A] uppercase tracking-wide">
                {lang === 'fr' ? 'Besoin d’une réponse immédiate ?' : 'Urgent medical assistance?'}
              </p>
              <p className="text-xs text-stone-700">
                {lang === 'fr'
                  ? 'Appelez directement le secrétariat médical :'
                  : 'Call our medical desk directly:'}{' '}
                <strong className="font-mono-tabular">{CLINIC_INFO.phonePrimary}</strong> ou{' '}
                <strong className="font-mono-tabular">{CLINIC_INFO.phoneSecondary}</strong>
              </p>
            </div>
          </div>

          <a
            href={`tel:${CLINIC_INFO.phonePrimaryRaw}`}
            className="px-4 py-2 text-xs font-bold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'fr' ? 'Appel direct' : 'Call now'}
          </a>
        </div>

        {/* The Full Booking & Landmark Guide Engine */}
        <div className="mt-8">
          <BookingAndAccessSection
            lang={lang}
            preselectedSpecialtyId={preselectedSpecialtyId}
            preselectedMode={preselectedMode}
          />
        </div>

        {/* Booking FAQ */}
        <div className="mt-16 pt-12 border-t border-stone-200/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A] mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>{lang === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}</span>
          </div>

          <h2 className="text-2xl font-display font-semibold text-[#111C18] mb-6">
            {lang === 'fr'
              ? 'Tout savoir sur votre consultation au Cabinet Médical CHAMS'
              : 'Everything about appointments at Cabinet Médical CHAMS'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-700">
            <div className="p-5 bg-white border border-stone-200/80 rounded-xl space-y-1.5">
              <p className="font-semibold text-sm text-[#111C18]">
                {lang === 'fr'
                  ? 'Faut-il obligatoirement prendre rendez-vous ?'
                  : 'Is an appointment mandatory?'}
              </p>
              <p className="leading-relaxed">
                {lang === 'fr'
                  ? 'Le cabinet accueille les patients de 09h00 à 18h00. Les rendez-vous préalables sont fortement recommandés pour éviter l’attente, particulièrement pour les bilans complets HTA, diabète et nutrition. Les urgences sont reçues en priorité.'
                  : 'The clinic is open 09:00 to 18:00. Prior appointments are strongly recommended to reduce waiting time. Emergencies are received with priority.'}
              </p>
            </div>

            <div className="p-5 bg-white border border-stone-200/80 rounded-xl space-y-1.5">
              <p className="font-semibold text-sm text-[#111C18]">
                {lang === 'fr'
                  ? 'Quels sont les quartiers couverts pour les visites à domicile ?'
                  : 'Which neighborhoods are covered for home visits?'}
              </p>
              <p className="leading-relaxed">
                {lang === 'fr'
                  ? 'Le Dr Aboubacry THIAM intervient à Yoff Diamalaye, Cité Djily Mbaye, Yoff Tonghor, Virage, Ngor, Almadies, Ouakam, Mamelles, Hann Maristes et sur l’ensemble de la presqu’île de Dakar selon disponibilité.'
                  : 'Dr. Aboubacry THIAM visits Yoff Diamalaye, Cité Djily Mbaye, Virage, Ngor, Almadies, Ouakam, Mamelles, and surrounding Dakar areas based on availability.'}
              </p>
            </div>

            <div className="p-5 bg-white border border-stone-200/80 rounded-xl space-y-1.5">
              <p className="font-semibold text-sm text-[#111C18]">
                {lang === 'fr'
                  ? 'Quels documents apporter lors du rendez-vous ?'
                  : 'What documents should I bring?'}
              </p>
              <p className="leading-relaxed">
                {lang === 'fr'
                  ? 'Vos ordonnances antérieures, vos derniers résultats d’analyses biologiques (glycémie, bilan lipidique, hépatite), vos comptes-rendus d’examens, et le carnet de santé pour les enfants.'
                  : 'Previous prescriptions, recent lab results (blood glucose, lipid panel, hepatitis test), scan reports, and pediatric vaccination records.'}
              </p>
            </div>

            <div className="p-5 bg-white border border-stone-200/80 rounded-xl space-y-1.5">
              <p className="font-semibold text-sm text-[#111C18]">
                {lang === 'fr'
                  ? 'Comment se passe la prise en charge pour les entreprises ?'
                  : 'How does corporate healthcare billing work?'}
              </p>
              <p className="leading-relaxed">
                {lang === 'fr'
                  ? 'Dans le cadre d’une convention médicale d’entreprise, les collaborateurs sont pris en charge sur présentation de leur badge ou bon de prise en charge, avec facturation périodique directement transmise à l’employeur.'
                  : 'Under a corporate healthcare convention, employees are seen upon company ID presentation with consolidated billing directly sent to the employer.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
