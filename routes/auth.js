const express = require("express");
const router = express.Router();
const {
  validatorLoginItem,
  validatorRegisterItem,
} = require("../validators/auth");
const { login, register } = require("../controllers/auth");


/**
 * http://localhost:3000/api
 * 
 * Ruta register new user
 * @openapi
 * /auth/register:
 *        post:
 *            tags:
 *                - auth
 *            summary: Registrar nuevo usuario
 *            description: "Esta ruta espa para registrar un nuevo usuario"
 *            requestBody:
 *                content:
 *                    application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/authRegister"
 *            responses:
 *                '201':
 *                    description: "Usuario registrado correctamente"
 *                '403':
 *                    description: "Error por validación de usuario"
 */
router.post("/register", validatorRegisterItem, register);


/**
 * Login user
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Login user"
 *      description: Iniciar session a un nuevo usuario y obtener el token de sesión
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/authLogin"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post("/login", validatorLoginItem, login);

module.exports = router;
