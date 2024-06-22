const CustomErr = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;
    if (!token) {
        // console.log("No token found");
        throw new CustomErr.UnauthenticatedError("Authentication Invalid");
    }
    try {
        const { user } = isTokenValid({ token });
        const { name, userId, role } = user;
        // console.log("Authenticated User:", { name, userId, role });
        req.user = { name, userId, role };
        next();
    } catch (error) {
        console.log("Token validation error:", error);
        throw new CustomErr.UnauthenticatedError("Authentication Invalid");
    }
}

const authorizePermissions = (req, res, next) => {
    console.log("Authorizing User:", req.user);
    if (req.user.role !== "admin") {
        console.log("Unauthorized role:", req.user.role);
        throw new CustomErr.UnauthorizedError("Unauthorized to access this route");
    }
    next();
}

module.exports = {
    authenticateUser,
    authorizePermissions
}
