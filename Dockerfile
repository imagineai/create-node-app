FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Both package.json AND yarn.lock are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "yarn", "start-dev" ]
