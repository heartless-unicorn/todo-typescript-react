import { createContext } from "react";
import type { Context } from "./interfaces";

const ItemType = {
  CARD: "card",
};
const PathContext = createContext<Context>({
  issuesPath: "",
  setIssuesPath: () => {},
});
export { ItemType, PathContext };
