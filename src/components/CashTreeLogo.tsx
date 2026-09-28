import React from 'react';

interface CashTreeLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const CashTreeLogo: React.FC<CashTreeLogoProps> = ({
  className = '',
  size = 64,
  showText = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Scalable Circular Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
        aria-label="Cash Tree Co-operative Thrift & Credit Society Ltd Logo"
      >
        <defs>
          {/* Ring Outer Gradient (Green to Orange/Red) */}
          <linearGradient id="ringGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="25%" stopColor="#22C55E" />
            <stop offset="50%" stopColor="#84CC16" />
            <stop offset="70%" stopColor="#EAB308" />
            <stop offset="85%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>

          {/* Leaf Gradients */}
          <linearGradient id="leafGradPrimary" x1="45" y1="40" x2="105" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>

          <linearGradient id="leafGradSecondary" x1="60" y1="50" x2="95" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A3E635" />
            <stop offset="60%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>

          {/* Note Gradients */}
          <linearGradient id="noteGrad" x1="110" y1="40" x2="170" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>

          <linearGradient id="noteFoldGrad" x1="120" y1="85" x2="165" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>

          {/* Text Gradients */}
          <linearGradient id="cashGrad" x1="30" y1="105" x2="100" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="treeGrad" x1="105" y1="105" x2="170" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>

          <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* White background disk for emblem */}
        <circle cx="100" cy="100" r="94" fill="#FFFFFF" />

        {/* Outer Circular Gradient Ring */}
        <circle
          cx="100"
          cy="100"
          r="92"
          stroke="url(#ringGrad)"
          strokeWidth="7"
          fill="none"
        />

        {/* Inner thin border guide */}
        <circle
          cx="100"
          cy="100"
          r="86"
          stroke="#E2E8F0"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          fill="none"
          opacity="0.6"
        />

        {/* --- GRAPHIC ELEMENTS: Leaves (Left) & Currency Note (Right) --- */}
        <g id="emblem-center" transform="translate(0, 0)">
          {/* Main Leaf (Upper left) */}
          <path
            d="M 52 90 C 44 65, 52 46, 76 38 C 96 32, 106 50, 108 68 C 110 82, 98 94, 76 96 C 64 97, 56 94, 52 90 Z"
            fill="url(#leafGradPrimary)"
          />
          {/* Main Leaf central vein */}
          <path
            d="M 54 89 C 68 76, 85 64, 102 44"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 72 74 C 77 68, 86 64, 94 62"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 64 82 C 67 79, 74 77, 80 77"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Secondary smaller leaf in front */}
          <path
            d="M 74 92 C 70 80, 76 68, 90 62 C 100 58, 107 68, 106 78 C 104 88, 94 94, 82 94 Z"
            fill="url(#leafGradSecondary)"
            opacity="0.95"
          />
          <path
            d="M 77 90 C 84 82, 94 76, 102 66"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Stem connecting leaves to center base */}
          <path
            d="M 98 84 Q 106 94, 114 102"
            stroke="#15803D"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Currency Note (Upper right) */}
          {/* Orange lower folded accent layer */}
          <path
            d="M 124 96 L 158 92 L 168 82 L 138 86 Z"
            fill="url(#noteFoldGrad)"
          />

          {/* Main green note body */}
          <path
            d="M 116 88 L 148 40 L 176 56 L 146 100 Z"
            fill="url(#noteGrad)"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinejoin="round"
            filter="url(#subtleShadow)"
          />

          {/* Note Inner Border Line */}
          <path
            d="M 121 84 L 148 45 L 170 58 L 144 94 Z"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeDasharray="3 1.5"
            fill="none"
            opacity="0.8"
          />

          {/* White Circular Medallion on Note */}
          <ellipse
            cx="146"
            cy="68"
            rx="12"
            ry="11"
            fill="#FFFFFF"
            stroke="#15803D"
            strokeWidth="1.5"
          />

          {/* Indian Rupee Symbol ₹ in Center of Note */}
          <text
            x="146"
            y="73"
            fontSize="14"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            fill="#15803D"
            textAnchor="middle"
          >
            ₹
          </text>
        </g>

        {/* --- BRAND NAME: CASH TREE --- */}
        <g id="brand-text">
          {/* CASH */}
          <text
            x="32"
            y="130"
            fontFamily="Impact, 'Outfit', 'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="27"
            fill="url(#cashGrad)"
            letterSpacing="0.5"
          >
            CASH
          </text>

          {/* TREE */}
          <text
            x="108"
            y="130"
            fontFamily="Impact, 'Outfit', 'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="27"
            fill="url(#treeGrad)"
            letterSpacing="0.5"
          >
            TREE
          </text>

          {/* Horizontal Decorative Separator Line */}
          <line x1="34" y1="138" x2="100" y2="138" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="102" y1="138" x2="168" y2="138" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />

          {/* Subtext: CO-OPERATIVE (U) THRIFT & CREDIT SOCIETY LTD */}
          <text
            x="100"
            y="149"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontWeight="800"
            fontSize="6.8"
            fill="#0F172A"
            textAnchor="middle"
            letterSpacing="0.3"
          >
            CO-OPERATIVE (U) THRIFT &amp; CREDIT SOCIETY LTD
          </text>
        </g>
      </svg>

      {/* Optional Side Label for Header/Banners */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-orange-600">
              CASH
            </span>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-emerald-700">
              TREE
            </span>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded px-1.5 py-0.5 ml-1 hidden sm:inline-block">
              CO-OP SOCIETY
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-slate-600 tracking-wide mt-0.5">
            CO-OPERATIVE (U) THRIFT &amp; CREDIT SOCIETY LTD
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">
            Official E-Sign &amp; Member Verification Portal
          </span>
        </div>
      )}
    </div>
  );
};
