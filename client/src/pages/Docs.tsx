import React, { useState } from 'react';
import { WindowFrame } from '@/components/WindowFrame';
import { FileText, Calendar } from 'lucide-react';

interface DocEntry {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const DOCS: DocEntry[] = [
  {
    id: 'play-to-win',
    title: 'Why we Play to win',
    date: 'December 2024',
    excerpt: 'Because the stakes are too high not to win.',
    content: `Why we Play to win

People sometimes ask why i'm so obsessed with competition.
Why we talk about winning in a space that's supposed to be collaborative, charitable, even gentle.
Why we sound more like a startup than a social movement.
It's a fair question.
But the answer is simple: because the stakes are too high not to win.

This work matters.
It affects millions of people in the UK and billions globally.
If we fail, it's not just us that loses.
It's every neurodivergent and disabled person still trapped in systems that don't work.
You can't fix that with goodwill alone.
You fix it with infrastructure — secure, standardised, trusted.
Infrastructure is expensive.
Expensive means venture-scale.
Venture-scale means capital.
Capital means traction.
Traction means winning.
You can build good tools slowly, or build great systems fast.
We chose fast — because people can't wait.

There's a comforting myth that everyone can win.
But that's only true if everyone's competent, ethical, and aligned.
They're not.
We play to win because others are already playing to win.
Some with integrity. Some without.
Pretending otherwise only helps the ones who play dirty.
Bad actors turn trust into marketing.
Mediocre platforms treat people's data like an afterthought.
Grant-funded pilots vanish after twelve months, leaving employers disillusioned and employees exposed.
If we don't play to win, those are the people who do.
And when they win, people get hurt.

Playing to win doesn't mean ego.
It means stewardship.
It means building the standard that protects everyone else.
It means out-executing the performative, out-thinking the careless, and out-lasting the opportunistic.
It means carrying the weight of knowing that if we don't build it right, someone else will build it wrong.

We're not competing for attention.
We're competing with entropy — with chaos, confusion, and inconsistency.
Winning means fairness becomes predictable.
It means the system works quietly, everywhere, for everyone.
Winning doesn't mean burning out.
It means staying sharp enough to keep building.
It means building something too strong to be ignored, too solid to be undone.
Mosaic plays to win because it must.`
  },
  {
    id: 'why-fair-isnt-fair',
    title: 'Why \'Fair\' Isn\'t Fair',
    date: 'December 2024',
    excerpt: 'Fairness smooths the world, but it never changes the game.',
    content: `Why 'Fair' Isn't Fair

"Fairness."
It sounds simple.
It sounds kind.
It sounds safe.
But recently there's been a call for, fair to replace words like, Equality, diversity, and inclusion.
And that swap matters more than most people realise.

We use "fair" to smooth the world.
"Play fair."
"That's not fair."
"To be fair."
"Fair enough."
"It's only fair."
"Life's not fair."
"All's fair in love and war."
Each phrase promises balance, but most of them end conversations rather than start them.

"Play fair" stops the argument.
"Fair enough" closes the critique.
"To be fair" is how we defend what already is.
Even "life's not fair" lets us accept inequity as inevitable, as if fairness were naïve.
Across every idiom, fair acts as a moral anaesthetic, the language of neutrality; but neutrality always defaults to power. Fair is a balm that soothes tension while protecting the status quo. It's how we teach children to behave and adults to comply.
It's social lubricant for systems that don't want to be questioned.

We say "play fair" when one child bullies another  as if fairness were a lesson in manners, not a question of harm.
Because fair is comfortable.
It suggests the rules already work: we just need to apply them evenly.
It's tidy. Non-threatening. Familiar.

Fairness stops the conflict, but it never changes the game.
It asks participants to share the ball, but not who designed the game?
Fairness doesn't ask who wrote the rules; or whose comfort those rules are designed to protect. We like fairness because it feels simple. But simplicity isn't justice

The Design Problem

Real inclusion is design.
It's structural thinking applied to human experience.
It's not about fixing people, it's about fixing systems.
It's architecture, not etiquette.
And here's the paradox:
You can't redesign systems in the name of 'fairness' while ignoring EDI.
Design without equity isn't neutral, it's nostalgic.
Equity asks: Who has power, and who doesn't?
Diversity asks: Who is missing from the picture?
Inclusion asks: What would we have to redesign so that more people can thrive?

It quietly preserves the old defaults: whose pace counts, whose body fits, whose mind the process was built around.

Design that claims to be "beyond DEI" simply rebuilds the same walls with smoother edges.That's why fair on its own isn't enough. Fairness is the civility of systems, procedural evenness that soothes rather than solves.

It's nice, not kind;
fair, not just.

Nice keeps things pleasant. Kindness changes what's possible.
Fairness keeps things orderly. Justice makes them right.
Because fair is the outcome. It's not the process. When we trade equality for fairness, we don't soften inclusion and belonging we hollow it out. We move from confronting bias to comforting it. From accountability to ambiguity. From courage to compliance.

At TryMosaic, fairness isn't what we aim for,  it's what emerges when systems are designed with equity at their core. It's the natural by-product of evidence-based inclusion. the kind built from structure, not slogans.
That's why we keep inclusion at the centre: not as ideology, but as infrastructure.
Because fairness without justice isn't fair at all.`
  },
  {
    id: 'on-remote-work',
    title: 'On Remote Work',
    date: 'October 2024',
    excerpt: 'Building teams across time zones.',
    content: `On Remote Work

Remote work gets a lot of criticism. Most of it misses the point.

The issue isn't remote work. The issue is asynchronous communication. If you try to run a fully synchronous remote team—everyone on Zoom all day—you've built the worst of both worlds.

Good remote work is asynchronous first. Write things down. Document decisions. Trust people to solve problems without checking in every hour.

This requires discipline. It requires that your team can think independently. It requires clear goals and clear communication.

But when it works, it's remarkable. Your team isn't limited by geography. You can hire the best person for the job, regardless of where they live. You can work during your peak hours, not when the office says you should.

The companies that figured this out—really figured it out—have enormous advantages. They don't compete for talent in one city. They compete globally.`
  }
];

interface DocsPageProps {
  onClose?: () => void;
  isActive?: boolean;
  onFocus?: () => void;
}

export function DocsPage({ onClose, isActive, onFocus }: DocsPageProps) {
  const [selectedDoc, setSelectedDoc] = useState<string | null>('play-to-win');
  const selectedDocData = DOCS.find(d => d.id === selectedDoc);

  return (
    <div className="w-full h-full flex gap-2">
      {/* File List */}
      <div className="w-48 border border-win-gray-dark bg-white flex flex-col">
        <div className="bg-win-gray px-2 py-1 border-b border-win-gray-dark font-bold text-xs">
          Essays
        </div>
        <div className="flex-1 overflow-auto">
          {DOCS.map(doc => (
            <button
              key={doc.id}
              onClick={() => setSelectedDoc(doc.id)}
              className={`w-full text-left px-2 py-1.5 text-xs border-b border-gray-100 flex items-start gap-2 hover:bg-win-blue hover:text-white ${
                selectedDoc === doc.id ? 'bg-win-blue text-white' : ''
              }`}
              data-testid={`doc-item-${doc.id}`}
            >
              <FileText className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span className="truncate">{doc.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Document Viewer */}
      <div className="flex-1 border border-win-gray-dark bg-white flex flex-col">
        {selectedDocData ? (
          <>
            <div className="bg-win-gray px-3 py-2 border-b border-win-gray-dark font-bold text-sm">
              {selectedDocData.title}
            </div>
            <div className="px-4 py-2 border-b border-gray-200 text-xs text-gray-600 flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              {selectedDocData.date}
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="prose prose-sm max-w-none font-sans text-sm leading-relaxed whitespace-pre-wrap text-black">
                {selectedDocData.content}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a document to view
          </div>
        )}
      </div>
    </div>
  );
}

export function DocsWindow(props: Omit<React.ComponentProps<typeof WindowFrame>, 'children' | 'title'>) {
  return (
    <WindowFrame
      title="Essays"
      width={700}
      height={450}
      {...props}
    >
      <DocsPage />
    </WindowFrame>
  );
}
