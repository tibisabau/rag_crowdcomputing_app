import React, { useState, useEffect } from "react";
import QuestionPanel from "./QuestionPanel";
import { Container, Typography, Button, Box, LinearProgress, TextField } from "@mui/material";
import qualificationData from "./qualification-tasks.json";
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
    isFaithful: null,
    isRelevant: null,
  });
  const [showError, setShowError] = useState(false);
  const [qualificationComplete, setQualificationComplete] = useState(false);
  const [introductionStage, setIntroductionStage] = useState(0)
  const [sidebarTitle, setSidebarTitle] = useState("");

  const API_URL = "https://cs4145-api-726011437905.europe-west4.run.app";

  const doIntroduction = (stage) => {
    return (
        <div className="content">
          {introductionStages[stage][0]}
          <Button variant="contained" color="primary" onClick={
            () => {setIntroductionStage(stage + 1)}
          }>{introductionStages[stage][1]}</Button>
        </div>
    )
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

  const startQualification = () => {
    setSidebarTitle("Qualification Task");
    const shuffledQuestions = qualificationData.sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  }

  const startMainTasks = async () => {
    setSidebarTitle("Evaluation Task");
    const data = await fetchQuestions();
    const shuffledQuestions = data.sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffledQuestions);
  }



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
      isFaithful: null,
      isRelevant: null,
    });
    setShowError(false);
  };

  const handleSubmit = () => {
    const { faithfulness, relevance, isFaithful, isRelevant } = inputs;
    if (!faithfulness.trim() || !relevance.trim() || isFaithful === null || isRelevant === null) {
      setShowError(true);
      return;
    }

    const evaluation = {
      questionId: questions[currentIndex].id,
      ...inputs,
    };
    setTaskAnswers((prev) => [...prev, evaluation]);
    resetFields();
    handleNext();
  };

  const handleSkip = () => {
    resetFields();
    setShowError(false);
    handleNext();
  };

  const downloadAnswers = () => {
    const dataStr = JSON.stringify(taskAnswers, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `survey_answers_${new Date().toISOString()}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Checks if the worker answered the qualification questions correctly.
   * An answer is correct if they selected the correct relevance and faithfulness,
   * and if they're reasoning contains at least one of the keywords, but not the entire response.
   * @returns true if all answers are correct.
   */
  const reviewQualificationAnswers = () => {
    let numberCorrect = 0;
    for (let i= 0; i<qualificationAnswersCorrect.length; i++) {
      let correctAnswer = qualificationAnswersCorrect[i];
      let userAnswer = taskAnswers.filter((x) => x.questionId === correctAnswer.id)[0];
      if (correctAnswer.faithfulness === userAnswer.isFaithful && correctAnswer.relevance === userAnswer.isRelevant) {
        for (let j= 0; j<correctAnswer.keywords.length; j++) {
          let keyword = correctAnswer.keywords[j];
          if ((userAnswer.faithfulness.includes(keyword) || userAnswer.relevance.includes(keyword))
              && userAnswer.faithfulness.length < correctAnswer.response.length - 3
              && userAnswer.relevance.length < correctAnswer.response.length - 3) {
            numberCorrect++;
            break;
          }
        }
      }
    }
    return numberCorrect === qualificationAnswersCorrect.length;
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
      message = "Thank you for completing the survey!";
      buttonText = "Download Responses";
      buttonFunction = downloadAnswers;
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
          <Button variant="contained" color="primary" onClick={buttonFunction}>
            {buttonText}
          </Button>
        </Container>
    );

  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  // Hide the skip button when in the qualification test
  let buttons;
  if (qualificationComplete) {
    buttons = <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <Button variant="contained" color="primary" onClick={handleSkip}>
        Skip Task
      </Button>
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
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "5px", textAlign:"center" }}>
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
              variant={inputs.isFaithful === true ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleInputChange("isFaithful", true)}
            >
              True
            </Button>
            <Button
              variant={inputs.isFaithful === false ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleInputChange("isFaithful", false)}
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
              variant={inputs.isRelevant === true ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleInputChange("isRelevant", true)}
            >
              True
            </Button>
            <Button
              variant={inputs.isRelevant === false ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleInputChange("isRelevant", false)}
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
    {console.log("test")}
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
