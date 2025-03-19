function isAuth(req, res, next) {
  console.log("🔥 isAuth middleware running...");

  if (req.session && req.session._id) {
    console.log("✅ Authorized:", req.session._id);
    return next();
  } else {
    console.log("❌ Unauthorized: No id in session");
    console.log("Session data:", req.session);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = isAuth;
