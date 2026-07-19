export const brand = {
  name: "FULLGOAL",
  colors: {
    blue: "#0B50A2",
    yellow: "#FABE00",
    red: "#CC3333",
    green: "#00B050",
    text: "#404040",
    secondary: "#6B7280",
    muted: "#8A94A3",
    light: "#F4F7FB",
    softBlue: "#EDF4FC",
    border: "#D8E2EF",
    white: "#FFFFFF",
    navy: "#071C35",
  },
  fontFamily:
    '"Microsoft YaHei", "PingFang SC", "Noto Sans SC", "Source Han Sans SC", "Segoe UI", Arial, sans-serif',
} as const;

export const chapterMeta = {
  opening: { label: "开场", short: "Home", color: "#8A94A3", firstSlide: "hero" },
  ai: { label: "AI基础", short: "AI基础", color: "#0B50A2", firstSlide: "ai-shift" },
  method: { label: "协作方法", short: "协作方法", color: "#FABE00", firstSlide: "human-chat-agent-workflow" },
  skill: { label: "Skill案例", short: "Skill案例", color: "#00B050", firstSlide: "start-with-materials" },
  closing: { label: "结尾", short: "结尾", color: "#8A94A3", firstSlide: "closing" },
} as const;
