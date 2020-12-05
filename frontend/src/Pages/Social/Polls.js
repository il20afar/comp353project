import React from "react";
import Poll from "react-polls";

import {
  D,
  MainContext,
  TextBox,
  data,
  Button,
  Header,
  InputModal,
  LoadContainer,
  SearchBar,
  HighlightedContent,
} from "../../imports";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuid } from "uuid";

import "./Polls.scss";

const PollsCreate = (props) => {
  const { setView, updatePolls } = props;

  const scrollContainerRef = React.useRef(null);
  const refs = React.useRef([
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ]);

  const lastEdited = React.useRef(0);

  const [inputModalView, setInputModalView] = React.useState("display");
  const [answers, setAnswers] = React.useState(["", "", ""]);
  const [addButtonView, setAddButtonView] = React.useState(false);

  // Adds an answer field
  const addField = () => {
    const newAnswers = [
      ...answers.filter((elem, index) => index === 0 || elem != ""),
      "",
    ];

    lastEdited.current = answers.length;
    setAnswers(newAnswers);
    setAddButtonView(false);
  };

  // Deletes a specific answer field
  const deleteField = (index) => {
    const newAnswers = [...answers.filter((_, i) => i !== index)];
    lastEdited.current = answers.length;

    setAnswers(newAnswers);
  };

  // Checks if poll is valid to be sent
  const isValidPoll = () => {
    return [refs.current[0], refs.current[1], refs.current[2]].every(
      (elem) => elem.current.value !== ""
    );
  };
  // Checks if all visible answer boxes are populated
  const allAnswersPopulated = () =>
    answers.every((elem, index) => index === 0 || elem != "");

  // Performs all necessary actions on change
  const onChange = (value, index) => {
    answers[index] = value;
    lastEdited.current = index;
    setAnswers(answers);
    updateButtonState();
    setInputModalView(isValidPoll() ? "edit" : "display");
  };

  // Hides or show the add answer button
  const updateButtonState = () => {
    if (
      (!addButtonView && allAnswersPopulated()) ||
      (addButtonView && !allAnswersPopulated())
    ) {
      setAddButtonView(!addButtonView);
    }
  };

  React.useEffect(() => {
    scrollContainerRef.current.scrollTo({
      left: 0,
      top: 100000,
      behavior: "smooth",
    });
  }, [answers]);

  const InputField = (props) => {
    const {
      customRef,
      index,
      title,
      placeholder,
      initialValue = "",
      type = "question",
    } = props;
    const defaultRef = React.useRef(null);

    return (
      <div
        key={`poll-creation-field-${index}`}
        className="create-poll-field"
        style={{ height: "fit-content", marginBottom: "20px" }}
      >
        <div
          style={{
            fontSize: "20px",
            color: "white",
            marginBottom: "8px",
            height: "20px",
          }}
        >
          {title}
        </div>
        <div style={{ height: "40px", width: "100%", display: "flex" }}>
          <TextBox
            key={`poll-creation-field-textbox-${index}`}
            type={"input"}
            ref={customRef || defaultRef}
            placeholder={placeholder}
            initialValue={initialValue}
            onChange={(e) => onChange(e, index)}
            // outlineOnChange
            focusOnRender={lastEdited.current === index}
            readOnly={false}
            style={{ fontSize: "22px" }}
            height="50px"
            useAnimation={false}
          />
          {type === "answers" && answers.length >= 4 && (
            <div
              style={{
                height: "58px",
                width: "58px",
                marginLeft: "10px",
                backgroundColor: "red",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => deleteField(index)}
            >
              <FontAwesomeIcon
                icon={faTrash}
                color={"white"}
                style={{ margin: "0 auto" }}
                size={"sm"}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  console.log("RENDER");

  return (
    <InputModal
      key="view-input-modal"
      view={inputModalView}
      isEditable={false}
      widthPadding={200}
      heightPadding={120}
      onClose={() => setView("menu")}
      onCancel={() => setView("menu")}
      onConfirm={async () => {
        const res = await data.send("polls", "create", {
          question: refs.current[0].current.value,
          asso_id: 1,
          answers: refs.current
            .filter((elem, index) => index !== 0 && elem.current?.value)
            .map((elem) => elem.current.value),
        });
        console.log({
          question: refs.current[0].current.value,
          asso_id: 1,
          answers: refs.current
            .filter((elem, index) => index !== 0 && elem.current?.value)
            .map((elem) => elem.current.value),
        });
        if (res === 1) {
          setView("menu");
          updatePolls();
        } else {
          alert("Server error");
        }
      }}
    >
      <div
        ref={scrollContainerRef}
        style={{
          width: "100%",
          height: "100%",
          padding: "10px",
          overflowY: "scroll",
          overflowX: "visible",
        }}
      >
        {answers.map((value, i) => {
          return (
            <InputField
              key={`poll-creation-field-${i}`}
              customRef={refs.current[i]}
              initialValue={answers[i]}
              index={i}
              title={i === 0 ? "Create a new poll" : `Answer ${i}`}
              placeholder={
                i === 0
                  ? "Enter your poll question here..."
                  : `Enter answer #${i}`
              }
              type={i === 0 ? "question" : "answers"}
            />
          );
        })}

        {answers.length <= 8 && (
          <Button
            content={{
              show: addButtonView ? (
                <FontAwesomeIcon icon={faPlus} size="lg" />
              ) : (
                `Fill the above ${
                  answers.length - 1
                } questions to add others or create poll...`
              ),
            }}
            style={{
              show: {
                height: "80px",
                marginTop: "30px",
                width: "100%",
                border: "2px solid white",
                ...(!addButtonView && {
                  fontSize: "20px",
                  opacity: 0.7,
                  pointerEvents: "none",
                }),
              },
            }}
            // dropdown={[]}
            height="60px"
            onClick={() => addField()}
          />
        )}
      </div>
    </InputModal>
  );
};
const PollsContainer = (props) => {
  const { user, visiblePolls, type, updatePolls } = props;

  const filteredByType = [...visiblePolls].filter(
    (elem) => elem.poll_status === type
  );
  return (
    <div className={`polls-container ${type}`}>
      {filteredByType.length === 0 ? (
        <div
          className={`no-polls-shown ${type}`}
        >{`No ${type} polls to show!`}</div>
      ) : (
        filteredByType
          .sort((a, b) => b.poll_id - a.poll_id)
          .map((elem) => {
            const { answer_id, answers, question } = elem;
            const user_answer =
              answer_id !== -1
                ? Object.values(answers).find(
                    (answer) => answer.answer_id === answer_id
                  ).content
                : null;
            console.log(elem);
            return (
              <Poll
                key={uuid()}
                noStorage
                vote={user_answer}
                customStyles={{
                  theme: type === "closed" ? "blue" : "purple",
                }}
                question={question}
                answers={Object.values(answers).map((answer) => ({
                  option: answer.content,
                  votes: answer.number_of_votes,
                }))}
                onVote={async (voteAnswer) => {
                  const res = await data.send("polls", "vote", {
                    user_id: user.current.user_id,
                    answer_id: answers.find(
                      (answer) => answer.content === voteAnswer
                    ).answer_id,
                  });
                  if (res !== -1) {
                    updatePolls();
                  }
                }}
              />
            );
          })
      )}
    </div>
  );
};

const Polls = () => {
  const { user } = React.useContext(MainContext);

  console.log(user.current);

  const [view, setView] = React.useState("menu");
  const [visibility, setVisiblity] = React.useState("both");
  const [visiblePolls, setVisiblePolls] = React.useState([]);

  const updatePolls = async () => {
    console.log({
      user_id: user.current.user_id,
      asso_id: 1,
    });
    const res = await data.send("polls", "get", {
      user_id: user.current.user_id,
      asso_id: 1,
    });
    if (res.polls) {
      setVisiblePolls(res.polls);
    }
  };

  React.useEffect(() => {
    updatePolls();
  }, []);

  const actions = [
    ...["closed", "both", "open"].map((elem) => {
      const color =
        visibility === "closed"
          ? "rgb(86, 116, 224)"
          : visibility === "open"
          ? "rgb(109, 75, 148)"
          : "rgb(105,108,188)";
      const selectedStyling =
        visibility === elem
          ? {
              fontWeight: "700px",
              backgroundColor: color,
              border: `2px solid ${color}`,
              color: "white",
            }
          : {};
      return (
        <Button
          content={{ show: elem }}
          style={{
            show: {
              width: "140px",
              textTransform: "capitalize",
              ...selectedStyling,
            },
          }}
          onClick={() => setVisiblity(elem)}
        />
      );
    }),
    <Button
      content={{ show: "Create +" }}
      style={{ show: { width: "200px" }, hide: { width: "200px" } }}
      onClick={() => setView("create")}
    />,
  ];

  console.log(visiblePolls);

  return (
    <div className="polls">
      <Header key={uuid()} height="80px" actions={actions} />

      {view === "create" ? (
        <PollsCreate updatePolls={updatePolls} setView={setView} />
      ) : (
        <div className={`polls-window ${visibility}`}>
          {visiblePolls.length === 0 ? (
            <LoadContainer
              type="ThreeDots"
              color="rgb(98,96,186)"
              style={{ gridColumn: "1 / span 2" }}
              height="100px"
              width="100px"
            />
          ) : (
            <>
              {["closed", "open"].map((type) => (
                <PollsContainer
                  key={uuid()}
                  user={user}
                  visiblePolls={visiblePolls}
                  type={type}
                  updatePolls={updatePolls}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Polls;
