import { useContext } from "react";

import type { Issue } from "../helpers/interfaces";
import { ItemType, PathContext } from "../helpers/constants";

import { useDrag } from "react-dnd";

import "./styles/Task.css";

export default function Task(props: { description: Issue; position: string }) {
  const { issuesPath } = useContext(PathContext);

  const issueInfo = props.description;
  const date = new Date().getDate() - new Date(issueInfo.created_at).getDate();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemType.CARD,
      item: {
        id: props.description.id,
        curPosition: props.position,
        path: issuesPath,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [props.description.id]
  );

  return (
    <div className="Task" ref={drag}>
      <h4>{issueInfo.name}</h4>
      <p> {date === 0 ? "today" : `${date} day(s) ago`}</p>
      <p>Id: {issueInfo.id}</p>
      <p className="bottom-info">
        <span> Comments: {issueInfo.comments}</span>{" "}
        <span className="nickname"> {issueInfo.creator_id}</span>
      </p>
    </div>
  );
}
