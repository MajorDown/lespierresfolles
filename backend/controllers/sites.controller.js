const { imageEraser } = require("../middlewares/imageEraser");
const SiteModel = require("../models/sites.model");

// OBTENIR LES SITES
module.exports.getListOfSites = async (req, res) => {
  try {
    const { departement } = req.query;
    let query = {};
    if (departement) {
      query.department = parseInt(departement);
    }
    const sites = await SiteModel.find(query);
    console.log("getListOfSites ~> filtrage des sites");
    res.status(200).json(sites);
  } catch (err) {
    console.log("getListOfSites ~> echec du filtrage :", err);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération des sites",
      err: err,
    });
  }
};

// OBTENIR UN SITE
module.exports.getSite = async (req, res) => {
  try {
    const siteId = req.params.id;
    const site = await SiteModel.findById(siteId);
    if (!site) {
      console.log("getSite ~> site inconnu de la base de donnée");
      return res.status(404).json({
        message: "Site non trouvé",
      });
    }
    console.log("getSite ~> accès au site demandé");
    res.status(200).json(site);
  } catch (err) {
    console.error("getSite ~> erreur lors de la récupération du site :", err);
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

// CREATION D'UN SITE
module.exports.createSite = async (req, res) => {
  try {
    console.log("createSite ~> en cours de traitement");
    console.log(req.body);
    // EXTRACTION DES DONNES
    const {
      name,
      place,
      department,
      lat,
      lon,
      type,
      publicAccess,
      description,
      size,
      weight,
      material,
      state,
      userId,
      date,
    } = req.body;
    const images = {
      url1: req.files && req.files[0] ? req.files[0].filename : "",
      url2: req.files && req.files[1] ? req.files[1].filename : "",
      url3: req.files && req.files[2] ? req.files[2].filename : "",
      url4: req.files && req.files[3] ? req.files[3].filename : "",
      url5: req.files && req.files[4] ? req.files[4].filename : "",
    };
    // CREATION D'UN NOUVEAU SITE
    const newSite = new SiteModel({
      name,
      place,
      department,
      coords: { lat: lat, lon: lon },
      type,
      publicAccess,
      description,
      size,
      weight,
      material,
      state,
      images,
      userId,
      date,
      posts: [],
    });
    // AJOUT DANS LA DB
    const savedSite = await newSite.save();
    console.log("createSite ~> nouveau site créé dans la base de donnée");
    res.status(200).json({ message: "Requête effectuée", site: savedSite });
  } catch (err) {
    console.log("createSite ~> la création du site à échoué :", err);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la création du site",
      err: err.message,
    });
  }
};

// MODIFIER UN SITE
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

// SUPPRIMER UN SITE
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

// COMMENTER UN SITE
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
