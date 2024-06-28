const Data = require("../models/data.model.js");

async function getDataController(req, res, next) {
  try {
    const {
      limit = 5,
      skip = 35,
      intensity,
      relevance,
      likelihood,
      region,
      topic,
      start_year,
      end_year,
    } = req.query;
    const filters = {
      ...(intensity && { intensity: { $gt: 0 } }),
      ...(relevance && { relevance: { $gt: 0 } }),
      ...(likelihood && { likelihood: { $gt: 0 } }),
      ...(region && { region: { $ne: "" } }),
      ...(topic && { topic: { $ne: "" } }),
      ...(end_year && { end_year: { $gt: 0 } }),
      ...(start_year && { start_year: { $gt: 0 } }),
      country: { $ne: "" },
    };

    let sortOrder = {};
    if (intensity) {
      sortOrder.intensity = intensity === "asc" ? 1 : -1;
    } else if (relevance) {
      sortOrder.relevance = relevance === "asc" ? 1 : -1;
    } else if (likelihood) {
      sortOrder.likelihood = likelihood === "asc" ? 1 : -1;
    } else if (region) {
      sortOrder.region = region === "asc" ? 1 : -1;
    } else if (topic) {
      sortOrder.topic = topic === "asc" ? 1 : -1;
    } else if (start_year) {
      sortOrder.start_year = start_year === "asc" ? 1 : -1;
    } else if (end_year) {
      sortOrder.end_year = end_year === "asc" ? 1 : -1;
    }

    let dataFound;
    if (Object.keys(req.query).length < 1) {
      dataFound = await Data.aggregate([
        { $match: filters },
        { $sample: { size: parseInt(limit) } },
      ]);
    } else {
      dataFound = await Data.find(filters)
        .sort(sortOrder)
        .skip(skip)
        .limit(parseInt(limit));
    }

    res.status(200).json({
      status: "success",
      data: dataFound,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getDataController };
