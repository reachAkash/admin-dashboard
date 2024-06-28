const mongoose = require("mongoose");

// Intensity
// Likelihood
// Relevance
// Year
// Country
// Topics
// Region
// City

// Add end year filter in the dashboard
// Add topics filters in the dashboard
// Add sector filter in the dashboard
// Add region filter in the dashboard
// Add PEST filter in the dashboard
// Add Source filter in the dashboard
// Add SWOT filter in the dashboard
// Country
// City

const DataSchema = new mongoose.Schema({
  end_year: {
    type: String,
  },
  intensity: {
    type: Number,
  },
  sector: {
    type: String,
  },
  topic: {
    type: String,
  },
  insight: {
    type: String,
  },
  url: {
    type: String,
  },
  region: {
    type: String,
  },
  start_year: {
    type: String,
  },
  impact: {
    type: String,
  },
  added: {
    type: Date,
  },
  published: {
    type: Date,
  },
  country: {
    type: String,
  },
  relevance: {
    type: Number,
  },
  pestle: {
    type: String,
  },
  source: {
    type: String,
  },
  title: {
    type: String,
  },
  likelihood: {
    type: Number,
  },
});

const Data = mongoose.model("Data", DataSchema);

module.exports = Data;
