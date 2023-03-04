const restricted = (req, res, next) => {
  console.log("session.object ", req.session);
  if (req.session && req.session.user) {
    next();
  } else {
    return res.status(401).json({ message: "You must loggin first" });
  }
};

export default restricted;
