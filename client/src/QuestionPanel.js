import React from "react";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

const QuestionPanel = ({ query, context1, context2, response }) => {
  return (
    <Box
      sx={{
        padding: "2px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Query Section */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: "2%",
          borderRadius: "1vh",
          marginBottom: "2%",
          border: "0.2vh solid #ddd",
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
          padding: "2%",
          borderRadius: "1vh",
          marginBottom: "2%",
          border: "0.2vh solid #ddd",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
          Context 1:
        </Typography>
        <ReactMarkdown>{context1}</ReactMarkdown>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
          Context 2:
        </Typography>
        <ReactMarkdown>{context2}</ReactMarkdown>
      </Box>

      {/* Generated Response Section */}
      <Box
        sx={{
          backgroundColor: "#e3f2fd", // Light blue for response
          padding: "2%",
          borderRadius: "1vh",
          marginBottom: "2%",
          border: "0.2vh solid #ddd",
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
