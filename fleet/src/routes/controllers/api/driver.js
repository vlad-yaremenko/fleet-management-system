const router = require('express').Router();
const Driver = require('../../../db/models/Driver');
const Trip = require('../../../db/models/Trip');
const { clearNotSet } = require('../../../utils/helper');

router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.findAll();

    res.send(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    res.send(driver);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.post('/', async (req, res) => {
  try {
    const { firstname, lastname, gender, rate, bornDate } = req.body;

    const driver = await Driver.create({
      firstname,
      lastname,
      gender,
      rate,
      bornDate
    });

    res.send(driver);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { firstname, lastname, gender, rate, bornDate } = req.body;

    const driver = await Driver.update(req.params.id, clearNotSet({
      firstname,
      lastname,
      gender,
      rate,
      bornDate
    }));

    res.send(driver);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.put('/:id/car', async (req, res) => {
  try {
    const { carId } = req.body;

    await Driver.update(req.params.id, {
      _car: carId
    });

    res.send(await Driver.findById(req.params.id)
      .populate('_car')
      .exec());
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.put('/:id/trip', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver._car) {
      res.send({ msg: `You can't assign a trip to the driver without a car!` });

      return;
    }

    const { tripId } = req.body;

    await Driver.update(req.params.id, {
      _trip: tripId
    });

    await Trip.update(tripId, {
      status: 'in-progress'
    });

    res.send(await Driver.findById(req.params.id)
      .populate('_trip')
      .exec());
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await Driver.delete(req.params.id);

    res.send({ msg: 'deleted' })
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

module.exports = router;
