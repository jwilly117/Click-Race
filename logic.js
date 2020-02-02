
// Create a variable to reference the firebase
var database = firebase.database();

// ConnectionsRef to reference all the connections. 
var connectionsRef = database.ref("/connections");

// .info connected is a special location updatad when 
// any clients connection boolean changes.
var connectedRef = database.ref(".info/connected");

// When the client connection state changes
connectedRef.on("value", function(snap){

    // if they connect
    if(snap.val()){
        // add user to the connection list
        var con = connectionsRef.push(true);

        // and remove them when they disconnect()
        con.onDisconnect().remove();
    }
});

// page first loads or when the con list changes
connectionsRef.on("value",function(snap){

    // display viewercount in the html
    $("#numWatchers").text(snap.numChildren());
});

// /////////////////////////////////////////////////
// BLOCK FOR CLICK COUNTDOWN ///////////////////////////
////////////////////////////////////////////////////////

// Set the initial counter
var initialValue = 100;
var initialValue2 = 100;
var clickCounter = initialValue;
var clickCounter2 = initialValue2;


// At page load.....
database.ref("/clicks").on("value", function(snapshot){
    // Print the local data to the console.
    console.log(snapshot.val());

    // Change the HTML to reflect the local value in firebase
    clickCounter = snapshot.val().clickCount;
    // clickCounter2 = snapshot.val().clickCount2;

    // Log the value of the clickCounter
    console.log(clickCounter + " vs " + clickCounter2);

    // Change the HTML to reflect the local value in firebase
    $("#click-value").text(clickCounter);
    $("#click-value2").text(clickCounter2);

    // Make the value of the progress bar change
    $("#progress").css("width", (clickCounter + "%"));


}, function(err){
    console.log("The read failed: " + err.code);
});




// At page load.....
database.ref("/clicks2").on("value", function(snapshot){
    // Print the local data to the console.
    console.log(snapshot.val());

    // Change the HTML to reflect the local value in firebase
    clickCounter2 = snapshot.val().clickCount2;
    // clickCounter2 = snapshot.val().clickCount2;

    // Log the value of the clickCounter
    console.log(clickCounter + " vs " + clickCounter2);

    // Change the HTML to reflect the local value in firebase
    // $("#click-value").text(clickCounter);
    $("#click-value2").text(clickCounter2);

    // Make the value of the progress bar change
    $("#progress2").css("width", (clickCounter2 + "%"));


}, function(err){
    console.log("The read failed: " + err.code);
});


// ///////////////////////////////////
// When a user clicks a button
////////////////////////////////

///////////////////////////////////////////////////////////////
// Whenever a user clicks a button
////////////////////////////////////
$("#click-button").on("click", function(){

    // Reduce the counter by 1
    clickCounter--;

    // Alert the user and reset the counter
    if (clickCounter === 0){
        alert("You made it to zero");
        clickCounter = initialValue;
    }

    // save new value in firebase
    database.ref("/clicks").set({
        clickCount: clickCounter
    });

    // Log the value of the clickCounter
    console.log(clickCounter);
})

/////////////////////////////////////////////////////////
$("#click-button2").on("click", function(){

    // Reduce the counter by 1
    clickCounter2--;

    // Alert the user and reset the counter
    if (clickCounter2 === 0){
        alert("You made it to zero");
        clickCounter2 = initialValue2;
    }

    // save new value in firebase
    database.ref("/clicks2").set({
        clickCount2: clickCounter2
    });

    // Log the value of the clickCounter
    console.log(clickCounter2);
})


//////////////////////////////////////////////
// Reset Button
// Now code out what happens if restart is pressed
$("#restart").on("click", function(){

    // set clickcounter back to initial value
    clickCounter = initialValue;
    clickCounter2 = initialValue2;

    // database ref
    database.ref("/clicks").set({
        clickCount: clickCounter
    });

    database.ref("/clicks2").set({
        clickCount2: clickCounter2
    })

    //Log the new local count
    console.log("Count Reset to: " + clickCounter);

    // set the click value text to the value of clickcounter
    $("#click-value").text(clickCounter);

})