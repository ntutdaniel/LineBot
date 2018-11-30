module.exports = function(context, next) {
    // TODO: check if the user is logged in -> is there data associated with the Line UserId in DB?
    console.log('Debug: user is logged In')
    next();
}