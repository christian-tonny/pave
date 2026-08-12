import type { CareerPath } from './types';

/**
 * The Pave path catalogue.
 *
 * Twelve paths that exist in Rwanda today, each with more than one way in — a
 * degree, a polytechnic diploma, a short certified course, or learning on the job.
 * A path only belongs here if someone can start it this year and be paid for it.
 *
 * Pay figures are indicative monthly entry ranges in RWF, curated from public
 * information. They are a starting point for a conversation, not a quote.
 */
export const PATHS: CareerPath[] = [
  {
    id: 'software',
    title: 'Software and product engineering',
    tagline: 'Build the systems Rwandan institutions and businesses run on.',
    dayToDay:
      'You spend most of the day reading and writing code, breaking a problem into pieces small enough to solve, and testing whether what you built survives real users.',
    traits: { analyse: 3, build: 3, create: 1 },
    favouredTracks: ['mpc', 'mcb', 'tvet', 'meg'],
    needsComputer: true,
    fieldwork: false,
    places: ['kigali', 'secondary-city', 'remote-abroad', 'anywhere-rwanda'],
    motives: ['keep-learning', 'steady-income', 'respected-skill', 'build-my-own'],
    risk: ['salaried', 'job-plus-side', 'own-thing'],
    entryPay: { min: 300000, max: 900000 },
    routes: [
      {
        kind: 'degree',
        label: 'Computer science or software engineering degree',
        duration: '3–4 years',
        programmes: ['ur-software-engineering', 'alu-software-engineering', 'auca-it', 'ur-information-systems'],
        reality:
          'The widest door, and the one employers and scholarships recognise. It is also the slowest, and the degree alone will not get you hired — projects will.',
      },
      {
        kind: 'diploma',
        label: 'IT or networking diploma at a polytechnic',
        duration: '2 years',
        programmes: ['iprc-kigali-it', 'iprc-tumba-ict', 'rca-ict'],
        reality:
          'Cheaper, more practical, and taken seriously by Rwandan employers for junior roles. You can top it up with a degree later.',
      },
      {
        kind: 'short',
        label: 'Intensive software programme while you keep earning',
        duration: '6–12 months, part time',
        programmes: ['alx-software', 'klab-mentorship'],
        reality:
          'No degree required, but it demands a laptop, internet and roughly twenty hours a week. Most people who drop out do so because of the hours, not the difficulty.',
      },
      {
        kind: 'onjob',
        label: 'Self-taught, in public, with a community around you',
        duration: '9–18 months to first paid work',
        programmes: ['klab-mentorship', 'alx-software'],
        reality:
          'Free, and the hardest route to finish alone. Only viable if you show up somewhere like kLab weekly and build things people can see.',
      },
    ],
    opportunities: ['irembo', 'bk-techouse', 'awesomity', 'klab-community', 'job-in-rwanda', 'upwork', 'andela'],
    nextSteps: {
      studying: [
        'Confirm which combination and marks the programme needs, then work backwards to what you must pass.',
        'Start one small project now — a website for a family business, an app for your class — and finish it.',
        'Check the BRD student loan and Mastercard Foundation deadlines before you choose between a public and private place.',
        'Visit kLab on a weekday. Ask what juniors are getting hired to do this year.',
      ],
      working: [
        'Pick one language and stay with it for six months. Switching is what stalls people.',
        'Put three finished projects online where a hiring manager can click them.',
        'Apply to two internships or junior roles a week, and keep a record of what each advert asked for.',
        'Find one person already doing the job and ask them to review your code once a month.',
      ],
    },
  },
  {
    id: 'data',
    title: 'Data and analysis',
    tagline: 'Turn Rwandan data into decisions banks, ministries and NGOs act on.',
    dayToDay:
      'You clean messy data, look for what it actually says, and explain the answer to people who will make a decision with it. Half the skill is the explaining.',
    traits: { analyse: 4, organise: 2, teach: 1 },
    favouredTracks: ['mpc', 'meg', 'mcb'],
    needsComputer: true,
    fieldwork: false,
    places: ['kigali', 'secondary-city', 'remote-abroad'],
    motives: ['keep-learning', 'steady-income', 'respected-skill'],
    risk: ['salaried', 'job-plus-side'],
    entryPay: { min: 300000, max: 750000 },
    routes: [
      {
        kind: 'degree',
        label: 'Statistics, economics or information systems degree',
        duration: '4 years',
        programmes: ['ur-applied-statistics', 'ur-information-systems', 'kepler-management'],
        reality:
          'Statistics is the most direct degree, and the least crowded. Banks, RSSB, NISR and the big NGOs recruit from it every year.',
      },
      {
        kind: 'short',
        label: 'Data analytics programme plus real datasets',
        duration: '4–6 months, part time',
        programmes: ['alx-data'],
        reality:
          'Works if you can commit evenings and have laptop access. Pair it with NISR open data so your practice is about Rwanda, not a tutorial city.',
      },
      {
        kind: 'onjob',
        label: 'Analyst work inside a job you already have',
        duration: '6–12 months',
        programmes: ['alx-data'],
        reality:
          'If you already handle records, sales or M&E data, ask for the reporting work. That is the analyst job, before the title.',
      },
    ],
    opportunities: ['nisr', 'bank-of-kigali', 'rssb', 'risa', 'job-in-rwanda', 'mifotra-recruitment'],
    nextSteps: {
      studying: [
        'Take maths seriously this term — it is the actual entry requirement, whatever the brochure says.',
        'Download one dataset from statistics.gov.rw and write a one-page finding from it.',
        'Ask two people working as analysts what tools they use daily, then learn only those.',
        'Check whether your target programme is at Huye or Gikondo before you plan where to live.',
      ],
      working: [
        'Learn spreadsheets to a professional level first. Most Rwandan analyst work still runs on them.',
        'Add SQL next, then one of Python or R — in that order, not all at once.',
        'Publish two short analyses of public Rwandan data with a chart and a recommendation.',
        'Apply for M&E and reporting roles as well as analyst roles — same skills, less competition.',
      ],
    },
  },
  {
    id: 'health',
    title: 'Nursing and clinical care',
    tagline: 'Be the person on shift when someone in your district needs help.',
    dayToDay:
      'You assess, treat and reassure people, keep careful records, and work in a team on a rota. It is physical, it is emotional, and it is needed everywhere.',
    traits: { care: 4, analyse: 2, organise: 1 },
    favouredTracks: ['pcb', 'mcb', 'tvet'],
    needsComputer: false,
    fieldwork: false,
    places: ['kigali', 'secondary-city', 'anywhere-rwanda'],
    motives: ['serve-community', 'steady-income', 'respected-skill'],
    risk: ['salaried'],
    entryPay: { min: 180000, max: 450000 },
    routes: [
      {
        kind: 'degree',
        label: 'Nursing, midwifery or medicine degree',
        duration: '4–6 years',
        programmes: ['ur-nursing', 'ur-medicine', 'auca-public-health'],
        reality:
          'PCB or MCB makes entry straightforward. Sponsorship exists, competition is real, and placements will send you outside Kigali.',
      },
      {
        kind: 'diploma',
        label: 'Nursing and midwifery diploma',
        duration: '3 years',
        programmes: ['kibogora-nursing'],
        reality:
          'A shorter, cheaper route into registered practice, often outside Kigali. You can upgrade to a BSc while working.',
      },
      {
        kind: 'short',
        label: 'Certified care and community health training',
        duration: '3–9 months',
        programmes: ['rtb-community-health'],
        reality:
          'The fastest legitimate entry into paid care work, and a way to test whether the work suits you before committing years to it.',
      },
    ],
    opportunities: ['rbc', 'chuk', 'king-faisal', 'partners-in-health', 'health-centre-community', 'mifotra-recruitment'],
    nextSteps: {
      studying: [
        'Keep biology and chemistry strong — they are the gate, not a preference.',
        'Volunteer at your health centre for one month. It will tell you honestly whether this is your work.',
        'Ask a nurse you know what the night shift is actually like before you decide.',
        'Confirm the sponsorship and bursary route for health programmes early — deadlines are strict.',
      ],
      working: [
        'Confirm your registration status with the professional council before applying anywhere.',
        'Apply to district hospitals and health centres, not only to Kigali referral hospitals.',
        'Take one certified specialisation — theatre, neonatal, mental health — within two years.',
        'Watch the MIFOTRA portal weekly. Public health posts open in batches and close fast.',
      ],
    },
  },
  {
    id: 'teaching',
    title: 'Teaching',
    tagline: 'Be the reason a subject finally makes sense to someone.',
    dayToDay:
      'You plan lessons, stand in front of a class, mark, and slowly get better at reading when a room has stopped following you.',
    traits: { teach: 4, care: 2, organise: 2 },
    favouredTracks: ['lang', 'heg', 'mcb', 'mpc', 'meg'],
    needsComputer: false,
    fieldwork: false,
    places: ['kigali', 'secondary-city', 'anywhere-rwanda'],
    motives: ['serve-community', 'steady-income', 'respected-skill'],
    risk: ['salaried', 'job-plus-side'],
    entryPay: { min: 120000, max: 350000 },
    routes: [
      {
        kind: 'degree',
        label: 'Bachelor of Education in your subject',
        duration: '3–4 years',
        programmes: ['ur-education', 'mkur-education'],
        reality:
          'Education degrees carry more government sponsorship than any other field, and a subject specialism gets you into secondary and private schools.',
      },
      {
        kind: 'diploma',
        label: 'Teacher Training College, after S3',
        duration: '3 years',
        programmes: ['ttc-primary'],
        reality:
          'Boarding, low cost, and it leads to a posting. The trade-off is that you commit to teaching early.',
      },
      {
        kind: 'onjob',
        label: 'Start tutoring and assisting, qualify while you work',
        duration: 'Start this month',
        programmes: ['mkur-education'],
        reality:
          'Private schools hire assistants and contract teachers without a full degree. Weekend programmes let you qualify while earning.',
      },
    ],
    opportunities: ['reb-teaching', 'private-schools', 'tutoring-start', 'mifotra-recruitment'],
    nextSteps: {
      studying: [
        'Choose the subject you would still want to explain on a bad day.',
        'Start tutoring two students now, for money. It is the same skill, tested early.',
        'Ask about government sponsorship for education programmes — it is more available than most people assume.',
        'Find out which TTC or campus serves your district, and visit it.',
      ],
      working: [
        'Register with your district education office and ask to be considered for contract cover.',
        'Apply to private schools directly and mid-year — they hire off-cycle when public schools do not.',
        'Build one folder of lesson plans and student results you can show in an interview.',
        'Add a second teachable subject. It roughly doubles the posts you qualify for.',
      ],
    },
  },
  {
    id: 'built',
    title: 'Construction and the built environment',
    tagline: 'Put up the roads, buildings and land records the country is still building.',
    dayToDay:
      'You are on site or between sites — setting out, checking work against drawings, managing materials and people, and solving what the drawing did not anticipate.',
    traits: { build: 4, field: 3, organise: 2, analyse: 1 },
    favouredTracks: ['mpc', 'tvet', 'mcb'],
    needsComputer: false,
    fieldwork: true,
    places: ['kigali', 'secondary-city', 'anywhere-rwanda'],
    motives: ['respected-skill', 'steady-income', 'build-my-own'],
    risk: ['salaried', 'job-plus-side', 'own-thing'],
    entryPay: { min: 200000, max: 550000 },
    routes: [
      {
        kind: 'degree',
        label: 'Civil engineering or land surveying degree',
        duration: '4 years',
        programmes: ['ur-civil-engineering', 'ines-land-surveying'],
        reality:
          'Needed to sign off work professionally and to reach project management. Surveying is less crowded than civil engineering and in constant demand.',
      },
      {
        kind: 'diploma',
        label: 'Construction technology diploma',
        duration: '2 years',
        programmes: ['iprc-kigali-construction'],
        reality:
          'Site-ready in two years, and contractors hire diplomas directly. You can top up to a degree part time later.',
      },
      {
        kind: 'short',
        label: 'Certified trade — masonry, plumbing, tiling, carpentry',
        duration: '3–12 months',
        programmes: ['rtb-construction-trades'],
        reality:
          'The quickest route to earning, and with your own tools it becomes a business. Certification is what separates you from casual labour.',
      },
    ],
    opportunities: ['rtda', 'local-contractor', 'district-one-stop', 'ier', 'job-in-rwanda'],
    nextSteps: {
      studying: [
        'Physics and maths are the gate for the degree route — protect those marks.',
        'Spend one school holiday on a real site, even carrying materials. You will learn what the job is.',
        'Compare the IPRC diploma and the UR degree side by side on cost and years before deciding.',
        'Ask a site engineer what they wish they had learned earlier.',
      ],
      working: [
        'Get your trade or technician certification recognised through an RTB centre.',
        'Introduce yourself to three contractors working in your district, in person.',
        'Register with the Institution of Engineers Rwanda if you hold an engineering qualification.',
        'Photograph every job you finish. On this path, photos are your CV.',
      ],
    },
  },
  {
    id: 'agri',
    title: 'Agribusiness and food systems',
    tagline: 'Make Rwandan farming pay better — as an agronomist, a processor or a trader.',
    dayToDay:
      'You are in fields, cooperatives, cold rooms and markets: advising farmers, fixing what spoils between harvest and sale, and keeping records that let a business grow.',
    traits: { field: 4, build: 2, organise: 2, analyse: 2 },
    favouredTracks: ['mcb', 'pcb', 'meg', 'tvet'],
    needsComputer: false,
    fieldwork: true,
    places: ['anywhere-rwanda', 'secondary-city', 'kigali'],
    motives: ['serve-community', 'build-my-own', 'steady-income'],
    risk: ['salaried', 'job-plus-side', 'own-thing'],
    entryPay: { min: 150000, max: 450000 },
    routes: [
      {
        kind: 'degree',
        label: 'Agriculture, conservation agriculture or food science degree',
        duration: '3–4 years',
        programmes: ['rica-agriculture', 'ur-agriculture'],
        reality:
          'RICA is residential and unusually hands-on; UR CAVM is the traditional route. Both put you in the field, not behind a desk.',
      },
      {
        kind: 'diploma',
        label: 'Food processing or agri-technology diploma',
        duration: '2 years',
        programmes: ['iprc-agri-food'],
        reality:
          'Processing is where the margin is. Diplomas here lead into factories and cooperatives that are hiring now.',
      },
      {
        kind: 'short',
        label: 'Certified short course plus one season of real production',
        duration: '3–6 months',
        programmes: ['rtb-agribusiness'],
        reality:
          'Cheap and fast, and it pairs with land you or your family already have. One season of records is worth more than a certificate alone.',
      },
    ],
    opportunities: ['one-acre-fund', 'rab', 'africa-improved-foods', 'cooperative-attachment', 'bdf', 'job-in-rwanda'],
    nextSteps: {
      studying: [
        'Visit a working cooperative and ask what they lose between harvest and sale.',
        'Grow or raise something small and keep written records of every cost.',
        'Ask RICA and UR CAVM directly about scholarships and residence before applying.',
        'Learn to drive a motorbike or bicycle route across your district — field jobs assume mobility.',
      ],
      working: [
        'Apply to One Acre Fund and district extension roles — both hire field officers continuously.',
        'Pick one crop or product and learn its whole chain, from input to buyer.',
        'Talk to BDF about what a guarantee or grant would require of you before you need it.',
        'Keep one season of clean records. It is what turns farming into a business anyone will finance.',
      ],
    },
  },
  {
    id: 'finance',
    title: 'Accounting and finance',
    tagline: 'Be the person who knows where the money went, and what it should do next.',
    dayToDay:
      'You reconcile, report and check. It is careful, deadline-driven work, and it makes you useful to every organisation that exists.',
    traits: { analyse: 3, organise: 4 },
    favouredTracks: ['meg', 'mpc', 'heg', 'tvet'],
    needsComputer: true,
    fieldwork: false,
    places: ['kigali', 'secondary-city', 'anywhere-rwanda'],
    motives: ['steady-income', 'respected-skill', 'keep-learning'],
    risk: ['salaried', 'job-plus-side'],
    entryPay: { min: 200000, max: 550000 },
    routes: [
      {
        kind: 'degree',
        label: 'Accounting, finance or business degree',
        duration: '4 years',
        programmes: ['ur-accounting', 'uok-business', 'kepler-management'],
        reality:
          'The standard route, and evening intakes make it possible while working. Banks and audit firms recruit from it annually.',
      },
      {
        kind: 'onjob',
        label: 'CPA Rwanda, exam by exam, while you work',
        duration: '2–4 years',
        programmes: ['icpar-cpa'],
        reality:
          'The qualification employers actually pay for. You can start as a bookkeeper and be a certified accountant without a full degree.',
      },
      {
        kind: 'short',
        label: 'Bookkeeping and business records for small businesses',
        duration: '3 months',
        programmes: ['icpar-cpa'],
        reality:
          'Small businesses and SACCOs need clean books and rarely have them. It is a real first rung, and it pays from month one.',
      },
    ],
    opportunities: ['rra', 'audit-firms', 'bank-of-kigali', 'sacco-bookkeeping', 'job-in-rwanda', 'mifotra-recruitment'],
    nextSteps: {
      studying: [
        'Get comfortable with spreadsheets now. It is the single most transferable skill on this path.',
        'Keep the books for a family business or a school club for one term.',
        'Compare evening programmes at UoK and UR if you need to earn while studying.',
        'Read what iCPAR requires — you can begin before you graduate.',
      ],
      working: [
        'Register with iCPAR and sit your first paper. Momentum matters more than speed here.',
        'Apply to audit firm trainee intakes — they pay for your study and accelerate everything.',
        'Offer bookkeeping to two small businesses in your neighbourhood, for a fee, this month.',
        'Learn one accounting package properly, and say so on your CV.',
      ],
    },
  },
  {
    id: 'design',
    title: 'Design and digital media',
    tagline: 'Make the things people see — and get paid for craft, not just taste.',
    dayToDay:
      'You take a brief, make something, and defend the choices you made. Client work is half the craft and half the conversation.',
    traits: { create: 4, persuade: 2, build: 1 },
    favouredTracks: ['lang', 'heg', 'tvet', 'unsure'],
    needsComputer: true,
    fieldwork: false,
    places: ['kigali', 'remote-abroad', 'secondary-city'],
    motives: ['build-my-own', 'own-my-time', 'keep-learning', 'respected-skill'],
    risk: ['job-plus-side', 'own-thing', 'salaried'],
    entryPay: { min: 150000, max: 500000 },
    routes: [
      {
        kind: 'diploma',
        label: 'Creative arts or multimedia diploma',
        duration: '2 years',
        programmes: ['iprc-creative-arts'],
        reality:
          'Gives you structure, equipment and a cohort. What you leave with that matters is the portfolio, not the paper.',
      },
      {
        kind: 'short',
        label: 'Short course plus paid client work from week one',
        duration: '3–6 months',
        programmes: ['rtb-design-short'],
        reality:
          'The most common real route. Charge from your third piece of work, even if the price is small.',
      },
      {
        kind: 'onjob',
        label: 'Apprentice yourself to a studio',
        duration: '6–12 months',
        programmes: ['rtb-design-short'],
        reality:
          'Studios in Kigali take on juniors who can already do one thing well. Pick one — posters, video, brand, product — before you knock on doors.',
      },
      {
        kind: 'degree',
        label: 'A degree that pairs creative work with business',
        duration: '3–4 years',
        programmes: ['alu-entrepreneurial-leadership'],
        reality:
          'Worth it if you want to run a studio rather than work in one. Not required to start earning.',
      },
    ],
    opportunities: ['creative-studios', 'media-houses', 'moshions', 'imagine-we', 'upwork'],
    nextSteps: {
      studying: [
        'Make one finished piece a week and publish it publicly. Twelve weeks is a portfolio.',
        'Redesign something real and badly made near you, then explain why yours is better.',
        'Offer to do posters and social media for a school event or church — free, once, for the portfolio.',
        'Learn one tool deeply rather than four badly.',
      ],
      working: [
        'Put ten pieces online with the brief and the outcome beside each one.',
        'Set a price and say it out loud. Underpricing is the main reason designers quit.',
        'Approach three studios with work that matches what they already do.',
        'Take one remote client through Upwork to learn how international briefs work.',
      ],
    },
  },
  {
    id: 'tourism',
    title: 'Tourism, hospitality and conservation',
    tagline: 'Work where Rwanda meets its visitors — hotels, parks and guiding.',
    dayToDay:
      'You look after guests or land, in a team on shifts. Languages, patience and presence carry you further than qualifications.',
    traits: { persuade: 2, care: 2, field: 3, organise: 2 },
    favouredTracks: ['lang', 'heg', 'tvet', 'mcb'],
    needsComputer: false,
    fieldwork: true,
    places: ['kigali', 'secondary-city', 'anywhere-rwanda'],
    motives: ['serve-community', 'keep-learning', 'steady-income', 'own-my-time'],
    risk: ['salaried', 'job-plus-side', 'own-thing'],
    entryPay: { min: 120000, max: 400000 },
    routes: [
      {
        kind: 'diploma',
        label: 'Hospitality management or conservation diploma',
        duration: '2 years',
        programmes: ['iprc-hospitality', 'iprc-kitabi-conservation'],
        reality:
          'IPRC Kitabi sits beside Nyungwe and is the most direct route into park work. Hospitality diplomas lead into supervisory roles faster than starting on the floor.',
      },
      {
        kind: 'short',
        label: 'Certified short course, then start on the floor',
        duration: '3–6 months',
        programmes: ['rtb-hospitality-short'],
        reality:
          'Hotels hire on attitude and language and promote from inside. Certification gets you the interview.',
      },
      {
        kind: 'onjob',
        label: 'Start in a lodge or restaurant and add languages',
        duration: 'Start this season',
        programmes: ['rtb-hospitality-short'],
        reality:
          'The industry genuinely promotes people who show up and learn French, English or Swahili properly.',
      },
    ],
    opportunities: ['hotels-lodges', 'rdb-tourism', 'african-parks', 'job-in-rwanda'],
    nextSteps: {
      studying: [
        'Push your English and French now. Language is the main thing that separates candidates here.',
        'Work one holiday season in a hotel or lodge, in any role.',
        'Visit a national park and talk to a guide about how they got certified.',
        'Look at IPRC Kitabi if conservation is what draws you rather than hotels.',
      ],
      working: [
        'Apply to lodges in Musanze, Rubavu, Karongi and Kayonza, not only Kigali hotels.',
        'Ask RDB what current guide certification requires.',
        'Add a third language and put your level honestly on your CV.',
        'Start on the floor if you must — this industry promotes visibly reliable people.',
      ],
    },
  },
  {
    id: 'energy',
    title: 'Energy, electrical and technical trades',
    tagline: 'Install and keep running the power, solar and machines the country depends on.',
    dayToDay:
      'You diagnose, install, maintain and repair — in workshops, on poles, on roofs and in customers’ homes. When it works, it is because of you.',
    traits: { build: 4, analyse: 2, field: 3 },
    favouredTracks: ['mpc', 'tvet', 'pcb'],
    needsComputer: false,
    fieldwork: true,
    places: ['anywhere-rwanda', 'secondary-city', 'kigali'],
    motives: ['respected-skill', 'steady-income', 'build-my-own'],
    risk: ['salaried', 'job-plus-side', 'own-thing'],
    entryPay: { min: 150000, max: 450000 },
    routes: [
      {
        kind: 'diploma',
        label: 'Renewable energy, electrical or electronics diploma',
        duration: '2 years',
        programmes: ['iprc-tumba-renewable', 'iprc-tumba-ict'],
        reality:
          'IPRC Tumba is the strongest technical intake outside Kigali, and off-grid solar is where rural electrification money is going.',
      },
      {
        kind: 'short',
        label: 'Certified electrical installation or solar PV training',
        duration: '3–12 months',
        programmes: ['rtb-electrical-trades'],
        reality:
          'Licensed installers get contracts; uncertified ones get day labour. This is the cheapest route to a real trade.',
      },
      {
        kind: 'degree',
        label: 'Electrical and electronics engineering degree',
        duration: '4 years',
        programmes: ['ur-electrical-engineering'],
        reality:
          'Needed for design and project roles at REG and large contractors, not for installation work.',
      },
    ],
    opportunities: ['reg', 'off-grid-solar', 'ampersand', 'telecom-operators', 'local-contractor', 'job-in-rwanda'],
    nextSteps: {
      studying: [
        'Physics matters here, but hands matter more — find someone to shadow on real installations.',
        'Get certified through an RTB centre before buying tools.',
        'Ask an installer in your district what they get called out for most.',
        'Look at IPRC Tumba specifically if renewable energy is the draw.',
      ],
      working: [
        'Confirm your certification is RTQF recognised — contracts ask for it.',
        'Apply to off-grid solar companies running district agent and installer networks.',
        'Buy your core tools deliberately, one at a time, as jobs pay for them.',
        'Learn battery and inverter systems. That is where the new work is.',
      ],
    },
  },
  {
    id: 'public',
    title: 'Public service, law and governance',
    tagline: 'Work inside the institutions that decide how things run.',
    dayToDay:
      'You read, write, argue and administer — files, cases, plans and meetings. Precision and patience are the whole job.',
    traits: { persuade: 3, organise: 3, analyse: 2, teach: 1 },
    favouredTracks: ['heg', 'lang', 'meg'],
    needsComputer: true,
    fieldwork: false,
    places: ['kigali', 'secondary-city', 'anywhere-rwanda'],
    motives: ['serve-community', 'respected-skill', 'steady-income'],
    risk: ['salaried'],
    entryPay: { min: 250000, max: 650000 },
    routes: [
      {
        kind: 'degree',
        label: 'Law, public administration or economics degree',
        duration: '4 years',
        programmes: ['ur-law', 'ulk-public-admin', 'kepler-management'],
        reality:
          'A degree is the entry requirement for almost every public post. Law also requires ILPD in Nyanza before you can practise.',
      },
      {
        kind: 'onjob',
        label: 'Start in district administration and qualify further',
        duration: '1–3 years',
        programmes: ['ulk-public-admin'],
        reality:
          'District posts are less contested than Kigali ones, and evening programmes let you add the qualification while employed.',
      },
    ],
    opportunities: ['district-administration', 'mifotra-recruitment', 'ilpd', 'rwanda-bar', 'rra'],
    nextSteps: {
      studying: [
        'Write more than you are asked to. This path is decided by how clearly you write.',
        'Follow one real policy or case in the news for a month and form your own view.',
        'Understand the ILPD step before choosing law — the LLB alone is not enough to practise.',
        'Join debate or moot court if your school has it. If not, start one.',
      ],
      working: [
        'Set a weekly reminder for the MIFOTRA portal. Public posts close on strict dates.',
        'Apply to district posts as well as Kigali ones — they open more often and promote faster.',
        'If you hold an LLB, secure pupillage with a supervising advocate now.',
        'Keep a folder of documents you have drafted. Public service interviews test written work.',
      ],
    },
  },
  {
    id: 'venture',
    title: 'Running your own thing',
    tagline: 'Build a business — a trade, a shop, a service — that pays you and others.',
    dayToDay:
      'You sell, deliver, count and fix, all week. Nobody sets your hours, which is the best and the worst of it.',
    traits: { persuade: 4, organise: 3, build: 1, create: 1 },
    favouredTracks: ['meg', 'heg', 'tvet', 'unsure'],
    needsComputer: false,
    fieldwork: true,
    places: ['kigali', 'secondary-city', 'anywhere-rwanda', 'remote-abroad'],
    motives: ['build-my-own', 'own-my-time', 'serve-community'],
    risk: ['own-thing', 'job-plus-side'],
    entryPay: null,
    routes: [
      {
        kind: 'short',
        label: 'Learn a trade or skill you can sell, then sell it',
        duration: '3–6 months',
        programmes: ['rtb-construction-trades', 'rtb-design-short', 'rtb-agribusiness'],
        reality:
          'The most reliable version of this path: a certified skill, your own tools, and customers you find yourself.',
      },
      {
        kind: 'onjob',
        label: 'Work in the business you eventually want to run',
        duration: '1–2 years',
        programmes: ['klab-mentorship'],
        reality:
          'Learning someone else’s trade on their payroll is the cheapest business education there is.',
      },
      {
        kind: 'degree',
        label: 'Business or entrepreneurial leadership degree',
        duration: '3–4 years',
        programmes: ['alu-entrepreneurial-leadership', 'uok-business'],
        reality:
          'Useful for networks and for financing conversations. It will not, by itself, produce customers.',
      },
    ],
    opportunities: ['bdf', 'inkomoko', 'norrsken', 'youthconnekt', 'sacco-bookkeeping'],
    nextSteps: {
      studying: [
        'Sell something small this month — anything — and write down what you learned.',
        'Find one business owner who will let you help on Saturdays.',
        'Register nothing and borrow nothing until you have paying customers.',
        'Keep every cost in a notebook. Records are what make you fundable later.',
      ],
      working: [
        'Find your first ten paying customers before you spend anything on branding.',
        'Separate business money from personal money from day one, even with mobile money.',
        'Talk to Inkomoko or BDF about advisory before you need a loan.',
        'Go to public events at Norrsken House or kLab monthly. Most opportunities come through people.',
      ],
    },
  },
];

const BY_ID = new Map(PATHS.map((path) => [path.id, path]));

export function pathById(id: string): CareerPath | undefined {
  return BY_ID.get(id);
}
