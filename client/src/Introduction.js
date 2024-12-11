import QuestionPanel from "./QuestionPanel";
import React from "react";
import {Typography} from "@mui/material";

const introductionStages = [
    [
    <div>
        <Typography variant="h3">Welcome</Typography>
    </div>,
        "ButtonName"
    ],
    [
    <div>
        <Typography variant="h3">Informed Consent Statement</Typography>
    </div>,
        "ButtonName"
    ],
    [
    <div>
        <Typography variant="h3">About RAG search evaluation</Typography>
        <Typography variant="h4">Examples</Typography>
        <QuestionPanel
            query={"hello"}
            context={"There"}
            response={"eer"}
        />
    </div>,
        "ButtonName"
    ],
    [
    <div>
        <Typography variant="h3">Qualification Test</Typography>
        <p>
            You are about to start the <b>Qualification test</b>.
            Successfully completing the qualification test is required for starting the real evaluation tasks.
            In the qualification test you will be presented with five RAG evaluation tasks.
            The goal is the same as in the real evaluation: to <b>determine</b> whether the response is faithful and relevant
            and to <b>copy</b> the text from the response that motivates your answer.
            <br/>
            <br/>
            If you understand the concepts of faithfulness and relevance,
            then the questions should not be so difficult for you.
            Remember to always select <b>at least one sentence, but not the whole response </b> as your motivation.
            <br/>
            <br/>
            Good luck!
        </p>
    </div>,
        "Start"
    ]
]

export default introductionStages