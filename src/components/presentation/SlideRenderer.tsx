import { ArrowRight, CheckCircle2, UserRound } from "lucide-react";
import { chapterMeta } from "../../config/brand";
import type { SlideData, SourceItem } from "../../types/presentation";
import { AgentFormula, ConceptMap, HumanAgentNetwork, ShiftRail } from "../diagrams/Fundamentals";
import { AiEvolutionTimeline } from "../diagrams/AiEvolutionTimeline";
import { HumanChatAgentWorkflow } from "../diagrams/HumanChatAgentWorkflow";
import { EngineeringFoundations } from "../diagrams/EngineeringFoundations";
import { ClosingRoles } from "../diagrams/SkillCase";
import { EngineeringControlRoom, IciEvidenceWall, MaterialUploadScene, OutlineApprovalScene, ProductionPipelineBlueprint, SelectedRouteBuild, VisualRouteSelector } from "../diagrams/Part3Workflow";

export function AgendaVisual({ onNavigate }: { onNavigate: (id: string) => void }) {
  const items = [chapterMeta.ai, chapterMeta.method, chapterMeta.skill];
  const descriptions = ["从模型、Chat和Agent，到API、工具与Skill。", "让Chat参与规划、Agent负责执行，并在每个阶段验收。", "把研究材料、模板规则、视觉生成与QA封装成Skill。"];
  return <div className="agenda-list">{items.map((item, index) => <button type="button" onClick={() => onNavigate(item.firstSlide)} key={item.label}><span>0{index + 1}</span><div><strong>{item.label}</strong><p>{descriptions[index]}</p></div><ArrowRight aria-hidden="true" /></button>)}</div>;
}

export function SlideVisual({ slide, onNavigate, onSource }: { slide: SlideData; onNavigate: (id: string) => void; onSource: (source: SourceItem) => void }) {
  switch (slide.visualType) {
    case "hero": return <HumanAgentNetwork onStart={() => onNavigate("agenda")} />;
    case "agenda": return <AgendaVisual onNavigate={onNavigate} />;
    case "ai-shift": return <ShiftRail />;
    case "agent-formula": return <AgentFormula />;
    case "concept-map": return <ConceptMap />;
    case "ai-evolution": return <AiEvolutionTimeline onSource={onSource} />;
    case "human-chat-agent-workflow": return <HumanChatAgentWorkflow />;
    case "method-foundations": return <EngineeringFoundations onSource={onSource} />;
    case "start-with-materials": return <MaterialUploadScene />;
    case "outline-before-slides": return <OutlineApprovalScene />;
    case "three-visual-routes": return <VisualRouteSelector />;
    case "generate-selected-route": return <SelectedRouteBuild />;
    case "behind-the-conversation": return <ProductionPipelineBlueprint />;
    case "real-material-validation": return <IciEvidenceWall />;
    case "engineering-controls": return <EngineeringControlRoom />;
    case "closing": return <ClosingRoles />;
  }
}

export function KeyMessage({ slide }: { slide: SlideData }) {
  return <div className="key-message">{slide.theme === "navy" ? <UserRound size={20} /> : <CheckCircle2 size={20} />}<p>{slide.keyMessage}</p></div>;
}
