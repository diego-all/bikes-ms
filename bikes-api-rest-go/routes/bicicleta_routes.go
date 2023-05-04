package routes

import (
	"bikes-api-rest-go/controllers"

	"github.com/gorilla/mux"
)

func SetBicicletaRoutes(router *mux.Router) {
	// Router principal
	subRoute := router.PathPrefix("/bicicleta/api").Subrouter()
	subRoute.HandleFunc("/all", controllers.GetAll).Methods("GET")
	subRoute.HandleFunc("/save", controllers.Save).Methods("POST")
	subRoute.HandleFunc("/delete/{id}", controllers.Delete).Methods("POST")
	subRoute.HandleFunc("/find/{id}", controllers.Get).Methods("GET")
	subRoute.HandleFunc("/health", controllers.HealthCheck).Methods("GET")
}
