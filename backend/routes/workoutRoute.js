const express = require('express');
const workoutController = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth');



const router = express.Router();

//this is the authentication middleware that protect all these routes
router.use(requireAuth);

router.get('/', workoutController.workout_get_all);

router.get('/:id', workoutController.workout_get_one);

router.post('/', workoutController.workout_create);

router.delete('/:id', workoutController.workout_delete);

router.patch('/:id', workoutController.workout_update);
module.exports = router;