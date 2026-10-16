import heroImg from '../assets/images/chams_clinic_hero_1791888463736.jpg';
import buildingImg from '../assets/images/clinic_building_clean_facade_1791892354074.jpg';
import doctorPortraitImg from '../assets/images/dr_thiam_portrait_1791891838987.jpg';
import cardioCareImg from '../assets/images/same_doctor_cardio_1791891837591.jpg';
import familyCareImg from '../assets/images/same_doctor_family_1791891838290.jpg';
import doctorConsultationImg from '../assets/images/same_doctor_consultation_1791895459305.jpg';

export type Language = 'fr' | 'en';

export type PageId =
  | 'accueil'
  | 'specialites'
  | 'dr-thiam'
  | 'entreprises'
  | 'rendez-vous'
  | 'acces-contact'
  | 'brochure';

export interface NavItem {
  id: PageId;
  label: { fr: string; en: string };
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'accueil', label: { fr: 'Accueil', en: 'Home' } },
  { id: 'specialites', label: { fr: 'Spécialités & Soins', en: 'Specialties & Care' } },
  { id: 'dr-thiam', label: { fr: 'Dr. Thiam & Le Cabinet', en: 'Dr. Thiam & Clinic' } },
  { id: 'entreprises', label: { fr: "Médecine d'Entreprise", en: 'Corporate Medicine' } },
  { id: 'acces-contact', label: { fr: 'Accès & Contact', en: 'Location & Contact' } },
];

export type SpecialtyCategory = 'all' | 'primary' | 'chronic' | 'maternal_urgent';

export interface SpecialtyItem {
  id: string;
  index: string;
  category: Exclude<SpecialtyCategory, 'all'>;
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  description: { fr: string; en: string };
  clinicalProtocol: { fr: string[]; en: string[] };
  typicalDuration: string;
  availability: { fr: string; en: string };
  homeVisitEligible: boolean;
}

export interface CarePillar {
  id: string;
  index: string;
  title: { fr: string; en: string };
  kicker: { fr: string; en: string };
  summary: { fr: string; en: string };
  metrics: {
    value: string;
    label: { fr: string; en: string };
    context: { fr: string; en: string };
  };
  imagePath: string;
  imageAlt: { fr: string; en: string };
  includedSpecialties: { fr: string[]; en: string[] };
}

export const CLINIC_INFO = {
  name: 'Cabinet Médical CHAMS',
  fullName: 'Cabinet Médical CHAMS Diamalaye',
  group: 'Groupe CHAMS AFRICA',
  doctor: 'Dr Aboubacry THIAM',
  doctorShort: 'Dr. Abou THIAM',
  onmsNumber: 'N° ONMS B 1217',
  ministerialDecree: 'Arrêté N° MSP/DGES/DPRS/DR 03 Août 2022*023125',
  addressLine1: 'Yoff Diamalaye, Rond Point Brioche Dorée',
  addressLine2: 'Au-dessus de la Pharmacie Diam Athie (à côté de la Brioche Dorée)',
  city: 'Dakar, Sénégal',
  phonePrimary: '+221 78 538 20 20',
  phonePrimaryRaw: '+221785382020',
  phoneSecondary: '+221 77 834 15 04',
  phoneSecondaryRaw: '+221778341504',
  whatsappNumber: '221785382020',
  email: 'athiam53@gmail.com',
  hoursStandard: '09h00 – 18h00',
  hoursNote: {
    fr: 'Lundi au Samedi (09h00 – 18h00) · Sur Rendez-vous & Urgences à domicile',
    en: 'Monday to Saturday (09:00 – 18:00) · By Appointment & Home Emergencies',
  },
  heroImage: heroImg,
  buildingImage: buildingImg,
  doctorPortrait: doctorPortraitImg,
  doctorConsultation: doctorConsultationImg,
};

