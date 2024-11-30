import React, { useState, useEffect } from "react";
import QuestionPanel from "./QuestionPanel";
import { Container, Typography, Button, Box, LinearProgress } from "@mui/material";
import questionsData from "./tasks.json"; // Import the JSON file

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [taskAnswers, setTaskAnswers] = useState([]);

  useEffect(() => {
    const shuffledQuestions = questionsData.sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffledQuestions);
  }, []);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handleTaskSubmit = (evaluation) => {
    setTaskAnswers((prev) => [...prev, evaluation]);
    handleNext();
  };

  const handleTaskSkip = () => {
    handleNext();
  }

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

  // Show completion screen if we've gone through all questions
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
            Finish Survey & Download Answers
          </Button>
        </Box>
      </Container>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ margin: "16px 0" }}>
        RAG Evaluation Tasks
      </Typography>

      <QuestionPanel
        questionId={questions[currentIndex].id}
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
