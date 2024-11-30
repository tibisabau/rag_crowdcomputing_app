import React, { useState, useEffect } from "react";
import QuestionPanel from "./QuestionPanel";
import { Container, Typography, Button, Box, LinearProgress, TextField } from "@mui/material";
import questionsData from "./tasks.json"; // Import the JSON file

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [taskAnswers, setTaskAnswers] = useState([]);
  const [faithfulness, setFaithfulness] = useState(undefined);
  const [relevance, setRelevance] = useState(undefined);
  const [comments, setComments] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const shuffledQuestions = questionsData.sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffledQuestions);
  }, []);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const resetFields = () => {
    setFaithfulness(undefined);
    setRelevance(undefined);
    setComments("");
    setShowError(false);
  };

  const handleFaithfulnessChange = (value) => {
    setFaithfulness(value);
    if (value !== undefined && relevance !== undefined) {
      setShowError(false);
    }
  };

  const handleRelevanceChange = (value) => {
    setRelevance(value);
    if (faithfulness !== undefined && value !== undefined) {
      setShowError(false);
    }
  };

  const handleSubmit = () => {
    if (faithfulness === undefined || relevance === undefined) {
      setShowError(true);
      return;
    }
    const evaluation = {
      questionId: questions[currentIndex].id,
      faithfulness,
      relevance,
      comments,
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
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', marginTop: '48px' }}>
          <Typography variant="h4" sx={{ marginBottom: '24px' }}>
            Thank you for completing the survey!
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={downloadAnswers}
          >
            Finish Survey
          </Button>
        </Box>
      </Container>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <Container maxWidth="md">
      {/* Fixed Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
          zIndex: 1000,
          borderBottom: "1px solid #ddd",
          padding: "8px",
          boxSizing: "border-box",
        }}
      >
        {/* Task Evaluation Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            marginLeft: "16px",
            marginRight: "16px", // Add right margin
          }}
        >
          {/* Faithfulness and Relevance Buttons arranged horizontally */}
          <Box sx={{ display: "flex", flexDirection: "column", marginRight: "8px" }}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
              <Typography sx={{ marginRight: "4px" }}>Faithfulness:</Typography>
              <Button
                variant={faithfulness === 1 ? "contained" : "outlined"}
                onClick={() => handleFaithfulnessChange(1)}
                sx={{ marginRight: "4px" }}
              >
                True
              </Button>
              <Button
                variant={faithfulness === 0 ? "contained" : "outlined"}
                onClick={() => handleFaithfulnessChange(0)}
              >
                False
              </Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginRight: "4px" }}>Relevance:</Typography>
              <Button
                variant={relevance === 1 ? "contained" : "outlined"}
                onClick={() => handleRelevanceChange(1)}
                sx={{ marginRight: "4px" }}
              >
                True
              </Button>
              <Button
                variant={relevance === 0 ? "contained" : "outlined"}
                onClick={() => handleRelevanceChange(0)}
              >
                False
              </Button>
            </Box>
          </Box>

          {/* Comments Field filling remaining vertical space */}
          <Box sx={{ flexGrow: 1, marginRight: "8px" }}>
            <TextField
              label="Comments (optional)"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </Box>

          {/* Skip and Submit Buttons Stacked Vertically */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSkip}
              sx={{ marginBottom: "4px" }}
            >
              Skip Task
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit Task
            </Button>
          </Box>
        </Box>

        {/* Progress Bar with Numerical Counter */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "8px",
            marginLeft: "16px",
            marginRight: "16px", // Add right margin
          }}
        >
          <Typography variant="body2" sx={{ marginRight: "8px" }}>
            {currentIndex + 1} / {questions.length}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8 }} />
          </Box>
        </Box>

        {/* Error Message */}
        {showError && (
          <Typography color="error" sx={{ mt: 1 }}>
            Please select both faithfulness and relevance before submitting
          </Typography>
        )}
      </Box>

      {/* Main Content */}
      <Box>
        <QuestionPanel
          query={questions[currentIndex].query}
          context={questions[currentIndex].context}
          response={questions[currentIndex].response}
        />
      </Box>
    </Container>
  );
};

export default App;
