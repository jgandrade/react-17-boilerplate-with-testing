import { ComponentType } from "react";
import { ComponentView } from "../pages";

interface RouteType {
  component: ComponentType;
  path: string;
  exact?: boolean;
}

const routeMap: Array<RouteType> = [
  {
    component: ComponentView,
    path: "/home",
    exact: true,
  },
];

export default routeMap;
