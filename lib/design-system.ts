export const designSystem = {
  typography: {
    scale: {
      h1: "48-56px",
      h2: "38-42px",
      h3: "28-32px",
      subheader: "17-20px",
      body: "16px",
      caption: "13-14px",
    },
    weights: {
      bold: 700,
      semibold: 600,
      medium: 500,
      regular: 400,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
  },

  colors: {
    primary: {
      pink: "#FF6489",
      pinkLight: "#FF8FA3",
      neonPink: "#FF0055",
    },
    accent: {
      purple: "#A855F7",
      violet: "#C084FC",
      magenta: "#FF00FF",
      yellow: "#FFFF00",
      orange: "#FFA500",
      gold: "#FFD700",
      roseGold: "#E879F9",
    },
    neutrals: {
      stage: "#050509",
      white: "#FFFFFF",
      whiteAlpha: {
        90: "rgba(255,255,255,0.9)",
        70: "rgba(255,255,255,0.7)",
        60: "rgba(255,255,255,0.6)",
        40: "rgba(255,255,255,0.4)",
        20: "rgba(255,255,255,0.2)",
        10: "rgba(255,255,255,0.1)",
        5: "rgba(255,255,255,0.05)",
      },
    },
  },

  spacing: {
    pageTopBottom: "120-180px",
    sectionGap: "80-120px",
    cardGap: "24-32px",
    elementGap: "16-24px",
    microGap: "8-12px",
  },

  glowStrengths: {
    subtle: "0 0 20px rgba(255,100,137,0.2)",
    medium: "0 0 40px rgba(255,100,137,0.4)",
    strong: "0 0 60px rgba(255,100,137,0.6)",
    intense: "0 0 80px rgba(255,100,137,0.8)",
  },

  motionGuidelines: {
    durations: {
      fast: "0.2s",
      normal: "0.4s",
      slow: "0.6s",
      verySlow: "1s",
    },
    easings: {
      default: "ease-in-out",
      bounce: "spring",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    transforms: {
      hoverScale: "scale(1.05)",
      hoverLift: "translateY(-8px)",
      microFloat: "translateY(-3px) to translateY(3px)",
      parallaxLight: "translate(x * 0.02, y * 0.02)",
      parallaxMedium: "translate(x * 0.05, y * 0.05)",
    },
  },

  glassmorphism: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.2)",
    backdropBlur: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  },

  energyBeams: {
    thickness: "12-14px",
    gradient: "linear-gradient(to bottom, #FF6489, #FF00FF)",
    glow: "0 0 20px rgba(255,100,137,0.6)",
    glowHover: "0 0 40px rgba(255,100,137,0.9)",
  },
}
