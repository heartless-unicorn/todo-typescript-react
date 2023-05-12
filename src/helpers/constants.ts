import { createContext } from "react";
import type { Context, Issue } from "./interfaces";

const ItemType = {
  CARD: "card",
};
const PathContext = createContext<Context>({
  issuesPath: "",
  setIssuesPath: () => {},
});
const IssueArrayProp: Issue[] = [
  {
    name: "Bug",
    id: 1234,
    creator_id: "nickname",
    created_at: "12.05.2023",
    comments: 3,
  },
  {
    name: "not working",
    id: 1235,
    creator_id: "nickname1",
    created_at: "12.05.2023",
    comments: 2,
  },
];
export { ItemType, PathContext, IssueArrayProp };
