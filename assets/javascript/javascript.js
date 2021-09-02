$(document).ready(function () {

    // all global variables
    var userDistance;
    var timeHike;
    var lat;
    var lon;
    var map;
    var trailLocation = [];
    // var weatherKey = "34af04e7087783be92496c2a33100782";
    var weatherKey = "43150bac67a6b6bc9ffc3d398fb24e60";

    // setting button clicks to specific functions
    $("#gps").on("click", gps);

    // this is for if the user doesn't enter anything in the fields.
    $("#zipCode").on("click", function (event) {
        event.preventDefault();

        if ($("#zip").val() === "") {

            // show error div and then reload the screen
            $("#userCity").addClass("hidden");
            $("#error").removeClass("hidden");
            setTimeout(function () {
                location.reload();
            }, 1000);
        } else {

            // hiding previous div and show the next
            $("#userCity").addClass("hidden");
            $("#hikingParameters").removeClass("hidden");
            zipCode();

        }
    });

    // this is for if the user doesn't enter anything in the fields.
    $("#no-gps").on("click", function (event) {
        event.preventDefault();
        if ($("#city").val() === "") {

            // show error div and then reload the screen
            $("#userCity").addClass("hidden");
            $("#error").removeClass("hidden");
            setTimeout(function () {
                location.reload();
            }, 1000);
        } else {

            // hiding previous div and show the next
            $("#userCity").addClass("hidden");
            $("#hikingParameters").removeClass("hidden");
            noGps();
        }
    });

    // uses the geolocation built in func to get lat and long coordinates
    function getLocation() {
        // Make sure browser supports this feature
        if (navigator.geolocation) {

            // Provide our showPosition() function to getCurrentPosition
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }


    // This will get called after getCurrentPosition()
    function showPosition(position) {

        // Grab coordinates from the given object
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        // if user blocks show location
        if (!position) {
            alert("You didn't share you're location.")
            return
        }
    }


    // this function used the parameter 
    function gps(e) {
        e.preventDefault();

        // calling function to get user lat and lon
        getLocation();

        // hiding previous div and show the next
        $("#userCity").addClass("hidden");
        $("#hikingParameters").removeClass("hidden");

        $(document).on("click", "#parameters", function (e) {
            e.preventDefault();

            // setting value to variables
            timeHike = $(".lengthTime").val();
            userDistance = $("#radius").val();

            // hiding previous div and show the next
            $("#hikingParameters").addClass("hidden");
            $("#userTrails").removeClass("hidden");

            var hikeURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=${userDistance}&key=200992005-36cef2b40b13fda0780742aba62d29e7`;

            // ajax call to create the map and trails

            createMapTrails(hikeURL, lat, lon);
        });
    }


    // another user input function takes in zip code.
    function zipCode() {

        // user input
        var zip = $("#zip").val();

        // making a url with user input
        var zipURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${weatherKey}`;
        // getting together all map, markers, and trail data to append to dom.
        getLocal(zipURL)

    }