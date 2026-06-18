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
  try {
    const redirectUrl = req.session.redirectUrl || "/listings";

    delete req.session.redirectUrl;

    return res.status(200).json({
      success: true,
      message: "Welcome to Wanderlust! You are logged in!",
      user: req.user,
      redirectUrl,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
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

const userAvailableChack = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        user: null,
      });
    }

    res.json({
      user: req.user,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export default {
  signup,
  login,
  logout,
  userAvailableChack,
};
