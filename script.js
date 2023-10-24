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
// displays and shuffle answers 
function renderAnswers(correctAnswer, incorrectAnswers){
    const allAnswers = [correctAnswer, ...incorrectAnswers];

    // Shuffle the answers 
    for (let i = allAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]]; // Swap elements to shuffle
    }

    // Render the shuffled answers to HTML
    for (let i = 0; i < allAnswers.length; i++) {
        const answerElement = $(`#answer-${i + 1}`);
        answerElement.html(allAnswers[i]);
        //Add class to answers
        if(allAnswers[i] === correctAnswer){
            answerElement.addClass('correct-answer');
        }else {
            answerElement.addClass('incorrect-answer');
        }
        
        answerElement.on('click', function() {
            // Disable all buttons
            $('button').prop('disabled', true);

            // Enable the clicked button
            answerElement.prop('disabled', false);
            
            //Create feedback element
            const feedback = $('.result');

            if (answerElement.hasClass('correct-answer')){
                feedback.html('Correct!');
                feedback.css({
                    "background-color": "#8fa787"
                })
            }else {
                feedback.html('Incorrect! The answer is ' + correctAnswer);
                feedback.css({
                    "background-color": "#ff6961"
                })
                
            }

            // Append the feedback to a container 
            $('this').append(feedback);
        });

        
    }
    
}

getQuestions();