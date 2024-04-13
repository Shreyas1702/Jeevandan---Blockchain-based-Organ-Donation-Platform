const express = require("express");
const router = express.Router();
const users = require("./../controller/user");
const passport = require("passport");
router.route("/register").post(users.register);

router.route("/donor_reg/:id").post(users.donor_reg);

router.route("/reciever_reg/:id").post(users.reciever_reg);

router.route("/MatchingPage/:id").post(users.matching);

router.route("/transplant").post(users.transplantIn);

router.route("/ambdetail/:id").post(users.ambdetail);

router.route("/airdetail/:id").post(users.airdetail);

router.route("/org_rec/:id").post(users.org_rec);

router.route("/trans_detail").post(users.getTransData);

router.route("/trans_sur/:id").post(users.trans_sur);

router.route("/sur_end/:id").post(users.sur_end);

router.route("/getEntireData").post(users.getEntireData);

router.route("/getApprovalPage/:id").get(users.approveNFT);

router.route("/transNFT/:id").post(users.transNFT);

router.route("/getDonor").post(users.getDonor);

router.route("/getSuccessTrans").post(users.succTrans);

router.route("/failedTrans").post(users.failedTrans);

router.route("/getFailedTrans").post(users.getFailedTrans);

module.exports = router;
