# Base image
FROM node:13.12.0-alpine as react-build

# Create app directory
WORKDIR /usr/src/app

# copy everything except .dockerignore to working directory
COPY . ./

# RUN npm install react-scripts -g
RUN npm install
RUN npm run build

FROM nginx:alpine
# copy build artifacts
COPY --from=react-build /usr/src/app/build /usr/share/nginx/html
# expose and serve files
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
