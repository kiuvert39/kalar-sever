"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    const user = getUserFromToken(req.headers.authorization);
    if (req.users && req.users.isAdmin) {
        console.log(req.users.isAdmin);
        next();
    }
    else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
exports.isAdmin = isAdmin;
function getUserFromToken(authorization) {
    throw new Error("Function not implemented.");
}
