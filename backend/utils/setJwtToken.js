const setToken = async (user, statusCode, res) => {
    // generating token for user
    const token = await user.getJWTToken()
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    // setting token to cookie and return resposne
    res.status(statusCode).cookie("token", token, options).json({success: true, user, token})
}

module.exports = setToken