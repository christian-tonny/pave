import { labelFor, readAnswers } from './interview';
import { programmesByIds } from './institutions';
import { opportunitiesByIds } from './opportunities';
import { PATHS } from './paths';
import { TRAITS } from './types';
import type {
  Answers,
  CareerPath,
  InterviewFacts,
  InterviewResult,
  Opportunity,
  PathMatch,
  PathRoute,
  Programme,
  RouteKind,
  Trait,
  TraitScores,
} from './types';

/** Bumped whenever scoring or the question set changes. Stale saved results are dropped. */
export const RESULT_VERSION = 1;

const TRAIT_PHRASES: Record<Trait, string> = {
  build: 'making and fixing real things',
  analyse: 'working out why things behave the way they do',
  care: 'looking after people',
  teach: 'explaining things until they land',
  organise: 'planning and keeping things moving',
  persuade: 'talking people round',
  create: 'making things people see',
  field: 'being outside and moving',
};

/**
 * Phrases used when quoting an answer back inside a sentence. Option labels cannot
 * simply be lower-cased — "Kigali" and "I" have to survive.
 */
const PLACE_PHRASE: Record<string, string> = {
  kigali: 'Kigali',
  'secondary-city': 'a secondary city',
  'anywhere-rwanda': 'anywhere in Rwanda, including rural districts',
  'remote-abroad': 'wherever you are, working remotely',
};

/** The same four answers, as a clause that can follow "you told us that…". */
const PLACE_CLAUSE: Record<string, string> = {
  kigali: 'you can be in Kigali',
  'secondary-city': 'you can be in a secondary city',
  'anywhere-rwanda': 'you can go anywhere in Rwanda, including rural districts',
  'remote-abroad': 'you would rather work remotely from where you are',
};

const COMMITMENT_CLAUSE: Record<string, string> = {
  degree: 'three to four years at university',
  diploma: 'one to two years at a polytechnic',
  short: 'a few months of training before you start earning',
  onjob: 'learning on the job rather than in a classroom',
  continuing: 'the programme you are already in',
};

const MOTIVE_PHRASE: Record<string, string> = {
  'steady-income': 'income you can plan a life around',
  'build-my-own': 'building something that is yours',
  'serve-community': 'being useful to your community',
  'keep-learning': 'never running out of things to learn',
  'respected-skill': 'being the person others call',
  'own-my-time': 'control over your own time',
};

/** Which paths use a field someone has already studied or worked in. */
const FIELD_TO_PATHS: Record<string, string[]> = {
  ICT: ['software', 'data'],
  engineering: ['built', 'energy'],
  health: ['health'],
  education: ['teaching'],
  business: ['finance', 'venture', 'data'],
  agriculture: ['agri'],
  law: ['public'],
  creative: ['design'],
  hospitality: ['tourism', 'venture'],
  other: [],
};

interface Adjustment {
  points: number;
  /** Shown as a reason when positive, a tension when negative. */
  note?: string;
}

function cosine(user: TraitScores, path: Partial<TraitScores>): number {
  let dot = 0;
  let userNorm = 0;
  let pathNorm = 0;

  for (const trait of TRAITS) {
    const userValue = user[trait] ?? 0;
    const pathValue = path[trait] ?? 0;
    dot += userValue * pathValue;
    userNorm += userValue * userValue;
    pathNorm += pathValue * pathValue;
  }

  if (userNorm === 0 || pathNorm === 0) return 0.5;
  return dot / (Math.sqrt(userNorm) * Math.sqrt(pathNorm));
}

/** The traits a person scored highest on, strongest first. */
export function topTraits(traits: TraitScores, count = 2): Trait[] {
  return [...TRAITS]
    .filter((trait) => traits[trait] > 0)
    .sort((a, b) => traits[b] - traits[a])
    .slice(0, count);
}

const ROUTE_FALLBACKS: Record<string, RouteKind[]> = {
  degree: ['degree', 'diploma', 'short', 'onjob'],
  diploma: ['diploma', 'short', 'degree', 'onjob'],
  short: ['short', 'onjob', 'diploma', 'degree'],
  onjob: ['onjob', 'short', 'diploma', 'degree'],
  continuing: ['degree', 'diploma', 'onjob', 'short'],
};

function chooseRoute(path: CareerPath, facts: InterviewFacts): PathRoute | null {
  const preference = ROUTE_FALLBACKS[facts.commitment ?? 'diploma'] ?? ROUTE_FALLBACKS.diploma;
  // Someone who has to earn now cannot start with a four-year degree, whatever
  // else they told us they would like to commit to.
  const order =
    facts.money === 'earn-now' ? (['short', 'onjob', 'diploma', 'degree'] as RouteKind[]) : preference;

  for (const kind of order) {
    const route = path.routes.find((candidate) => candidate.kind === kind);
    if (route) return route;
  }

  return path.routes[0] ?? null;
}

