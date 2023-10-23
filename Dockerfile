###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

WORKDIR "/app"

COPY --chown=node:node --chmod=775 docker-entrypoint.sh                  /usr/local/bin/docker-entrypoint.sh
COPY --chown=node:node --from=build /usr/src/app/package.json           ./package.json
COPY --chown=node:node --from=build /usr/src/app/package-lock.json      ./package-lock.json
COPY --chown=node:node --from=build /usr/src/app/node_modules           ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist                   ./dist

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]