const request = require("supertest");
const app = require("../app");
const { userModel } = require("../models");

const testWrongDataAuthLogin = {
  email: "mateo21@gmail.com",
  password: "mateoa123",
};

const testCorrectDataAuthLogin = {
  email: "mateo@gmail.com",
  password: "mateo123",
};

const testCorrectDataAuthRegister = {
  name: "Mateo",
  age: 10,
  email: "mateo@gmail.com",
  password: "mateo123",
};

/**
 * Se ejecuta antes de las pruebas
 */
beforeAll(async () => {
  await userModel.destroy({ where: {} });
});

describe("[AUTH] Authentication test for /api/auth", () => {
  test("If a register is made, It would returns 201", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testCorrectDataAuthRegister);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("data.token");
    expect(response.body).toHaveProperty("data.user");
  });

  test("If is wrong, It would returns 404", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(testWrongDataAuthLogin);
    expect(response.statusCode).toEqual(404);
  });

  test("If is correct, It would returns 200", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(testCorrectDataAuthLogin);
    expect(response.statusCode).toEqual(200);
  });
});
