export default next => (req, res) => {
  if (req.session.user) {
    return next(req, res)
  }

  res.status(401).json("Unauthorised")
}
