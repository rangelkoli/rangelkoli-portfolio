import { FaNodeJs, FaReact } from "react-icons/fa";
import type { IconType } from "react-icons";
import {
  SiExpo,
  SiExpress,
  SiFirebase,
  SiFlask,
  SiMapbox,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiPostgresql,
  SiRedux,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

export const techIconMap: Record<string, IconType | undefined> = {
  "Next.js": SiNextdotjs,
  React: FaReact,
  "React Native": FaReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  Flask: SiFlask,
  "Node.js": FaNodeJs,
  MongoDB: SiMongodb,
  Express: SiExpress,
  Redux: SiRedux,
  Firebase: SiFirebase,
  "Material UI": SiMui,
  TensorFlow: SiTensorflow,
  Supabase: SiSupabase,
  PostgreSQL: SiPostgresql,
  Stripe: SiStripe,
  Expo: SiExpo,
  Mapbox: SiMapbox,
};

