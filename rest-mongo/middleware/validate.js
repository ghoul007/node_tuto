
module.exports= (validateRental) => {
    return (req, res, next) => {
        const { error } = validateRental(req.body)
        if (error) return res.status(400).send(error.details[0].message);
    }
}