function sortProgrammesForPlace(programmes: Programme[], facts: InterviewFacts): Programme[] {
  if (facts.place === 'kigali') {
    return [...programmes].sort((a, b) => rankKigali(b) - rankKigali(a));
  }
  if (facts.place === 'secondary-city' || facts.place === 'anywhere-rwanda') {
    return [...programmes].sort((a, b) => rankKigali(a) - rankKigali(b));
  }
  return programmes;
}

function rankKigali(programme: Programme): number {
  return /kigali|kicukiro|gasabo|nyarugenge|gikondo|gishushu|kacyiru|gisozi|bumbogo/i.test(
    programme.location,
  )
    ? 1
    : 0;
}

function adjustmentsFor(path: CareerPath, facts: InterviewFacts, answers: Answers): Adjustment[] {
  const adjustments: Adjustment[] = [];

  // Combination — the S4–S6 track either opens the usual door or does not.
  if (facts.track && facts.track !== 'unsure') {
    const trackLabel = labelFor('track', facts.track);
    if (path.favouredTracks.includes(facts.track)) {
      adjustments.push({
        points: 7,
        note: `${trackLabel} is a normal way into this work, so you are not starting from behind.`,
      });
    } else {
      adjustments.push({
        points: -6,
        note: `${trackLabel} is not the usual combination here — expect a bridging course or a polytechnic entry rather than a direct one.`,
      });
    }
  }

  // What they have already studied or worked in.
  if (facts.currentField) {
    const related = FIELD_TO_PATHS[facts.currentField] ?? [];
    if (related.includes(path.id)) {
      adjustments.push({
        points: facts.stage === 'working-switching' ? 5 : 9,
        note: 'It builds on what you have already studied instead of starting you over.',
      });
    }
  }

  // Can they actually start? A path with no route matching their commitment is a wish.
  if (facts.commitment) {
    const clause = COMMITMENT_CLAUSE[facts.commitment];
    const hasDirectRoute =
      facts.commitment === 'continuing'
        ? path.routes.length > 0
        : path.routes.some((route) => route.kind === facts.commitment);

    if (hasDirectRoute) {
      adjustments.push({
        points: 9,
        note: `There is a real route onto it that fits ${clause}.`,
      });
    } else {
      adjustments.push({
        points: -13,
        note: `Every serious way in asks for more than ${clause}.`,
      });
    }
  }

  // Money.
  const quickRoutes = path.routes.some((route) => route.kind === 'short' || route.kind === 'onjob');
  if (facts.money === 'earn-now' || facts.money === 'earn-while-studying') {
    adjustments.push(
      quickRoutes
        ? { points: 7, note: 'You can start earning on this path in months, not years.' }
        : {
            points: -9,
            note: 'The routes here all cost years of study before the first pay cheque.',
          },
    );
  }

  // Device access. Some paths genuinely need keyboard hours; most do not.
  if (path.needsComputer) {
    if (facts.device === 'phone-only') {
      adjustments.push({
        points: -13,
        note: 'This path needs a computer most days, and you told us you only have a phone.',
      });
    } else if (facts.device === 'lab-or-cafe') {
      adjustments.push({
        points: -5,
        note: 'You would need reliable lab or hub time — a phone will not carry this path.',
      });
    }
  } else if (facts.device === 'phone-only' || facts.device === 'lab-or-cafe') {
    adjustments.push({ points: 4, note: 'It does not depend on you owning a laptop.' });
  }

  // Place.
  if (facts.place) {
    const placePhrase = PLACE_PHRASE[facts.place];
    if (path.places.includes(facts.place)) {
      adjustments.push({ points: 6, note: `The work exists where you can be: ${placePhrase}.` });
    } else {
      adjustments.push({
        points: -9,
        note: `Most of this work is not where you said you can be (${placePhrase}).`,
      });
    }
  }

  // What would make the work worth it.
  const sharedMotives = facts.motives.filter((motive) => path.motives.includes(motive));
  if (sharedMotives.length > 0) {
    const motivePhrase = MOTIVE_PHRASE[sharedMotives[0]];
    adjustments.push({
      points: Math.min(10, sharedMotives.length * 5),
      note: motivePhrase ? `It can give you what you said matters: ${motivePhrase}.` : undefined,
    });
  }

  // Salary, side hustle, or your own thing.
  if (facts.risk) {
    if (path.risk.includes(facts.risk)) {
      adjustments.push({ points: 6 });
    } else {
      adjustments.push({
        points: -7,
        note:
          facts.risk === 'own-thing'
            ? 'This path is mostly employed work — running your own version of it takes years of experience first.'
            : 'This path rarely offers the steady single-employer salary you said you want.',
      });
    }
  }

  // Where they do their best work.
  if (facts.setting === 'site-field' && path.fieldwork) {
    adjustments.push({ points: 5, note: 'Most of the work happens out of the office, which is where you said you do your best.' });
  }
  if (facts.setting === 'quiet-desk' && path.fieldwork) {
    adjustments.push({ points: -5, note: 'It is a site and field path, and you work best with quiet.' });
  }
  if (facts.setting === 'own-shop' && path.risk.includes('own-thing')) {
    adjustments.push({ points: 4 });
  }

  void answers;
  return adjustments;
}

