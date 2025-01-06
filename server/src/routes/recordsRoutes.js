import express from 'express';
import { 
    getAllQuizRecords, 
    createQuizRecord, 
    getQuizRecordById, 
    updateQuizRecord, 
    deleteQuizRecord, 
    getUserHistory,
    getLeaderboard 
} from '../controllers/recordsController.js';

const router = express.Router();

// Get all quiz records
router.get('/all', getAllQuizRecords);

// Create new quiz record
router.post('/new', createQuizRecord);

// Get specific record by ID
router.get('/record/:id', getQuizRecordById);

// Update record
router.put('/update/:id', updateQuizRecord);

// Delete record
router.delete('/delete/:id', deleteQuizRecord);

// Get user's quiz history
router.get('/history/:userId', getUserHistory);

// Get leaderboard
router.get('/leaderboard', getLeaderboard);

export default router;