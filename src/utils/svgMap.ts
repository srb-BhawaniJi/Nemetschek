import React, {lazy} from "react";

export const svgComponents: Record<string, React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>> = {
    "floor_plan.svg": lazy(() => import("../assets/floor_plan.svg").then(module => ({ default: module.ReactComponent }))),
    "floor1.svg": lazy(() => import("../assets/floor1.svg").then(module => ({ default: module.ReactComponent }))),
    "floor2.svg": lazy(() => import("../assets/floor2.svg").then(module => ({ default: module.ReactComponent }))),
    "floor3.svg": lazy(() => import("../assets/floor3.svg").then(module => ({ default: module.ReactComponent }))),
  };