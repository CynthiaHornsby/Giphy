 var topics = ["kangaroo", "elephant", "skunk", "leopard", "red panda", "fox", "deer"];

 function makingButtons() {

  $(".buttons").empty();
  for (var i = 0; i < topics.length; i++) {
   var buttons = $("<button>");
   buttons.text(topics[i]);
   buttons.attr("data-name", topics[i]);
   buttons.addClass(buttonArray);
   $(".buttons").append(buttons);
  }
 }

 function newButton() {

  $("#submit").on("click", function() {
   event.preventDefault();
   var searchterm = $(".topicsearch").val();
   topics.push(searchterm);
   makingButtons();
   displayImage();

  });
 }

 function displayImage() {

  $(".buttonArray").on("click", function() {
   $(".images").empty();
   var search = $(this).attr("data-name");
   console.log(search);

   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    search + "&api_key=dc6zaTOxFJmzC&limit=10";
   $.ajax({
     url: queryURL,
     method: "GET"
    })

    .done(function(response) {

     var results = response.data;

     for (var j = 0; j < results.length; j++) {

      var topicImage = $("<img>");
      var rating = results[j].rating;
      var p = $("<p>").text("Rating: " + rating);
      console.log(p);

      topicImage.attr("src", results[j].images.fixed_height_still.url);
      topicImage.addClass("imageclick");
      topicImage.attr("data-still", results[j].images.fixed_height_still.url);
      topicImage.attr("data-animate", results[j].images.fixed_height.url);
      topicImage.attr("data-state", "still");
      topicImage.attr("alt", "searched image");
      console.log(topicImage);

      $(".images").append(topicImage);
      $(".images").append(p);


     }

     $(".imageclick").on("click", function() {
      var state = $(this).attr("data-state");

      if (state === "still") {
       var animatedGif = $(this).attr("data-animate");
       $(this).attr("src", animatedGif);
       $(this).attr("data-state", "animate");
      }
      else {
       var stillGif = $(this).attr("data-still");
       $(this).attr("src", stillGif);
       $(this).attr("data-state", "still");
      }
     });


    });

  });

 }



 makingButtons();
 newButton();
 displayImage();
 