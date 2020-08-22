const router = require('express').Router();
const Car = require('../../../db/models/Car');
const { clearNotSet } = require('../../../utils/helper');

router.get('/', async (req, res) => {
  try {
    const cars = await Car.findAll();

    res.send(cars);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    res.send(car);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.post('/', async (req, res) => {
  try {
    const { registrationPlate, brand, model, color, vin, type, driverId } = req.body;

    const car = await Car.create({
      registrationPlate,
      brand,
      model,
      color,
      vin,
      type,
      _driver: driverId
    });

    res.send(car);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { registrationPlate, brand, model, color, vin, type, driverId } = req.body;

    const car = await Car.update(req.params.id, clearNotSet({
      registrationPlate,
      brand,
      model,
      color,
      vin,
      type,
      _driver: driverId
    }));

    res.send(car);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.put('/:id/driver', async (req, res) => {
  try {
    const { driverId } = req.body;

    await Car.update(req.params.id, {
      _driver: driverId
    });

    res.send(await Car.findById(req.params.id)
      .populate('_driver')
      .exec());
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await Car.delete(req.params.id);

    res.send({ msg: 'deleted' })
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

module.exports = router;
