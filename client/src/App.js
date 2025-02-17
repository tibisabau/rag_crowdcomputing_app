import React, { useState, useEffect } from "react";
import QuestionPanel from "./QuestionPanel";
import { Container, Typography, Button, Box, LinearProgress, TextField } from "@mui/material";
import qualificationData from "./qualification-tasks.json";
import goldStandard from "./gold-standard-question.json"
import qualificationAnswersCorrect from "./qualification-answers.json";
import './App.css';
import introductionStages from "./Introduction";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [taskAnswers, setTaskAnswers] = useState([]);
  const [inputs, setInputs] = useState({
    faithfulness: "",
    relevance: "",
    comments: "",
    is_faithful: null,
    is_relevant: null,
  });
  const [showError, setShowError] = useState(false);
  const [qualificationComplete, setQualificationComplete] = useState(false);
  const [introductionStage, setIntroductionStage] = useState(0)
  const [sidebarTitle, setSidebarTitle] = useState("");
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState(0.0);

  const [workerId, setWorkerId] = useState(-1);
  // const [skips, setSkips] = useState(0);

  const API_URL = "https://cs4145-api-726011437905.europe-west4.run.app";

  const doIntroduction = (stage) => {
    return (
      <div className="content">
        {introductionStages[stage][0]}
        <Button variant="contained" color="primary" onClick={
          () => { setIntroductionStage(stage + 1) }
        }>{introductionStages[stage][1]}</Button>
      </div>
    )
  }

  const submitResponse = async (data) => {
    try {
      console.log(data);
      const response = await fetch(API_URL + "/responses", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // console.log("send evaluation");
    }
    catch (error) {
      console.error("Error submitting response:", error);
      return null;
    }
  }

  const fetchQuestions = async () => {
    try {
      const response = await fetch(API_URL + "/questions");
      if (!response.ok) throw new Error("Failed to fetch questions");
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  };

  const fetchCounter = async () => {
    try {
      const response = await fetch(API_URL + "/counter/increment", {
        method: "post"
      });
      if (!response.ok) throw new Error("Failed to fetch counter");
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching counter:", error);
      return [];
    }
  };

  const startQualification = () => {
    setSidebarTitle("Qualification Task");
    const shuffledQuestions = qualificationData.sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  }

  useEffect(() => {
    const fetchAndSetQuestions = async () => {
      const data = await fetchQuestions();
      const effectiveCounter = ((counter - 1) % 15) + 1; // Assuming 15 (3 * 5) is the range to repeat
      const startIndex = Math.floor((effectiveCounter - 1) / 3) * 5;
      const endIndex = startIndex + 5;
      var shuffledQuestions = data.slice(0, 25).slice(startIndex, endIndex);
      shuffledQuestions.push(goldStandard);
      // console.log(shuffledQuestions);
      console.log("start" + startIndex);
      console.log("end" + endIndex);
      console.log(counter); // counter will be the updated value
      setQuestions(shuffledQuestions);
    };

    if (counter > 0) { // Ensure counter is set before fetching
      fetchAndSetQuestions();
    }
  }, [counter]); // Runs whenever counter changes

  const startMainTasks = async () => {
    setSidebarTitle("Evaluation Task");
    const d = new Date();
    setTime(d.getTime());
    const fetchedCounter = await fetchCounter();
    setCounter(fetchedCounter.value); // Triggers useEffect
  };

  useEffect(() => {
    // Get the URL query string
    const urlParams = new URLSearchParams(window.location.search);

    // Extract PROLIFIC_PID from the URL
    const prolificId = urlParams.get('PROLIFIC_PID');

    // Set the workerId if the ID exists, else default to -1
    if (prolificId) {
      setWorkerId(prolificId);
    } else {
      setWorkerId(-1);
    }
  }, []);

  useEffect(() => {
    startQualification();
  }, []);

  if (introductionStage < introductionStages.length) {
    return doIntroduction(introductionStage);
  }

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const resetFields = () => {
    setInputs({
      faithfulness: "",
      relevance: "",
      comments: "",
      is_faithful: null,
      is_relevant: null,
    });
    setShowError(false);
  };

  const handleSubmit = () => {
    const { faithfulness, relevance, is_faithful, is_relevant } = inputs;
    if (!faithfulness.trim() || !relevance.trim() || is_faithful === null || is_relevant === null) {
      setShowError(true);
      return;
    }
    const d = new Date();
    const evaluation = {
      question_id: questions[currentIndex].id,
      ...inputs,
      time: d.getTime() - time,
      worker_id: workerId
    };
    setTime(d.getTime());
    submitResponse(evaluation);
    setTaskAnswers((prev) => [...prev, evaluation]);
    resetFields();
    handleNext();
  };

  // const handleSkip = () => {
  //   setSkips(skips + 1);
  //   resetFields();
  //   setShowError(false);
  //   handleNext();
  // };

  /**
   * Checks if the worker answered the qualification questions correctly.
   * An answer is correct if they selected the correct relevance and faithfulness,
   * and if they're reasoning contains at least one of the keywords, but not the entire response.
   * @returns true if all answers are correct.
   */
  const reviewQualificationAnswers = () => {
       // return true;
       let numberCorrect = 0;
       for (let i = 0; i < qualificationAnswersCorrect.length; i++) {
         let correctAnswer = qualificationAnswersCorrect[i];
         let userAnswer = taskAnswers.filter((x) => x.question_id === correctAnswer.id)[0];
         let points = 0;
         if (correctAnswer.faithfulness === userAnswer.is_faithful) {
           points++;
         }
         // Check relevance
         if (correctAnswer.relevance === userAnswer.is_relevant) {
           points++;
         }
         for (let j = 0; j < correctAnswer.keywords.length; j++) {
           let keyword = correctAnswer.keywords[j];
           if ((userAnswer.faithfulness.includes(keyword) || userAnswer.relevance.includes(keyword))
             && userAnswer.faithfulness.length < correctAnswer.response.length - 3
             && userAnswer.relevance.length < correctAnswer.response.length - 3) {
             points++;
             break;
           }
         }
         if (points >= 2) {
           numberCorrect++;
         }
       }
       return numberCorrect >= 3;
  }

  const endQualification = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setTaskAnswers([]);
    resetFields();
    setQualificationComplete(true);
    startMainTasks();
  }

  const resetQualification = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setTaskAnswers([]);
    resetFields();
    setIntroductionStage(2)
    startQualification()
  }

  if (questions.length === 0) {
    return <Typography variant="h6">Loading questions...</Typography>;
  }

  // Decide what happens when all tasks are done
  if (currentIndex >= questions.length) {
    let message;
    let buttonText;
    let buttonFunction;
    if (!qualificationComplete) {
      if (reviewQualificationAnswers()) {
        message = "You successfully completed the qualification test. You can now start the real tasks. " +
          "Please do not provide random answers or educated guesses. " +
          "Doing so will invalidate your answers and impact your reward";
        buttonText = "Start Tasks";
        buttonFunction = endQualification;
      } else {
        message = "You failed the qualification test." +
          " You may only start the real tasks once the qualification has been completed successfully.";
        buttonText = "Try Again";
        buttonFunction = resetQualification
      }
    } else {
      message = "Thank you for completing the survey! " +
        "You should enter the following completion code on Prolific " +
        "(make sure you copy it before closing this page): C1OH4KXC";
      buttonText = null;
      buttonFunction = null;
    }
    return (
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4"
          sx={{ marginBottom: "3vh" }}
        >
          {message}
        </Typography>
        {buttonText && buttonFunction && (
          <Button variant="contained" color="primary" onClick={buttonFunction}>
            {buttonText}
          </Button>
        )}
      </Container>
    );

  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  // Hide the skip button when in the qualification test
  let buttons;
  if (qualificationComplete) {
    buttons = <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {/* <Button variant="contained" color="primary" onClick={handleSkip}>
        Skip Task
      </Button> */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Task
      </Button>
    </Box>
  } else {
    buttons = <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Task
      </Button>
    </Box>
  }

  return (
    <body>
      <div class="sidebar">
        {/* Task Evaluation Sidebar */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: "20px",
            border: "1px solid #f0f0f0",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "5px", textAlign: "center" }}>
              {sidebarTitle}
            </Typography>
          </div>
          {/* Faithfulness Section */}
          <div>
            <Typography variant="body1" sx={{ marginBottom: "4px" }}>
              Do you think the response is faithful?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "10px" }}>
              <Button
                variant={inputs.is_faithful === true ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleInputChange("is_faithful", true)}
              >
                True
              </Button>
              <Button
                variant={inputs.is_faithful === false ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleInputChange("is_faithful", false)}
              >
                False
              </Button>
            </Box>
          </div>
          {/* Relevance Section */}
          <div>
            <Typography variant="body1" sx={{ marginBottom: "4px" }}>
              Do you think the response is relevant?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "15px" }}>
              <Button
                variant={inputs.is_relevant === true ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleInputChange("is_relevant", true)}
              >
                True
              </Button>
              <Button
                variant={inputs.is_relevant === false ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleInputChange("is_relevant", false)}
              >
                False
              </Button>
            </Box>
          </div>
          {/* Faithfulness Input */}
          <div>
            <Box sx={{ marginBottom: "10px" }}>
              <TextField
                label="Reasoning for Faithfulness Rating"
                placeholder="Copy-paste the piece of text from the response that supports your faithfulness rating"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={inputs.faithfulness}
                onChange={(e) => handleInputChange("faithfulness", e.target.value)}
                InputProps={{
                  style: {
                    padding: "12px", // Adjust padding
                  },
                }}
              />
            </Box>
          </div>
          {/* Relevance Input */}
          <div>
            <Box sx={{ marginBottom: "10px" }}>
              <TextField
                label="Reasoning for Relevance Rating"
                placeholder="Copy-paste the piece of text from the response that supports your relevance rating"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={inputs.relevance}
                onChange={(e) => handleInputChange("relevance", e.target.value)}
                InputProps={{
                  style: {
                    padding: "12px", // Adjust padding
                  },
                }}
              />
            </Box>
          </div>
          {/* Comments Input */}
          <div>
            <Box sx={{ marginBottom: "10px" }}>
              <TextField
                label="Comments (optional)"
                multiline
                rows={5}
                fullWidth
                variant="outlined"
                value={inputs.comments}
                onChange={(e) => handleInputChange("comments", e.target.value)}
                InputProps={{
                  style: {
                    padding: "12px", // Adjust padding
                  },
                }}
              />
            </Box>
          </div>
          {/* Buttons */}
          <div>
            {buttons}
          </div>
          {/* Progress */}
          <div>
            <Box sx={{ marginTop: "10px" }}>
              <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                Progress: {currentIndex + 1} / {questions.length}
              </Typography>
              <LinearProgress variant="determinate" value={progress} sx={{ height: "8px" }} />
            </Box>
          </div>
          <div>
            {showError && (
              <Typography color="error" sx={{ marginTop: "2px" }}>
                Please complete all fields before submitting.
              </Typography>
            )}
          </div>
        </Box>
      </div>
      <div class="content">
        {/* {console.log("test")} */}
        {questions[currentIndex].context1 ? <QuestionPanel
          query={questions[currentIndex].query}
          context1={questions[currentIndex].context1}
          context2={questions[currentIndex].context2}
          response={questions[currentIndex].response}
        /> :
          <QuestionPanel
            query={questions[currentIndex].query}
            context1={questions[currentIndex].context}
            context2={null}
            response={questions[currentIndex].response}
          />}
      </div>
    </body>
  );
};

export default App;
