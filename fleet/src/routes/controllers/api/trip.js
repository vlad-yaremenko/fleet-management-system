const router = require('express').Router();
const Trip = require('../../../db/models/Trip');
const { clearNotSet } = require('../../../utils/helper');

router.get('/', async (req, res) => {
  try {
    const trips = await Trip.findAll();

    res.send(trips);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const trip = await trip.findById(req.params.id);

    res.send(trip);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.post('/', async (req, res) => {
  try {
    const { budget, status, path } = req.body;

    const trip = await Trip.create({
      budget,
      status,
      path
    });

    res.send(trip);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { budget, status, path } = req.body;

    const trip = await Trip.update(req.params.id, clearNotSet({
      budget,
      status,
      path
    }));

    res.send(trip);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await Trip.delete(req.params.id);

    res.send({ msg: 'deleted' })
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

module.exports = router;
