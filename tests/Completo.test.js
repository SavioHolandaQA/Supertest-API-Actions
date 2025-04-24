const request = require("supertest");
const ApiUrl = "https://restful-booker.herokuapp.com";

let token;
let bookingId;

describe("Fluxo Completo: API de Reservas", () => {

  it("Deve autenticar e obter token", async () => {
    const response = await request(ApiUrl)
      .post("/auth")
      .send({
        username: "admin",
        password: "password123",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");

    token = response.body.token;
    console.log(" Token obtido:", token);
  });

  it("Criar uma nova reserva", async () => {
    const response = await request(ApiUrl)
      .post("/booking")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01"
        },
        additionalneeds: "Breakfast"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("bookingid");

    bookingId = response.body.bookingid;
    console.log("ID da reserva criada:", bookingId);
  });

  it("Validar dados da reserva criada", async () => {
    const response = await request(ApiUrl)
      .get(`/booking/${bookingId}`)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);

    expect(response.body).toMatchObject({
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01"
      },
      additionalneeds: "Breakfast"
    });

    console.log(" Dados da reserva validados com sucesso");
  });

  it("Editar a reserva", async () => {
    const response = await request(ApiUrl)
      .put(`/booking/${bookingId}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Cookie", `token=${token}`)
      .send({
        firstname: "Sávio",
        lastname: "QA",
        totalprice: 520,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01"
        },
        additionalneeds: "Lunch"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.firstname).toBe("Sávio");
    console.log(" Reserva atualizada com sucesso");
  });

  it("Validar dados da reserva atualizada", async () => {
    const response = await request(ApiUrl)
      .get(`/booking/${bookingId}`)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      firstname: "Sávio",
      lastname: "QA",
      totalprice: 520,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01"
      },
      additionalneeds: "Lunch"
    });

    console.log("Dados da reserva atualizada validados com sucesso");
  });

  it("Deletar a reserva", async () => {
    const response = await request(ApiUrl)
      .delete(`/booking/${bookingId}`)
      .set("Cookie", `token=${token}`);

    expect(response.statusCode).toBe(201);
    console.log(" Reserva deletada com sucesso");
  });

  it("Verificar se a reserva foi deletada", async () => {
    const response = await request(ApiUrl)
      .get(`/booking/${bookingId}`)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(404);
    console.log(" Confirmação de deleção recebida (404)");
  });

});
