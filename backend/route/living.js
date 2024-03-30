const express = require("express");
const router = express.Router();
const living = require("./../controller/living");

router.route("/getDonor_id").post(living.getDonor_id);

module.exports = router;
