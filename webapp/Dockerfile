FROM node

WORKDIR /app

COPY package.json ./

COPY ./api/package.json ./api/
COPY ./api/yarn.lock ./api/


COPY ./client/package.json ./client/
COPY ./client/yarn.lock ./client/

RUN cd api && yarn install --production
RUN cd client && yarn install --production

COPY ./client /app/client
COPY ./api /app/api
COPY ./uploads /app/uploads

WORKDIR /app/api

RUN yarn build

EXPOSE 5000

CMD ["npm", "start"]