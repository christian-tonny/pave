import type { Answers, InterviewFacts, InterviewQuestion, TraitScores } from './types';
import { TRAITS } from './types';

/**
 * The Pave interview.
 *
 * Thirteen questions, one screen each, roughly twelve answered once the
 * conditional ones drop out. Every question earns its place: it either changes
 * which path fits, or it changes which route onto that path is realistic.
 */
export const INTERVIEW: InterviewQuestion[] = [
  {
    id: 'stage',
    section: 'Where you are',
    prompt: 'Where are you right now?',
    help: 'This decides whether we talk about schools first or jobs first.',
    options: [
      { id: 'in-secondary', label: 'In secondary school', note: 'S4–S6', facts: { stage: 'in-secondary' } },
      { id: 'finished-s6', label: 'Finished S6', note: 'Deciding what comes next', facts: { stage: 'finished-s6' } },
      { id: 'in-tertiary', label: 'At university, IPRC or another college now', facts: { stage: 'in-tertiary' } },
      { id: 'graduated-searching', label: 'Finished studying, looking for work', facts: { stage: 'graduated-searching' } },
      { id: 'working-switching', label: 'Working, but this is not the direction I want', facts: { stage: 'working-switching' } },
    ],
  },
  {
    id: 'track',
    section: 'Where you are',
    prompt: 'Which combination did you take?',
    help: 'It shapes what you can enter directly — and where you would need a bridge.',
    askWhen: (facts) => facts.stage === 'in-secondary' || facts.stage === 'finished-s6',
    options: [
      { id: 'mcb', label: 'MCB', note: 'Maths, Chemistry, Biology', facts: { track: 'mcb' }, traits: { analyse: 2, care: 1 } },
      { id: 'mpc', label: 'MPC / PCM', note: 'Maths, Physics, Computer Science', facts: { track: 'mpc' }, traits: { analyse: 2, build: 1 } },
      { id: 'pcb', label: 'PCB', note: 'Physics, Chemistry, Biology', facts: { track: 'pcb' }, traits: { analyse: 2, care: 1 } },
      { id: 'meg', label: 'MEG', note: 'Maths, Economics, Geography', facts: { track: 'meg' }, traits: { analyse: 1, organise: 2 } },
      { id: 'heg', label: 'HEG / HGL', note: 'History, Economics, Geography, Literature', facts: { track: 'heg' }, traits: { persuade: 2, organise: 1 } },
      { id: 'lang', label: 'Languages, literature or arts', facts: { track: 'lang' }, traits: { create: 2, teach: 1 } },
      { id: 'tvet', label: 'A TVET trade', note: 'ICT, construction, hospitality, agriculture…', facts: { track: 'tvet' }, traits: { build: 2, field: 1 } },
      { id: 'unsure', label: 'Still choosing, or none of these', facts: { track: 'unsure' } },
    ],
  },
  {
    id: 'field',
    section: 'Where you are',
    prompt: 'What have you been studying or working in?',
    help: 'We will look for a path that uses it, not one that wastes it.',
    askWhen: (facts) =>
      facts.stage === 'in-tertiary' ||
      facts.stage === 'graduated-searching' ||
      facts.stage === 'working-switching',
    options: [
      { id: 'ict', label: 'ICT, software or telecoms', facts: { currentField: 'ICT' }, traits: { analyse: 2, build: 1 } },
      { id: 'engineering', label: 'Engineering, construction or surveying', facts: { currentField: 'engineering' }, traits: { build: 2, field: 1 } },
      { id: 'health', label: 'Health, nursing or medicine', facts: { currentField: 'health' }, traits: { care: 2, analyse: 1 } },
      { id: 'education', label: 'Education or teaching', facts: { currentField: 'education' }, traits: { teach: 2, care: 1 } },
      { id: 'business', label: 'Business, finance or accounting', facts: { currentField: 'business' }, traits: { organise: 2, analyse: 1 } },
      { id: 'agriculture', label: 'Agriculture, veterinary or environment', facts: { currentField: 'agriculture' }, traits: { field: 2, analyse: 1 } },
      { id: 'law', label: 'Law, governance or public administration', facts: { currentField: 'law' }, traits: { persuade: 2, organise: 1 } },
      { id: 'creative', label: 'Design, media or communication', facts: { currentField: 'creative' }, traits: { create: 2, persuade: 1 } },
      { id: 'hospitality', label: 'Hospitality, tourism or conservation', facts: { currentField: 'hospitality' }, traits: { persuade: 1, field: 2 } },
      { id: 'other', label: 'Something else, or nothing yet', facts: { currentField: 'other' } },
    ],
  },
  {
    id: 'enjoyed',
    section: 'What you are drawn to',
    prompt: 'Which school work made the time disappear?',
    help: 'Pick up to two. Answer for what you actually enjoyed, not what scored well.',
    maxChoices: 2,
    options: [
      { id: 'maths', label: 'Maths and physics problems', traits: { analyse: 3 } },
      { id: 'labs', label: 'Biology and chemistry practicals', traits: { analyse: 2, care: 1 } },
      { id: 'computer', label: 'Anything in the computer lab', traits: { analyse: 2, build: 2 } },
      { id: 'writing', label: 'Writing, debating, public speaking', traits: { persuade: 3, create: 1 } },
      { id: 'drawing', label: 'Drawing, design, music, film', traits: { create: 3 } },
      { id: 'workshop', label: 'The workshop, the farm, the practical trade', traits: { build: 3, field: 2 } },
      { id: 'clubs', label: 'Running clubs, events, the class timetable', traits: { organise: 3 } },
      { id: 'helping', label: 'Explaining the lesson to classmates', traits: { teach: 3 } },
    ],
  },
  {
    id: 'good-day',
    section: 'What you are drawn to',
    prompt: 'Which of these would be a good day?',
    options: [
      { id: 'fix', label: 'You got something broken working again', traits: { build: 3, analyse: 1 } },
      { id: 'figure-out', label: 'You worked out why the numbers were wrong', traits: { analyse: 3 } },
      { id: 'looked-after', label: 'Someone was in a bad way and you helped them', traits: { care: 3 } },
      { id: 'explained', label: 'You explained something until it finally clicked', traits: { teach: 3 } },
      { id: 'plan', label: 'A plan you made actually happened, on time', traits: { organise: 3 } },
      { id: 'convinced', label: 'You convinced someone who started out saying no', traits: { persuade: 3 } },
      { id: 'made', label: 'You made something and people wanted it', traits: { create: 3, persuade: 1 } },
      { id: 'outside', label: 'You were out of the office, moving, on site', traits: { field: 3 } },
    ],
  },
  {
    id: 'asked-for',
    section: 'What you are drawn to',
    prompt: 'What do people around you come to you for?',
    help: 'Pick up to two. This is often a better signal than marks.',
    maxChoices: 2,
    options: [
      { id: 'devices', label: 'Fixing a phone, a laptop, the wifi', traits: { build: 2, analyse: 1 } },
      { id: 'homework', label: 'Explaining homework', traits: { teach: 3 } },
      { id: 'planning', label: 'Planning something — a trip, a wedding, a budget', traits: { organise: 3 } },
      { id: 'negotiating', label: 'Bargaining or speaking for the group', traits: { persuade: 3 } },
      { id: 'design', label: 'Designing a poster, editing a photo or video', traits: { create: 3 } },
      { id: 'care', label: 'Looking after a child, a patient, an elder', traits: { care: 3 } },
      { id: 'money', label: 'Sorting out money, records, mobile money accounts', traits: { organise: 2, analyse: 2 } },
      { id: 'practical', label: 'Building, wiring, growing, repairing at home', traits: { build: 2, field: 2 } },
    ],
  },
  {
    id: 'setting',
    section: 'What you are drawn to',
    prompt: 'Where do you do your best work?',
    options: [
      { id: 'quiet-desk', label: 'On my own, with a long stretch of quiet', facts: { setting: 'quiet-desk' }, traits: { analyse: 2 } },
      { id: 'small-team', label: 'In a small team, close to the work', facts: { setting: 'small-team' }, traits: { organise: 1, build: 1 } },
      { id: 'in-front-of-people', label: 'In front of people — a class, a room, a client', facts: { setting: 'in-front-of-people' }, traits: { teach: 2, persuade: 2 } },
      { id: 'site-field', label: 'On site, outdoors, in the field', facts: { setting: 'site-field' }, traits: { field: 3, build: 1 } },
      { id: 'own-shop', label: 'In my own shop, studio or business', facts: { setting: 'own-shop' }, traits: { persuade: 2, create: 1 } },
    ],
  },
  {
    id: 'commitment',
    section: 'What you can commit to',
    prompt: 'How much study can you commit to next?',
    help: 'Be honest here. A path you can start beats a path you admire.',
    options: [
      { id: 'degree', label: 'Three to four years at university', facts: { commitment: 'degree' } },
      { id: 'diploma', label: 'One to two years at a polytechnic or TVET college', facts: { commitment: 'diploma' } },
      { id: 'short', label: 'A few months of short training, then start earning', facts: { commitment: 'short' } },
      { id: 'onjob', label: 'None — I need to learn on the job, evenings and weekends', facts: { commitment: 'onjob' } },
      { id: 'continuing', label: 'I am already in a programme and want to use it', facts: { commitment: 'continuing' } },
    ],
  },
  {
    id: 'money',
    section: 'What you can commit to',
    prompt: 'How would the money work?',
    help: 'It changes which route we put in front of you.',
    options: [
      { id: 'covered', label: 'Family or an existing scholarship covers it', facts: { money: 'covered' } },
      { id: 'needs-scholarship', label: 'I would need a scholarship, bursary or student loan', facts: { money: 'needs-scholarship' } },
      { id: 'earn-while-studying', label: 'I would need to earn something while studying', facts: { money: 'earn-while-studying' } },
      { id: 'earn-now', label: 'I need to be earning now', facts: { money: 'earn-now' } },
    ],
  },
  {
    id: 'device',
    section: 'What you can commit to',
    prompt: 'How do you get online?',
    help: 'Some paths need a laptop most days. Others genuinely do not.',
    options: [
      { id: 'own-laptop', label: 'My own laptop and internet at home', facts: { device: 'own-laptop' } },
      { id: 'shared-laptop', label: 'A laptop I share with family or friends', facts: { device: 'shared-laptop' } },
      { id: 'phone-only', label: 'A smartphone, and that is it', facts: { device: 'phone-only' } },
      { id: 'lab-or-cafe', label: 'The school lab, a hub, or a cyber café', facts: { device: 'lab-or-cafe' } },
    ],
  },
  {
    id: 'place',
    section: 'What you can commit to',
    prompt: 'Where can you actually be, for the next two years?',
    options: [
      { id: 'kigali', label: 'Kigali', facts: { place: 'kigali' } },
      { id: 'secondary-city', label: 'A secondary city', note: 'Musanze, Huye, Rubavu, Muhanga, Nyagatare…', facts: { place: 'secondary-city' } },
      { id: 'anywhere-rwanda', label: 'Anywhere in Rwanda, including rural districts', facts: { place: 'anywhere-rwanda' }, traits: { field: 1 } },
      { id: 'remote-abroad', label: 'Where I am, working remotely for clients elsewhere', facts: { place: 'remote-abroad' } },
    ],
  },
  {
    id: 'motives',
    section: 'What matters',
    prompt: 'What would make the work worth it?',
    help: 'Pick up to two.',
    maxChoices: 2,
    options: [
      { id: 'steady-income', label: 'Income I can plan a life around', facts: { motives: ['steady-income'] } },
      { id: 'build-my-own', label: 'Building something that is mine', facts: { motives: ['build-my-own'] }, traits: { persuade: 1 } },
      { id: 'serve-community', label: 'Being useful to my community', facts: { motives: ['serve-community'] }, traits: { care: 1 } },
      { id: 'keep-learning', label: 'Never running out of things to learn', facts: { motives: ['keep-learning'] }, traits: { analyse: 1 } },
      { id: 'respected-skill', label: 'Being the person others call because I am good at it', facts: { motives: ['respected-skill'] }, traits: { build: 1 } },
      { id: 'own-my-time', label: 'Control over my own time', facts: { motives: ['own-my-time'] } },
    ],
  },
  {
    id: 'risk',
    section: 'What matters',
    prompt: 'Five years from now, how are you earning?',
    options: [
      { id: 'salaried', label: 'A salary I can count on, from one employer', facts: { risk: 'salaried' } },
      { id: 'job-plus-side', label: 'A job, plus something of my own on the side', facts: { risk: 'job-plus-side' } },
      { id: 'own-thing', label: 'My own business, all the way', facts: { risk: 'own-thing' }, traits: { persuade: 2 } },
    ],
  },
];

