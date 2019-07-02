FROM node:12.2.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . .
RUN npm install

# start app
CMD ["npm", "start"]