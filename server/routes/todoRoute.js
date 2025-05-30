import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todolist.js";
import { auth } from "../middleware/auth.js";
import { validateTodoFields, validateTodoId } from "../middleware/todoValidation.js";

const router = express.Router()

/**
 * @openapi
 * tags:
 *   - name: Todo
 *     description: Todo list related operations
 */

/**
 * @openapi
 * /get_all:
 *   get:
 *     tags:
 *       - Todo
 *     security:
 *       - bearerAuth: []
 *     summary: Get all todo list from database (requires authentication)
 *     responses:
 *       '200':
 *         description: Success
 *       '403':
 *         description: Unauthorized or invalid token
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.get("/get_all", auth, getAllTodos)

/**
 * @openapi
 * /add_todo:
 *   post:
 *     tags:
 *       - Todo
 *     security:
 *       - bearerAuth: []
 *     summary: Add a new todo list (requires authentication)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todo_image:
 *                 type: string
 *                 example: "https://api.dicebear.com/9.x/icons/svg?seed=Katherine"
 *               todo_name:
 *                 type: string
 *                 example: "Doing Japanese exercise"
 *               todo_desc:
 *                 type: string
 *                 example: "learn basic kanji and basic grammar in conversation"
 *               todo_status:
 *                 type: string
 *                 example: "active"
 *     responses:
 *       '200':
 *         description: Add todo successfully
 *       '403':
 *         description: Unauthorized or invalid token
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/add_todo", auth, validateTodoFields, createTodo)

/**
 * @openapi
 * /update_todo/{id}:
 *   patch:
 *     tags:
 *       - Todo
 *     security:
 *       - bearerAuth: []
 *     summary: Update todo list (requires authentication)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: todo ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todo_image:
 *                 type: string
 *                 example: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Wyatt"
 *               todo_name:
 *                 type: string
 *                 example: "Doing Japanese exercise updated"
 *               todo_desc:
 *                 type: string
 *                 example: "learn basic kanji and basic grammar in conversation updated"
 *               todo_status:
 *                 type: string
 *                 example: "active"
 *     responses:
 *       '200':
 *         description: Todo list updated
 *       '403':
 *         description: Unauthorized or invalid token
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal server error
 */
router.patch("/update_todo/:id", auth, validateTodoId, validateTodoFields, updateTodo)

/**
 * @openapi
 * /delete_todo/{id}:
 *   delete:
 *     tags:
 *       - Todo
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a todo (requires authentication)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Todo ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Todo deleted
 *       '403':
 *         description: Unauthorized or invalid token
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal server error
 */
router.delete("/delete_todo/:id", auth, validateTodoId, deleteTodo)

export default router
