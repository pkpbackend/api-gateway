FROM node:20.10.0-alpine as build
WORKDIR /app
COPY . .
COPY yarn.stable.lock yarn.lock
RUN yarn install && yarn build
FROM node:20.10.0-alpine
WORKDIR /app
COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/package.json .
COPY --from=build /app/docs docs
COPY --from=build /app/public public
COPY --from=build /app/views views
CMD ["yarn","start-docker"]
