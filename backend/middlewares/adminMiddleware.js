module.exports = (req, res, next) => {
  if (req.user && req.user.rol === 'admin') {
    return next();
  }
  return res.status(403).json({ mensaje: 'Acceso solo para administradores' });
};
