/**
 * Manual layout for `ProjectCards` on the infinite canvas.
 * Units are in "world px" (same coordinate space as badges/cards).
 *
 * Keys should match the `projects.json` lottie/video asset keys:
 * - lottie: `animationData`
 * - lottie-prop: `animationData2` (if present) else `animationData`
 * - video: `video`
 */

export const PROJECT_CARD_POSITIONS = {
  // Near-center cluster (tweak freely)
  pacman: { left: 1520, top: 10, rotate: 1.2 },
  secretSanta: { left: 1130, top: -460, rotate: -1.4 },
  ans: { left: 1200, top: 480, rotate: 1.6 },
  cardHeart: { left: 740, top: -540, rotate: -1.2 },
  valentines: { left: 650, top: -1020, rotate: 1.1 },
  portfolio: { left: 1960, top: 220, rotate: -1.6 },
  miniProjects: { left: 1040, top: -940, rotate: 1.3 },
  videoGame: { left: 1620, top: 510, rotate: -1.1 },

  // lottie-prop projects
  propChain2: { left: 1460, top: -410, rotate: 1.0 },
  chatbot: { left: 350, top: 800, rotate: -1.2 },
  mealRoulette: { left: 260, top: 320, rotate: 1.5 },
  constructionData: { left: 1960, top: -800, rotate: -1.5 },
  foodservices: { left: 1040, top: 0, rotate: 1.2 },
  umbracoBase: { left: 1920, top: -260, rotate: 1.0 },
  voting: { left: 1540, top: -880, rotate: -1.0 },
  rsvp: { left: 780, top: 520, rotate: 1.3 },
};

