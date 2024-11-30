import React, { useState, useEffect } from "react";
import QuestionPanel from "./QuestionPanel";
import { Container, Typography, Button, Box } from "@mui/material";
import questionsData from "./tasks.json"; // Import the JSON file

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [taskAnswers, setTaskAnswers] = useState([]);

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

  const handleTaskSubmit = (evaluation) => {
    setTaskAnswers((prev) => [...prev, evaluation]);
    handleNext();
  };

  const handleTaskSkip = () => {
    handleNext();
  }

  if (questions.length === 0) {
    return <Typography variant="h6">Loading questions...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ margin: "16px 0" }}>
        RAG Evaluation Tasks
      </Typography>

      <QuestionPanel
        id={questions[currentIndex].id}
        query={questions[currentIndex].query}
        context={questions[currentIndex].context}
        response={questions[currentIndex].response}
        onSubmit={handleTaskSubmit}
        onSkip={handleTaskSkip}
      />
    </Container>
  );
};

export default App;
