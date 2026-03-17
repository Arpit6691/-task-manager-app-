 const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
createTask,
getTasks,
updateTask,
deleteTask
} = require("../controllers/taskController");

const {verifyToken} = require("../middleware/authMiddleware");
 
 
router.post(
"/",
verifyToken,
body("title").notEmpty().withMessage("Title required"),
createTask
);
router.get("/",verifyToken,getTasks);

router.put("/:id",verifyToken,updateTask);

router.delete("/:id",verifyToken,deleteTask);

module.exports = router;