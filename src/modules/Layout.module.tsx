import { createContext, useEffect, useState } from "react";

import Column from "./Column.module";
import Input from "./Input.module";

import type { Repo } from "../helpers/interfaces";
import { PathContext } from "../helpers/constants";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { selectActions } from "../store/action-slice";
import { useAppSelector } from "../store/configureStore";

import "./styles/Layout.css";

export default function Layout() {
  const [issuesPath, setIssuesPath] = useState<string>("");
  const [path, setPath] = useState<String[]>([]);
  const [data, setData] = useState<Repo | null>();

  const selector = useAppSelector(selectActions);
  useEffect(() => {
    if (issuesPath) {
      const storeData = selector[issuesPath];
      if (storeData) {
        const arr = issuesPath.split("-");
        setPath(arr);
        setData(storeData);
      }
    }
  }, [issuesPath, selector]);

  return (
    <Container className="Layout">
      <PathContext.Provider value={{ issuesPath, setIssuesPath }}>
        <Input />
        {data && (
          <div className="path-box">
            <a href={`https://github.com/${path[0]}`} target="blank">
              {" "}
              {path[0]}
            </a>{" "}
            {<FontAwesomeIcon icon={faArrowRight} />}
            <a href={`https://github.com/${path[0]}/${path[1]}`} target="blank">
              {" "}
              {path[1]}
            </a>
          </div>
        )}

        <Row>
          <Column
            name="open"
            issues={data ? data.open : null}
            path={issuesPath}
          />
          <Column
            name="progress"
            issues={data ? data.progress : null}
            path={issuesPath}
          />
          <Column
            name="done"
            issues={data ? data.done : null}
            path={issuesPath}
          />
        </Row>
      </PathContext.Provider>
    </Container>
  );
}
