package models

// gorm.Model es la clase padre del modelo
// Al extender de model hay unas propiedades definidas CreatedAt, UpdatedAt, DeletedAt

// La tabla de base de datos si no se vn a usar las migrciones tienen que tener un CreatedAt, UpdatedAt, DeletedAt, por ende se remueve el ID ya lo trae el gorm.Model

type Bicicleta struct {
	// gorm.Model
	ID int64 `json:"id" gorm:"primary_key;auto_increment"`
	//ID        int64  `json:"id"`
	Modelo    string `json:"modelo"`
	Color     string `json:"color"`
	Ubicacion string `json:"ubicacion"`
	Estado    string `json:"estado"`
}
