import { ComponentType } from "react";
import { Home, Profile } from "../pages";

interface RouteType {
  component: ComponentType;
  path: string;
  exact?: boolean;
}

const routeMap: Array<RouteType> = [
  {
    component: Home,
    path: "/home",
    exact: true,
  },
  {
    component: Profile,
    path: "/profile/:id",
  }
];

export default routeMap;
