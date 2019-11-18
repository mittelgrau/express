async function indexController(req,res,_next) {
    res.send(process.env.SAMPLEPASSWORD)
}

module.exports = {
    indexController
}