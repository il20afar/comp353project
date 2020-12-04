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

  const [numAnswers, setNumAnswers] = React.useState(2);
  const [inputModalView, setInputModalView] = React.useState("display");

  const scrollContainerRef = React.useRef(null);
  const pollQuestionRef = React.useRef(null);
  const [answers, setAnswers] = React.useState([
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ]);

  const addField = () => {
    setNumAnswers(numAnswers + 1);
  };

  const deleteField = (index) => {
    answers[index].current.value = "";
    setNumAnswers(numAnswers - 1);
  };

  const isValidPoll = () => {
    return [pollQuestionRef, answers[0], answers[1]].every(
      (elem) => elem.current.value !== ""
    );
  };

  const onChange = (e) => {
    setInputModalView(isValidPoll() ? "edit" : "display");
  };

  React.useEffect(() => {
    scrollContainerRef.current.scrollTo(0, 1000000);
  }, [numAnswers]);

  const makeField = (ref, index, title, placeholder, type = "question") => {
    return (
      <div
        key={uuid()}
        className="create-poll-field"
        style={{ height: "fit-content", marginBottom: "20px" }}
      >
        <div
          style={{
            fontSize: "24px",
            color: "white",
            marginBottom: "10px",
            height: "30px",
          }}
        >
          {title}
        </div>
        <div style={{ height: "60px", width: "100%", display: "flex" }}>
          <TextBox
            type={"input"}
            ref={ref}
            placeholder={placeholder}
            initialValue={""}
            onChange={onChange}
            outlineOnChange
            focusOnRender={true}
            readOnly={false}
            height="60px"
          />
          {type === "answers" && numAnswers >= 3 && (
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

  return (
    <InputModal
      view={inputModalView}
      isEditable={false}
      widthPadding={200}
      heightPadding={120}
      onClose={() => setView("menu")}
      onConfirm={async () => {
        const res = await data.send("polls", "create", {
          question: pollQuestionRef.current.value,
          asso_id: 1,
          answers: answers
            .filter((elem) => elem.current?.value)
            .map((elem) => elem.current.value),
        });

        setView("menu");
        updatePolls();
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
        {makeField(
          pollQuestionRef,
          0,
          "Create a new poll",
          "Enter your poll question here..."
        )}
        {[...Array(numAnswers)].map((_, i) =>
          makeField(
            answers[i],
            i,
            `Answer ${i + 1}`,
            `Enter answer #${i + 1}`,
            "answers"
          )
        )}
        {numAnswers < 8 && (
          <Button
            content={{ show: <FontAwesomeIcon icon={faPlus} size="lg" /> }}
            style={{
              show: {
                height: "80px",
                marginTop: "30px",
                width: "100%",
                border: "2px solid white",
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
  const { user, visiblePolls, type } = props;

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
            return (
              <Poll
                key={uuid()}
                noStorage
                vote={user_answer}
                customStyles={{
                  theme: "purple",
                }}
                question={question}
                answers={Object.values(answers).map((answer) => ({
                  option: answer.content,
                  votes: answer.percentage,
                }))}
                onVote={async (voteAnswer) => {
                  const res = await data.send("polls", "vote", {
                    user_id: user.current.user_id,
                    answer_id: answers.find(
                      (answer) => answer.content === voteAnswer
                    ).answer_id,
                  });
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

    console.log(res);

    setVisiblePolls(res.polls);
  };

  React.useEffect(() => {
    // updatePolls();
  }, []);

  console.log(visiblePolls);

  const actions = [
    ...["closed", "both", "open"].map((elem) => {
      const color =
        visibility === "closed"
          ? "rgb(86, 116, 224)"
          : visibility === "closed"
          ? "rgb(109, 75, 148)"
          : "rgb(98,96,186)";
      const selectedStyling =
        visibility === elem
          ? {
              fontWeight: "700px",
              ...(visibility === "both" && {
                backgroundColor: color,
                border: `2px solid ${color}`,
                color: "white",
              }),
              ...(visibility !== "both" && {
                backgroundColor: "transparent",
                border: `2px solid ${color}`,
                color: color,
              }),
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

  return (
    <div className="polls">
      <Header key={uuid()} height="80px" actions={actions} />

      {view === "create" ? (
        <PollsCreate updatePolls={updatePolls} setView={setView} />
      ) : (
        <div className={`polls-window ${visibility}`}>
          <PollsContainer
            user={user}
            visiblePolls={visiblePolls}
            type="closed"
          />
          <PollsContainer user={user} visiblePolls={visiblePolls} type="open" />
        </div>
      )}
    </div>
  );
};

export default Polls;
