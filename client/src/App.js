import React, { useState, useEffect } from "react";
import QuestionPanel from "./QuestionPanel";
import { Container, Typography, Button, Box, LinearProgress, TextField } from "@mui/material";
import questionsData from "./tasks.json";
import './App.css';

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
        <Typography variant="h4" 
        sx={{ marginBottom: "3vh" }}
        >
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
            Task Evaluation
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Button variant="contained" color="primary" onClick={handleSkip}>
              Skip Task
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Task
            </Button>
          </Box>
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
    <QuestionPanel
        query={questions[currentIndex].query}
        context={questions[currentIndex].context}
        response={questions[currentIndex].response}
    />
    </div>
</body>
  );
};

export default App;
