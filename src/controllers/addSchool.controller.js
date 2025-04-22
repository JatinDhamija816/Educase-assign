import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import { pool } from '../db/connectDB.js';

export const addSchool = asyncHandler(async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude === undefined || longitude === undefined) {
    throw new ApiError(
      400,
      'All fields (name, address, latitude, longitude) are required.'
    );
  }

  const lat = parseFloat(latitude);
  const long = parseFloat(longitude);

  if (
    typeof name !== 'string' ||
    typeof address !== 'string' ||
    isNaN(lat) ||
    isNaN(long) ||
    lat < -90 ||
    lat > 90 ||
    long < -180 ||
    long > 180
  ) {
    throw new ApiError(400, 'Invalid input data.');
  }

  const query =
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';

  try {
    const [result] = await pool.execute(query, [name, address, lat, long]);

    return res.status(201).json(
      new ApiResponse(201, 'School added successfully.', {
        id: result.insertId,
        name,
        address,
        latitude: lat,
        longitude: long,
      })
    );
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      throw new ApiError(409, 'A school with this name already exists.');
    }

    console.error('❌ DB Error:', err.message);
    throw new ApiError(500, 'Database error while adding school.');
  }
});
