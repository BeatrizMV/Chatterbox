const router = require("express").Router();

const usersController = require("./controllers/user");
const roomsController = require("./controllers/room");

router.get("/login", usersController.checkLogin);
router.get("/users", usersController.getUsers);
router.post("/register", usersController.register);
router.get("/rooms", roomsController.getRooms);
router.get("/room/:roomId", roomsController.getRoom);
router.post("/room", roomsController.createRoom);
router.post("/addUserToRoom", roomsController.addUserToRoom);

module.exports = router;
