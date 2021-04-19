#
# Expects the source Git repo to be the 'docker build' context
#
#FROM ubuntu:focal as builder
FROM node:15-buster as builder

ARG DEBIAN_FRONTEND=non-interactive

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg |  apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
 && apt update \
 && apt -y install yarnpkg

WORKDIR /usr/src/app
COPY . .
RUN rm -rf node_modules && yarnpkg install --frozen-lockfile

ARG TINI_VERSION=v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

ARG PORT=5000
ARG API_URL=
ENV NODE_ENV=production
USER node

# Runs "/usr/bin/dumb-init -- /my/script --with --args"
ENTRYPOINT ["/tini", "--"]
CMD ["yarnpkg", "node", "scripts", "serve"]
