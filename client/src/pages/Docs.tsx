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
    id: 'why-boring',
    title: 'Why Boring Technology Wins',
    date: 'December 2024',
    excerpt: 'A case for choosing reliability over novelty.',
    content: `Why Boring Technology Wins

Technology changes quickly. But reliability doesn't.

The most useful infrastructure I've built has always been the simplest. A Postgres database. A few shell scripts. Load balancers that do one thing well.

I've watched teams spend months building "modern" solutions that collapsed under mild stress. Meanwhile, the boring stuff—the stuff that was ancient when we deployed it—ran without incident for years.

The best time to choose boring is before you need to. Once you're dealing with millions of requests per day, switching from your shiny framework to something stable becomes a migration nightmare.

This isn't about being anti-innovation. It's about understanding the cost of complexity. Every abstraction buys you something. But it costs you something too: observability, debuggability, replacability.

Choose boring when stakes are high. Innovate at the edges.`
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
