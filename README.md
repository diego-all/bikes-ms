# bikes-ms

Bikes app - Microservices oriented architecture


    docker run -d --name bikes-db \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=password \
    diegoall1990/bikes-db:0.0.1



    docker build -t diegoall1990/backend-users:0.0.1 .

    docker run -d -p 2000:2000 --name backend-users diegoall1990/backend-users:0.0.1

    docker exec -it bikes-db mysql -u root -p

    docker network connect ciclasnet backend-users


    docker build -t diegoall1990/backend-bikes:0.0.1 .
    
    docker run -d -p 3001:3001 --name backend-bikes diegoall1990/backend-bikes:0.0.1

    docker logs -f backend-bikes-ms



Para visualizar los parametros de la red.

    docker network inspect ciclasnet

Conectar el contenedor de bd nuevo a esa red.

    docker network connect ciclasnet bikes-db

Ahora falta correr nuestra aplicacion conectada a esta red.

    docker network connect ciclasnet backend-bikes



Dummy Data

    INSERT INTO bicicleta (modelo, color, ubicacion, estado) VALUES ("Mountain", "gris", "1212.4, -343434,44", "alquilada");

