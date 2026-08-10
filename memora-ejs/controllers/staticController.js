function showSignupPage(req, res) {
  return res.render("signup");
}

function showLoginPage(req, res) {
  return res.render("login");
}

export { showLoginPage, showSignupPage };
