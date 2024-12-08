import React, { useState, useEffect } from "react";
import QuestionPanel from "./QuestionPanel";
import { Container, Typography, Button, Box, LinearProgress, TextField } from "@mui/material";
import questionsData from "./tasks.json";

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

  useEffect(() => {
    const shuffledQuestions = questionsData.sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffledQuestions);
  }, []);

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

  if (questions.length === 0) {
    return <Typography variant="h6">Loading questions...</Typography>;
  }

  if (currentIndex >= questions.length) {
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
        <Typography variant="h4" sx={{ marginBottom: "3vh" }}>
          Thank you for completing the survey!
        </Typography>
        <Button variant="contained" color="primary" onClick={downloadAnswers}>
          Download Responses
        </Button>
      </Container>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh" }}
    >
      {/* Centered Question Panel */}
      <Box sx={{ width: "75%", marginBottom: "5vh" }}>
        <QuestionPanel
          query={questions[currentIndex].query}
          context={questions[currentIndex].context}
          response={questions[currentIndex].response}
        />
      </Box>

      {/* Task Evaluation Box */}
      <Box
        sx={{
          position: "fixed",
          // top: "50%",
          right: "0%",
          // transform: "translateY(-50%)",
          width: "25%",
          backgroundColor: "#ffffff",
          border: "0.5vh solid #f9f9f9",
          borderRadius: "1px",
          // backgroundColor: "#f9f9f9",
          padding: "2vh",
          boxSizing: "border-box",
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
          margin: "0px",
          textAlign: "center", // Center title and content
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "2vh" }}>
          Task Evaluation
        </Typography>

        {/* True/False Buttons for Faithfulness */}
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          Do you think the response is faithful?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Center buttons
            gap: "10px",
            marginBottom: "10px",
          }}
        >
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

        {/* True/False Buttons for Relevance */}
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          Do you think the response is relevant?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Center buttons
            gap: "10px",
            marginBottom: "20px",
          }}
        >
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

        {/* Faithfulness Input */}
        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            label="Reasoning for Faithfulness Rating"
            placeholder="Copy-paste the piece of text from the response that supports your faithfulness rating"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={inputs.faithfulness}
            onChange={(e) => handleInputChange("faithfulness", e.target.value)}
          />
        </Box>

        {/* Relevance Input */}
        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            label="Reasoning for Relevance Rating"
            placeholder="Copy-paste the piece of text from the response that supports your relevance rating"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={inputs.relevance}
            onChange={(e) => handleInputChange("relevance", e.target.value)}
          />
        </Box>

        {/* Comments Input */}
        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            label="Comments (optional)"
            multiline
            rows={5}
            fullWidth
            variant="outlined"
            value={inputs.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
          />
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Button variant="contained" color="primary" onClick={handleSkip}>
            Skip Task
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Task
          </Button>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ marginTop: "25px" }}>
          <Typography variant="body2" sx={{ marginBottom: "5px" }}>
            Progress: {currentIndex + 1} / {questions.length}
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ height: "5px" }} />
        </Box>

        {showError && (
          <Typography color="error" sx={{ marginTop: "2px" }}>
            Please complete all fields before submitting.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default App;
