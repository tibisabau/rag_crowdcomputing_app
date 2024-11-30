import React from "react";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

const QuestionPanel = ({ query, context, response }) => {
  return (
    <Box
      sx={{
        padding: "16px",
        backgroundColor: "#f9f9f9",
        // Reduce the top margin to account for the fixed header height
        marginTop: "120px",
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
          Response:
        </Typography>
        <ReactMarkdown>{response}</ReactMarkdown>
      </Box>
    </Box>
  );
};

export default QuestionPanel;
