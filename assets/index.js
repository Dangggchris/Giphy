

$(document).ready(function() {

    var lat = 0;
    var long = 0;
    
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            userlat = position.coords.latitude;
            userlong = position.coords.longitude;
    
            console.log("Latitude is: " + lat);
            console.log("Longitude is: " + long);
        });

    var buttons = ["marvel","Game of Thrones","DC","DotA 2","League of Legends","Super Smash Bros","Dungeons and Dragons","One Piece","Anime","Final Fantasy"];

    function preButts () {
        
        for (i=0; i<buttons.length; i++) {
            
            
            var but = $("<button>");
            but.addClass("coolStuff btn");
            but.attr("data-name", buttons[i]);
            but.text(buttons[i]);
            $("#preButts").append(but);
        }

    }

    function newButts() {
        $("#searchy").on("click", function() {

            $("#preButts").empty();
            event.preventDefault();

            var more = $("#inputy").val();

            buttons.push(more);

            preButts();
            
        })
    }

    $(document).on("click", ".coolStuff", function (){
        
        $("#giffysGoHere").empty();
        var something = $(this).attr("data-name");
        console.log(this);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        something + "&api_key=ctfzkznFP6ktZDX7R8ijHgtioznNP1CB&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {

            var results = response.data;

            for (i=0;i<results.length; i++) {

                var newGif = $("<div>");
                var rating = $("<p>").text("Rating: " + results[i].rating);
                var giffy = $("<img>");
                giffy.attr("src", results[i].images.fixed_height.url);
                giffy.attr("data-animate", results[i].images.fixed_height.url);
                giffy.attr("data-still", results[i].images.fixed_height_still.url)
                giffy.attr("data-state", "animate");
                giffy.addClass("gif");

                newGif.append(rating);
                newGif.append(giffy);

                $("#giffysGoHere").append(newGif);
                console.log(results);
            }
        })

        

    })

    $(document).on("click", ".gif", function (){
        
        var state = $(this).attr("data-state");

        if (state === "still") {
            animate = $(this).attr("data-animate");
            state = $(this).attr("src", animate);
            state= $(this).attr("data-state", "animate");
            console.log(state);
          }

        if (state === "animate") {
            animate = $(this).attr("data-still");
            state = $(this).attr("src", animate);
            state= $(this).attr("data-state", "still");
            console.log(state);
        }

    })

    


preButts();
newButts();

});