export const SPECIALTIES: SpecialtyItem[] = [
  {
    id: 'medecine-generale',
    index: '01',
    category: 'primary',
    title: {
      fr: 'Médecine générale',
      en: 'General Medicine',
    },
    subtitle: {
      fr: 'Diagnostic clinique complet, bilans de santé et prise en charge aiguë',
      en: 'Comprehensive clinical diagnosis, health checkups, and acute care',
    },
    description: {
      fr: 'Consultations curatives et préventives pour adultes et adolescents : infections aiguës, bilans biologiques annuels, certificats médicaux et coordination des soins spécialisés.',
      en: 'Curative and preventive consultations for adults and adolescents: acute infections, annual laboratory checkups, medical certificates, and coordinated specialist care.',
    },
    clinicalProtocol: {
      fr: [
        'Examen clinique approfondi et contrôle systématique des constantes vitales',
        'Prescription raisonnée et interprétation des bilans biologiques et imagerie',
        'Délivrance de certificats d’aptitude médicale et suivi thérapeutique personnalisé',
      ],
      en: [
        'Thorough physical examination and systematic vital signs assessment',
        'Evidence-based prescriptions and interpretation of lab work and imaging',
        'Medical fitness certificates and personalized therapeutic follow-up',
      ],
    },
    typicalDuration: '30 min',
    availability: { fr: '09h00 – 18h00 · Sans ou avec RDV', en: '09:00 – 18:00 · Walk-in or Appointment' },
    homeVisitEligible: true,
  },
  {
    id: 'medecine-famille',
    index: '02',
    category: 'primary',
    title: {
      fr: 'Médecine de famille',
      en: 'Family Medicine',
    },
    subtitle: {
      fr: 'Suivi longitudinal de toutes les générations du foyer',
      en: 'Longitudinal healthcare across all generations of the household',
    },
    description: {
      fr: 'Un médecin référent unique qui connaît l’historique médical de votre famille à Yoff et Dakar, assurant un accompagnement continu de l’enfance au troisième âge.',
      en: 'A dedicated primary physician who knows your family medical history in Yoff and Dakar, providing continuous care from childhood through senior years.',
    },
    clinicalProtocol: {
      fr: [
        'Dossier médical familial structuré et prévention des facteurs de risque héréditaires',
        'Bilans périodiques adaptés à chaque tranche d’âge',
        'Accompagnement bienveillant des personnes âgées et maintien à domicile',
      ],
      en: [
        'Structured family medical records and hereditary risk prevention',
        'Age-tailored periodic health screenings',
        'Compassionate senior care and home-based medical support',
      ],
    },
    typicalDuration: '30 – 45 min',
    availability: { fr: '09h00 – 18h00 · Sur Rendez-vous', en: '09:00 – 18:00 · By Appointment' },
    homeVisitEligible: true,
  },
  {
    id: 'medecine-entreprise',
    index: '03',
    category: 'primary',
    title: {
      fr: "Médecine d'entreprise",
      en: 'Corporate & Occupational Medicine',
    },
    subtitle: {
      fr: 'Conventions médicales, visites d’embauche et santé au travail',
      en: 'Corporate medical agreements, pre-employment exams, and workplace health',
    },
    description: {
      fr: 'Partenaire santé des entreprises, PME et institutions à Dakar : visites médicales réglementaires, bilans annuels du personnel, ergonomie et gestion des urgences sur site.',
      en: 'Healthcare partner for corporations, SMEs, and institutions across Dakar: statutory medical visits, annual staff checkups, ergonomics, and on-site emergency response.',
    },
    clinicalProtocol: {
      fr: [
        'Visites médicales d’embauche, visites périodiques et de reprise du travail',
        'Mise en place de conventions annuelles de soins pour les salariés et leurs familles',
        'Audit de prévention des risques professionnels et campagnes de dépistage en entreprise',
      ],
      en: [
        'Pre-employment, periodic, and return-to-work medical examinations',
        'Annual corporate healthcare conventions for employees and dependents',
        'Occupational risk audits and on-site corporate screening campaigns',
      ],
    },
    typicalDuration: 'Sur mesure',
    availability: { fr: 'Au cabinet ou sur site en entreprise', en: 'At the clinic or on-site at company premises' },
    homeVisitEligible: true,
  },
  {
    id: 'nutrition-dietetique',
    index: '04',
    category: 'chronic',
    title: {
      fr: 'Nutrition et conseils diététiques',
      en: 'Clinical Nutrition & Dietary Counseling',
    },
    subtitle: {
      fr: 'Rééquilibrage alimentaire adapté aux habitudes culinaires sénégalaises',
      en: 'Nutritional rebalancing tailored to local Senegalese dietary habits',
    },
    description: {
      fr: 'Protocoles nutritionnels médicalisés pour le surpoids, l’obésité, la dénutrition, ainsi que les régimes thérapeutiques spécifiques (sans sel, diabétique, hépato-protecteur).',
      en: 'Medically supervised nutrition protocols for weight management, malnutrition, and specific therapeutic diets (low-sodium, diabetic, hepatoprotective).',
    },
    clinicalProtocol: {
      fr: [
        'Évaluation de la composition corporelle, de l’IMC et du profil métabolique',
        'Plans alimentaires réalistes valorisant les aliments locaux équilibrés',
        'Suivi nutritionnel conjoint des pathologies cardio-métaboliques et digestives',
      ],
      en: [
        'Body composition, BMI, and metabolic profile evaluation',
        'Practical meal plans built around balanced local ingredients',
        'Integrated nutritional follow-up for cardiometabolic and digestive conditions',
      ],
    },
    typicalDuration: '45 min',
    availability: { fr: '09h00 – 18h00 · Sur Rendez-vous', en: '09:00 – 18:00 · By Appointment' },
    homeVisitEligible: false,
  },
  {
    id: 'maladies-digestives-foie',
    index: '05',
    category: 'chronic',
    title: {
      fr: 'Maladies digestives et du foie',
      en: 'Digestive & Liver Diseases',
    },
    subtitle: {
      fr: 'Gastro-entérologie médicale, hépatologie et dépistage des hépatites',
      en: 'Medical gastroenterology, hepatology, and hepatitis care',
    },
    description: {
      fr: 'Prise en charge des douleurs abdominales, reflux gastro-œsophagien, ulcères, colopathies fonctionnelles, stéatose hépatique et suivi complet des hépatites virales.',
      en: 'Management of abdominal pain, GERD, ulcers, irritable bowel disorders, fatty liver disease, and comprehensive viral hepatitis monitoring.',
    },
    clinicalProtocol: {
      fr: [
        'Dépistage, bilan hépatique complet et suivi des hépatites B et C',
        'Traitement des gastrites, ulcères gastro-duodénaux et troubles du transit',
        'Coordination des examens d’échographie abdominale et d’endoscopie digestive',
      ],
      en: [
        'Screening, full liver panel evaluation, and Hepatitis B & C management',
        'Treatment of gastritis, peptic ulcers, and gastrointestinal motility disorders',
        'Coordination of abdominal ultrasound and digestive endoscopy referrals',
      ],
    },
    typicalDuration: '40 min',
    availability: { fr: '09h00 – 18h00 · Sur Rendez-vous', en: '09:00 – 18:00 · By Appointment' },
    homeVisitEligible: false,
  },
  {
    id: 'hta-cardiovasculaire',
    index: '06',
    category: 'chronic',
    title: {
      fr: 'HTA et maladies cardio-vasculaires',
      en: 'Hypertension & Cardiovascular Care',
    },
    subtitle: {
      fr: 'Dépistage, équilibrage tensionnel et prévention des risques vasculaires',
      en: 'Blood pressure stabilization and cardiovascular risk prevention',
    },
    description: {
      fr: 'Suivi rigoureux de l’hypertension artérielle (HTA), dyslipidémies, insuffisance cardiaque stable et prévention primaire ou secondaire des accidents vasculaires.',
      en: 'Rigorous monitoring of arterial hypertension, dyslipidemia, stable heart conditions, and primary or secondary stroke and cardiovascular prevention.',
    },
    clinicalProtocol: {
      fr: [
        'Mesure clinique de précision et protocole d’automesure tensionnelle à domicile',
        'Ajustement thérapeutique personnalisé et contrôle du bilan lipidique',
        'Éducation thérapeutique sur l’hygiène de vie et réduction du risque global',
      ],
      en: [
        'Precision clinical blood pressure assessment and home monitoring protocols',
        'Tailored antihypertensive therapy adjustment and lipid panel control',
        'Therapeutic lifestyle coaching and global vascular risk reduction',
      ],
    },
    typicalDuration: '35 min',
    availability: { fr: '09h00 – 18h00 · Cabinet & Domicile', en: '09:00 – 18:00 · Clinic & Home Visit' },
    homeVisitEligible: true,
  },
  {
    id: 'diabete-endocrinologie',
    index: '07',
    category: 'chronic',
    title: {
      fr: 'Diabète et Maladies endocriniennes',
      en: 'Diabetes & Endocrine Disorders',
    },
    subtitle: {
      fr: 'Équilibre glycémique, suivi de l’HbA1c et pathologies thyroïdiennes',
      en: 'Glycemic control, HbA1c monitoring, and thyroid pathology care',
    },
    description: {
      fr: 'Accompagnement complet du diabète de type 1, de type 2 et gestationnel, prévention des complications podologiques et rénales, et suivi des troubles thyroïdiens.',
      en: 'Complete management of Type 1, Type 2, and gestational diabetes, prevention of foot and renal complications, and thyroid disorder monitoring.',
    },
    clinicalProtocol: {
      fr: [
        'Contrôle glycémique capillaire, suivi trimestriel de l’HbA1c et bilan rénal',
        'Éducation à l’insulinothérapie, aux antidiabétiques oraux et à l’auto-surveillance',
        'Exploration et suivi clinique des dysthyroïdies et troubles métaboliques',
      ],
      en: [
        'Capillary blood glucose testing, quarterly HbA1c tracking, and renal screening',
        'Patient education on oral antidiabetics, insulin therapy, and self-monitoring',
        'Clinical workup and follow-up of thyroid and metabolic disorders',
      ],
    },
    typicalDuration: '40 min',
    availability: { fr: '09h00 – 18h00 · Cabinet & Domicile', en: '09:00 – 18:00 · Clinic & Home Visit' },
    homeVisitEligible: true,
  },
  {
    id: 'sante-mere-enfant',
    index: '08',
    category: 'maternal_urgent',
    title: {
      fr: "Conseils et soins de santé de la mère et de l'enfant",
      en: 'Maternal & Child Healthcare',
    },
    subtitle: {
      fr: 'Suivi pédiatrique, croissance du nourrisson et santé maternelle',
      en: 'Pediatric checkups, infant growth monitoring, and maternal health',
    },
    description: {
      fr: 'Consultations dédiées au bien-être de la mère et au développement harmonieux du nourrisson et de l’enfant : suivi staturo-pondéral, conseils d’allaitement, diversification et pathologies infantiles.',
      en: 'Consultations dedicated to maternal well-being and infant/child development: growth charting, breastfeeding guidance, weaning nutrition, and acute pediatric care.',
    },
    clinicalProtocol: {
      fr: [
        'Suivi mensuel de la croissance, du poids et de l’éveil psychomoteur de l’enfant',
        'Vérification du calendrier vaccinal et conseils de diversification alimentaire',
        'Accompagnement médical pré et post-natal de la mère',
      ],
      en: [
        'Monthly infant growth, weight, and psychomotor development checks',
        'Immunization schedule review and infant nutrition guidance',
        'Pre- and post-natal maternal medical support',
      ],
    },
    typicalDuration: '35 min',
    availability: { fr: '09h00 – 18h00 · Sans ou avec RDV', en: '09:00 – 18:00 · Walk-in or Appointment' },
    homeVisitEligible: true,
  },
  {
    id: 'urgences-domicile',
    index: '09',
    category: 'maternal_urgent',
    title: {
      fr: 'Urgences médicales et consultation à domicile',
      en: 'Medical Emergencies & Home Visits',
    },
    subtitle: {
      fr: 'Intervention rapide au cabinet ou déplacement médical à votre domicile',
      en: 'Rapid clinical response at the clinic or physician home visits across Dakar',
    },
    description: {
      fr: 'Prise en charge réactive des urgences médicales non chirurgicales au cabinet et consultations à domicile pour les patients à mobilité réduite, personnes âgées ou urgences familiales à Yoff, Diamalaye, Virage, Ngor et Almadies.',
      en: 'Responsive care for acute medical emergencies at the clinic and physician house calls for mobility-impaired patients, seniors, or acute family needs across Yoff, Diamalaye, Virage, Ngor, and Almadies.',
    },
    clinicalProtocol: {
      fr: [
        'Triage téléphonique direct avec le médecin au +221 78 538 20 20 ou +221 77 834 15 04',
        'Stabilisation clinique, premiers soins d’urgence et mise en observation',
        'Déplacement à domicile équipé (tensiomètre, oxymètre, glucomètre, trousse d’urgence)',
      ],
      en: [
        'Direct telephone triage with the physician at +221 78 538 20 20 or +221 77 834 15 04',
        'Clinical stabilization, urgent acute care, and observation',
        'Fully equipped physician home visit (BP monitor, oximeter, glucometer, emergency kit)',
      ],
    },
    typicalDuration: 'Intervention prioritaire',
    availability: { fr: 'Prioritaire · Appel direct requis', en: 'Priority · Direct Call Required' },
    homeVisitEligible: true,
  },
];

