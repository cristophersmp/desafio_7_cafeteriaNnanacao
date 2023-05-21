const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  /* 1. Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto. (3 Puntos) */
  describe("GET /cafes", () => {
    it("debería devolver un status 200 y un arreglo con al menos un objeto", async () => {
      const res = await request(server).get("/cafes");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThanOrEqual(1);
      expect(typeof res.body[0]).toBe("object");
    });
  });

  /* 2. Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe. (2 Puntos) */
  describe("DELETE /cafes/:id", () => {
    it("debería devolver un status 404 al intentar eliminar un café con un id que no existe", async () => {
      const idInexistente = "id-inexistente";
      const res = await request(server).delete(`/cafes/${idInexistente}`);
      expect(res.statusCode).toEqual(404);
    });
  });

  /* 3. Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201. (2 Puntos) */
  describe("POST /cafes", () => {
    it("debería agregar un nuevo café y devolver un status 201", async () => {
      const nuevoCafe = {
        id: "nuevo-cafe-id",
        name: "Nuevo Café",
      };
      const res = await request(server).post("/cafes").send(nuevoCafe);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toContainEqual(nuevoCafe);
    });
  });

  /* 4. Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload. (3 Puntos) */
  describe("PUT /cafes/:id", () => {
    it("debería devolver un status 400 al intentar actualizar un café enviando un id en los parámetros que sea diferente al id dentro del body de la solicitud", async () => {
      const cafeToUpdate = {
        id: "cafe-id",
        name: "Café Actualizado",
      };
      const idDiferente = "different-id";
      const res = await request(server)
        .put(`/cafes/${idDiferente}`)
        .send(cafeToUpdate);
      expect(res.statusCode).toEqual(400);
    });
  });
});
