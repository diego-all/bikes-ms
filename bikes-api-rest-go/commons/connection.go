package commons

import (
	"fmt"
	"log"

	"bikes-api-rest-go/models"

	"github.com/jinzhu/gorm"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func GetConnection() *gorm.DB {

	//DATABASE_URL := os.Getenv("DATABASE_URL")

	Driver := "mysql"
	Username := "root"
	Password := "password"
	//DbHost := "127.0.0.1"
	//DbHost := "localhost"
	DbHost := "bikes-db"
	DbPort := "3306"
	DbName := "bikes"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8", Username, Password, DbHost, DbPort, DbName)
	fmt.Println(dsn)

	//db, error := gorm.Open(Driver, dsn)
	db, error := gorm.Open(Driver, dsn)

	if error != nil {
		log.Fatal(error)
	}

	return db
}

func Migrate() {
	db := GetConnection()
	defer db.Close()

	log.Println("Migrando....")

	db.AutoMigrate(&models.Bicicleta{})

	// se podrían pasar varios modelos, solo se tienen el de bicicleta
}
