import React, { useState, useEffect } from "react";
import QuestionPanel from "./QuestionPanel";
import { Container, Typography, Button, Box } from "@mui/material";
import questionsData from "./responses.json"; // Import the JSON file

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [taskAnswers, setTaskAnswers] = useState({});

  useEffect(() => {
    // Shuffle and select 20 questions
    const shuffledQuestions = questionsData.sort(() => Math.random() - 0.5).slice(0, 20);
    setQuestions(shuffledQuestions);
  }, []);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTaskSubmit = (task) => {
    setTaskAnswers((prev) => ({
      ...prev,
      [currentIndex]: task,
    }));
  };

  const getTaskAnswer = () => {
    return taskAnswers[currentIndex] || {};
  };

  if (questions.length === 0) {
    return <Typography variant="h6">Loading questions...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ margin: "16px 0" }}>
        RAG Evaluation Tasks
      </Typography>

      <QuestionPanel
        query={questions[currentIndex].Query}
        context={questions[currentIndex].Source}
        response={questions[currentIndex].Response}
        onSubmit={handleTaskSubmit}
        initialData={getTaskAnswer()}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default App;