export const CARE_PILLARS: CarePillar[] = [
  {
    id: 'pillar-cardio-metabolic',
    index: '01',
    title: {
      fr: 'Pôle Cardio-Métabolique & Endocrinologie',
      en: 'Cardiometabolic & Endocrine Care Unit',
    },
    kicker: {
      fr: 'HTA · Diabète · Pathologies Endocriniennes',
      en: 'Hypertension · Diabetes · Endocrine Disorders',
    },
    summary: {
      fr: 'Un suivi structuré au long cours pour stabiliser durablement la tension artérielle et la glycémie, prévenir les complications vasculaires et adapter chaque traitement à votre mode de vie.',
      en: 'Structured long-term care to sustainably stabilize blood pressure and blood glucose, prevent vascular complications, and tailor treatment to your daily life.',
    },
    metrics: {
      value: '360°',
      label: { fr: 'Protocole de suivi intégré', en: 'Integrated monitoring protocol' },
      context: { fr: 'Tension artérielle, bilan glycémique HbA1c et éducation thérapeutique', en: 'Blood pressure, HbA1c glycemic tracking, and therapeutic education' },
    },
    imagePath: cardioCareImg,
    imageAlt: {
      fr: 'Dr Aboubacry THIAM en consultation cardio-métabolique et contrôle tensionnel',
      en: 'Dr. Aboubacry THIAM conducting cardiometabolic and blood pressure consultation',
    },
    includedSpecialties: {
      fr: ['HTA et maladies cardio-vasculaires', 'Diabète et Maladies endocriniennes', 'Bilans biologiques de prévention'],
      en: ['Hypertension & Cardiovascular Care', 'Diabetes & Endocrine Disorders', 'Preventive metabolic panels'],
    },
  },
  {
    id: 'pillar-family-maternal',
    index: '02',
    title: {
      fr: 'Pôle Famille, Mère-Enfant & Domicile',
      en: 'Family, Maternal-Child & Home Care Unit',
    },
    kicker: {
      fr: 'Médecine Générale · Pédiatrie · Urgences à Domicile',
      en: 'General Medicine · Maternal-Child · Home Visits',
    },
    summary: {
      fr: 'De la consultation prénatale et du suivi du nourrisson jusqu’aux visites à domicile pour les aînés à Yoff Diamalaye, nous veillons sur chaque génération avec proximité et disponibilité.',
      en: 'From maternal guidance and infant growth checks to house calls for seniors in Yoff Diamalaye, we care for every generation with closeness and availability.',
    },
    metrics: {
      value: '09h – 18h',
      label: { fr: 'Accueil continu & Visites à domicile', en: 'Continuous clinic hours & Home visits' },
      context: { fr: 'Consultations au cabinet à Yoff Diamalaye ou intervention directe chez vous', en: 'Consultations at our Yoff Diamalaye clinic or direct visits at your home' },
    },
    imagePath: familyCareImg,
    imageAlt: {
      fr: 'Dr Aboubacry THIAM en consultation de médecine familiale et soins pédiatriques',
      en: 'Dr. Aboubacry THIAM in family and pediatric consultation',
    },
    includedSpecialties: {
      fr: ['Médecine générale & de famille', 'Santé de la mère et de l’enfant', 'Urgences médicales & consultation à domicile'],
      en: ['General & Family Medicine', 'Maternal & Child Healthcare', 'Medical Emergencies & Home Visits'],
    },
  },
  {
    id: 'pillar-digestive-nutrition-corporate',
    index: '03',
    title: {
      fr: 'Pôle Hépato-Digestif, Nutrition & Entreprise',
      en: 'Hepato-Digestive, Nutrition & Corporate Unit',
    },
    kicker: {
      fr: 'Foie & Digestion · Diététique · Santé au Travail',
      en: 'Liver & Digestion · Dietetics · Occupational Health',
    },
    summary: {
      fr: 'Expertise dédiée aux pathologies digestives et hépatiques associée à des conseils diététiques personnalisés, ainsi qu’un service complet de médecine d’entreprise pour les organisations dakaroises.',
      en: 'Dedicated expertise in digestive and liver conditions paired with personalized dietary counseling and comprehensive occupational medicine for Dakar organizations.',
    },
    metrics: {
      value: 'B 1217',
      label: { fr: 'Agrément Ordre des Médecins (ONMS)', en: 'National Medical Board Registration (ONMS)' },
      context: { fr: 'Cabinet agréé par arrêté ministériel N° MSP/DGES/DPRS/DR 03 Août 2022*023125', en: 'Licensed under Ministerial Decree N° MSP/DGES/DPRS/DR 03 Août 2022*023125' },
    },
    imagePath: doctorConsultationImg,
    imageAlt: {
      fr: 'Dr Aboubacry THIAM en consultation médicale, suivi hépato-digestif et médecine d’entreprise',
      en: 'Dr. Aboubacry THIAM in medical consultation, digestive health, and occupational care',
    },
    includedSpecialties: {
      fr: ['Maladies digestives et du foie', 'Nutrition et conseils diététiques', "Médecine d'entreprise & visites annuelles"],
      en: ['Digestive & Liver Diseases', 'Clinical Nutrition & Dietary Counseling', 'Corporate Medicine & Annual Checkups'],
    },
  },
];
