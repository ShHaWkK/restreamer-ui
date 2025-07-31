ARG NODE_IMAGE=node:21-alpine3.20
ARG CADDY_IMAGE=caddy:2.8.4-alpine

FROM $NODE_IMAGE AS builder

ARG REACT_APP_DEFAULT_CORE_ADDRESS
ENV REACT_APP_DEFAULT_CORE_ADDRESS=${REACT_APP_DEFAULT_CORE_ADDRESS}
ENV PUBLIC_URL="./"

WORKDIR /ui
COPY . /ui

RUN yarn install && \
    yarn build

FROM $CADDY_IMAGE

WORKDIR /ui
COPY --from=builder /ui/build /ui/build
COPY --from=builder /ui/Caddyfile /ui/Caddyfile

EXPOSE 80

CMD [ "caddy", "run", "--config", "/ui/Caddyfile" ]
