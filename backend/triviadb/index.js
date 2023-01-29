const mongoose = require("mongoose");
const axios = require("axios");

mongoose.set("strictQuery", false);

const uri =
    "mongodb+srv://BackendBarry:barry123@triviaquestions.wvy7p.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const questionSchema = new mongoose.Schema({
    difficulty: String,
    question: String,
    correct_answer: String,
    incorrect_answers: [String],
});

const Question = mongoose.model("Question", questionSchema, "questions");

async function getSessionToken() {
    return axios
        .get("https://opentdb.com/api_token.php?command=request")
        .then((res) => {
            const json = res.data;
            return json.token;
        });
}

//const token = getSessionToken();

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

        const reformattedQuestion = new Question({
            difficulty: inquiry[0].difficulty,
            question: inquiry[0].question,
            correct_answer: inquiry[0].correct_answer,
            incorrect_answers: inquiry[0].incorrect_answers,
        });

        // console.log(reformattedQuestion);

        reformattedQuestion.save((err) => {
            if (err) return console.error(err);
            //done(null, data);
        });

        count++;
        console.log("Saved question number: " + count);
    }
    console.log("Finished: " + count);
}

getSessionToken().then((token) => {
    fetchQuestions(token);
});

// https://opentdb.com/api_token.php?command=request

//json.response_code === 0