function reasonsFromAnswers(traits: TraitScores, answers: Answers, path: CareerPath): string[] {
  const reasons: string[] = [];
  const shared = topTraits(traits, 3).filter((trait) => (path.traits[trait] ?? 0) > 0);

  const goodDay = (answers['good-day'] ?? [])[0];
  const goodDayLabel = goodDay ? labelFor('good-day', goodDay) : null;
  if (goodDayLabel && shared.length > 0) {
    reasons.push(
      `You called a good day one where ${lowerFirst(goodDayLabel)} — this work is mostly ${TRAIT_PHRASES[shared[0]]}.`,
    );
  } else if (shared.length > 0) {
    reasons.push(`Your answers point at ${TRAIT_PHRASES[shared[0]]}, which is the core of this work.`);
  }

  const askedFor = (answers['asked-for'] ?? [])
    .map((optionId) => labelFor('asked-for', optionId))
    .filter((label): label is string => Boolean(label));
  if (askedFor.length > 0 && shared.length > 1) {
    reasons.push(`People already come to you for ${lowerFirst(askedFor[0])}. That is the same muscle.`);
  }

  const enjoyed = (answers.enjoyed ?? [])
    .map((optionId) => labelFor('enjoyed', optionId))
    .filter((label): label is string => Boolean(label));
  if (enjoyed.length > 0 && reasons.length < 2) {
    reasons.push(`You enjoyed ${lowerFirst(enjoyed[0])}, and this path keeps paying you for it.`);
  }

  return reasons;
}

