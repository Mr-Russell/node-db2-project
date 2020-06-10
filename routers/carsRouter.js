const router = require("express").Router()

const db = require("../data/connection.js")

router.get("/", (req,res)=>{
  db("cars")
    .select("*")
    .then(cars => res.status(200).json(cars))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to retrieve Cars" })
    })
})

router.get("/:id", validateID, (req, res)=>{
  db("cars")
    .select("*")
    .where({id: req.car})
    .first()
    .then(car => res.status(200).json(car))
    .catch(err =>{
      console.log(err)
      res.status(500).json({ message: `Failed to retrieve Car with ID ${req.car}` })
    })
})

router.post("/", validateCar, (req, res)=>{
  db("cars")
    .insert(req.body, "id")
    .then(created => res.status(201).json(created))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to Create Car" })
    })
})

router.put("/:id", validateID, validateCar, (req, res)=>{
  db("cars")
    .where({id: req.car})
    .update(req.body)
    .then(updated => res.status(200).json(`Car ID ${req.car} has been Updated`))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: `Failed to Update Car with ID ${req.car}` })
    })
})

router.delete("/:id", validateID, (req, res)=>{
  db("cars")
    .where({id: req.car})
    .delete()
    .then(deleted => res.status(200).json(`Car ${req.car} has been Deleted`))
})


function validateID(req, res, next) {
  const carID = Number(req.params.id)

  db("cars")
    .where({id: carID})
    .then(cars => {
      if (cars.length === 0) {
        res.status(400).json({ message: `Car ID ${carID} does not Exist`})
      } else {
        req.car = carID
        next()
      }
    })
}


function validateCar(req, res, next){
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage){
    res.status(400).json({ message: `VIN, Make, Model, and Mileage are ALL REQUIRED!` })
  } else {
    next()
  }
}

module.exports = router