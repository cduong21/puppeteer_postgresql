FROM zenato/puppeteer-renderer
USER root
COPY package*.json ./
RUN npm install
WORKDIR /app
ADD . /app
EXPOSE 9070 
STOPSIGNAL SIGINT
CMD npm run start

