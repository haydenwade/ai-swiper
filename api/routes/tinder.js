const config = require('../../config');
const axios = require('axios');
const a = axios.create({
    baseURL: 'https://api.gotinder.com', //https://api.gotinder.com/v2/recs/core?locale=en
    headers: {
        'content-type': 'application/json',
        'x-auth-token': config.tinderAuthToken
    }
});

const storage = require('../utils/file-storage');
const mongo = require('../utils/mongo-client');

const parsePhotos = (photos) => {
    let images = [];
    for (let i = 0; i < photos.length; i++) {
        const temp = photos[i].url.split('/');

        const image = {
            url: photos[i].url,
            name: temp[temp.length - 1]
        }
        images.push(image);
    }
    return images;
};

let cachedProfiles = new Map();

const routes = {
    like: async (req, res) => {
        // console.log('like' + req.params.id + '|' + req.params.s_number)
        const profile = cachedProfiles.get(req.params.id);

        //save profile to db
        await mongo.insert('tinder1','likes', profile);

        //save images to file
        if (profile) {
            for (let i = 0; i < profile.photos.length; i++) {
                const photo = profile.photos[i];
                const name = photo.name.split('?')[0]
                storage.saveImageToFile(`./pics/likes/${name}`, photo.url);
            }
        }

        //tell tinder we like this person
        //https://api.gotinder.com/like/5157474dac70435241000154?locale=en
        const result = await a.post(`/like/${req.params.id}?locale=en`,{s_number: req.params.s_number});
        console.log(result);
        res.status(200);
        res.json(result.data);
    },
    dislike: async (req, res) => {
        const profile = cachedProfiles.get(req.params.id);

        //save profile to db
        await mongo.insert('tinder1','dislikes', profile);

        //save images to file
        if (profile) {
            for (let i = 0; i < profile.photos.length; i++) {
                const photo = profile.photos[i];
                const name = photo.name.split('?')[0]
                storage.saveImageToFile(`./pics/dislikes/${name}`, photo.url);
            }
        }

        //tell tinder we dislike this person
        //https://api.gotinder.com/pass/51bd37239d72d7892900000f?locale=en&s_number=19498852
        // console.log('dislike' + req.params.id + '|' + req.params.s_number)
        const result = await a.get(`/pass/${req.params.id}?locale=en&s_number=${req.params.s_number}`)
        console.log(result);
        res.status(200);
        res.json(result.data);
    },
    getProfiles: async (req, res) => {
        cachedProfiles.clear();

        const result = await a.get('v2/recs/core?locale=en');
        let profiles = [];
        for (let i = 0; i < result.data.data.results.length; i++) {
            const p = result.data.data.results[i];
            const profile = {
                id: p.user._id,
                s_number: p.s_number,
                name: p.user.name,
                bio: p.user.bio,
                birthDate: p.user.birth_date,
                photos: parsePhotos(p.user.photos),
                rawProfile: p
            };
            profiles.push(profile);
            //cache profiles for usage later
            cachedProfiles.set(profile.id, profile);
        }
        res.status(200);
        res.json(profiles);
    }
}

module.exports = routes;
