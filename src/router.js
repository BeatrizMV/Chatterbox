const router = require("express").Router();

const usersController = require("./controllers/user");
const roomsController = require("./controllers/room");

router.get("/login", (req, res) => usersController.checkLogin(req, res));
router.get("/users", (req, res) => usersController.getUsers(req, res));
router.post("/register", (req, res) => usersController.register());
router.get("/rooms", (req, res) => roomsController.getRooms(req, res));
router.get("/room", (req, res) => roomsController.getRoom());
router.post("/room", (req, res) => roomsController.createRoom());
router.post("/addUserToRoom", (req, res) =>
  roomsController.addUserToRoom(req, res)
);

module.exports = router;
