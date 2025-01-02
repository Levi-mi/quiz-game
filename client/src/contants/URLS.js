const port = '3001';
const baseUrl = 'http://localhost:' + port;

const URLs = {
    login: baseUrl + '/auth/login',
    register: baseUrl + '/auth/register',
    info: baseUrl + '/auth/info',
    logout: baseUrl + '/auth/logout',
    questionsByCategory: baseUrl + '/questions',
    questionsAll: baseUrl + '/questions/all',
    questionsRandom: baseUrl + '/questions/random',
    categories: baseUrl + '/categories',
}

export default URLs