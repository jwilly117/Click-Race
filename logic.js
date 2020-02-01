
// Create a variable to reference the firebase
var database = firebase.database();

// ConnectionsRef to reference all the connections. 
var connectionsRef = database.ref("/connections");

// .info connected is a special location updatad when 
// any clients connection boolean changes.
var connectedRef = database.ref(".info/connected");

