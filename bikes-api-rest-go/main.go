package main

import (
	"log"
	"net/http"

	"bikes-api-rest-go/commons"
	"bikes-api-rest-go/routes"

	"github.com/gorilla/mux"
)

func main() {
	commons.Migrate()

	router := mux.NewRouter()
	routes.SetBicicletaRoutes(router)
	commons.EnableCORS(router)

	server := http.Server{
		Addr:    ":3001",
		Handler: router,
	}

	log.Println("Servidor ejecutandose sobre el puerto 3001")
	log.Println(server.ListenAndServe())
}
