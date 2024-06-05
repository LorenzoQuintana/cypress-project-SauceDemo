class Credentials {
  static validUser = {
    username: "standard_user",
    password: "secret_sauce",
    firstName: "Lorenzo",
    lastName: "Quintana",
    postalCode: "47140",
  };

  static invalidUser = {
    username: "standard_use",
    password: "secret_sauce",
  };
}

module.exports = Credentials;
