/**
 * Tipe domain bersama untuk Cosmos Academy.
 * Bentuk tipe di sini sengaja dibuat identik dengan kolom pada `prisma/schema.prisma`
 * agar data statis (mode demo) dan data database bisa dipertukarkan tanpa adaptasi.
 */

export type ContentType = 'fact' | 'fiction';

export type ArticleCategory =
  | 'Planet'
  | 'Bintang'
  | 'Black Hole'
  | 'Galaksi'
  | 'Nebula'
  | 'Asteroid & Komet'
  | 'Eksoplanet'
  | 'Teori Alam Semesta';

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  type: ContentType;
  summary: string;
  content: string;
  funFacts: string[];
  imageUrl: string | null;
  readTime: number;
  createdAt: string;
}

export type SpeciesStatus = 'damai' | 'berbahaya' | 'misterius' | 'netral';
export type KardashevLevel = 'I' | 'II' | 'III';

export interface AlienSpecies {
  id: string;
  name: string;
  slug: string;
  homePlanet: string;
  homePlanetSlug: string | null;
  kardashevLevel: KardashevLevel;
  status: SpeciesStatus;
  abilities: string[];
  lore: string;
  appearance: string;
  avatarUrl: string | null;
  accentColor: string;
}

export interface FictionalPlanet {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  atmosphere: string;
  inhabitants: string;
  resources: string[];
  dangerLevel: number;
  beautyScore: number;
  themeColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export type QuizCategory =
  | 'Tata Surya'
  | 'Bintang & Galaksi'
  | 'Black Hole & Kosmologi'
  | 'Eksoplanet';

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'mudah' | 'sedang' | 'sulit';
  order: number;
}

export interface QuizResult {
  id: string;
  userId: string;
  userName?: string | null;
  userImage?: string | null;
  category: string;
  score: number;
  total: number;
  playedAt: string;
}

export interface LeaderboardEntry extends QuizResult {
  rank: number;
  title: string;
}

export type CipherType = 'binary' | 'caesar' | 'rot13' | 'symbol';

export interface Signal {
  id: string;
  title: string;
  difficulty: number;
  encodedMessage: string;
  decodedMessage: string;
  hint: string;
  cipher: CipherType;
  sender: string;
  rewardBadge: string;
  order: number;
}

export interface AchievementDefinition {
  badgeName: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'umum' | 'langka' | 'legendaris';
  category: 'edukasi' | 'eksplorasi' | 'fiksi' | 'rahasia';
  hint: string;
}

export interface AchievementRecord {
  badgeName: string;
  unlockedAt: string;
}

export interface PlanetaryBody {
  id: string;
  name: string;
  slug: string;
  type: 'bintang' | 'planet' | 'planet-katai';
  order: number;
  /** Radius visual di kanvas 3D (bukan skala nyata) */
  visualRadius: number;
  /** Jarak orbit visual di kanvas 3D */
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  diameterKm: number;
  distanceFromSun: string;
  temperature: string;
  moons: number;
  dayLength: string;
  yearLength: string;
  composition: string;
  color: string;
  accentColor: string;
  hasRing: boolean;
  moonsList?: string[];
  atmosphere?: string;
  description: string;
  funFacts: string[];
}

export interface TravelNode {
  id: string;
  name: string;
  kind: 'nyata' | 'fiksi';
  distanceLy: number;
  system: string;
  coordinates: { x: number; y: number }; // koordinat peta galaksi (0-100)
  description: string;
}

export type EngineType = 'warp' | 'hyperspace' | 'lightfold';

export interface TravelPlan {
  origin: TravelNode;
  destination: TravelNode;
  engine: EngineType;
  engineLabel: string;
  distanceLy: number;
  durationHours: number;
  durationLabel: string;
  fuelUnits: number;
  anomalyRisk: number;
  riskLabel: 'rendah' | 'sedang' | 'tinggi' | 'kritis';
  warnings: string[];
  routeLog: string[];
  boardingCode: string;
}

export interface SpaceWeatherReport {
  date: string;
  headline: string;
  location: string;
  condition: string;
  icon: string;
  probability: number;
  advice: string;
  windSpeed: string;
  radiation: string;
  visibility: string;
  hourly: { time: string; condition: string; icon: string; probability: number }[];
}

export type UniverseFactBadge = '📚 FAKTA ILMIAH' | '🛸 FIKSI ILMIAH';
