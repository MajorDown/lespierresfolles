const mongoose = require("mongoose");

const SitesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  place: { type: String, required: true },
  department: { type: Number, required: true },
  coords: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  type: { type: String, required: true },
  publicAccess: { type: Boolean, required: false },
  description: { type: String, required: false },
  size: { type: Number, required: false },
  weigth: { type: Number, required: false },
  material: { type: String, required: false },
  state: { type: String, required: true },
  images: {
    url1: { type: String, required: true },
    url2: { type: String, required: false },
    url3: { type: String, required: false },
    url4: { type: String, required: false },
    url5: { type: String, required: false },
  },
  userId: { type: String, required: true },
  date: { type: String, required: true },
  posts: [{ date: { type: String, required: true } }],
});

const Sites = mongoose.model("Site", SitesSchema);

module.exports = Sites;
