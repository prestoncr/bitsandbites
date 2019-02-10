//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://prestoncr:123mdb123@ds113815.mlab.com:13815/bandb_cookbook', //place the URI of your mongo database here.
  }, 
  port: 8080
};