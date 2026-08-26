/* ------------------------------------------------------------------
   UI strings + page copy — both locales, nested per section.
   Copy is governed by reference/positioning-canon.md and
   reference/narrative-map.md (2026-08-21 repositioning — supersedes the
   old "verbatim from homepage-copy v2" lock). Every string must justify
   itself against the canon; EN and ES are siblings, not translations.
   ------------------------------------------------------------------ */

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const en = {
  meta: {
    title: 'Aníbal Rojas · AI-assisted development, elevating the team and the codebase',
    description:
      'I help engineering organizations adopt AI-assisted development, elevating the team and the codebase. Talks, fractional VP of Engineering, executive coaching.',
  },
  a11y: {
    skip: 'Skip to content',
    language: 'Language',
    nav: 'Navigation',
    elsewhere: 'Elsewhere',
  },
  nav: {
    home: { label: 'home', href: '/' },
    ideas: { label: 'ideas', href: '/ideas/' },
    about: { label: 'about', href: '/about/' },
    contact: { label: 'contact', href: '/contact/' },
  },
  cta: {
    // CTA verb law (audit ruling D2): "conversation" verbs lead to the contact
    // room; "book" verbs belong to the calendar itself. Every solid button on
    // the site starts the conversation (the room reassures, then books) —
    // only the contact page, where booking actually happens, uses `book`.
    book: 'Book a conversation',
    bookHref: 'https://calendar.app.google/WXerTvr5UeuuVwDc8',
    start: 'Start the conversation',
    startHref: '/contact/',
    // mobile header only — a rewrite for the narrow register, not a truncation
    compact: "Let's talk",
  },
  hero: {
    eyebrow: 'anibal rojas · engineering leadership · medellín, colombia',
    title:
      'I help <span class="callout-target">engineering</span> organizations adopt <span class="nowrap">AI-assisted</span> development, <em>elevating the team and the codebase</em>',
    lede: 'Generative AI is rewriting the SDLC end to end. Most companies are responding with tool licenses and hype. The hard part is changing how engineers and leaders think and collaborate, and that is where transformations quietly die. It can\'t be delivered; <em class="facilitated">it has to be facilitated</em>. That\'s <a href="#services">the part I do</a>.',
    callout: "even if engineering isn't at your core, we may still fit.*",
    // the asterisk footnote: the gate for the non-software-core segment —
    // qualify the claim, then leave the door ajar toward the contact room
    calloutNote:
      'whether we fit depends on your culture, and on how your leadership understands technology right now. If that\'s you, <a href="/contact/">start the conversation →</a>',
    // mobile: note + footnote unified into one plain paragraph BELOW the CTAs
    // (a caption, not a gate) — no handwriting, but the soft door to the
    // contact room stays live, mirroring the desktop footnote (ruling D1/P3)
    calloutCompact:
      'Even if engineering isn\'t at your core, we may still fit: it depends on your culture, and on how your leadership understands technology right now. To find out if this is you, <a href="/contact/">start the conversation</a>.',
    secondary: 'How we can work together',
  },
  thesis: {
    title: 'The problem is still aligning people, technology, and the business. It just got more complex.',
    p1: "Software is knowledge work: humans making decisions together inside a complex system. AI multiplies how fast code gets written; it does not multiply how well an organization decides, coordinates, and learns. Inject AI into every stage of the SDLC and the bottleneck doesn't disappear; it moves: to judgment, to trust, to how teams actually work.",
    bridge:
      'AI produces <strong>outputs</strong> (code, documents, artifacts), and making them consistently good is a discipline in its own right. But an output is not an <strong>outcome</strong>: nothing changes until people turn what AI produces into better decisions, better delivery, new capability. Connecting the two is human, organizational work, <a href="#services">the work I do</a>, and it has a destination: AI at the core of your workforce, woven into how people actually work, not bolted on as a sidebar to how we\'ve been working for the last decade.',
    p2: "That's why I approach every engagement through three lenses I've spent my career sharpening: <strong>systems thinking</strong>, <strong>building high-performance teams</strong>, and <strong>knowledge management</strong>.",
  },
  who: {
    eyebrow: 'whoami',
    portraitLabel: 'Aníbal Rojas',
    paragraphs: [
      "I'm Aníbal Rojas. I've spent 30+ years building and leading software organizations: telecom, oil & gas, aviation, and startups. For six years I was VP of Engineering at Platzi, Latin America's leading tech education company, where I built and scaled high-performance teams and helped hundreds of people grow into engineers and leaders.",
      'Then I took a sabbatical year and did something unusual for an executive: I went back to the code. I spent that year hands-deep in AI-assisted development (agentic systems, coding assistants, their real limits and possibilities) and reached an uncomfortable conclusion: models, harnesses, skills, and plugins evolve too fast for any playbook to survive. The only durable way to work with these tools is <strong>from first principles</strong>. That\'s what my <a href="/2025/10/20/hallucination-is-the-fundamental-feature-of-llms/"><em>Fundamental Principles</em></a> series proposes, written from the terminal, not from a conference stage.',
      'That combination is what I offer: an executive who has run engineering at scale, and an <strong>AI practitioner</strong> who knows exactly what these tools do when a system is collapsing non-linearly trying to scale.',
      'My whole story is a bit more complicated. You can <a href="/about/">read it in full →</a>',
    ],
  },
  services: {
    eyebrow: 'services',
    intro: {
      statement: 'I used to promote myself as a <s>consultant</s>. But no: no analysis, no reports, no slides.',
      verbs: 'I facilitate, coach, mentor, and train, at different levels, with different intentions.',
      // draft — pending Aníbal's review (annotation 18: what facilitation means here)
      facilitation:
        'Facilitation means your people build the answers, in the room. I design and run the conversations where that happens, and what comes out of them holds after I leave.',
    },
    items: [
      {
        num: '01',
        title: 'Talks',
        // draft — pending Aníbal's review (annotation 19: Diagnostic → Talks)
        text: 'Keynotes and hands-on workshops for leadership teams, engineering organizations, and communities. A provocation grounded in practice: what generative AI actually is, and what it changes about how your organization builds software.',
      },
      {
        num: '02',
        title: 'Advisory & Fractional VP of Engineering',
        text: 'Embedded senior leadership on a monthly retainer: facilitation from inside your operating rhythm. Working with your CTO, your leaders, and your teams to install the new way of working: adoption strategy, engineering processes, team structure, and the honest conversations in between. Then I fade.',
      },
      {
        num: '03',
        title: 'Executive coaching',
        text: 'One-on-one work with CTOs, VPs, and Directors navigating this transition, or their own: a confidential thinking partner, not another report. Engagements run 3–6 months.',
      },
    ],
    // who I am is what justifies offering three different services — in his
    // voice, not a label; the long version lives on /about/
    aboutHtml:
      'I can talk system design, management principles, or existential philosophy; I understand the ongoing identity crisis of knowledge workers, and all the friction inside organizations. I\'m not an elevated being: I\'ve just had a lot of different experiences in my career, and you can read them in <a href="/about/">about/</a>',
    after: 'Not sure which fits? Start with a conversation.',
  },
  ideas: {
    eyebrow: 'ideas',
    intro: 'I write about AI-assisted development, engineering leadership, systems thinking, and the messy human reality between them.',
    spanishNote: '',
    essayTag: 'essay',
    podcast: {
      tag: 'podcast',
      title: 'O corres o te encaramas',
      href: 'https://ocorres.com',
      thumbLabel: 'Episode artwork from O corres o te encaramas',
      teaser:
        'The podcast (in Spanish) on the impact of Generative AI on software development. Live every Monday at 7 PM COT.',
    },
    indexLink: {
      label: 'the index → /ideas/',
      href: '/ideas/',
    },
    linkedin: {
      label: 'you can also read my articles on LinkedIn ↗',
      href: 'https://www.linkedin.com/in/anibalrojas/recent-activity/articles/',
    },
  },
  ideasPage: {
    meta: {
      title: 'Ideas · Aníbal Rojas',
      description:
        'Writing on AI-assisted development, engineering leadership, systems thinking, and the messy human reality between them.',
    },
    eyebrow: 'ideas',
    heading: 'Ideas',
    minuteRead: 'min read',
    empty: {
      title: 'Nothing indexed yet',
      text: "New essays land here as they're written: not on a schedule, when they're ready.",
      subscribeLabel: 'subscribe → substack',
    },
  },
  post: {
    minuteRead: 'min read',
    alsoIn: 'también en español',
    originally: 'Originally published at',
  },
  principles: {
    eyebrow: 'the goal',
    // the Clarke line is a real quotation now — intro, quote card, explanation
    aburrida: {
      hook: 'I help you turn AI into a boring technology because:',
      quote: 'Any sufficiently advanced technology is indistinguishable from magic.',
      cite: 'Arthur C. Clarke',
      text: 'And <strong>the problem with magic is that it happens to us</strong>, <em>but we cannot manage it</em>. When we approach these technologies from first principles, the magic disappears, and then the real work can start.',
    },
    credoTitle: 'working principles',
    credo: {
      belief:
        'I believe that everyone must learn what Generative AI is: what an LLM is, an agent, a harness, how they work and how they relate to one another.',
      why: 'Because there is no future in which Generative AI is not the fundamental tool of knowledge workers.',
      // the skeptic gets a voice — the credo reads as a dialog
      counter:
        "But Aníbal! Computers have been the fundamental tool of knowledge workers for decades, and most people don't know how they work!",
      rebuttal:
        'Yes, but Generative AI is a fundamentally statistical, probabilistic, stochastic technology, designed to generate engagement by <strong>simulating a human-like intelligence on the other side of the prompt</strong>.',
      consequence:
        'And when our teams approach Generative AI from the idea that it is a human-like intelligence, it is very hard to get useful, quality results consistently.',
      closing: 'We can all learn. We all need to learn.',
    },
    mythsEyebrow: 'the recurring core problem',
    mythsTitle: "Everything your team believes about Generative AI that isn't true",
    mythsIntro:
      'And we are talking about a technology designed to create <strong>the illusion that all of this is true</strong>, with the side effect of:',
    myths: [
      {
        num: '01',
        text: 'That they are a database, a repository of facts.',
      },
      {
        num: '02',
        text: 'That this database contains <strong>all</strong> of human knowledge.',
      },
      {
        num: '03',
        text: 'That they are neutral, and that all knowledge carries the same "weight".',
      },
      {
        num: '04',
        text: 'That they operate in logical/symbolic terms.',
      },
      { num: '05', text: 'That they reason.' },
      {
        num: '06',
        text: 'That they learn as we use them.',
      },
      {
        num: '07',
        text: 'That the more information we give them, the better they perform.',
      },
    ],
    sideEffectsTitle: 'Side effects',
    sideEffects: [
      'Falling asleep at the wheel: enter, enter, enter, …',
      'Switching off critical thinking',
      'Becoming forwarders',
      'Creating an asymmetrical workload for human verification',
    ],
    mythsClosing:
      'And none of this helps create value: it produces activity. Activity is not quality outputs, and outputs, on their own, are not outcomes.',
    // The full five-essay series, migrated + translated (2026-08): EN pages
    // link the English translations; the Spanish originals live at their
    // original archive URLs.
    articles: [
      {
        num: '01',
        date: 'oct 2025',
        title: 'Hallucination is the Fundamental Feature of LLMs',
        summary:
          'Hallucination is not a bug of LLMs; it is the mechanism. The only question that matters is whether each hallucination adds value or subtracts it.',
        href: '/2025/10/20/hallucination-is-the-fundamental-feature-of-llms/',
      },
      {
        num: '02',
        date: 'oct 2025',
        title: 'The Mathematics of AI-Assisted Code',
        summary:
          'A working arithmetic of AI-assisted code: value equals your codebase plus the positive hallucinations, minus the negative ones, minus the cost of detecting them.',
        href: '/2025/10/28/the-mathematics-of-ai-assisted-code/',
      },
      {
        num: '03',
        date: 'nov 2025',
        title: 'A Systems View of AI-Assisted Programming',
        summary:
          'The assistant as a system: environment, user, model, tools, context. Your prompt is a small part of the context; the rest is yours to design.',
        href: '/2025/11/03/a-systems-view-of-ai-assisted-programming/',
      },
      {
        num: '04',
        date: 'nov 2025',
        title: 'Steering - Favoring Positive Hallucinations in Programming Assistants',
        summary:
          'The craft of curating instructions, examples, and artifacts so the model’s output converges on good software, and why steering itself has a non-trivial cost.',
        href: '/2025/11/06/steering-favoring-positive-hallucinations/',
      },
      {
        num: '05',
        date: 'nov 2025',
        title: 'Backpressure - Rejecting Negative Hallucinations in Programming Assistants',
        summary:
          'The verification loop (deterministic checks first, structured verification prompts second) that lets the system reject its own negative hallucinations.',
        href: '/2025/11/26/backpressure-rejecting-negative-hallucinations/',
      },
    ],
  },
  contactPage: {
    meta: {
      title: 'Contact · Aníbal Rojas',
      description:
        'Book a conversation about AI-assisted development, your engineering organization, or working together. Or write first.',
    },
    eyebrow: 'contact',
    heading: 'Contact',
    intro:
      "Every engagement starts with a conversation, no pitch, no deck, no commitment. Bring the real picture: your team, your context, the thing that isn't working. I'll tell you honestly whether I can help and how. And if the answer is no, you'll hear that too. I work in English or Spanish.",
    after: 'Opens my Google Calendar in a new tab: pick a time that works for you.',
    write: {
      title: 'Or write first',
      text: 'If a calendar slot feels like more than you\'re ready for, don\'t book one. Write to <a href="mailto:i@usedtocode.com">i@usedtocode.com</a> with a paragraph about your team and your context, and we\'ll take it from there.',
    },
  },
  aboutPage: {
    meta: {
      title: 'About · Aníbal Rojas',
      description:
        'Thirty years leading software organizations, six scaling engineering at Platzi, a year back in the code, and the four verbs I use instead of consulting.',
    },
    eyebrow: 'about',
    heading: 'About',
    arc: {
      label: 'the long way here',
      paragraphs: [
        'My name is Aníbal Rojas, and I am not a Software Engineer: I studied Computer Science, which looks similar but is not the same. Many years ago I used to program. <em>I loved programming</em>. Perl at first, then a ton of Java until I got tired of the XML push-ups that were all the rage at the time, and finally Ruby (to use Ruby on Rails), which I still consider the most beautiful programming language in the world, even though my bet these days is Elixir.',
        'Then management "happened" to me, as it does to many developers: somebody at the company had to be the manager, and it fell to me. I did not know what being a manager was. I had no good role models, and no awareness that it was something you could actually study. In the transition from individual contributor (IC) to manager I suffered a horrendous burnout. And yet, it turned out I was very good at that manager thing.',
        'To get past the burnout, one of the things I did was psychotherapy, and after a year of Gestalt I ended up enrolling in a formal training as a <em>Facilitator of Gestalt Processes</em>. When I started, I could not imagine how much growth it would bring me, or the tools it would leave me with for the rest of my professional life. Few VPs of Software Engineering can discuss the architecture of an Agent, diagnose a communication problem between teams using Virginia Satir, and redesign a process based on Eliyahu M. Goldratt’s Theory of Constraints, and I am one of those few. And since psychotherapy has no place at work, I got certified as a Systemic Coach.',
        'I spent many years in management: again and again I led teams and helped them raise their level, take on complex challenges, each bigger than the last. I was lucky to always be involved in projects on the cutting edge: from very early on, the web itself, and later cloud computing, were part of my day to day. I still remember having to explain to a client that their team would not need to install any software: they would use the browser to access the application. I worked with big companies, oil and gas, telco, aviation, etc., and I also worked with startups, completely separate worlds.',
        'In my last job I spent six years as Vice President of Engineering at the most important online education startup in Latin America, Platzi: a challenging, complex, demanding job, and one I will always remember because no other job ever let me give so many people a chance to grow: the people on my team, and above all our millions of students.',
        'Since in a startup your scope has no limits, and you do whatever it takes to make the bet work, my job stretched far beyond the Engineering team and I helped build the new layers of leadership. From that experience came the <a href="https://platzi.com/cursos/filosofia-managers/">Filosofía para Managers</a> audio course, my favorite of all the ones I recorded: an evergreen course people still write to me about on LinkedIn to say thanks.',
        'In 2025 I took a sabbatical. At 56, I prioritized my health "technical debt", and with the time left over I set out to explore, in depth, software development built on Generative AI. I had already gone all in on understanding the first principles of Generative AI since OpenAI launched ChatGPT on November 30, 2022, and from very early on I helped leadership layers at companies understand what was coming, but this time I got in up to my elbows in the mud.',
        'Not only did I try piles of "coding assistants", of which there was a Cambrian explosion in 2025, but I also set out to challenge many of the ideas I myself held about what it meant to develop, maintain, and manage an application, and in particular that mythical task at the core of software development: programming. We now understand there is another kind of intelligence that can do it as well as we can or better, that is available 7 x 24, 365 days a year, and that it falls to us to operate and manage.',
        'These days I am focused on exploring the possibilities, trade-offs, and limits of agent systems for software generation. For a long time I was "married" to Claude Code, then I started trying "Chinese models" with OpenCode. I confess it has been an absorbing and fun process, not free of frustration, and extremely demanding. My next challenge is exploring Pi Coding Agent, because I believe it is the simplest path to real ownership of the harness, and I see that as key to the future.',
        'For all the brutal impact Generative AI has had on software development over the last two years, the reality is that this is just beginning. The tools will change, all of them: the models, the agents, and the harnesses that absorb me today will have other names next year, and what I am looking for is not in any of them, but in what remains when they get replaced. That is why the only way I know to keep pace is something unpopular that I insist on promoting: <strong>critical thinking from first principles</strong>. Understanding what these systems really are, what they can do, what they cannot, and deciding with your own judgment. That is what I practice, that is <a href="/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms/">what I write</a>, and that is what I bring into every room I work in.',
      ],
    },
    room: {
      label: 'what i actually do in a room',
      intro:
        'Strip the engagement letter down and what\'s left is four verbs, at different levels, with different intentions. All four point at the same destination: AI working at the core of your workforce.',
      items: [
        {
          verb: 'Facilitate',
          text: 'Working sessions where a leadership team builds its own map and its own decisions. I bring the structure and the uncomfortable questions; the room does the work. The alignment holds because nobody had to buy it: they built it.',
        },
        {
          verb: 'Coach',
          text: 'One-on-one with executives, confidential, under a contract: we define what success looks like in your words, you practice between sessions, and we close when you no longer need me. The training behind it is formal, coaching and Gestalt; the intention is the growth of the leader, not the comfort of the sessions.',
        },
        {
          verb: 'Mentor',
          text: 'What transfers is judgment: thirty years of pattern recognition about which fires burn out on their own, and which ones take the building down. For engineering leaders and senior engineers meeting those patterns for the first time.',
        },
        {
          verb: 'Train',
          text: 'Installing capability in teams: first-principles literacy about what these models actually are, then the two practices that survive model releases, <a href="/2025/11/06/steering-favoring-positive-hallucinations/">steering</a> and <a href="/2025/11/26/backpressure-rejecting-negative-hallucinations/">backpressure</a>. Not tool tutorials; tutorials expire.',
        },
      ],
    },
    refusals: {
      label: 'what i refuse',
      paragraphs: [
        "What I don't do is <s>consulting</s>, not in the sense the word has come to mean. No analysis that lives out its days on a shelf, no report as the product, no slide decks, no readout theater where everyone nods and nothing is different on Monday. Those artifacts produce activity, not outcomes. And outcomes require somebody changing how they work, which no document has ever done.",
        'Part of this is conviction. Most of it is arithmetic: if what you bought is a document, then the day I leave, the change has not started. Also, I have produced enough slides for one career.',
      ],
    },
    notFor: {
      label: 'who this is not for',
      text: "If you're shopping for a tool recommendation, or for silver bullet skills and recipes, this is the wrong room: any list I gave you would be stale before the invoice cleared. The same goes if you need an outside name to validate a decision already made, a deck to reassure the board, or someone to blame when the initiative stalls. I don't rent out authority. I work with leaders who intend to do the changing themselves.",
    },
  },
  footer: {
    eyebrow: 'contact',
    // echoes the thesis, then routes to the contact room (the solid uses
    // cta.start — one verb family, ruling D2); the direct calendar shortcut
    // stays one register below for the visitor who is already sure, wearing
    // the departure glyph the arrow contract requires (ruling D3)
    title: 'Aligning people, technology, and the business starts with a conversation.',
    bookDirect: 'prefer to book directly? calendar ↗',
    colophon: 'built from the terminal',
  },
};

