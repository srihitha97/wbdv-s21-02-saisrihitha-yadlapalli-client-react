const QUIZZES_URL = 'https://siri-node.herokuapp.com/api/quizzes';

export const findQuestionsForQuiz = (qid) =>
    fetch(`${QUIZZES_URL}/${qid}/questions`)
        .then(response => response.json())

const api = {
    findQuestionsForQuiz
}

export default api;
