import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import { pool } from '../db/connectDB.js';
import haversine from 'haversine-distance';

export const listSchools = asyncHandler(async (req, res) => {
  const lat = parseFloat(req.query.latitude);
  const lng = parseFloat(req.query.longitude);

  if (
    isNaN(lat) ||
    isNaN(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    throw new ApiError(
      400,
      'Valid latitude and longitude are required as query parameters.'
    );
  }

  const limit = parseInt(req.query.limit, 10) || 50;

  const [schools] = await pool.query('SELECT * FROM schools LIMIT ?', [limit]);

  const result = schools
    .map((school) => {
      const distance = haversine(
        { lat, lng },
        { lat: school.latitude, lng: school.longitude }
      );
      return { ...school, distanceInMeters: distance };
    })
    .sort((a, b) => a.distanceInMeters - b.distanceInMeters);

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'Schools fetched and sorted by proximity.', result)
    );
});