const es: typeof en = {
  meta: {
    title: 'Aníbal Rojas · Desarrollo asistido por IA, elevando al equipo y al codebase',
    description:
      'Ayudo a organizaciones de ingeniería a adoptar el desarrollo asistido por IA, elevando al equipo y al codebase. Charlas, VP fraccional, coaching ejecutivo.',
  },
  a11y: {
    skip: 'Saltar al contenido',
    language: 'Idioma',
    nav: 'Navegación',
    elsewhere: 'En otros sitios',
  },
  nav: {
    home: { label: 'home', href: '/es/' },
    ideas: { label: 'ideas', href: '/es/ideas/' },
    // label matches the real dirname — the ls conceit stays literally truthful
    // in both locales (ruling D7/G6); prose links already write sobre-mi/
    about: { label: 'sobre-mi', href: '/es/sobre-mi/' },
    contact: { label: 'contacto', href: '/es/contacto/' },
  },
  cta: {
    book: 'Agenda una conversación',
    bookHref: 'https://calendar.app.google/WXerTvr5UeuuVwDc8',
    start: 'Empieza la conversación',
    startHref: '/es/contacto/',
    compact: 'Conversemos',
  },
  hero: {
    eyebrow: 'anibal rojas · liderazgo de ingeniería · medellín, colombia',
    title:
      'Ayudo a organizaciones de <span class="callout-target">ingeniería</span> a adoptar el desarrollo asistido por IA, <em>elevando al equipo y al codebase</em>',
    lede:
      'La IA Generativa está reescribiendo el SDLC de punta a punta. La mayoría de las empresas responde comprando licencias y repitiendo el hype. La parte difícil es cambiar cómo piensan y colaboran los ingenieros y los líderes, y ahí es donde las transformaciones mueren en silencio. No se entrega: <em class="facilitated">se facilita</em>. Esa es <a href="#services">la parte que yo hago</a>.',
    callout: 'aunque la ingeniería no sea tu centro, igual podemos encajar.*',
    calloutNote:
      'que encajemos depende de tu cultura, y de cómo tu liderazgo entiende la tecnología en este momento. Si ese es tu caso, <a href="/es/contacto/">empieza la conversación →</a>',
    calloutCompact:
      'Aunque la ingeniería no sea tu centro, igual podemos encajar: depende de tu cultura, y de cómo tu liderazgo entiende la tecnología en este momento. Para saber si ese es tu caso, <a href="/es/contacto/">empieza la conversación</a>.',
    secondary: 'Cómo podemos trabajar juntos',
  },
  thesis: {
    title: 'El problema sigue siendo alinear a las personas, la tecnología y el negocio. Solo que ahora es más complejo.',
    p1: 'El software es trabajo de conocimiento: humanos tomando decisiones juntos dentro de un sistema complejo. La IA multiplica la velocidad a la que se escribe código; no multiplica qué tan bien una organización decide, coordina y aprende. Mete IA en cada etapa del SDLC y el cuello de botella no desaparece: se mueve hacia el criterio, la confianza, y la forma en que los equipos realmente trabajan.',
    // outputs/outcomes lleva el mismo dispositivo de énfasis que EN — strong
    // en slate, el par central de la tesis (ruling D5/G4)
    bridge:
      'La IA produce <strong>outputs</strong> (código, documentos, artefactos), y lograr que sean de calidad de forma consistente es una disciplina en sí misma. Pero un <strong>output</strong> no es un <strong>outcome</strong>: nada cambia hasta que las personas convierten lo que la IA produce en mejores decisiones, mejor entrega, nueva capacidad. Conectarlos es trabajo humano, organizacional, <a href="#services">el trabajo que yo hago</a>, y tiene un destino: la IA en el centro de tu fuerza de trabajo, entrelazada en la forma en que la gente realmente trabaja, no atornillada como un sidebar a la forma en que venimos trabajando desde hace una década.',
    p2: 'Por eso abordo cada proyecto con los tres lentes que llevo toda mi carrera afilando: <strong>pensamiento sistémico</strong>, <strong>construcción de equipos de alto desempeño</strong> y <strong>gestión del conocimiento</strong>.',
  },
  who: {
    eyebrow: 'whoami',
    portraitLabel: 'Aníbal Rojas',
    paragraphs: [
      'Soy Aníbal Rojas. Llevo 30+ años construyendo y liderando organizaciones de software: telecomunicaciones, oil and gas, aviación y startups. Durante seis años fui VP de Ingeniería en Platzi, la empresa de educación en tecnología más importante de Latinoamérica, donde construí y escalé equipos de alto desempeño y ayudé a cientos de personas a crecer como ingenieros y como líderes.',
      'Después me tomé un año sabático e hice algo poco común para un ejecutivo: volví al código. Pasé ese año metido hasta los codos en el desarrollo asistido por IA (sistemas de agentes, asistentes de programación, sus límites y posibilidades reales) y llegué a una conclusión incómoda: los modelos, los harnesses, los skills y los plugins evolucionan demasiado rápido para que cualquier playbook sobreviva. La única forma durable de trabajar con estas herramientas es <strong>desde primeros principios</strong>. Eso es lo que propone mi serie <a href="/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms/"><em>Principios Fundamentales</em></a>, escrita desde la terminal, no desde el escenario de una conferencia.',
      'Esa combinación es lo que ofrezco: un ejecutivo que ha dirigido ingeniería a escala, y un <strong>practitioner de IA</strong> que sabe exactamente qué hacen estas herramientas cuando un sistema colapsa de forma no lineal intentando escalar.',
      'Mi historia completa es un poco más complicada. Puedes <a href="/es/sobre-mi/">leerla entera →</a>',
    ],
  },
  services: {
    eyebrow: 'servicios',
    intro: {
      statement: 'Solía promocionarme como <s>consultor</s>. Pero no: ni análisis, ni informes, ni slides.',
      verbs: 'Facilito, hago coaching, mentoría y entrenamiento, a distintos niveles, con distintas intenciones.',
      // borrador — pendiente de revisión de Aníbal (anotación 18)
      facilitation:
        'Facilitar significa que las respuestas las construye tu gente, en la sala. Yo diseño y conduzco las conversaciones donde eso ocurre, y lo que sale de ahí sigue en pie cuando me voy.',
    },
    items: [
      {
        num: '01',
        title: 'Charlas',
        // borrador — pendiente de revisión de Aníbal (anotación 19)
        text: 'Keynotes y talleres prácticos para equipos de liderazgo, organizaciones de ingeniería y comunidades. Una provocación anclada en la práctica: qué es realmente la IA generativa, y qué cambia en la forma en que tu organización construye software.',
      },
      {
        num: '02',
        title: 'Advisory y VP de Ingeniería Fraccional',
        text: 'Liderazgo senior insertado, con retainer mensual: facilitación desde dentro del ritmo de tu operación. Con tu CTO, tus líderes y tus equipos, instalando la nueva forma de trabajar: estrategia de adopción, procesos, estructura de equipos, y las conversaciones honestas que hay en el medio. Después me hago a un lado.',
      },
      {
        num: '03',
        title: 'Coaching ejecutivo',
        text: 'Trabajo uno a uno con CTOs, VPs y Directores que navegan esta transición, o la suya propia: un peer de confianza con quien discutir, no otro informe. Procesos de 3 a 6 meses.',
      },
    ],
    aboutHtml:
      'Puedo hablar de diseño de sistemas, de principios de management o de filosofía existencial; entiendo la crisis de identidad que atraviesan los knowledge workers, y toda la fricción dentro de las organizaciones. No soy un ser elevado: simplemente he tenido muchas experiencias distintas en mi carrera, y puedes leerlas en <a href="/es/sobre-mi/">sobre-mi/</a>',
    after: '¿No sabes cuál encaja? Empecemos por una conversación.',
  },
  ideas: {
    eyebrow: 'ideas',
    intro: 'Escribo sobre desarrollo asistido por IA, liderazgo de ingeniería, pensamiento sistémico, y la complicada realidad humana entre ellos.',
    spanishNote: '',
    essayTag: 'ensayo',
    podcast: {
      tag: 'podcast',
      title: 'O corres o te encaramas',
      href: 'https://ocorres.com',
      thumbLabel: 'Arte de un episodio de O corres o te encaramas',
      teaser:
        'El podcast sobre el impacto de la IA generativa en el Desarrollo de Software. En vivo todos los lunes a las 7 PM COT.',
    },
    indexLink: {
      label: 'el índice → /es/ideas/',
      href: '/es/ideas/',
    },
    linkedin: {
      label: 'también puedes leer mis artículos en LinkedIn ↗',
      href: 'https://www.linkedin.com/in/anibalrojas/recent-activity/articles/',
    },
  },
  ideasPage: {
    meta: {
      title: 'Ideas · Aníbal Rojas',
      description:
        'Escritos sobre desarrollo asistido por IA, liderazgo de ingeniería, pensamiento sistémico, y la complicada realidad humana entre ellos.',
    },
    eyebrow: 'ideas',
    heading: 'Ideas',
    minuteRead: 'min de lectura',
    empty: {
      title: 'Nada indexado todavía',
      text: 'Lo nuevo va llegando aquí a medida que lo escribo, sin calendario: cuando está listo.',
      subscribeLabel: 'suscríbete → substack',
    },
  },
  post: {
    minuteRead: 'min de lectura',
    alsoIn: 'also in english',
    originally: 'Publicado originalmente en',
  },
  principles: {
    eyebrow: 'el objetivo',
    aburrida: {
      hook: 'Te ayudo a convertir la IA en una tecnología aburrida porque:',
      quote: 'Cualquier tecnología suficientemente avanzada es indistinguible de la magia.',
      cite: 'Arthur C. Clarke',
      text: 'Y <strong>el problema con la magia es que nos sucede</strong>, <em>pero no se puede gestionar</em>. Cuando nos aproximamos a estas tecnologías desde principios fundamentales la magia desaparece, y entonces el trabajo de verdad puede empezar.',
    },
    credoTitle: 'principios de trabajo',
    credo: {
      belief:
        'Yo creo que todo el mundo debe aprender qué es la Inteligencia Artificial Generativa, un LLM, un Agente, un harness, cómo estos funcionan y se relacionan.',
      why: 'Porque no existe un futuro donde la Inteligencia Artificial Generativa no sea la herramienta fundamental de los knowledge workers.',
      // el escéptico tiene voz — el credo se lee como un diálogo
      counter:
        '¡Pero Aníbal! Las computadoras tienen décadas como la herramienta fundamental de los knowledge workers, ¡y la mayoría de las personas no saben cómo funcionan!',
      rebuttal:
        'Sí, pero la Inteligencia Artificial Generativa es una tecnología fundamentalmente estadística, probabilística y estocástica diseñada para generar engagement <strong>simulando que hay una inteligencia como la humana del otro lado del prompt</strong>.',
      consequence:
        'Y cuando nuestros equipos se aproximan a la IA Generativa desde la idea de que es una inteligencia como la humana, es muy difícil obtener resultados útiles, de calidad de forma consistente.',
      closing: 'Todos podemos aprender, todos necesitamos aprender.',
    },
    mythsEyebrow: 'el problema recurrente de fondo',
    mythsTitle:
      'Todo lo que tu equipo cree sobre la inteligencia artificial generativa que no es verdad',
    mythsIntro:
      'Y estamos hablando de una tecnología que está diseñada para causar <strong>la ilusión de que todo esto es cierto</strong>, con el efecto colateral de:',
    myths: [
      {
        num: '01',
        text: 'Que son una base de datos, un repositorio de hechos.',
      },
      {
        num: '02',
        text: 'Que esta base de datos comprende <strong>todo</strong> el conocimiento humano.',
      },
      {
        num: '03',
        text: 'Que son neutrales, y que todo el conocimiento tiene el mismo "peso".',
      },
      {
        num: '04',
        text: 'Que operan en términos lógico/simbólicos.',
      },
      { num: '05', text: 'Que razonan.' },
      {
        num: '06',
        text: 'Que aprenden al ser usados por nosotros.',
      },
      {
        num: '07',
        text: 'Que mientras más información les damos, operan mejor.',
      },
    ],
    sideEffectsTitle: 'Efectos colaterales',
    sideEffects: [
      'Quedarnos dormidos al volante, enter, enter, enter, …',
      'Apagar el pensamiento crítico',
      'Convertirnos en forwarders',
      'Crear una carga de trabajo asimétrica para la verificación humana',
    ],
    mythsClosing:
      'Y nada de esto ayuda a crear valor: produce actividad. La actividad no es lo mismo que outputs de calidad, y los outputs, por sí solos, no son outcomes.',
    // La serie completa de cinco ensayos, migrada de i.usedtocode.com (2026-08):
    // las páginas ES enlazan los originales en sus URLs de archivo.
    articles: [
      {
        num: '01',
        date: 'oct 2025',
        title: 'La Alucinación es el Feature Fundamental de los LLMs',
        summary:
          'La alucinación no es un defecto de los LLMs: es el mecanismo. La única pregunta que importa es si cada alucinación agrega valor o lo resta.',
        href: '/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms/',
      },
      {
        num: '02',
        date: 'oct 2025',
        title: 'Las matemáticas del Código Asistido por IA',
        summary:
          'Una aritmética de trabajo del código asistido: el valor es tu codebase más las alucinaciones positivas, menos las negativas, menos el costo de detectarlas.',
        href: '/2025/10/28/las-matematicas-del-codigo-asistido-por-ia/',
      },
      {
        num: '03',
        date: 'nov 2025',
        title: 'Una Visión de Sistemas para la Programación Asistida por IA',
        summary:
          'El asistente como sistema: entorno, usuario, modelo, herramientas, contexto. Tu prompt es una parte pequeña del contexto; el resto también se diseña.',
        href: '/2025/11/03/una-vision-de-sistemas-para-la-programacion-asistida-por-ia/',
      },
      {
        num: '04',
        date: 'nov 2025',
        title: 'Steering - Favoreciendo las Alucinaciones Positivas en los Asistentes de Programación',
        summary:
          'El oficio de curar instrucciones, ejemplos y artefactos para que la salida del modelo converja hacia buen software, y por qué el steering mismo tiene un costo no trivial.',
        href: '/2025/11/06/steering-favoreciendo-las-alucinaciones-positivas/',
      },
      {
        num: '05',
        date: 'nov 2025',
        title: 'Backpressure - Rechazando las Alucinaciones Negativas en los Asistentes de Programación',
        summary:
          'El ciclo de verificación (primero mecanismos determinísticos, luego prompts de verificación estructurados) para que el sistema rechace sus propias alucinaciones negativas.',
        href: '/2025/11/26/backpressure-rechazando-las-alucinaciones-negativas/',
      },
    ],
  },
  contactPage: {
    meta: {
      title: 'Contacto · Aníbal Rojas',
      description:
        'Agenda una conversación sobre desarrollo asistido por IA, tu organización de ingeniería, o trabajar juntos. O escribe primero.',
    },
    eyebrow: 'contacto',
    heading: 'Contacto',
    intro:
      'Todo empieza con una conversación, sin pitch, sin presentación, sin compromiso. Trae el panorama real: tu equipo, tu contexto, eso que no está funcionando. Te diré con honestidad si puedo ayudar y cómo. Y si no puedo, también. Trabajo en español o en inglés.',
    after: 'Abre mi Google Calendar en otra pestaña: elige el horario que mejor te funcione.',
    write: {
      title: 'O escribe primero',
      text: 'Si agendar todavía te parece demasiado, no agendes. Escríbeme a <a href="mailto:i@usedtocode.com">i@usedtocode.com</a> un párrafo sobre tu equipo y tu contexto, y empezamos por ahí.',
    },
  },
  aboutPage: {
    meta: {
      title: 'Sobre mí · Aníbal Rojas',
      description:
        'Treinta años liderando organizaciones de software, seis escalando ingeniería en Platzi, un año de regreso al código, y cuatro verbos en lugar de consultoría.',
    },
    eyebrow: 'sobre-mi',
    heading: 'Sobre mí',
    arc: {
      label: 'el camino largo hasta aquí',
      paragraphs: [
        'Mi nombre es Aníbal Rojas, no soy Ingeniero de Software, sino que estudié Ciencias de la Computación: se parece pero no es igual. Hace muchos años yo solía programar, <em>amaba programar</em>. Al principio en Perl, luego un montón en Java hasta que me cansé de los XML push-ups que eran el furor del momento, y finalmente en Ruby (para usar Ruby on Rails), al que sigo considerando el lenguaje de programación más bonito del mundo, a pesar de que mi apuesta hoy en día es Elixir.',
        'Luego me "sucedió" el management, como a muchos otros desarrolladores: alguien tenía que ser manager en la empresa y me tocó a mí. Yo no sabía lo que era ser manager, no tenía buenos modelos, tampoco la consciencia de que era algo que se podía estudiar. En el proceso de transición de individual contributor (IC) a manager sufrí un burn-out horrendo. Y sin embargo, resultó que fui muy bueno en eso de ser manager.',
        'Para superar el burn-out una de las cosas que hice fue psicoterapia, y después de un año haciendo Gestalt terminé matriculándome en la formación de <em>Facilitador en Procesos Gestálticos</em>. Cuando empecé este proceso no me imaginaba el crecimiento que me iba a brindar, ni las herramientas que me iba a dejar para el resto de mi vida profesional. Pocos VP de Ingeniería de Software pueden discutir sobre la arquitectura de un Agente, diagnosticar un problema de comunicación entre equipos usando a Virginia Satir, y rediseñar un proceso basado en la Teoría de Restricciones de Eliyahu M. Goldratt, y yo soy uno de esos. Y como la psicoterapia no tiene cabida en el trabajo, me certifiqué como Coach Sistémico.',
        'Me dediqué al management muchos años: una y otra vez lideré equipos y los ayudé a elevar su nivel, a enfrentar desafíos complejos, cada vez más grandes. Tuve la suerte de siempre estar involucrado en proyectos con tecnología de punta: desde muy temprano la propia web, y luego cloud computing, fueron parte de mi día a día. Aún recuerdo tener que explicarle a un cliente que su equipo no tendría que instalar ningún software, sino que usaría el navegador para acceder a la aplicación. Trabajé con grandes empresas, oil and gas, telco, aviación, etc., y también trabajé con startups, mundos completamente aparte.',
        'En mi último trabajo fui por seis años Vicepresidente de Ingeniería de la startup de educación en línea más importante de Latinoamérica, Platzi: un trabajo retador, complejo, exigente, y al que siempre recordaré porque nunca un trabajo me permitió darle una oportunidad de crecer a tanta gente: las personas de mi equipo, y sobre todo nuestros millones de estudiantes.',
        'Como en las startups nuestro scope no tiene límites, y hay que hacer lo que haya que hacer para que la apuesta funcione, mi trabajo se extendió mucho más allá del equipo de Ingeniería y ayudé a formar las nuevas capas de liderazgo. De mi experiencia ahí salió el <a href="https://platzi.com/cursos/filosofia-managers/">Audiocurso de Filosofía para Managers</a>, que de todos los que grabé ha sido mi favorito: un curso evergreen por el que constantemente me escriben en LinkedIn para agradecerme.',
        'En el 2025 me tomé un sabático. A mis 56 años prioricé la "deuda técnica" de salud, y en el tiempo restante me dediqué a explorar en profundidad el desarrollo de software apoyado en Inteligencia Artificial Generativa. Ya yo me había metido de lleno a entender los principios fundamentales de la IA Generativa desde el lanzamiento de ChatGPT por parte de OpenAI el 30 de noviembre del 2022, y ayudé desde muy temprano a las capas de liderazgo en empresas a entender lo que se venía, pero aquí me metí hasta los codos en el barro.',
        'No solo probé montones de "Asistentes de Programación" (Coding Assistants), de los que hubo una explosión cámbrica en el 2025, sino que además me dediqué a desafiar muchas de las ideas que yo mismo tenía acerca de qué significaba desarrollar, mantener y gestionar una aplicación, y en particular esa mítica tarea en el núcleo del desarrollo de software: programar. Ya entendimos que hay otro tipo de inteligencia que puede hacerlo igual de bien o mejor que nosotros, que está disponible 7 x 24, 365 días al año, y que nos toca operar y gestionar.',
        'Hoy en día estoy enfocado en explorar las posibilidades, compromisos y límites de los sistemas de agentes en generación de software. Durante mucho tiempo "me casé" con Claude Code, luego empecé a probar "modelos chinos" con OpenCode. Confieso que ha sido un proceso absorbente y divertido, pero no exento de frustración, y extremadamente desafiante. Mi próximo reto es explorar Pi Coding Agent, porque creo que es el camino más sencillo hacia una apropiación real del harness, y veo eso como clave para el futuro.',
        'A pesar del impacto brutal que ha tenido la IA Generativa en el desarrollo de software en los últimos dos años, la realidad es que esto apenas comienza. Las herramientas van a cambiar, todas: los modelos, los agentes y los harnesses que hoy me absorben tendrán otros nombres el año que viene, y lo que busco no está en ninguna de ellas, sino en lo que queda cuando las reemplazan. Por eso la única forma que conozco de mantener el paso es algo que no es popular y que insisto en promover: <strong>pensamiento crítico desde Principios Fundamentales</strong>. Entender qué son realmente estos sistemas, qué pueden hacer, qué no, y decidir con criterio propio. Eso es lo que practico, eso es <a href="/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms/">lo que escribo</a>, y eso es lo que traigo a cada sala en la que trabajo.',
      ],
    },
    room: {
      label: 'lo que realmente hago en una sala',
      intro:
        'Quítale a mi trabajo el contrato y los entregables, y quedan cuatro verbos, a distintos niveles, con distintas intenciones. Los cuatro apuntan al mismo destino: la IA trabajando en el centro de tu fuerza de trabajo.',
      items: [
        {
          verb: 'Facilito',
          text: 'Sesiones de trabajo donde el equipo de liderazgo construye su propio mapa y sus propias decisiones. Yo pongo la estructura y las preguntas incómodas; el trabajo lo hace la sala. La alineación se sostiene porque nadie tuvo que ser convencido: la hicieron ellos.',
        },
        {
          verb: 'Coaching',
          text: 'Uno a uno con ejecutivos, confidencial y con contrato: definimos el éxito en tus palabras, practicas entre sesiones, y cerramos cuando ya no me necesitas. La formación que hay detrás es formal, coaching y Gestalt; la intención es el crecimiento del líder, no la comodidad de las sesiones.',
        },
        {
          verb: 'Mentoría',
          text: 'Lo que se transfiere es criterio: treinta años de reconocimiento de patrones sobre cuáles incendios se apagan solos y cuáles tumban el edificio. Para líderes de ingeniería y seniors que están viendo esos patrones por primera vez.',
        },
        {
          verb: 'Entrenamiento',
          text: 'Instalar competencias en los equipos: alfabetización desde primeros principios sobre qué son realmente estos modelos, y después las dos prácticas que sobreviven a los releases de modelos nuevos: <a href="/2025/11/06/steering-favoreciendo-las-alucinaciones-positivas/">steering</a> y <a href="/2025/11/26/backpressure-rechazando-las-alucinaciones-negativas/">backpressure</a>. No tutoriales de herramientas; los tutoriales expiran.',
        },
      ],
    },
    refusals: {
      label: 'lo que me niego a hacer',
      paragraphs: [
        'Lo que no hago es <s>consultoría</s>, no en el sentido que la palabra terminó teniendo. Ni análisis que envejecen en un estante, ni informes como producto, ni slides, ni el teatro del readout donde todos asienten y el lunes no cambia nada. Esos artefactos producen actividad, no outcomes. Y los outcomes requieren que alguien cambie su forma de trabajar, algo que ningún documento ha hecho jamás.',
        'Una parte es convicción. La mayor parte es aritmética: si lo que compraste es un documento, el día que me voy el cambio todavía no ha empezado. Además, ya produje suficientes slides para una sola carrera.',
      ],
    },
    notFor: {
      label: 'para quién no es',
      text: 'Si lo que buscas es una recomendación de herramientas, skills bala de plata o recetas infalibles, este es el sitio equivocado: cualquier lista que te diera estaría vencida antes de que llegara la factura. Lo mismo si necesitas una firma externa que valide una decisión ya tomada, un deck para tranquilizar a la junta, o alguien a quien culpar cuando la iniciativa se estanque. No alquilo autoridad. Trabajo con líderes que piensan hacer el cambio ellos mismos.',
    },
  },
  footer: {
    eyebrow: 'contacto',
    title: 'Alinear a las personas, la tecnología y el negocio empieza con una conversación.',
    bookDirect: '¿prefieres agendar directo? calendario ↗',
    colophon: 'construido desde la terminal',
  },
};

export const ui = { en, es } as const;
export type Dict = typeof en;
