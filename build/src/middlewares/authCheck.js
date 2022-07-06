"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiAuth = exports.isAuth = void 0;
const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/');
    }
};
exports.isAuth = isAuth;
function apiAuth(req, res, next) {
    // @ts-ignore
    if (req.session.nombre) {
        next();
    }
    else {
        res.status(401).json({ error: 'no autorizado!' });
    }
}
exports.apiAuth = apiAuth;
