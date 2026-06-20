function withOpacity(cssVariable) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `color-mix(in srgb, var(${cssVariable}) calc(${opacityValue} * 100%), transparent)`;
    }
    return `var(${cssVariable})`;
  };
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-container": withOpacity("--primary-container"),
        "tertiary-fixed-dim": withOpacity("--tertiary-fixed-dim"),
        "error-container": withOpacity("--error-container"),
        "on-primary-fixed": withOpacity("--on-primary-fixed"),
        "tertiary": withOpacity("--tertiary"),
        "on-primary-container": withOpacity("--on-primary-container"),
        "on-error-container": withOpacity("--on-error-container"),
        "on-tertiary-fixed": withOpacity("--on-tertiary-fixed"),
        "background": withOpacity("--background"),
        "surface-container-highest": withOpacity("--surface-container-highest"),
        "on-surface-variant": withOpacity("--on-surface-variant"),
        "inverse-surface": withOpacity("--inverse-surface"),
        "tertiary-fixed": withOpacity("--tertiary-fixed"),
        "surface-dim": withOpacity("--surface-dim"),
        "on-secondary-fixed": withOpacity("--on-secondary-fixed"),
        "surface-container": withOpacity("--surface-container"),
        "outline": withOpacity("--outline"),
        "on-background": withOpacity("--on-background"),
        "inverse-on-surface": withOpacity("--inverse-on-surface"),
        "tertiary-container": withOpacity("--tertiary-container"),
        "surface-tint": withOpacity("--surface-tint"),
        "secondary-fixed-dim": withOpacity("--secondary-fixed-dim"),
        "primary": withOpacity("--primary"),
        "inverse-primary": withOpacity("--inverse-primary"),
        "on-secondary-container": withOpacity("--on-secondary-container"),
        "on-tertiary-container": withOpacity("--on-tertiary-container"),
        "on-secondary": withOpacity("--on-secondary"),
        "secondary-container": withOpacity("--secondary-container"),
        "surface-container-high": withOpacity("--surface-container-high"),
        "on-surface": withOpacity("--on-surface"),
        "surface-container-low": withOpacity("--surface-container-low"),
        "on-tertiary": withOpacity("--on-tertiary"),
        "on-tertiary-fixed-variant": withOpacity("--on-tertiary-fixed-variant"),
        "secondary": withOpacity("--secondary"),
        "surface-variant": withOpacity("--surface-variant"),
        "on-primary": withOpacity("--on-primary"),
        "primary-fixed": withOpacity("--primary-fixed"),
        "surface-bright": withOpacity("--surface-bright"),
        "on-error": withOpacity("--on-error"),
        "primary-fixed-dim": withOpacity("--primary-fixed-dim"),
        "on-secondary-fixed-variant": withOpacity("--on-secondary-fixed-variant"),
        "on-primary-fixed-variant": withOpacity("--on-primary-fixed-variant"),
        "secondary-fixed": withOpacity("--secondary-fixed"),
        "error": withOpacity("--error"),
        "surface-container-lowest": withOpacity("--surface-container-lowest"),
        "surface": withOpacity("--surface"),
        "outline-variant": withOpacity("--outline-variant")
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "lg": "24px",
        "md": "16px",
        "xs": "4px",
        "base": "4px",
        "margin-desktop": "48px",
        "xl": "32px",
        "sm": "8px",
        "gutter": "24px",
        "margin-mobile": "16px"
      },
      fontFamily: {
        "headline-lg-mobile": ["Geist", "sans-serif"],
        "body-lg": ["Geist", "sans-serif"],
        "mono-code": ["Geist Mono", "monospace"],
        "headline-lg": ["Geist", "sans-serif"],
        "label-md": ["Geist", "sans-serif"],
        "headline-md": ["Geist", "sans-serif"],
        "headline-sm": ["Geist", "sans-serif"],
        "body-md": ["Geist", "sans-serif"]
      },
      fontSize: {
        "headline-lg-mobile": ["24px", { lineHeight: "32px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", letterSpacing: "0", fontWeight: "400" }],
        "mono-code": ["14px", { lineHeight: "20px", letterSpacing: "0", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "500" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "28px", letterSpacing: "0", fontWeight: "500" }],
        "body-md": ["14px", { lineHeight: "20px", letterSpacing: "0", fontWeight: "400" }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
