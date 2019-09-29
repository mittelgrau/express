exports.fileToJson = (string) => {
    let cleanString = string.replace('module.exports = ', '');
    let turnToJson = JSON.stringify(eval('(' + cleanString + ')'));

    return JSON.parse(turnToJson);
}