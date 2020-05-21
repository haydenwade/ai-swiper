const config = {
    tinderAuthToken: process.env.TINDER_AUTH_TOKEN || 'TODO',
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/test'
}
module.exports = config;