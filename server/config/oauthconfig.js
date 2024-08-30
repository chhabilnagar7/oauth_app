import express from "express";
import axios from "axios";
import User from "../model/User.js";

const router = express.Router();

const handleOAuthCallback = async (code, provider) => {
  let tokenEndpoint, userEndpoint, clientId, clientSecret;

  switch (provider) {
    case "google":
      tokenEndpoint = "https://oauth2.googleapis.com/token";
      userEndpoint = "https://www.googleapis.com/oauth2/v2/userinfo";
      clientId = process.env.GOOGLE_CLIENT_ID;
      clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      break;
    case "facebook":
      tokenEndpoint = "https://graph.facebook.com/v10.0/oauth/access_token";
      userEndpoint = "https://graph.facebook.com/me?fields=id,name,email";
      clientId = process.env.FACEBOOK_CLIENT_ID;
      clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
      break;
    case "github":
      tokenEndpoint = "https://github.com/login/oauth/access_token";
      userEndpoint = "https://api.github.com/user";
      clientId = process.env.GITHUB_CLIENT_ID;
      clientSecret = process.env.GITHUB_CLIENT_SECRET;
      break;
    default:
      throw new Error("Unsupported provider");
  }

  const tokenResponse = await axios.post(
    tokenEndpoint,
    new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: process.REDIRECT_URI,
      grant_type: "authorization_code",
    }).toString(),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  const accessToken = tokenResponse.data.access_token;

  const userResponse = await axios.get(userEndpoint, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return userResponse.data;
};

// Google oAuth Routes
router.get("/google", (req, res) => {
  const redirectUri = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=email%20profile`;
  res.redirect(redirectUri);
});

router.get("/google/callback", async (req, res) => {
  try {
    const user = await handleOAuthCallback(req.query.code, "google");
    let dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      dbUser = new User({
        name: user.name,
        email: user.email,
        password: "N/A",
      });
    }
    res.redirect("/home");
  } catch (error) {
    res.status(500).send(error);
  }
});

// facebook oatuh routes
router.get("/facebook", (req, res) => {
  const redirectUri = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=email`;
  res.redirect(redirectUri);
});

router.get("/facebook/callback", async (req, res) => {
  try {
    const user = await handleOAuthCallback(req.query.code, "facebook");
    let dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      dbUser = new User({
        name: user.name,
        email: user.email,
        password: "N/A",
      });
      await dbUser.save();
    }
    res.redirect("/home");
  } catch (error) {
    res.status(500).send(error);
  }
});

// github oauth routes
router.get('/github', (req, res) => {
    const redirectUri = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user:email`;
    res.redirect(redirectUri);
  });
router.get("/github/callback", async (req, res) => {
  try {
    const user = await handleOAuthCallback(req.query.code, "github");
    let dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      dbUser = new User({
        name: user.name,
        email: user.email,
        password: "N/A",
      });
      await dbUser.save();
    }
    res.redirect("/home");
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
