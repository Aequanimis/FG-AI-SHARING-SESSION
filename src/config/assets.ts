export const assets = {
  logo: "/assets/brand/fullgoal-logo.png",
  rendererBefore: "/assets/demo/renderer-before.png",
  imageNativeAfter: "/assets/demo/image-native-after.png",
  iciOutline: "/assets/demo/ici-outline.png",
  qaScreenshot: "/assets/demo/qa-screenshot.png",
  skillRun: "/assets/demo/skill-run.png",
  prismaHeroVideo: "/assets/prisma-reference/hero-prisma.mp4",
  prismaSecondaryVideo: "/assets/prisma-reference/secondary-prisma.mp4",
  prismaOrbit: "/assets/prisma-reference/icon-orbit.webp",
  prismaSignal: "/assets/prisma-reference/icon-signal.webp",
  prismaFrame: "/assets/prisma-reference/icon-frame.webp",
} as const;

export const assetLabels: Record<keyof typeof assets, string> = {
  logo: "授权 Logo",
  rendererBefore: "组件化代表页",
  imageNativeAfter: "Image-native 代表页",
  iciOutline: "ICI 大纲截图",
  qaScreenshot: "QA 截图",
  skillRun: "Skill 运行截图",
  prismaHeroVideo: "Prisma Hero 公共视频",
  prismaSecondaryVideo: "Prisma Features 公共视频",
  prismaOrbit: "Prisma 宇航员视觉一",
  prismaSignal: "Prisma 宇航员视觉二",
  prismaFrame: "Prisma 像素宇航员视觉",
};
