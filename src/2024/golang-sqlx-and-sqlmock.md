{ "header": {"name": "Go", "order": 6},  "order": 12, "date": "2024-05-02 19:00" }
---
# sqlmockでsqlxを取り扱う

下記は[sqlmock](https://github.com/DATA-DOG/go-sqlmock)で[sqlx](https://japanese-document.github.io/sqlx/)を取り扱う例です。
`NamedExec`で名前付きパラメータ(named parameters)をMockする場合、プレースホルダに置き換える必要があります。

```go
mock.
    ExpectExec(regexp.QuoteMeta("INSERT INTO car (user_id, maker, model, year) VALUES (?, ?, ?, ?)")).
    WithArgs(lastInsertId, "bar", "baz", 2022).
    WillReturnResult(sqlmock.NewResult(1, 1))
```

```go
package main

import (
	"database/sql"
	"regexp"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func createMockDB(t *testing.T) (*sql.DB, *sqlx.DB, sqlmock.Sqlmock) {
	sqlDB, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("error at database connection: %s", err)
	}
	sqlxDB := sqlx.NewDb(sqlDB, "sqlite3")
	return sqlDB, sqlxDB, mock
}

func TestInsertUserAndCar(t *testing.T) {
	type args struct {
		user User
		car  Car
	}
	tests := []struct {
		name    string
		args    args
		mock    func(sqlmock.Sqlmock)
		wantErr bool
	}{
		{
			name: "Success",
			args: args{
				user: User{
					Name:  "foo",
					Email: "foo@example.com",
					Age:   23,
				},
				car: Car{
					Maker: "bar",
					Model: "baz",
					Year:  2022,
				},
			},
			mock: func(mock sqlmock.Sqlmock) {
				lastInsertId := 123
				mock.
					ExpectExec(regexp.QuoteMeta("INSERT INTO user (name, email, age) VALUES (?, ?, ?)")).
					WithArgs("foo", "foo@example.com", 23).WillReturnResult(sqlmock.NewResult(int64(lastInsertId), 1))
				mock.
					ExpectExec(regexp.QuoteMeta("INSERT INTO car (user_id, maker, model, year) VALUES (?, ?, ?, ?)")).
					WithArgs(lastInsertId, "bar", "baz", 2022).
					WillReturnResult(sqlmock.NewResult(1, 1))
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			sqlDB, sqlxDB, mock := createMockDB(t)
			defer sqlDB.Close()
			defer sqlxDB.Close()
			tt.mock(mock)
			if err := InsertUserAndCar(sqlxDB, tt.args.user, tt.args.car); (err != nil) != tt.wantErr {
				t.Errorf("InsertUserAndCar() error = %v, wantErr %v", err, tt.wantErr)
			}
			if err := mock.ExpectationsWereMet(); err != nil {
				t.Errorf("unfulfilled expectations: %s", err)
			}
		})
	}
}
```

```go
package main

import (
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

type User struct {
	ID    int    `db:"id"`
	Name  string `db:"name"`
	Email string `db:"email"`
	Age   int    `db:"age"`
}

type Car struct {
	ID     int    `db:"id"`
	UserID int    `db:"user_id"`
	Maker  string `db:"maker"`
	Model  string `db:"model"`
	Year   int    `db:"year"`
}

type CarUser struct {
	User User `db:"u"`
	Car  Car  `db:"c"`
}

func InsertUserAndCar(db *sqlx.DB, user User, car Car) error {
	insertUserData := `INSERT INTO user (name, email, age) VALUES (?, ?, ?)`
	result, err := db.Exec(insertUserData, user.Name, user.Email, user.Age)
	if err != nil {
		return err
	}

	userID, _ := result.LastInsertId()
	car.UserID = int(userID)
	insertCarData := `INSERT INTO car (user_id, maker, model, year) VALUES (:user_id, :maker, :model, :year)`
	_, err = db.NamedExec(insertCarData, car)
	if err != nil {
		return err
	}
	return nil
}

func main() {
	db := sqlx.MustOpen("sqlite3", ":memory:")
	defer db.Close()

	createUserTableSQL := `CREATE TABLE IF NOT EXISTS user (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT UNIQUE NOT NULL,
		age INTEGER
	);`
	db.MustExec(createUserTableSQL)

	createCarTableSQL := `CREATE TABLE IF NOT EXISTS car (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		maker TEXT NOT NULL,
		model TEXT NOT NULL,
		year INTEGER,
		FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
	);`
	db.MustExec(createCarTableSQL)

	user := User{Name: "Foo", Email: "foo@example.com", Age: 30}
	car := Car{Maker: "Toyota", Model: "Corolla", Year: 2020}
	err := InsertUserAndCar(db, user, car)
	if err != nil {
		log.Fatal("Failed to execute query: ", err)
	}

	query := `
	SELECT u.id as "u.id", u.name as "u.name", u.email as "u.email", u.age as "u.age", 
	       c.id as "c.id", c.user_id as "c.user_id", c.maker as "c.maker", c.model as "c.model", c.year as "c.year"
	FROM car c
	JOIN user u ON u.id = c.user_id`

	var carUsers []CarUser
	err = db.Select(&carUsers, query)
	if err != nil {
		log.Fatal("Failed to execute query: ", err)
	}

	fmt.Printf("%+v", carUsers)
}
```