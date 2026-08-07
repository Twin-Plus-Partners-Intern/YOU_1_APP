export const COLORS = {
  primary: {
    light: '#6366f1', // Indigo 500
    DEFAULT: '#4f46e5', // Indigo 600
    dark: '#3730a3', // Indigo 800
  },
  background: {
    light: '#f8fafc', // Slate 50
    dark: '#020617', // Slate 950
  },
  card: {
    light: '#ffffff',
    dark: '#0f172a', // Slate 900
  },
  text: {
    primary: {
      light: '#0f172a',
      dark: '#f8fafc',
    },
    secondary: {
      light: '#475569', // Slate 600
      dark: '#94a3b8', // Slate 400
    },
  },
  accent: {
    success: '#10b981', // Emerald 500
    warning: '#f59e0b', // Amber 500
    error: '#ef4444', // Rose 500
  }
};

export const TYPOGRAPHY = {
  families: {
    sans: 'System',
  },
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
};

// MBTI configuration tailored for procrastinators / P-system (hệ P)
export interface MbtiProfile {
  name: string;
  lazyRating: number; // 1-100 score of potential procrastination
  superpower: string;
  weakness: string;
  advice: string;
}

export const MBTI_P_PROFILES: Record<string, MbtiProfile> = {
  INFP: {
    name: 'Mediator Procrastinator',
    lazyRating: 85,
    superpower: 'Creative bursts under pressure',
    weakness: 'Overthinking keeps you from starting',
    advice: 'Write down thoughts immediately. Do not aim for perfection; aim for done.',
  },
  ENFP: {
    name: 'Campaigner Dreamer',
    lazyRating: 80,
    superpower: 'Boundless initial excitement',
    weakness: 'Losing interest once the novelty wears off',
    advice: 'Commit to 10 minutes of execution daily. Find an accountability partner.',
  },
  INTP: {
    name: 'Logician Theorist',
    lazyRating: 90,
    superpower: 'Brilliant structural planning',
    weakness: 'Analyzing instead of acting (analysis paralysis)',
    advice: 'One working prototype is worth a thousand ideas. Build the minimal version first.',
  },
  ENTP: {
    name: 'Debater Innovator',
    lazyRating: 75,
    superpower: 'Finding easy shortcuts to hard problems',
    weakness: 'Starting 10 things but finishing none',
    advice: 'Pick your top 2 goals. Freeze all others until they are completed.',
  },
};

// Mascot Jay Companion configuration
export const MASCOT_JAY = {
  name: 'Jay',
  type: 'AI Goal Assistant Mascot',
  modes: {
    gentle: {
      avatar: '🐣',
      greeting: 'Hey! Ready to take a tiny step forward today?',
    },
    roast: {
      avatar: '🦖',
      greeting: 'Are we actually doing this today, or is this another "tomorrow" thing?',
    },
    celebrate: {
      avatar: '🦄',
      greeting: 'Absolutely incredible! You beat the lazy bug!',
    }
  }
};
