#/bin/bash

docker-compose run census-service knex migrate:latest --env development --knexfile app/knexfile.js
# there are no seeds to be run for production
# docker-compose run census-service knex seed:run --env development --knexfile app/knexfile.js
docker exec -it $(docker-compose ps -q census-db) su postgres -c "psql census_dev -f dump.sql 1>/dev/null"
