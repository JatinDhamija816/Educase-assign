import express from 'express';
import { addSchool } from '../controllers/addSchool.controller.js';
import { listSchools } from '../controllers/listSchool.controller.js';

const router = express.Router();

router.post('/', addSchool);
router.get('/', listSchools);

export default router;
