import { useState, SyntheticEvent, ChangeEvent, useContext } from "react";

import { Alert, Col, Row, Button, Form } from "react-bootstrap";

import { getIssuesHandler } from "./handlers/getIssuesHandler";
import { PathContext } from "../helpers/constants";

import { addRepo, selectActions } from "../store/action-slice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

import "./styles/Input.css";

export default function Input() {
  const [link, setLink] = useState<string>("");

  const [error, setError] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectActions);

  const { setIssuesPath } = useContext(PathContext);

  const handleInput = function (event: ChangeEvent) {
    const target = event.currentTarget as HTMLInputElement;
    setLink(target.value);
  };
  const handleSubmit = async function (event: SyntheticEvent) {
    event.preventDefault();
    setError(false);
    const repo: string = link.split("/").at(-1) ?? "";
    const owner: string = link.split("/").at(-2) ?? "";
    setIssuesPath(`${owner}-${repo}`);

    if (!(`${owner}-${repo}` in selector)) {
      await getIssuesHandler(owner, repo)
        .then((response) => {
          dispatch(addRepo(response));
        })
        .catch(() => {
          setError(true);
          console.log("Input Error");
        });
    }
  };

  return (
    <div className="Input">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              type="search"
              onChange={handleInput}
              placeholder="https://github.com/facebook/react"
            />
          </Col>
          <Col>
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
      {error && <Alert variant="danger">Please enter the correct url</Alert>}
    </div>
  );
}
