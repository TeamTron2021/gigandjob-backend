package userteste2e_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"testing"
)

const baseUrl string = "https://gigandjob-backend.herokuapp.com/users"

func TestUserControllerGetUsers(t *testing.T) {
	res, err := http.Get(baseUrl)
	if err != nil {
		t.Errorf("I got a error: %d ", err)
	}

	if !(res.StatusCode >= 200 && res.StatusCode < 300) {
		t.Errorf("I got a status error: %d", res.StatusCode)
	}
}

//Pre-condition: Tener usuario con ID: "dbee9095-1d31-4d48-bd3d-36d6b20bcf4e"
func TestUserControllerGetUser(t *testing.T) {
	id := "dbee9095-1d31-4d48-bd3d-36d6b20bcf4e"
	res, err := http.Get(baseUrl + "/" + id)

	if err != nil {
		t.Errorf("I got a error: %d ", err)
	}

	if !(res.StatusCode >= 200 && res.StatusCode < 300) {
		t.Errorf("I got a status error: %d", res.StatusCode)
	}
}

func TestUserControllerPostUser(t *testing.T) {
	body, err := json.Marshal(map[string]string{
		"firstname": "Jonathan",
		"lastname":  "Martinez",
		"birthday":  "April 4 1987 00:00:00",
		"email":     "jonathan@example.com",
		"password":  "jonathan-martinez",
	})

	if err != nil {
		t.Errorf("I got a error: %d ", err)
	}

	req := bytes.NewBuffer(body)
	res, err := http.Post(baseUrl, "application/json", req)

	if err != nil {
		t.Errorf("I got a error: %d ", err)
	}

	if !(res.StatusCode >= 200 && res.StatusCode < 300) {
		t.Errorf("I got a status error: %d", res.StatusCode)
	}
}

//Pre-condition: Tener usuario con ID: "dbee9095-1d31-4d48-bd3d-36d6b20bcf4e"
func TestUserControllerPutUser(t *testing.T) {
	id := "dbee9095-1d31-4d48-bd3d-36d6b20bcf4e"
	type User struct {
		Firstname string `json:"firstname"`
		Lastname  string `json:"lastname"`
		Birthday  string `json:"birthday"`
		Email     string `json:"email"`
		Password  string `json:"password"`
	}

	user := User{
		Firstname: "Jonathan",
		Lastname:  "Joestar",
		Birthday:  "April 4 1987 00:00:00",
		Email:     "jonathan@joestar.com",
		Password:  "jonathan-joestar",
	}

	client := &http.Client{}

	json, err := json.Marshal(user)
	if err != nil {
		t.Errorf("I got a error: %d ", err)
	}

	req, err := http.NewRequest(http.MethodPut, baseUrl+"/"+id, bytes.NewBuffer(json))
	if err != nil {
		t.Errorf("I got a error: %d ", err)
	}

	req.Header.Set("Content-Type", "application/json; charset=utf-8")
	res, err := client.Do(req)
	if err != nil {
		t.Errorf("I got a error: %d ", err)
	}

	if !(res.StatusCode >= 200 && res.StatusCode < 300) {
		t.Errorf("I got a status error: %d", res.StatusCode)
	}

}

/*
Pre-condition: Tener usuario con ID: "dbee9095-1d31-4d48-bd3d-36d6b20bcf4e"
Con status Activate o Unconfirmed
*/
func TestUserControllerSuspendUser(t *testing.T) {
	id := "dbee9095-1d31-4d48-bd3d-36d6b20bcf4e"
	body, _ := json.Marshal(map[string]string{})
	req := bytes.NewBuffer(body)
	res, err := http.Post(baseUrl+"/"+id+"/suspend", "application/json", req)

	if err != nil {
		t.Errorf("I got a error: %d ", err)
	}

	if !(res.StatusCode >= 200 && res.StatusCode < 300) {
		t.Errorf("I got a status error: %d", res.StatusCode)
	}
}

/*
Pre-condition: Tener usuario con ID: "dbee9095-1d31-4d48-bd3d-36d6b20bcf4e"
Con status Activate o Unconfirmed
*/
func TestUserControllerReactiveUser(t *testing.T) {
	id := "dbee9095-1d31-4d48-bd3d-36d6b20bcf4e"
	body, _ := json.Marshal(map[string]string{})
	req := bytes.NewBuffer(body)
	res, err := http.Post(baseUrl+"/"+id+"/reactive", "application/json", req)

	if err != nil {
		t.Errorf("I got a error: %d ", err)
	}

	if !(res.StatusCode >= 200 && res.StatusCode < 300) {
		t.Errorf("I got a status error: %d", res.StatusCode)
	}
}
