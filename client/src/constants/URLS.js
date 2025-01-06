const port = '3001';
const baseUrl = 'http://localhost:' + port;

const URLs = {
    // Auth related endpoints
    login: baseUrl + '/auth/login',
    register: baseUrl + '/auth/register',
    info: baseUrl + '/auth/info',
    logout: baseUrl + '/auth/logout',
    
    // Questions related endpoints
    questionsByCategory: baseUrl + '/questions',
    questionsAll: baseUrl + '/questions/all',
    questionsRandom: baseUrl + '/questions/random',
    
    // Categories related endpoints
    categories: baseUrl + '/categories',
    
    // Records related endpoints
    newRecord: baseUrl + '/records/new',
    getRecords: baseUrl + '/records',
    getLeaderboard: baseUrl + '/records/leaderboard',
    getUserRecords: (userId) => baseUrl + `/records/history/${userId}`,
    deleteRecord: (recordId) => baseUrl + `/records/delete/${recordId}`,
}

export default URLs