function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function personaliseSteps(
  steps: string[],
  path: CareerPath,
  facts: InterviewFacts,
  route: PathRoute | null,
): string[] {
  const extra: string[] = [];

  if (path.needsComputer && (facts.device === 'phone-only' || facts.device === 'lab-or-cafe')) {
    extra.push(
      'Find your keyboard hours first — a school lab, kLab in Kigali, or a district hub. This path needs them.',
    );
  }

  if (facts.money === 'needs-scholarship') {
    extra.push('Check the BRD student loan terms and one scholarship deadline this week, before choosing a place.');
  }

  if (facts.money === 'earn-now' && route && (route.kind === 'degree' || route.kind === 'diploma')) {
    extra.push('Ask each institution about evening or weekend intakes — you told us you need to be earning now.');
  }

  const combined = [...extra, ...steps];
  // Drop near-duplicates so a personalised step does not repeat the path's own advice.
  const seen = new Set<string>();
  return combined
    .filter((step) => {
      const key = step.slice(0, 28).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 5);
}

function pickOpportunities(path: CareerPath, facts: InterviewFacts): Opportunity[] {
  const all = opportunitiesByIds(path.opportunities);
  const stage = facts.stage;
  const forStage = stage ? all.filter((opportunity) => opportunity.stages.includes(stage)) : all;
  const rest = all.filter((opportunity) => !forStage.includes(opportunity));
  return [...forStage, ...rest].slice(0, 4);
}

function scorePath(path: CareerPath, facts: InterviewFacts, traits: TraitScores, answers: Answers): PathMatch {
  // A score is mostly about what someone is drawn to, then moved by whether they
  // can actually start this path from where they stand. The circumstance term
  // saturates rather than adds up without limit, so that a well-fitting path lands
  // in the high eighties instead of everything piling against a ceiling.
  const affinity = cosine(traits, path.traits);
  const adjustments = adjustmentsFor(path, facts, answers);
  const delta = adjustments.reduce((total, adjustment) => total + adjustment.points, 0);
  const score = Math.max(8, Math.min(96, Math.round(20 + affinity * 58 + 20 * Math.tanh(delta / 25))));

  const route = chooseRoute(path, facts);
  const programmes = route
    ? sortProgrammesForPlace(programmesByIds(route.programmes), facts).slice(0, 3)
    : [];

  const positives = adjustments
    .filter((adjustment) => adjustment.points > 0 && adjustment.note)
    .sort((a, b) => b.points - a.points)
    .map((adjustment) => adjustment.note as string);

  const tensions = adjustments
    .filter((adjustment) => adjustment.points < 0 && adjustment.note)
    .sort((a, b) => a.points - b.points)
    .map((adjustment) => adjustment.note as string)
    .slice(0, 2);

  const schoolsFirst = facts.stage === 'in-secondary' || facts.stage === 'finished-s6';
  const baseSteps = schoolsFirst ? path.nextSteps.studying : path.nextSteps.working;

  return {
    path,
    score,
    fit: score >= 74 ? 'strong' : score >= 58 ? 'good' : 'worth-a-look',
    reasons: [...reasonsFromAnswers(traits, answers, path), ...positives].slice(0, 4),
    tensions,
    route,
    programmes,
    opportunities: pickOpportunities(path, facts),
    nextSteps: personaliseSteps(baseSteps, path, facts, route),
  };
}

const STAGE_OPENING: Record<string, string> = {
  'in-secondary': 'You are still in secondary school, which means you have time and a real choice to make',
  'finished-s6': 'You have finished S6 and the next decision is the one that sets your direction',
  'in-tertiary': 'You are already studying, so the job now is to point that at something specific',
  'graduated-searching': 'You have finished studying and need work, not more theory',
  'working-switching': 'You are already working, and you want the next move to be a better fit',
};

const COMMITMENT_PHRASE: Record<string, string> = {
  degree: 'you can commit to a full degree',
  diploma: 'you can give one to two years to a polytechnic or TVET college',
  short: 'you want a few months of training and then to start earning',
  onjob: 'you need to learn on the job rather than in a classroom',
  continuing: 'you want to use the programme you are already in',
};

function buildSummary(facts: InterviewFacts, traits: TraitScores, top: PathMatch | undefined): string {
  const sentences: string[] = [];

  const opening = facts.stage ? STAGE_OPENING[facts.stage] : 'You are working out what fits';
  const drawn = topTraits(traits, 2).map((trait) => TRAIT_PHRASES[trait]);
  sentences.push(
    drawn.length > 0
      ? `${opening}. What you keep coming back to is ${drawn.join(' and ')}.`
      : `${opening}.`,
  );

  const commitment = facts.commitment ? COMMITMENT_PHRASE[facts.commitment] : null;
  const placeClause = facts.place ? PLACE_CLAUSE[facts.place] : null;

  if (commitment && placeClause) {
    sentences.push(`You told us ${commitment}, and that ${placeClause}.`);
  } else if (commitment) {
    sentences.push(`You told us ${commitment}.`);
  }

  if (top) {
    sentences.push(`Against that, ${top.path.title.toLowerCase()} fits you best — and there is a way in from where you stand.`);
  }

  return sentences.join(' ');
}

function pickFunding(facts: InterviewFacts): Opportunity[] {
  if (facts.money === 'covered') return [];
  const needsStudyMoney =
    facts.commitment === 'degree' || facts.commitment === 'diploma' || facts.commitment === 'continuing';
  if (!needsStudyMoney && facts.money !== 'needs-scholarship') return [];
  return opportunitiesByIds(['brd-student-loan', 'mastercard-foundation']);
}

/** Score every path against a completed (or partly completed) interview. */
export function scoreInterview(answers: Answers): InterviewResult {
  const { facts, traits } = readAnswers(answers);

  const matches = PATHS.map((path) => scorePath(path, facts, traits, answers)).sort(
    (a, b) => b.score - a.score || a.path.title.localeCompare(b.path.title),
  );

  const top = matches.slice(0, 3);

  return {
    matches: top,
    traits,
    facts,
    funding: pickFunding(facts),
    summary: buildSummary(facts, traits, top[0]),
    schoolsFirst: facts.stage === 'in-secondary' || facts.stage === 'finished-s6',
    completedAt: Date.now(),
    version: RESULT_VERSION,
  };
}

/** Every path scored, for debugging and for the "all paths" view. */
export function scoreAllPaths(answers: Answers): PathMatch[] {
  const { facts, traits } = readAnswers(answers);
  return PATHS.map((path) => scorePath(path, facts, traits, answers)).sort((a, b) => b.score - a.score);
}
