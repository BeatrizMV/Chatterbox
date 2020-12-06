const router = require("express").Router();

const usersController = require("./controllers/userController");
const roomsController = require("./controllers/roomController");

router.get("/login", usersController.checkLogin);
router.get("/users", usersController.getUsers);
router.post("/register", usersController.register);
router.get("/rooms", roomsController.getRooms);
router.get("/room/:roomId", roomsController.getRoom);
router.post("/room", roomsController.createRoom);
router.post("/addUserToRoom", roomsController.addUserToRoom);
router.post("/block-user", roomsController.blockUser);

module.exports = router;
