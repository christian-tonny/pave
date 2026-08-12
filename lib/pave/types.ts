/**
 * Pave — core types for the onboarding interview and the path it produces.
 *
 * The interview is deliberately Rwanda-shaped: it asks about S4–S6 combinations,
 * what a person can realistically commit to, how they get online, and where they
 * can live — not about US salary bands.
 */

/** What a person is drawn to doing, scored from their answers. */
export type Trait =
  | 'build' // make and fix real things
  | 'analyse' // find out why something behaves the way it does
  | 'care' // look after people
  | 'teach' // explain until it lands
  | 'organise' // plan, coordinate, keep things moving
  | 'persuade' // sell, negotiate, represent
  | 'create' // design, write, perform
  | 'field'; // be outside, on site, moving

export const TRAITS: Trait[] = [
  'build',
  'analyse',
  'care',
  'teach',
  'organise',
  'persuade',
  'create',
  'field',
];

export type TraitScores = Record<Trait, number>;

/** Where someone is in the Rwandan education-to-work journey. */
export type Stage =
  | 'in-secondary'
  | 'finished-s6'
  | 'in-tertiary'
  | 'graduated-searching'
  | 'working-switching';

/** S4–S6 combination (or the closest thing to it). */
export type Track =
  | 'mcb' // Maths–Chemistry–Biology
  | 'mpc' // Maths–Physics–Computer science / PCM
  | 'pcb' // Physics–Chemistry–Biology
  | 'meg' // Maths–Economics–Geography
  | 'heg' // History–Economics–Geography
  | 'lang' // Languages, literature, arts
  | 'tvet' // A TVET trade (ICT, construction, hospitality, agriculture…)
  | 'unsure';

/** How much study a person can actually commit to next. */
export type Commitment =
  | 'degree' // 3–4 years at university
  | 'diploma' // 1–2 years, TVET / polytechnic
  | 'short' // weeks to months, then start earning
  | 'onjob' // learn while working, evenings and weekends
  | 'continuing'; // already in a programme, wants to use it

export type Money = 'covered' | 'needs-scholarship' | 'earn-while-studying' | 'earn-now';

export type Device = 'own-laptop' | 'shared-laptop' | 'phone-only' | 'lab-or-cafe';

export type Place = 'kigali' | 'secondary-city' | 'anywhere-rwanda' | 'remote-abroad';

export type Setting = 'quiet-desk' | 'small-team' | 'in-front-of-people' | 'site-field' | 'own-shop';

export type Motive =
  | 'steady-income'
  | 'build-my-own'
  | 'serve-community'
  | 'keep-learning'
  | 'respected-skill'
  | 'own-my-time';

export type Risk = 'salaried' | 'job-plus-side' | 'own-thing';

/** Structured facts the interview establishes, separate from trait scoring. */
export interface InterviewFacts {
  stage?: Stage;
  track?: Track;
  currentField?: string;
  commitment?: Commitment;
  money?: Money;
  device?: Device;
  place?: Place;
  setting?: Setting;
  motives: Motive[];
  risk?: Risk;
  horizon?: string;
}

/** One selectable answer. */
export interface InterviewOption {
  id: string;
  label: string;
  /** Optional second line — used for Rwanda-specific clarification. */
  note?: string;
  traits?: Partial<TraitScores>;
  /** Facts this option establishes. Motives accumulate; everything else is last-write. */
  facts?: Partial<Omit<InterviewFacts, 'motives'>> & { motives?: Motive[] };
}

export interface InterviewQuestion {
  id: string;
  /** Short label for the progress rail. */
  section: 'Where you are' | 'What you are drawn to' | 'What you can commit to' | 'What matters';
  prompt: string
  help?: string;
  options: InterviewOption[];
  /** Multi-select questions cap how many can be chosen. */
  maxChoices?: number;
  /** Only ask this question when the answers so far satisfy the predicate. */
  askWhen?: (facts: InterviewFacts) => boolean;
}

/** questionId -> selected option ids (single-select stores one entry). */
export type Answers = Record<string, string[]>;

export type RouteKind = 'degree' | 'diploma' | 'short' | 'onjob';

export interface PathRoute {
  kind: RouteKind;
  label: string;
  duration: string;
  /** Institution programme ids, most relevant first. */
  programmes: string[];
  /** One line on what this route costs and asks of you. */
  reality: string;
}

export interface CareerPath {
  id: string;
  title: string;
  /** One line, plain, no hype. */
  tagline: string;
  /** What the work is actually like day to day. */
  dayToDay: string;
  traits: Partial<TraitScores>;
  routes: PathRoute[];
  /** Combinations that make the degree route straightforward. */
  favouredTracks: Track[];
  /** True when the work needs a computer most days. */
  needsComputer: boolean;
  /** True when a lot of the work happens on site, outdoors or moving. */
  fieldwork: boolean;
  /** Places where the work realistically exists today. */
  places: Place[];
  motives: Motive[];
  risk: Risk[];
  /**
   * Typical monthly entry pay in RWF. A curated estimate, not a quote — and null
   * where the honest answer is "it depends entirely on what you build".
   */
  entryPay: { min: number; max: number } | null;
  /** Opportunity ids, most relevant first. */
  opportunities: string[];
  /** Concrete first moves, split by whether school comes first. */
  nextSteps: { studying: string[]; working: string[] };
}

export interface Programme {
  id: string;
  /** Programme name as the institution lists it. */
  name: string;
  institution: string;
  kind: RouteKind;
  duration: string;
  /** District or city. */
  location: string;
  /** Indicative annual tuition in RWF, or null when it varies too much to quote. */
  tuitionPerYear: number | null;
  website: string;
  note?: string;
}

export type OpportunityKind = 'employer' | 'internship' | 'programme' | 'board' | 'funding';

export interface Opportunity {
  id: string;
  /** Organisation or programme name. */
  org: string;
  kind: OpportunityKind;
  /** What you would be applying for. */
  title: string;
  blurb: string;
  location: string;
  website: string;
  stages: Stage[];
}

export interface PathMatch {
  path: CareerPath;
  /** 0–100. */
  score: number;
  fit: 'strong' | 'good' | 'worth-a-look';
  /** Why this path came up, written from the person's own answers. */
  reasons: string[];
  /** Where the answers pull against this path. Honest, not fatal. */
  tensions: string[];
  route: PathRoute | null;
  programmes: Programme[];
  opportunities: Opportunity[];
  nextSteps: string[];
}

export interface InterviewResult {
  /** Top match first. */
  matches: PathMatch[];
  traits: TraitScores;
  facts: InterviewFacts;
  /** Scholarships and loans worth checking, when money came up as a constraint. */
  funding: Opportunity[];
  /** Two or three sentences summarising the person back to themselves. */
  summary: string;
  /** True when schools should lead the results (they are not in tertiary yet). */
  schoolsFirst: boolean;
  completedAt: number;
  /** Bumped when scoring or questions change, so stale saved results are discarded. */
  version: number;
}
