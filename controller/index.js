async function indexRoute(req,res,_next) {
    res.send('hello from index Route')
}

export {
    indexRoute
}