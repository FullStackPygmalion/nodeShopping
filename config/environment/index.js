/* Global Configuration Applicattion */

const all = {
  env: process.env.NODE_ENV,
  port: 8080,
  ip: "127.0.0.1",

  secrets: {
    session: "mi-frase_s3cre3t4",
  },

  mongo: {
    uri:
      "mongodb+srv://shoppingNode_user:shoppingNode_pass@cluster0-g6ilc.mongodb.net/test?retryWrites=true&w=majority",
    db: "node_shopping_db",
  },
};

module.exports = all;
