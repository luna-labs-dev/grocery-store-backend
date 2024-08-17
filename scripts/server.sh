#!/bin/sh

(cd /home/ubuntu/app/backend && node_modules/.bin/prisma generate)
(cd /home/ubuntu/app/backend && node_modules/.bin/prisma migrate deploy)
(cd /home/ubuntu/app/backend && node dist/prisma/seed.js)
(cd /home/ubuntu/app/backend && node dist/src/main/server.js)
