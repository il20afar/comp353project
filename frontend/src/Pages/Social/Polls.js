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
  const { setView, user } = props;
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

  const [numAnswers, setNumAnswers] = React.useState(2);

  const onChange = (e) => {
    const val = e.target.value;
    setInputModalView(val !== "" ? "edit" : "display");
  };

  const [inputModalView, setInputModalView] = React.useState("display");

  const makeField = (ref, index, title, placeholder, type = "question") => {
    return (
      <div
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

  const addField = () => {
    setNumAnswers(numAnswers + 1);
  };

  const deleteField = (index) => {
    answers[index].current.value = "";
    setNumAnswers(numAnswers - 1);
  };

  React.useEffect(() => {
    scrollContainerRef.current.scrollTo(0, 1000000);
  }, [numAnswers]);

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
          answers: answers.map((elem) => elem.current.value),
        });
        const Polls = await data.send("polls", "get");
        setView(Polls.Polls);
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

const Polls = () => {
  const { user } = React.useContext(MainContext);

  const onVote = async (voteAnswer) => {
    const res = await data.send("polls", "get");
  };

  const [view, setView] = React.useState("menu");
  const [visibility, setVisiblity] = React.useState("both");
  const [visiblePolls, setVisiblePolls] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const res = await data.send("polls", "get", { asso_id: 1 });
      console.log(res);
      setVisiblePolls(res);
    })();
  }, []);

  const actions = [
    ...["closed", "both", "open"].map((elem) => {
      const color =
        visibility === "closed"
          ? "blue"
          : visibility === "closed"
          ? "purple"
          : "#8A2BE2";
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
        <PollsCreate setView={setView} />
      ) : (
        <div className={`polls-window ${visibility}`}>
          <div className="polls-container closed">
            <Poll
              customStyles={{ theme: "blue" }}
              question={"Should all humans be alive?"}
              answers={[
                { option: "true", votes: 8 },
                { option: "false", votes: 3 },
              ]}
              onVote={(voteAnswer) => onVote(voteAnswer)}
              // customStyles={pollStyles2}
              noStorage
            />
            <Poll
              customStyles={{ theme: "blue" }}
              question={"Should all humans be alive?"}
              answers={[
                { option: "true", votes: 8 },
                { option: "false", votes: 3 },
              ]}
              onVote={(voteAnswer) => onVote(voteAnswer)}
              // customStyles={pollStyles2}
              noStorage
            />
          </div>
          <div className="polls-container open">
            <Poll
              customStyles={{ theme: "purple" }}
              question={"Should all humans be alive?"}
              answers={[
                { option: "true", votes: 8 },
                { option: "false", votes: 3 },
              ]}
              onVote={(voteAnswer) => onVote(voteAnswer)}
              // customStyles={pollStyles2}
              noStorage
            />
            <Poll
              customStyles={{ theme: "purple" }}
              question={"pollQuestion2"}
              answers={[
                { option: "yes", votes: 8 },
                { option: "no", votes: 3 },
              ]}
              onVote={(voteAnswer) => onVote(voteAnswer)}
              // customStyles={pollStyles2}
              noStorage
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Polls;
