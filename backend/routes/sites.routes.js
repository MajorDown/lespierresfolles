const express = require("express");
const { tokenChecker } = require("../middlewares/tokenManager");
const {
  imageUploader,
  imageResizer,
} = require("../middlewares/sharpAndMulter");
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
router.post("/", tokenChecker, imageUploader, imageResizer, createSite);
router.put("/:id", tokenChecker, imageUploader, imageResizer, editSite);
router.delete("/:id", tokenChecker, deleteSite);
router.post("/:id/post", tokenChecker, postOnSite);

module.exports = router;