export function emptyTraits(): TraitScores {
  return TRAITS.reduce((acc, trait) => {
    acc[trait] = 0;
    return acc;
  }, {} as TraitScores);
}

/** Questions to ask given the answers so far, in order. */
export function visibleQuestions(answers: Answers): InterviewQuestion[] {
  const asked: InterviewQuestion[] = [];
  let facts = emptyFacts();

  for (const question of INTERVIEW) {
    if (question.askWhen && !question.askWhen(facts)) continue;
    asked.push(question);
    // Fold this question's answer in before testing the next predicate, so a
    // change to an earlier answer immediately reshapes the rest of the interview.
    facts = applyAnswer(facts, question, answers[question.id] ?? []);
  }

  return asked;
}

export function emptyFacts(): InterviewFacts {
  return { motives: [] };
}

function applyAnswer(
  facts: InterviewFacts,
  question: InterviewQuestion,
  selected: string[],
): InterviewFacts {
  let next = facts;

  for (const optionId of selected) {
    const option = question.options.find((candidate) => candidate.id === optionId);
    if (!option?.facts) continue;

    const { motives, ...rest } = option.facts;
    next = {
      ...next,
      ...rest,
      motives: motives ? Array.from(new Set([...next.motives, ...motives])) : next.motives,
    };
  }

  return next;
}

/** Fold a complete (or partial) answer set into facts and trait scores. */
export function readAnswers(answers: Answers): { facts: InterviewFacts; traits: TraitScores } {
  let facts = emptyFacts();
  const traits = emptyTraits();

  for (const question of visibleQuestions(answers)) {
    const selected = answers[question.id] ?? [];
    facts = applyAnswer(facts, question, selected);

    for (const optionId of selected) {
      const option = question.options.find((candidate) => candidate.id === optionId);
      if (!option?.traits) continue;
      for (const [trait, weight] of Object.entries(option.traits)) {
        traits[trait as keyof TraitScores] += weight ?? 0;
      }
    }
  }

  return { facts, traits };
}

/** True once every visible question has an answer. */
export function isComplete(answers: Answers): boolean {
  return visibleQuestions(answers).every((question) => (answers[question.id] ?? []).length > 0);
}

/** The label a person picked, for quoting their own words back to them. */
export function labelFor(questionId: string, optionId: string): string | null {
  const question = INTERVIEW.find((candidate) => candidate.id === questionId);
  return question?.options.find((option) => option.id === optionId)?.label ?? null;
}
