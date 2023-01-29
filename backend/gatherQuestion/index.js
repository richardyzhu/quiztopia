const axios = require("axios");

// getSessionToken() retrieves the session token for the trivia. This means that there wont be any repeats
//    Need to call this function once every ~4000 questions to refresh the database
//    Can save the token variable in a .env file
async function getSessionToken() {
    return axios
        .get("https://opentdb.com/api_token.php?command=request")
        .then((res) => {
            const json = res.data;
            return json.token;
        });
}

const token =
    "7a1bbde5a97518935f5f00487ce6558290d69101b1b1e05db580c095e6aea949";

async function getTrivia(url) {
    const response = await axios.get(url);
    const json = response.data;
    return json;
}

async function fetchQuestion(token) {
    // console.log("TOKEN: " + token);
    const url =
        "https://opentdb.com/api.php?amount=1&type=multiple&token=" + token;

    const json = await getTrivia(url);

    if (json.response_code !== 0) {
        getSessionToken().then((token) => {
            fetchQuestion(token);
        });
    } else {
        return {
            difficulty: json.results[0].difficulty,
            question: json.results[0].question,
            correct_answer: json.results[0].correct_answer,
            incorrect_answers: json.results[0].incorrect_answers,
        };
    }
}

async function main() {
    const triviaQ = await fetchQuestion(token);
    console.log(triviaQ);
}

main();
