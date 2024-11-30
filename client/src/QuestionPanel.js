import React, { useState } from "react";
import { Box, Button, Typography, TextField, Divider } from "@mui/material";
import ReactMarkdown from "react-markdown";

const QuestionPanel = ({ query, context, response, onSubmit, initialData }) => {
  const [faithfulness, setFaithfulness] = useState(initialData.faithfulness || "Not sure");
  const [relevance, setRelevance] = useState(initialData.relevance || "Not sure");
  const [comments, setComments] = useState(initialData.comments || "");

  const handleSubmit = () => {
    const task = { faithfulness, relevance, comments };
    onSubmit(task);
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
            variant={faithfulness === "True" ? "contained" : "outlined"}
            onClick={() => setFaithfulness("True")}
            sx={{ marginRight: "8px" }}
          >
            True
          </Button>
          <Button
            variant={faithfulness === "False" ? "contained" : "outlined"}
            onClick={() => setFaithfulness("False")}
            sx={{ marginRight: "8px" }}
          >
            False
          </Button>
          <Button
            variant={faithfulness === "Not sure" ? "contained" : "outlined"}
            onClick={() => setFaithfulness("Not sure")}
          >
            Not sure
          </Button>
        </Box>

        <Box sx={{ marginBottom: "8px" }}>
          <Typography>Relevance:</Typography>
          <Button
            variant={relevance === "True" ? "contained" : "outlined"}
            onClick={() => setRelevance("True")}
            sx={{ marginRight: "8px" }}
          >
            True
          </Button>
          <Button
            variant={relevance === "False" ? "contained" : "outlined"}
            onClick={() => setRelevance("False")}
            sx={{ marginRight: "8px" }}
          >
            False
          </Button>
          <Button
            variant={relevance === "Not sure" ? "contained" : "outlined"}
            onClick={() => setRelevance("Not sure")}
          >
            Not sure
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
      </Box>

      <Divider sx={{ margin: "16px 0" }} />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ display: "block", margin: "0 auto", marginTop: "16px" }}
      >
        Submit Task
      </Button>
    </Box>
  );
};

export default QuestionPanel;
