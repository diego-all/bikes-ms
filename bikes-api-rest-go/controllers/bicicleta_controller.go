package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"bikes-api-rest-go/commons"
	"bikes-api-rest-go/models"

	"github.com/gorilla/mux"
)

func GetAll(writer http.ResponseWriter, request *http.Request) {
	bicicletas := []models.Bicicleta{}
	db := commons.GetConnection()
	defer db.Close()

	db.Find(&bicicletas)
	json, _ := json.Marshal(bicicletas)
	commons.SendReponse(writer, http.StatusOK, json)
}

func Get(writer http.ResponseWriter, request *http.Request) {
	bicicleta := models.Bicicleta{}

	id := mux.Vars(request)["id"]

	db := commons.GetConnection()
	defer db.Close()

	db.Find(&bicicleta, id)

	if bicicleta.ID > 0 {
		json, _ := json.Marshal(bicicleta)
		commons.SendReponse(writer, http.StatusOK, json)
	} else {
		commons.SendError(writer, http.StatusNotFound)
	}

}

func Save(writer http.ResponseWriter, request *http.Request) {
	bicicleta := models.Bicicleta{}

	db := commons.GetConnection()
	defer db.Close()

	// Decodificar la data
	error := json.NewDecoder(request.Body).Decode(&bicicleta)

	if error != nil {
		log.Fatal(error)
		commons.SendError(writer, http.StatusBadRequest)
		return
	}

	error = db.Save(&bicicleta).Error
	//error = db.Create(&bicicleta).Error
	// Mejor se utiliza Save en vez de Create para ahorrar codificar el método de guardado.
	// Existe el Update y Create por separado pero este método Save cumple la misma función.
	// Basicamente si la entidad no tiene una llave primaria va a guardar el registro. Si el id viene nulo va a guardar el registro, sino va a actualizar el registro.

	if error != nil {
		log.Fatal(error)
		commons.SendError(writer, http.StatusInternalServerError)
		return
	}

	json, _ := json.Marshal(bicicleta)

	commons.SendReponse(writer, http.StatusCreated, json)
}

func Delete(writer http.ResponseWriter, request *http.Request) {
	bicicleta := models.Bicicleta{}

	db := commons.GetConnection()
	defer db.Close()

	id := mux.Vars(request)["id"]

	db.Find(&bicicleta, id)

	if bicicleta.ID > 0 {
		db.Delete(bicicleta)
		commons.SendReponse(writer, http.StatusOK, []byte(`{}`))
	} else {
		commons.SendError(writer, http.StatusNotFound)
	}
}

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	log.Println("Checking application health")
	response := map[string]string{
		"timestamp": time.Now().String(),
	}
	//fmt.Fprintf(w, "Hello, you've requested: %s\n", r.URL.Path)
	json.NewEncoder(w).Encode(response)
}
