// create inital list of animals
let animalList = ["cat", "dog", "chicken"];

$(document).ready(function () {

    renderButtons(animalList);
    // onClick submit run getGiphy function
    $("#submitAnimal").on('click', function () {
        console.log("submitAnimal eventhandler");
        let userInput = $("#userInput").val();
        // getGiphy(userInput);
        let newAnimal = $("input").eq(0).val();
        console.log('>>>>', newAnimal)
        if (newAnimal.length > 2) { // check user's input
            animalList.push(newAnimal);
        }
        renderButtons(animalList);
        getGiphy(userInput);
    });

    // for each animal, create a button and set its text to the current animal
    function renderButtons(arrayOfAnimals) {
        console.log("renderButtons");
        $("#animalButton").empty();
        arrayOfAnimals.forEach(function (animal) { //creates a button for each animal listed/ created
            var animalButtons = $("<button>")
            animalButtons.text(animal);
            // add class to all animal buttons
            animalButtons.attr("class", "animalBtn");
            // get an element by ID name and append animalButtons on onto that element
            $("#animalButton").append(animalButtons);
        });
    }

    // if the event.target.onclick === true run the getGiphy function on the current button
    function getGiphy(searchTerm) {
        console.log("getGiphy");
        console.log(searchTerm);

        let API_KEY = "zuvJBFpNQACuT3Cy6xLLx1FlvLh20lXJ";
        let queryUrl = "http://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + searchTerm + "t&limit=25&offset=0&rating=G&lang=en";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            let results = response.data;
            console.log("results", results);

            for (var i = 0; i < results.length; i++) {
                let animalDiv = $("<div class= \"animal\">");

                let rating = results[i].rating;

                let p = $("<p>").text("Rating: " + rating);

                let animated = results[i].images.fixed_height.url;
                let still = results[i].images.fixed_height_still.url;

                let animalImage = $("<img>");
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animated);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");

                animalDiv.append(p);
                animalDiv.append(animalImage);
                $("#images").append(animalDiv);
            }
        })

    }



    // onClick animalBtn run getGiphy function
    $("#images").on("click", ".animal-image", function () {


        console.log("animalBtn eventhandler");
        let state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });






    //render giphys - function that takes the response from the API and creates elements using jquerry
    //images getresponse.image
    //set attributes to said images



    //function that pulls images from giphy

    // $("#addAnimal").on('click', function () {
    //     console.log("#addAnimal eventhandler");
    //     $("#images").empty();
    //     $(".animalButton").removeClass("active");
    //     $(this).addClass("active");

    //     let type = $("#animal").val();
    //     // let querryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "+&q=" + type + "t&limit=25&offset=0&rating=G&lang=en";

    //     let querryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + type + "t&limit=25&offset=0&rating=G&lang=en";
    //     // before API request
    //     animalList.push(type);
    //     console.log(animalList);
    //     var animalButtons = $("<button>").text(animalList);
    //     $("#animalButton").append(animalButtons);
    //     // ============================



});