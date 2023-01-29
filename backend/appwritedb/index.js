const { Client, Databases, ID } = require("node-appwrite");
const axios = require("axios");

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("63d5326b15e8272efde2")
    .setKey(
        "05fe2d2072a82afdce35c676891deb6acc50bed11d937d6a99b1025c9956714ec5d1765852942657549f274352fb906e2de9c0be8690f51bf5f713ef1b69cbc8b5ee7d1dda511da1480f477239e63304a7e8136cabe8169b50015825d48bac0f1f9870f83e457bed38c81b3efd359af36341152fc90bb2aa080232990f3f8aab"
    );

const databases = new Databases(client);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getSessionToken() {
    return axios
        .get("https://opentdb.com/api_token.php?command=request")
        .then((res) => {
            const json = res.data;
            return json.token;
        });
}

async function fetchQuestions(token) {
    console.log("TOKEN: " + token);
    const url =
        "https://opentdb.com/api.php?amount=1&type=multiple&token=" + token;

    let count = 0;
    while (true) {
        const res = await axios.get(url);
        const json = res.data;
        const inquiry = json.results;

        console.log(json);

        if (json.response_code !== 0) break;

        const reformattedQuestion = {
            difficulty: inquiry[0].difficulty,
            question: inquiry[0].question,
            correct_answer: inquiry[0].correct_answer,
            incorrect_answers: inquiry[0].incorrect_answers,
        };

        // console.log(reformattedQuestion);

        const promise = databases.createDocument(
            "63d55c9825fa4c6999df",
            "63d56bdd20045447a7ee",
            ID.unique(),
            reformattedQuestion
        );

        promise.then(
            () => {
                count++;
                console.log("Saved question number: " + count);
            },
            (err) => {
                console.log(err);
            }
        );

        await sleep(500);
    }
    console.log("Finished: " + count);
}

getSessionToken().then((token) => {
    fetchQuestions(token);
});
