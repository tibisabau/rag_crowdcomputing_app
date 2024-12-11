import QuestionPanel from "./QuestionPanel";
import React from "react";
import {Typography} from "@mui/material";

const introductionStages = [
    [
    <div>
        <Typography variant="h3">Welcome to this survey</Typography>
        <br/>
        <p>
            This survey aims to collect human evaluations of RAG Search responses.
            RAG (Retrieval-augmented generation) Search is an Artificial Intelligence technique that combines
            the natural language capabilities of Large Language Models (LLMs) with the functionality
            of information retrieval systems, such as traditional search engines.
            The goal of a RAG Search model is to provide users with a chat-interface which can provide more accurate,
            factually supported, and updated answers than chatbots that only rely on an LLM. To train a RAG model,
            evaluations of its output responses are needed.
            <br/>
            <br/>
            <b>No prior knowledge</b> of or experience with RAG chatbots is <b>required</b>.
            The specific RAG model that participants will be evaluating deals with questions
            posed by medial professionals. However, no medical knowledge is needed to complete the tasks.
            <br/>
            <br/>
            On the other hand, we do believe that completing the tasks will be easier and faster when participants
            have a general understanding of what data they are working with. Therefore, <b>we kindly ask you to read
            the information in the next section</b>. Additionally, we will provide concrete examples on how to complete
            the tasks and there will be a qualification test to verify you understand how to complete the tasks.
            <br/>
            <br/>
            In the task, the queries and responses are in English.
            However, the information that the RAG chatbot cites as its source is mostly in Dutch.
            Therefore, <b>proficiency of Dutch <u>and</u> English is required to participate</b>.
            If you Dutch is not you first language and you do not have significant experience
            with reading more complex Dutch texts, then you cannot complete the tasks.
            Similarly, if your first language is Dutch, but you struggle with English,
            then it will not be possible for you to participate.
            <br/>
            <br/>
            <Typography variant="h4">Background</Typography>
            This survey is part of larger research into improving human trust in conversational artificial intelligence,
            specifically in the domain of healthcare. Artificial intelligence can be a very powerful tool that can help
            both medical professionals and patients find reliable information faster and in a more user friendly way.
            A common pitfall of AI tools is that they sometimes respond with incorrect information
            or do not answer the question completely.
            Obviously, this is far from ideal for a tools that needs to provide medical information.
            That is why this research investigates methods to improve these
            conversational AI tools aimed at the medical sector.
            <br/>
            <br/>
            RAG search is a tool that by design can come up with accurate factual responses.
            This is because with RAG search the information retrieval and natural language
            response generation are separated.
            A RAG search tool first searches for information on the query in a more traditional database
            and uses the found information to generate a response in natural language.
            While this is in general more accurate than other types of AI chatbots, it is not perfect.
            Even if the retrieved information is correct,
            the response generation can still cause the result to contain mistakes or be off topic.
            <br/>
            <br/>
            Mistakes can be kept to a minimum by training the RAG system.
            For this training, we need evaluations of the responses,
            i.e. we need to know if the response is good or bad.
            Obtaining these evaluations can be cumbersome for a large amount of responses.
            Usually, evaluations are obtained automatically by having a different AI tools look at them.
            While these automatic evaluations are decently accurate, they can differ from evaluations made by humans.
            To improve RAG search, we are interested in how accurate automatic evaluations are to human evaluations
            and how the might differ. Therefore, we have created this survey to obtain some human RAG search evaluations.
            <br/>
            <br/>
            <Typography variant="h4">Your task</Typography>
            We will present you with an number of queries asked to a RAG search tool.
            Your task is to determine if the response to each query good or not given the information
            that the tool has retrieved.
            We will ask you to score this based on two metrics, namely Faithfulness and Relevance.
            A response is faithful when it matches the information that was retrieved.
            This has noting to do with if it is true or not, just that the response only contains facts that are
            also in the retrieved information. A response is relevant if it answers the user's question (the query)
            and doesn't go off topic.
            This has nothing to do with factual mistakes or the exact retrieved information,
            just that the response suits the query.
            <br/>
            <br/>
            For each set of a query, a context (the retrieved information),
            and the response you have to indicate if the response is faithful or not and if it is relevant or not.
            Additionally, you have to provide a motivation for these two ratings by copying the part
            of the response which you base your reasoning on and pasting it if the provided field.
            <br/>
            <br/>
            If you are interested in participating, click continue.
        </p>
    </div>,
        "continue"
    ],
    [
    <div>
        <Typography variant="h3">Informed Consent Statement</Typography>
        <br/>
        <p>
            We believe that for every type of research informed consent of participants is a vital responsibility.
            To that end we ask you to <b>read</b> the following information
            and <b>consent</b> to the use of the collected data if you wish to participate.
            <br/>
            <br/>
            This crowd sourcing survey is part of broader research into improving human trust in conversational
            artificial intelligence, specifically in the domain of healthcare.
            The research is carried out by researchers and students of
            the <a href="https://www.tudelft.nl">Delft University of Technology</a> in the Netherlands.
            The specific goal of this survey is obtain human evaluations of RAG search responses.
            In this survey, you will be presented with the details of a RAG search query relating to medical questions
            and asked to evaluate the response based on two metrics.
            In total, this will take up about 30-90 minutes of your time.
            <br/>
            <br/>
            By participating in this study, you contribute to making AI more trustworthy.
            Next to that, there is a monetary reward for successfully completing the tasks.
            The exact amount you will be awarded is listed on this survey's prolific page.
            However, we reserve the right to deny this reward if there are clear indications
            that you did not complete the tasks with a reasonable degree of carefulness and accuracy,
            or if you skip a significant portion of the tasks.
            <br/>
            <br/>
            All data that is collected trough your participation is stored <b>completely anonymous</b>.
            That is, the only thing that is stored are the responses you fill in.
            No personal data relating to you or you Prolific account is required or stored.
            There will be no questions relating to your personal situation or experiences.
            Therefore, the stored data can in no way be traced back to you.
            For this reason, it is not possible to request for your answers to be deleted.
            The only people with direct access to the data are the principal researcher
            and the maintainers of this crowd sourcing web-app.
            The collected data, in whole or in part, may in the future be publicly published for scientific
            or educational purposes, or reused in future research.
            To that end, we reserve the right to retain the data indefinitely.
            <br/>
            <br/>
            The tasks in this survey will mention specific diseases and medical conditions.
            The tasks involve reading texts from medical sources that can describe specific symptoms and treatments.
            However, we stress that this is only in textual format and that no images or videos will be shown in any way.
            Participants that have negative personal experiences with a mentioned disease or condition
            and are sensitive to the topic can experience some degree of stress or anxiety while completing the tasks.
            If you think you might experience mental discomfort when reading about certain medical topics,
            we advise you do not participate in this survey.
            <br/>
            <br/>
            If you have any questions or concerns about this statement, this survey, or this research in general,
            feel free to contact the responsible researcher, ir. Shatha Degachi, PhD candidate at the Faculty of Industrial Design Engineering
            of TU Delft at <a href="mailto:C.Degachi@tudelft.nl">C.Degachi@tudelft.nl</a>.
            <br/>
            <br/>
            By clicking the button below, I acknowledge that I have read and understood the information presented above
            dated 11-12-2024
            and that I am aware of the described risks, and I consent voluntarily to be a participant in this research
            and to the described use of the data I submit.
        </p>
    </div>,
        "I consent"
    ],
    [
    <div>
        <Typography variant="h3">How to complete the tasks?</Typography>
        <br/>
        <p>
            For each task you are presented with a query (a question that was asked by a user),
            a context (the information that was retrieved by the RAG system from its database),
            and a response (the natural language answer generated from the context and sent to the user).
            <br/>
            <br/>
            Your task is to determine if the response is faithful or not and if it is relevant or not.
            <br/>
            <br/>
            A response is <b>faithful</b> when it matches the information that was retrieved.
            This has noting to do with if it is true or not, just that the response only contains facts that are
            also in the retrieved information. For example, when a response is a good answer to the query and everything
            in the response is true, but the response contains <b>information that was not in the context</b>,
            we say that the response is <b><u>not</u> faithful</b>.
            <br/>
            <br/>
            A response is <b>relevant</b> if it answers the user's question (the query) and doesn't go off topic.
            This has nothing to do with factual mistakes or the exact retrieved information,
            just that the response suits the query.
            For example, when a response is a good summary of the context, but is does not answer the question,
            we say that the response is <b><u>not</u> relevant</b>.
            Furthermore, when a response is a good summary of the context and it <b>answers the question</b>,
            but it also <b>contains a lot more information that is not related</b> to the query,
            we also say that the response is <b><u>not</u> relevant</b>.
            <br/>
            <br/>
            <Typography variant="h4">Examples</Typography>
            To make it more clear what is faithfulness and relevance are, and to show you how to complete the tasks,
            we give you a couple simple examples in the same format as the tasks.
            <br/>
            <br/>
            <Typography variant="h5">Example 1</Typography>
            <br/>
            <QuestionPanel
                query={"What is the capital of France?"}
                context={"Paris is the capital of France. It is the largest city in the country." +
                    " Paris is famous for the Louvre museum and the Eiffel tower. " +
                    "The Louvre museum is the most visited museum in the world."}
                response={"The capital and largest city of France is Paris."}
            />
            In the example we see a simple query, a context with three facts, and the response.
            In this example the response is both faithful and relevant.
            It is faithful because it only contains information from the context.
            It is relevant because is answers the question and does not contain any unrelated information.
            While the response includes some additional information that was not specifically asked in the query
            (Paris is France's largest city), the response as a whole is not irrelevant
            because this fact is very closely related to the concept of a capital city
            and does not distract from the core answer (Paris is the capital of France).
            <br/>
            <br/>
            In the task, you would answer as follows:
            <br/>
            Faithful: True
            <br/>
            Relevant: True
            <br/>
            Motivation for Faithfulness: capital and largest city is Paris
            <br/>
            Motivation for Relevance: capital and largest city is Paris
            <br/>
            <br/>
            In this case the response is very short and the motivation covers the entire sentence.
            In the real tasks the responses can be a lot longer and we ask you to only select
            the specific parts related to the motivation.
            This can be a large part of text, but try not to select the entire response.
            <br/>
            <br/>
            <Typography variant="h5">Example 2</Typography>
            <br/>
            <QuestionPanel
                query={"What is the capital of France?"}
                context={"Paris is the capital of France. It is the largest city in the country." +
                    " Paris is famous for the Louvre museum and the Eiffel tower. " +
                    "The Louvre museum is the most visited museum in the world."}
                response={"The capital of France is Paris. It is the largest city in France and in Europe."}
            />
            Simliar to the previous example, this one is relevant.
            However, it is not faithful because it contains information that is not in the context
            (Paris is the largest city in Europe). Because the response contains information that is not in the context,
            it also introduces a faction mistake: Paris is in fact not the largest city in Europe.
            However, even if this were correct, we would still say the response is unfaithfull,
            because the information is not in the context.
            <br/>
            <br/>
            In the task, you would answer as follows:
            <br/>
            Faithful: False
            <br/>
            Relevant: True
            <br/>
            Motivation for Faithfulness:  It is the largest city in in Europe.
            <br/>
            Motivation for Relevance: The capital of France is Paris.
            <br/>
            <br/>
            <Typography variant="h5">Example 3</Typography>
            <br/>
            <QuestionPanel
                query={"What is the capital of France?"}
                context={"Paris is the capital of France. It is the largest city in the country." +
                    " Paris is famous for the Louvre museum and the Eiffel tower. " +
                    "The Louvre museum is the most visited museum in the world."}
                response={"The capital of France is Paris. It is famous for the Louvre Museum and the Eiffel tower. " +
                    "The Louvre museum is the most visited museum in the world."}
            />
            This example is definitely faithful, because is almost completely resembles the context and not a word more.
            However, it is not relevant, because it contains a lot of information that was not asked for in the query
            (It is famous for the Louvre Museum and the Eiffel tower. The Louvre museum is the most visited museum
            in the world.).
            <br/>
            <br/>
            In the task, you would answer as follows:
            <br/>
            Faithful: True
            <br/>
            Relevant: False
            <br/>
            Motivation for Faithfulness:  The capital of France is Paris.  Louvre Museum and the Eiffel tower.
            Louvre museum is the most visited museum in the world.
            <br/>
            Motivation for Relevance:  Louvre Museum and the Eiffel tower. Louvre museum is the most visited museum
            in the world.
            <br/>
            <br/>
            <Typography variant="h5">Example 4</Typography>
            <br/>
            <QuestionPanel
                query={"What is the capital of France?"}
                context={"Paris is the capital of France. It is the largest city in the country." +
                    " Paris is famous for the Louvre museum and the Eiffel tower. " +
                    "The Louvre museum is the most visited museum in the world."}
                response={"Paris, also known as the city of lights, is famous for the Eiffel tower."}
            />
            This response is neither faithful nor relevant.
            It is not faithful because it contains information that is not in the context (also known as the city of lights).
            It is not relevant because it does not clearly answer the question
            (It just only mentions Paris and does not state that it is indeed France's largest city)
            and contains a lot of information that does not relate to the query
            (city of lights, is famous for the Eiffel tower).
            <br/>
            <br/>
            In the task, you would answer as follows:
            <br/>
            Faithful: False
            <br/>
            Relevant: False
            <br/>
            Motivation for Faithfulness:  also known as the city of lights
            <br/>
            Motivation for Relevance:  also known as the city of lights, is famous for the Eiffel tower.
            <br/>
            <br/>
            <br/>
            <Typography variant="h4">A practical note</Typography>
            <br/>
            All of these examples are fairly simple to illustrate the meanings of faithfulness and relevance.
            Please be aware that the responses in the real tasks can be much longer than this.
            A long response does not necessarily mean that it is not relevant.
            Every sentence can still relate to the query.
            The contexts are usually also longer. You must read the context carefully before deciding
            if a response if faithful or not:
            the response can paraphrase information from the context.
            Finally, faithfulness and relevance are often not as black and white as in these examples.
            Read everything carefully. If you are in doubt it is better to answer not relevant or not faithful,
            because for a good response these things should be clear.
            If you are really not sure if something counts as relevant or not you can skip a task.
            However, do note that skipping too many tasks will affect your reward,
            as we do not consider the survey completed when a significant part of the tasks are left unanswered.
            <br/>
            <br/>
            Remember, by participating in this study, you contribute to making AI more trustworthy.
            Reliable artificial intelligence in the healthcare sector can help doctors and other medical professionals
            to do their job more efficiently, allowing them to help more patients.
            Your answers have an impact on the training of these AI tools, so please complete the tasks carefully
            and do not provide random answers or educated guesses.
            <br/>
            <br/>
        </p>

    </div>,
        "I understand, next"
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