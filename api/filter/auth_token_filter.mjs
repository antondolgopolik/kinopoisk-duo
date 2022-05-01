export function extractAuthToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader !== undefined) {
        req.authToken = authHeader.split(' ')[1];
    }
    next();
}
