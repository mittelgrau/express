async function indexController(req,res,_next) {
    res.send('hello from index Route')
}

module.exports = {
    indexController
}