# bikes-crud-api-rest-go

CRUD para el microservicio de bicicletas con Golang utilizando Gorm, Gorilla Mux & MySQL.


Dependencias

go get -u github.com/gorilla/mux

go get -u github.com/jinzhu/gorm

go get -u github.com/go-sql-driver/mysql



## Base de datos




### Acceder a la base de datos

NOTA: CREAR UNA DB PARA LA APLICACION

FROM BIKES

    docker context list

    docker build --no-cache -t diegoall1990/products-db:0.0.1 .

    docker build -t diegoall1990/products-db:0.0.1 .



    docker run -d --name products-db \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=password \
    diegoall1990/products-db:0.0.1



## To access the database in the container

    docker exec -it products-db mysql -u root -p


##

    create database bikes;



ORM

si no se tiene creada la tabla utilizando el metodo migration se define la estructura de la tabla y se crea.




```
+----+----------+---------+------------------+---------+
| id | modelo   | color   | ubicacion        | rentada |
+----+----------+---------+------------------+---------+
|  1 | Cross    | verde   | -43.1731, 6.6906 | true    |
|  2 | Mountain | gris    | -43.1731, 6.6906 | false   |
|  3 | Route    | roja    | -43.1731, 6.6906 | false   |
|  4 | Mountain | gris    | -43.1731, 6.6906 | false   |
|  5 | Mountain | naranja | -43.1731, 6.6906 | false   |
+----+----------+---------+------------------+---------+
```

