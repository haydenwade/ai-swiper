## Run with Docker
docker build . -t ai-swiper

docker run -d --restart always --hostname ai-swiper --name ai-swiper -p 4001:8080 ai-swiper

docker run -d --restart always --hostname ai-swiper --name ai-swiper -p 8080:4001 ai-swiper



## Setup
1. create `./pics/dislikes` and `./pics/likes`
2. add `.env` using `.env.template`
2.1 assumes you have mongo db


## Mongo Setup
`sudo docker run -d -p 27017:27017  mongo`
or with volume:
`mkdir ~/mongodata`
`sudo docker run -d -p 27017:27017 -v ~/mongodata:/data/db mongo`
