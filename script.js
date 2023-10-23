

function getQuestions() {
    //get questions from api
    $.get("https://opentdb.com/api.php?amount=10&category=20&type=multiple", 
    (data) => {
        
    let query = data.results[0];
    console.log(query)
    renderQuestion(data.results[0].question);
    renderAnswers(query.correct_answer, query.incorrect_answers);
    });
}

//displays question
function renderQuestion(question){
    let $mythQuestion = $("#myth-question");
    $mythQuestion.html(question);
}
// displays answers (set in current spots)
function renderAnswers(correctAnswer, incorrectAnswers){
    $("#answer-one").html(correctAnswer);
    $("#answer-two").html(incorrectAnswers[0]);
    $("#answer-three").html(incorrectAnswers[1]);
    $("#answer-four").html(incorrectAnswers[2]);
}


getQuestions();