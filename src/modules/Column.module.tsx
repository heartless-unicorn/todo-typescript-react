import Task from "./Task.module";
import Col from "react-bootstrap/Col";

import { useDrop } from "react-dnd";

import { useAppDispatch } from "../store/configureStore";
import { moveItem } from "../store/action-slice";

import type { Issue } from "../helpers/interfaces";
import { ItemType } from "../helpers/constants";

import "./styles/Column.css";

interface issueStatusProp {
  name: string;
  issues: Issue[] | null;
  path: string;
}

export default function Column(props: issueStatusProp) {
  const dispatch = useAppDispatch();

  const handleDrop = function (item: {
    id: number;
    curPosition: string;
    path: string;
  }) {
    const result = Object(item);
    result.source = props.name;
    console.log(result);
    dispatch(moveItem(result));
  };
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.CARD,
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  if (props.issues) {
    return (
      <Col className="Column" ref={drop}>
        <h3>{props.name}</h3>
        {props.issues.map((el) => {
          return <Task description={el} key={el.id} position={props.name} />;
        })}
      </Col>
    );
  } else {
    return (
      <Col className="Column">
        <h3>{props.name}</h3>
      </Col>
    );
  }
}
