$(document).ready(function() {

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

                newGif.append(rating);
                newGif.append(giffy);

                $("#giffysGoHere").append(newGif);
                console.log(results[i].images.fixed_height.url);
            }
        })

    })

    


preButts();
newButts();

});

