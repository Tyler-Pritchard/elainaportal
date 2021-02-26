const axios = require("axios");
const dialogflow = require("@google-cloud/dialogflow");
const dotenv = require("dotenv").config();
const chalk = require("chalk");

module.exports = async (app) => {
    app.post("/api/webhook", async (req, res, next) => {
        const query = req.body;

        const projectId = process.env.GCP_PROJECT_ID;
        const sessionId = "123456";
        const queries = [...req.body];
        const languageCode = "en";
        const sessionClient = new dialogflow.SessionsClient();

        async function detectIntent(
            projectId,
            sessionId,
            query,
            contexts,
            languageCode
        ) {
            // The path to identify the agent that owns the created intent.
            const sessionPath = sessionClient.projectAgentSessionPath(
                projectId,
                sessionId
            );

            // The text query request.
            const request = {
                session: sessionPath,
                queryInput: {
                    text: {
                        text: query,
                        languageCode: languageCode,
                    },
                },
            };

            if (contexts && contexts.length > 0) {
                request.queryParams = {
                    contexts: contexts,
                };
            }

            const responses = await sessionClient.detectIntent(request);
            return responses[0];
        }

        async function executeQueries(
            projectId,
            sessionId,
            queries,
            languageCode
        ) {
            // Keeping the context across queries let's us simulate an ongoing conversation with the bot
            let context;
            let intentResponse;
            for (const query of queries) {
                try {
                    console.log(`Sending Query: ${query}`);
                    intentResponse = await detectIntent(
                        projectId,
                        sessionId,
                        query,
                        context,
                        languageCode
                    );

                    const detectedIntent =
                        intentResponse.queryResult.intent.displayName;
                    const fulfillmentText =
                        intentResponse.queryResult.fulfillmentText;

                    console.log(
                        chalk.blueBright("Detected intent:"),
                        chalk.green(detectedIntent)
                    );

                    console.log(
                        chalk.blueBright("Fulfillment Text: "),
                        fulfillmentText
                    );
                    // Use the context from this response for next queries
                    context = intentResponse.queryResult.outputContexts;

                    return fulfillmentText;
                } catch (error) {
                    console.log(error);
                }
            }
        }
        const response = await executeQueries(
            projectId,
            sessionId,
            queries,
            languageCode
        );

        console.log(chalk.blueBright("Fulfillment Text: "), response);
        res.send(response);
    });
};
