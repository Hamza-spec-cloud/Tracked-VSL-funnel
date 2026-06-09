import dynamic from "next/dynamic";

export const Starfield = dynamic(
  () => import("./starfield").then((m) => m.Starfield),
  { ssr: false }
);
