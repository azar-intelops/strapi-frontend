FROM node:18-alpine

WORKDIR /app

ADD ./package.json /app

ADD ./package-lock.json /app

#ADD ./.env.development /app

RUN npm install --frozen-lockfile

ADD . /app

EXPOSE 3000
EXPOSE 80

CMD ["npm","run", "dev"]
