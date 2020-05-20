
const axios = require('axios');
const a = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'content-type': 'application/json'
    }
});

export const api = {
    getProfiles: () => {
        return a.get('/profiles');
    },
    like: (id, s_number) => {
        return a.get(`like/${id}/${s_number}`)
    },
    dislike: (id, s_number) => {
        return a.get(`dislike/${id}/${s_number}`)
    }
}