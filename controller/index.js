async function indexController(req,res,_next) {
    res.send('Hello from index controller')    
}

module.exports = {
    indexController
}