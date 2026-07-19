export type ChapterKey = "opening" | "ai" | "method" | "skill" | "closing";
export type SlideTheme = "light" | "soft" | "navy";
export type SlideStatus = "ready" | "placeholder" | "partial";

export type VisualType =
  | "hero"
  | "agenda"
  | "ai-shift"
  | "agent-formula"
  | "concept-map"
  | "api-flow"
  | "trend-rail"
  | "chat-agent"
  | "workflow-stepper"
  | "stage-gates"
  | "thinking-frameworks"
  | "skill-problem"
  | "project-evolution"
  | "template-modes"
  | "before-after"
  | "ici-case"
  | "skill-architecture"
  | "demo-workflow"
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
}
