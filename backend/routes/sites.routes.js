const express = require("express");
const { tokenChecker } = require("../middlewares/tokenManager");
const imageUploader = require("../middlewares/imageUploader.js");
const {
  getListOfSites,
  getSite,
  getLastSites,
  createSite,
  editSite,
  deleteSite,
  postOnSite,
} = require("../controllers/sites.controller");
const router = express.Router();

router.get("/", getListOfSites);
router.get("/:id", getSite);
router.get("/last", getLastSites);
router.post("/", tokenChecker, imageUploader, createSite);
router.put("/:id", tokenChecker, editSite);
router.delete("/:id", tokenChecker, deleteSite);
router.post("/:id/post", tokenChecker, postOnSite);

module.exports = router;
