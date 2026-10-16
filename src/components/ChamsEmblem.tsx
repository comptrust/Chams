import React, { useState } from 'react';

interface ChamsLogoMarkProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withBackground?: boolean;
}

/**
 * Isolated CHAMS brand logo mark from the uploaded emblem (chams - Copy.png).
 * Depicts the protective embracing figures (Navy Blue & Forest Teal) holding the golden child/heart.
 */
export const ChamsLogoMark: React.FC<ChamsLogoMarkProps> = ({
  className = '',
  size = 'md',
  withBackground = false,
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const dimensions = sizeMap[size];

  return (
    <div
      className={`inline-flex items-center justify-center select-none shrink-0 ${dimensions} ${
        withBackground ? 'bg-white rounded-full shadow-xs border border-stone-200/60 p-1' : ''
      } ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full"
        role="img"
        aria-label="Logo Cabinet Médical CHAMS"
      >
        {/* Top-Left Parent Figure (Deep Navy / Indigo Blue: #183059) */}
        <circle cx="48" cy="28" r="10" fill="#183059" />
        <path
          d="M 37,80 C 27,58 32,38 50,37 C 60,36 68,43 71,49 C 62,48 53,50 47,58 C 41,66 39,74 37,80 Z"
          fill="#183059"
        />

        {/* Right Parent Figure (Deep Forest Green / Slate: #164E43) */}
        <circle cx="86" cy="44" r="9" fill="#164E43" />
        <path
          d="M 57,92 C 77,86 94,71 90,53 C 88,44 76,43 60,46 C 70,51 78,57 77,67 C 76,77 67,85 57,92 Z"
          fill="#164E43"
        />

        {/* Center Child / Golden Heart Figure (Warm Golden Olive / Lime: #C1C02D) */}
        <circle cx="61" cy="67" r="6.5" fill="#C1C02D" />
        <path
          d="M 48,89 C 46,78 53,72 63,73 C 69,74 72,78 69,82 C 65,86 56,85 48,89 Z"
          fill="#C1C02D"
        />
      </svg>
    </div>
  );
};

interface ChamsEmblemProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Faithful vector recreation of the official Cabinet Médical CHAMS seal
 * (Dr. Abou THIAM · N° ONMS B 1217 · Groupe CHAMS AFRICA) from the clinic's official emblem.
 */
export const ChamsEmblem: React.FC<ChamsEmblemProps> = ({ className = '', size = 'md' }) => {
  const dimensions = size === 'sm' ? 'w-14 h-14' : size === 'lg' ? 'w-32 h-32' : 'w-24 h-24';

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${dimensions} ${className}`}>
      <svg
        viewBox="0 0 240 240"
        className="w-full h-full"
        role="img"
        aria-label="Sceau officiel du Cabinet Médical CHAMS — Dr. Aboubacry THIAM — N° ONMS B 1217"
      >
        {/* Outer Forest Green Ring */}
        <circle cx="120" cy="120" r="116" fill="#0D5C3A" stroke="#FFFFFF" strokeWidth="3" />
        {/* Inner White & Navy Ring */}
        <circle cx="120" cy="120" r="92" fill="#FAF9F5" stroke="#1B365D" strokeWidth="5" />

        {/* Circular Path Definitions for Official Seal Typography */}
        <defs>
          <path id="outerTopArc" d="M 24,120 A 96,96 0 1,1 216,120" />
          <path id="outerBottomArc" d="M 218,120 A 98,98 0 1,1 22,120" />
          <path id="innerTopArc" d="M 46,124 A 74,74 0 1,1 194,124" />
          <path id="innerSubArc" d="M 58,128 A 62,62 0 1,1 182,128" />
        </defs>

        {/* Outer Ring Top Text: Dr. Abou THIAM */}
        <text
          fill="#FFFFFF"
          fontSize="13.5"
          fontWeight="700"
          letterSpacing="1.2"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          <textPath href="#outerTopArc" startOffset="50%" textAnchor="middle">
            ★  Dr. Abou THIAM  ★
          </textPath>
        </text>

        {/* Outer Ring Bottom Text: Diamalaye Yoff au dessus Phie Diam Athie */}
        <text
          fill="#E6F4EA"
          fontSize="8.5"
          fontWeight="600"
          letterSpacing="0.5"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          <textPath href="#outerBottomArc" startOffset="50%" textAnchor="middle">
            Diamalaye Yoff au dessus Phie Diam Athie · Brioche Dorée
          </textPath>
        </text>

        {/* Inner Ring Top Text: Cabinet Médical CHAMS */}
        <text
          fill="#1E293B"
          fontSize="11.5"
          fontWeight="700"
          letterSpacing="0.6"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          <textPath href="#innerTopArc" startOffset="50%" textAnchor="middle">
            Cabinet Médical CHAMS
          </textPath>
        </text>

        {/* Inner Ring Sub Text: N° ONMS B 1217 */}
        <text
          fill="#334155"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="0.8"
          fontFamily="JetBrains Mono, monospace"
        >
          <textPath href="#innerSubArc" startOffset="50%" textAnchor="middle">
            N° ONMS B 1217
          </textPath>
        </text>

        {/* Center Emblem: Two Embracing Figures & Golden Child Heart */}
        <g transform="translate(0, 6)">
          {/* Left Parent Figure (Deep Navy Blue) */}
          <circle cx="106" cy="88" r="10.5" fill="#183059" />
          <path
            d="M 94,148 C 85,126 90,103 108,102 C 118,101 126,107 130,113 C 121,112 111,114 105,122 C 99,130 97,139 94,148 Z"
            fill="#183059"
          />

          {/* Right Parent Figure (Deep Forest Slate) */}
          <circle cx="147" cy="105" r="9.5" fill="#164E43" />
          <path
            d="M 116,162 C 138,155 156,138 153,120 C 151,110 138,109 120,112 C 132,117 141,123 140,134 C 139,144 128,154 116,162 Z"
            fill="#164E43"
          />

          {/* Center Child Figure (Warm Olive Gold) */}
          <circle cx="121" cy="126" r="6" fill="#C1C02D" />
          <path
            d="M 106,156 C 104,144 111,137 121,138 C 127,139 131,143 128,147 C 124,151 114,150 106,156 Z"
            fill="#C1C02D"
          />
        </g>
      </svg>
    </div>
  );
};

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#E9F2EC] via-[#F2EFE9] to-[#E2ECE6] text-[#0D5C3A] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ChamsLogoMark size="md" className="mb-3 opacity-90" />
        <p className="text-xs font-medium text-[#111C18]/80 max-w-xs">
          {fallbackLabel || alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

interface ChamsMedicalStampProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'green' | 'blue';
}

/**
 * Authentic vector recreation of the official Cabinet Médical CHAMS circular stamp (Cachet Médical)
 * as seen on the official brochure and ministerial documents.
 */
export const ChamsMedicalStamp: React.FC<ChamsMedicalStampProps> = ({
  className = '',
  size = 'md',
  variant = 'green',
}) => {
  const sizeMap = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-36 h-36',
  };

  const primaryColor = variant === 'green' ? '#0D5C3A' : '#183059';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${className}`}
      style={{ transform: 'rotate(-4deg)' }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full opacity-90"
        role="img"
        aria-label="Cachet officiel du Dr Aboubacry THIAM - Cabinet Médical CHAMS"
      >
        {/* Outer Circular Ring */}
        <circle
          cx="100"
          cy="100"
          r="94"
          fill="none"
          stroke={primaryColor}
          strokeWidth="3.5"
          strokeDasharray="1 0"
        />
        {/* Middle Fine Ring */}
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1.2"
        />
        {/* Inner Solid Ring */}
        <circle
          cx="100"
          cy="100"
          r="62"
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
        />

        <defs>
          <path id="stampTopArc" d="M 22,100 A 78,78 0 1,1 178,100" />
          <path id="stampBottomArc" d="M 178,100 A 78,78 0 1,1 22,100" />
        </defs>

        {/* Top Arc Text */}
        <text
          fill={primaryColor}
          fontSize="11"
          fontWeight="800"
          letterSpacing="1.4"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          <textPath href="#stampTopArc" startOffset="50%" textAnchor="middle">
            ★ CABINET MÉDICAL CHAMS ★
          </textPath>
        </text>

        {/* Bottom Arc Text */}
        <text
          fill={primaryColor}
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="1"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          <textPath href="#stampBottomArc" startOffset="50%" textAnchor="middle">
            DIAMALAYE · YOFF · DAKAR
          </textPath>
        </text>

        {/* Center Doctor Credentials */}
        <g textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif">
          {/* Caduceus Rod of Asclepius */}
          <path
            d="M 100,52 L 100,82 M 95,57 C 105,62 105,72 95,77 C 85,82 105,82 105,82"
            fill="none"
            stroke={primaryColor}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="100" cy="51" r="2.5" fill={primaryColor} />

          <text
            x="100"
            y="98"
            fill={primaryColor}
            fontSize="10"
            fontWeight="800"
          >
            Dr. Abou THIAM
          </text>
          <text
            x="100"
            y="112"
            fill={primaryColor}
            fontSize="8.5"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            ONMS B 1217
          </text>
          <text
            x="100"
            y="124"
            fill={primaryColor}
            fontSize="7"
            fontWeight="600"
          >
            MÉDECINE GÉNÉRALE
          </text>
          <text
            x="100"
            y="134"
            fill={primaryColor}
            fontSize="6.5"
            fontWeight="500"
          >
            RÉPUBLIQUE DU SÉNÉGAL
          </text>
        </g>
      </svg>
    </div>
  );
};
