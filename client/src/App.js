import React, { useState, useEffect } from "react";
import QuestionPanel from "./QuestionPanel";
import { Container, Typography, Button, Box, LinearProgress } from "@mui/material";
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

  const progress = ((currentIndex + 1) / questions.length) * 100;

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

      <Box sx={{ width: '100%', marginTop: '32px', marginBottom: '32px' }}>
        <LinearProgress 
          variant="determinate" 
          value={progress}
          sx={{ height: 10 }}
        />
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', marginTop: '8px' }}>
          {currentIndex + 1} / {questions.length}
        </Typography>
      </Box>
    </Container>
  );
};

export default App;
