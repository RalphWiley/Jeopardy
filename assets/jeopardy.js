$(document).ready(function () {

    // GLOBAL VARIABLES
    var difficulty = 'Hard';
    var answer;
    var allCategories = [306, 136, 42, 780, 21, 105, 25, 103, 7];
    var categoryOne = allCategories[Math.floor(Math.random() * allCategories.length)];
    var cateogryTwo = allCategories[Math.floor(Math.random() * allCategories.length)];
    var categoryThree = allCategories[Math.floor(Math.random() * allCategories.length)];
    var chosenCategories = [];
    var category1Q1;
    var category1Q2;
    var category1Q3;
    var category2Q1;
    var category2Q2;
    var category2Q3;
    var category3Q1;
    var category3Q2;
    var category3Q3;
    var category1RandomQuestions = [];
    var category2RandomQuestions = [];
    var category3RandomQuestions = [];

    //Choose 3 sepearate categories
    function pushToArrary() {
        if (chosenCategories == '' && (categoryOne == cateogryTwo || categoryOne == categoryThree || cateogryTwo == categoryThree)) {
            categoryOne = allCategories[Math.floor(Math.random() * allCategories.length)];
            cateogryTwo = allCategories[Math.floor(Math.random() * allCategories.length)];
            categoryThree = allCategories[Math.floor(Math.random() * allCategories.length)];
            pushToArrary();
        } else {
            chosenCategories.push(categoryOne);
            chosenCategories.push(cateogryTwo);
            chosenCategories.push(categoryThree);
        }
    }
    pushToArrary();

    function chooseQuestions() {
        if (difficulty == 'Easy') {
            for (i = 0; i < chosenCategories.length; i++) {
                //Endpoint for easy http://jservice.io/api/clues?catagory=42&value=200&value=100&value=300&value=400
                var queryURL = 'http://jservice.io/api/clues?value=200&value=100&value=300&value=400&category=' + chosenCategories[i];
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    for (var i = 0; i < chosenCategories.length; i++) {
                        console.log(queryURL);
                        console.log(response);
                        console.log('Question: ' + response[i].question + '  / Answer: ' + response[i].answer);
                    }
                });
            }
        }
        else if (difficulty == 'Hard') {
            for (i = 0; i < chosenCategories.length; i++) {
                //Endpoint for hard http://jservice.io/api/clues?catagory=42&
                var queryURL = 'http://jservice.io/api/clues?value=500&value=600&value=700&value=500&value=1000&category=' + chosenCategories[i];
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    for (var i = 0; i < chosenCategories.length; i++) {
                        console.log(queryURL);
                        console.log(response);
                        // console.log('Question: ' + response[i].question + '  / Answer: ' + response[i].answer);

                        //allCategories[Math.floor(Math.random() * allCategories.length)]
                        category1RandomQuestion1 = response[Math.floor(Math.random() * response.length)].question;
                        category1RandomQuestion2 = response[Math.floor(Math.random() * response.length)].question;
                        category1RandomQuestion3 = response[Math.floor(Math.random() * response.length)].question;
                        // console.log(category1RandomQuestion1);
                        // console.log(category1RandomQuestion2);
                        // console.log(category1RandomQuestion3);

                        function category1QuestionPopulate() {
                            if (category1RandomQuestions == '' && (category1RandomQuestion1 == category1RandomQuestion2 || category1RandomQuestion1 == category1RandomQuestion3 || category1RandomQuestion2 == category1RandomQuestion3)) {
                                category1RandomQuestion1 = response[Math.floor(Math.random() * response.length)].question;
                                category1RandomQuestion2 = response[Math.floor(Math.random() * response.length)].question;
                                category1RandomQuestion3 = response[Math.floor(Math.random() * response.length)].question;
                                categoryQuestionPopulate();
                            } 
                            else {
                                category1RandomQuestions = [];
                                category1RandomQuestions.push(category1RandomQuestion1);
                                category1RandomQuestions.push(category1RandomQuestion2);
                                category1RandomQuestions.push(category1RandomQuestion3);
                                console.log(category1RandomQuestions);
                            }
                        }

                        function category2QuestionPopulate() {
                            if (category1RandomQuestions == '' && (category1Q1 == category1Q2 || category1Q1 == category1Q3 || category1Q2 == category1Q3)) {
                                category1Q1 = response[Math.floor(Math.random() * response.length)].question;
                                category1Q2 = response[Math.floor(Math.random() * response.length)].question;
                                category1Q3 = response[Math.floor(Math.random() * response.length)].question;
                                categoryQuestionPopulate();
                            } 
                            else {
                                category1RandomQuestions = [];
                                category1RandomQuestions.push(category1Q1);
                                category1RandomQuestions.push(category1Q2);
                                category1RandomQuestions.push(category1Q3);
                                console.log(category2RandomQuestions);
                            }
                        }
                            
                            category1QuestionPopulate();

                            // if (category1RandomQuestions == '') {
                            //     category1RandomQuestions.push(category1RandomQuestion1);
                            //     category1RandomQuestions.push(category1RandomQuestion2);
                            //     category1RandomQuestions.push(category1RandomQuestion3);
                            //     console.log(category1RandomQuestions)
                            // }
                            // else if (category2Questions == '') {
                            //     categoryQuestions.push();
                            // }
                            // else if (category3Questions == '') {
                            //     category3Questions.push();
                            // }
                        }
                    });
            }
        }
    }

    console.log(chosenCategories);
    chooseQuestions();






    /*
    http://jservice.io/api/clues?catagory= +chosenCategory[i]+ &value= +easyDifficulty100
    */





});