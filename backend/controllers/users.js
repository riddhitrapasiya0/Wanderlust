import User from "../models/user.js";

const signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.json({
        user: registeredUser,
        message: "Welcome to Wanderlust!",
      });
    });
  } catch (e) {
    req.flash("error", e.message);
    res.status(400).json({ message: e.message });
  }
};

const login = async (req, res) => {
  req.flash("success", "Welcome to Wanderlust! You are logged in!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  delete req.session.redirectUrl;
  res.json({
    user: req.user,
    message: "Welcome to Wanderlust! You are logged in!",
    redirectUrl,
  });
};

const logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.json({ message: "you are logged out!" });
  });
};

export default {
  signup,
  login,
  logout,
};
