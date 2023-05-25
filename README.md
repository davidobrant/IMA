# IMA
Examensarbete


## Database

run mysql:8.0 with docker on port 3306


## Backend

### .env

PORT=4000

DB_HOST='127.0.0.1'

DB_USER='root'

DB_PASSWORD='password'

DB_DATABASE='IMA'

DB_PORT='3306'

ACCESS_TOKEN_SECRET=supersecretstring

### Installation 

npm install

npm run createDB

npm run createTables

npm run createData

npm run start


## Frontend

### .env

NEXT_PUBLIC_DOMAIN=localhost

NEXT_PUBLIC_BASE_URL=localhost:4000/api

### Installation

yarn

yarn dev
