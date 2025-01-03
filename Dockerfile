FROM node:latest

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json  ./

COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install --legacy-peer-deps
# Can you add a script to the global package.json that does this?
RUN cd packages/db && npx prisma generate && cd ../..

# Can you filter the build down to just one app?
RUN yarn run build

CMD ["npm", "run", "start-user-app"]