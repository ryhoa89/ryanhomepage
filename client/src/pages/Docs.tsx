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
    id: 'infrastructure-as-craft',
    title: 'Infrastructure as Craft',
    date: 'November 2024',
    excerpt: 'Treating systems like they matter.',
    content: `Infrastructure as Craft

There's a difference between code that works and code that's built to last.

I think infrastructure should be treated like craft. Not art—art is personal and ephemeral. Not manufacturing—manufacturing is about volume and efficiency. Craft.

Good craft means:
- Understanding the material. Know your database. Know your network. Know your operating system.
- Obsessing over details. The naming of variables. The clarity of logs. The graceful degradation under failure.
- Accepting responsibility. You built this thing. It's yours. When it breaks at 3am, you own it.
- Preferring longevity. Will this still make sense in five years? Can the next person understand it?

The best infrastructure I've ever maintained was written by people who cared about these things. Not because they were paid more. Because they thought it mattered.

It does.`
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
  const [selectedDoc, setSelectedDoc] = useState<string | null>('why-boring');
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
