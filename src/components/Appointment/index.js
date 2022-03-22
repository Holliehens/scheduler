import React from "react";

import "./styles.scss";

import Header from "./Header";

import Show from "./Show";

import Empty from "./Empty";

import Form from "./Form";

import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

import Status from "./Status";

import Error from "./Error";

export default function Appointment(props) {
  const { id, bookInterview, cancelInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    
    if (interviewer === null || interview.student.name === undefined) {
    transition(ERROR_SAVE)
    return;
    }
    transition(SAVING);

    bookInterview(id, interview)
      .then((response) => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const cancel = () => {
    transition(DELETING, true);

    cancelInterview(id)
      .then((response) => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  const confirm = () => {
    transition(CONFIRM);
  };

  const edit = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} onCancel={() => back(EMPTY)} />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to Delete?"
          onConfirm={cancel}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Error Saving Appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Are you sure you would like to delete?"
          onClose={back}
        />
      )}
    </article>
  );
}
