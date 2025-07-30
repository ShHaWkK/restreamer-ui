ARG NODE_IMAGE=node:21-alpine3.20
ARG CADDY_IMAGE=caddy:2.8.4-alpine

FROM $NODE_IMAGE AS builder

ARG REACT_APP_DEFAULT_CORE_ADDRESS=http://localhost:8084
ENV PUBLIC_URL="./"
ENV REACT_APP_DEFAULT_CORE_ADDRESS=$REACT_APP_DEFAULT_CORE_ADDRESS

COPY . /ui

WORKDIR /ui

RUN cd /ui && \
	yarn install && \
	yarn build

FROM $CADDY_IMAGE

COPY --from=builder /ui/build /ui/build
COPY --from=builder /ui/Caddyfile /ui/Caddyfile

WORKDIR /ui

EXPOSE 3000

CMD [ "caddy", "run", "--config", "/ui/Caddyfile" ]
