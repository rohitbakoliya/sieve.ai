FROM node

WORKDIR /app

COPY package.json ./

RUN npm i -g yarn

COPY ./api/package.json ./api/
COPY ./api/yarn.lock ./api/


COPY ./client/package.json ./client/
COPY ./client/yarn.lock ./client/

RUN cd api && yarn install --production
RUN cd client && yarn install --production

COPY ./client /app/client
COPY ./api /app/api

WORKDIR ./packages/api

RUN yarn build

ENV NODE_ENV production

EXPOSE 5000

CMD ["yarn", "start"]