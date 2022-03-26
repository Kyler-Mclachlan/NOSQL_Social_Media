const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtsById)
  .put(updateThought)
  .delete(removeThought);

router
  .route('/:id/reactions')
  .post(addReaction)
  .delete(removeReaction);

module.exports = router;