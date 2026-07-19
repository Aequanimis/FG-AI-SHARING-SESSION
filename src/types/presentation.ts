export type ChapterKey = "opening" | "ai" | "method" | "skill" | "closing";
export type SlideTheme = "light" | "soft" | "navy";
export type SlideStatus = "ready" | "placeholder" | "partial";

export type VisualType =
  | "hero"
  | "agenda"
  | "ai-shift"
  | "agent-formula"
  | "concept-map"
  | "ai-evolution"
  | "human-chat-agent-workflow"
  | "method-foundations"
  | "start-with-materials"
  | "outline-before-slides"
  | "three-visual-routes"
  | "generate-selected-route"
  | "behind-the-conversation"
  | "real-material-validation"
  | "engineering-controls"
  | "closing";

export interface SpeakerNotes {
  duration: string;
  points: string[];
  bridgeFrom: string;
  transitionTo: string;
  action?: string;
}

export interface SlideData {
  id: string;
  chapter: ChapterKey;
  chapterLabel: string;
  pageNumber: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  keyMessage: string;
  body: string;
  bullets: string[];
  visualType: VisualType;
  sourceNote: string;
  speakerNotes: SpeakerNotes;
  assetSlots: string[];
  theme: SlideTheme;
  status: SlideStatus;
}

export interface SourceItem {
  id: string;
  title: string;
  type: string;
  slideIds: string[];
  note: string;
  entries?: Array<{
    id: string;
    title: string;
    publisher: string;
    publishedAt: string;
    sourceType: string;
    supportedFacts: string[];
    supportedClaim?: string;
    practicalUse?: string;
    verifiedAt?: string;
    url: string;
  }>;
}
