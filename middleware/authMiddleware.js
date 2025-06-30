const jwt =require ('jsonwebtoken');

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(403).json({error: 'Not logged in'});

    const token = authHeader.split('')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        netx();
    } catch{
        res.status(403).json({error:'Token không hợp lệ!'});
    }
}

function isAdmin(req,res, next) {
    if(req.user.role !== 'admin') res.status(403).json({error: 'Bạn không có quyền truy cập!'});
    next();
}
function isUser(req, res, next ){
    if (req.user.role !=='user')  return res.status(403).json({error: 'Bạn không có quyền truy cập!'});
    next();
}

module.exports = {authenticate, isAdmin, isUser}