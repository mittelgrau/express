const fileToJson = (string) => {
    let cleanString = string.replace('module.exports = ', '');
    let turnToJson = JSON.stringify(eval('(' + cleanString + ')'));

    return JSON.parse(turnToJson);
}

const catchErros = (fn) => {
    return function(req,res,next){
        return fn(req,res,next).catch(next);
    };
};

module.exports = {
    fileToJson,
    catchErros
}