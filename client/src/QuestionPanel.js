import React, { useState } from "react";
import { Box, Button, Typography, TextField, Divider } from "@mui/material";
import ReactMarkdown from "react-markdown";

const QuestionPanel = ({ id, query, context, response, onSubmit, onSkip }) => {
  const [faithfulness, setFaithfulness] = useState(undefined);
  const [relevance, setRelevance] = useState(undefined);
  const [comments, setComments] = useState("");
  const [showError, setShowError] = useState(false);

  const resetFields = () => {
    setFaithfulness(undefined);
    setRelevance(undefined);
    setComments("");
    setShowError(false);
  };

  const handleSubmit = () => {
    if (faithfulness === undefined || relevance === undefined) {
      setShowError(true);
      return;
    }
    const evaluation = { id, faithfulness, relevance, comments };
    onSubmit(evaluation);
    resetFields();
  };

  const handleSkip = () => {
    onSkip();
    resetFields();
  };

  return (
    <Box
      sx={{
        border: "2px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        marginBottom: "24px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Query Section */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "16px",
          border: "1px solid #ddd"
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          Query:
        </Typography>
        <Typography variant="body1" sx={{ color: "#555" }}>
          {query}
        </Typography>
      </Box>

      {/* Context Section */}
      <Box
        sx={{
          backgroundColor: "#e8f5e9", // Light green for context
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "16px",
          border: "1px solid #ddd"
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
          Context:
        </Typography>
        <ReactMarkdown>{context}</ReactMarkdown>
      </Box>

      {/* Generated Response Section */}
      <Box
        sx={{
          backgroundColor: "#e3f2fd", // Light blue for response
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "16px",
          border: "1px solid #ddd"
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1565c0" }}>
          Generated Response:
        </Typography>
        <ReactMarkdown>{response}</ReactMarkdown>
      </Box>

      {/* Task Evaluation Section */}
      <Box
        sx={{
          backgroundColor: "#fbe9e7", // Light orange for task evaluation
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d84315" }}>
          Task Evaluation:
        </Typography>

        <Box sx={{ marginBottom: "8px" }}>
          <Typography>Faithfulness:</Typography>
          <Button
            variant={faithfulness === 1 ? "contained" : "outlined"}
            onClick={() => setFaithfulness(1)}
            sx={{ marginRight: "8px" }}
          >
            True
          </Button>
          <Button
            variant={faithfulness === 0 ? "contained" : "outlined"}
            onClick={() => setFaithfulness(0)}
            sx={{ marginRight: "8px" }}
          >
            False
          </Button>
        </Box>

        <Box sx={{ marginBottom: "8px" }}>
          <Typography>Relevance:</Typography>
          <Button
            variant={relevance === 1 ? "contained" : "outlined"}
            onClick={() => setRelevance(1)}
            sx={{ marginRight: "8px" }}
          >
            True
          </Button>
          <Button
            variant={relevance === 0 ? "contained" : "outlined"}
            onClick={() => setRelevance(0)}
            sx={{ marginRight: "8px" }}
          >
            False
          </Button>
        </Box>

        <Box>
          <Typography>Comments (optional):</Typography>
          <TextField
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            sx={{ marginTop: "8px" }}
          />
        </Box>

        <Box>
          {showError && (faithfulness === undefined || relevance === undefined) && (
            <Typography color="error" sx={{ mt: 2, mb: 2 }}>
              Please select both faithfulness and relevance before submitting
            </Typography>
          )}
        </Box>
      </Box>

      <Divider sx={{ margin: "16px 0" }} />

      <Box sx={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "16px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSkip}
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
  );
};

export default QuestionPanel;
