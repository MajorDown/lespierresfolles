const { imageEraser } = require("../middlewares/imageEraser");
const BookModel = require("../models/sites.model");

// OBTENIR LES SITES
module.exports.getListOfSites = async (req, res) => {
  try {
    console.log("requète : 'getListOfSites'");
    // GESTION DES ERREURS
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération des sites",
      err: err,
    });
  }
};

// OBTENIR UN SITE
module.exports.getSite = async (req, res) => {
  try {
    console.log("requète : 'getSite'");
    // GESTION DES ERREURS
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération du site",
      err: err,
    });
  }
};

// OBTENIR LES 10 DERNIERS SITES
module.exports.getLastSites = async (req, res) => {
  try {
    console.log("requète : 'getLastSites'");
    // GESTION DES ERREURS
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération des sites",
      err: err,
    });
  }
};

// CREATION D'UN BOOK
module.exports.createSite = async (req, res) => {
  try {
    console.log("requète : 'createSite'");
    // GESTION DES ERREURS
  } catch (err) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la création du site",
      err: err,
    });
  }
};

// MODIFIER UN BOOK
module.exports.editSite = async (req, res) => {
  try {
    console.log("requète : 'editSite'");
    // GESTION DES ERREURS
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour du site",
      err: err,
    });
  }
};

// SUPPRIMER UN BOOK
module.exports.deleteSite = async (req, res) => {
  try {
    console.log("requète : 'deleteSite'");
    // GESTION DES ERREURS
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Une erreur est survenue lors de la suppression du site",
    });
  }
};

// NOTER UN BOOK
module.exports.postOnSite = async (req, res) => {
  try {
    console.log("requète : 'postOnSites'");
    // GESTION DES ERREURS
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Une erreur est survenue lors de la mise à jour du post",
    });
  }
};
