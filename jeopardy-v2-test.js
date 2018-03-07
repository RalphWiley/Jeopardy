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
    var category1A1;
    var category1A2;
    var category1A3;
    var category2A1;
    var category2A2;
    var category2A3;
    var category3A1;
    var category3A2;
    var category3A3;
    var category1RandomQuestions = [];
    var category2RandomQuestions = [];
    var category3RandomQuestions = [];
    var category1RandomAnswers = [];
    var category2RandomAnswers = [];
    var category3RandomAnswers = [];

    //CHOOSE 3 SEPERATE CATEGORIES
    function chooseCategories() {
        //GO DOWN THIS PATH IF THERE ARE DUPLICATE CATEGORIES
        if (chosenCategories == '' && (categoryOne == cateogryTwo || categoryOne == categoryThree || cateogryTwo == categoryThree)) {
            categoryOne = allCategories[Math.floor(Math.random() * allCategories.length)];
            cateogryTwo = allCategories[Math.floor(Math.random() * allCategories.length)];
            categoryThree = allCategories[Math.floor(Math.random() * allCategories.length)];
            chooseCategories();
        }
        //IF THERE ARE NO DUPLICATE VALUES, STORE VALUES IN THE CHOSEN CATEGORIES ARRARY
        else {
            chosenCategories.push(categoryOne);
            chosenCategories.push(cateogryTwo);
            chosenCategories.push(categoryThree);
        }
    }
    //RUN FUNCTION TO CHOOSE CATEGORIES
    chooseCategories();

    //CHOOSE QUESTIONS BASED ON CHOSEN CATEGORIES
    function chooseQuestions() {
        //USER PATH IF THEY CHOSE EASY
        if (difficulty == 'Easy') {
            for (i = 0; i < chosenCategories.length; i++) {
                var queryURL = 'http://jservice.io/api/clues?value=200&value=100&value=300&value=200&category=' + chosenCategories[i];
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    for (var i = 0; i < chosenCategories.length; i++) {
                        console.log(queryURL);
                        console.log(response);

                        //CHOOSE QUESTIONS FOR CATEGORY 1
                        function category1QuestionPopulate() {
                            //GO DOWN THIS PATH IF THE SAME QUESTION IS DUPLICATED
                            if (category1Q1 == category1Q2 || category1Q1 == category1Q3 || category1Q2 == category1Q3) {
                                var rand1;
                                var rand2;
                                var rand3;
                                rand1 = Math.floor(Math.random() * response.length);
                                rand2 = Math.floor(Math.random() * response.length);
                                rand3 = Math.floor(Math.random() * response.length);
                                category1Q1 = response[rand1].question;
                                category1A1 = response[rand1].answer;
                                category1Q2 = response[rand2].question;
                                category1A2 = response[rand2].answer;
                                category1Q3 = response[rand3].question;
                                category1A3 = response[rand3].answer;
                                category1QuestionPopulate();
                            }
                            //GO DOWN THIS PATH IF NONE OF THE QUESTIONS ARE DUPLICATED
                            else {
                                category1RandomQuestions = [];
                                category1RandomAnswers = [];
                                category1RandomQuestions.push(category1Q1);
                                category1RandomQuestions.push(category1Q2);
                                category1RandomQuestions.push(category1Q3);
                                category1RandomAnswers.push(category1A1);
                                category1RandomAnswers.push(category1A2);
                                category1RandomAnswers.push(category1A3);
                                console.log('Question Arrary: ' + category1RandomQuestions);
                                console.log('Answer Arrary: ' + category1RandomAnswers)
                            }
                        }

                        //CHOOSE QUESTIONS FOR CATEGORY 2
                        function category2QuestionPopulate() {
                            //GO DOWN THIS PATH IF THE SAME QUESTION IS DUPLICATED
                            if (category2Q1 == category2Q2 || category2Q1 == category2Q3 || category2Q2 == category2Q3) {
                                var rand4;
                                var rand5;
                                var rand6;
                                rand4 = Math.floor(Math.random() * response.length);
                                rand5 = Math.floor(Math.random() * response.length);
                                rand6 = Math.floor(Math.random() * response.length);
                                category2Q1 = response[rand4].question;
                                category2A1 = response[rand4].answer;
                                category2Q2 = response[rand5].question;
                                category2A2 = response[rand5].answer;
                                category2Q3 = response[rand6].question;
                                category2A3 = response[rand6].answer;
                                category2QuestionPopulate();
                            }
                            //GO DOWN THIS PATH IF NONE OF THE QUESTIONS ARE DUPLICATED
                            else {
                                category2RandomQuestions = [];
                                category2RandomAnswers = [];
                                category2RandomQuestions.push(category2Q1);
                                category2RandomQuestions.push(category2Q2);
                                category2RandomQuestions.push(category2Q3);
                                category2RandomAnswers.push(category2A1);
                                category2RandomAnswers.push(category2A2);
                                category2RandomAnswers.push(category2A3);
                                console.log('Question Arrary: ' + category2RandomQuestions);
                                console.log('Answer Arrary: ' + category2RandomAnswers)
                            }
                        }

                        //CHOOSE QUESTIONS FOR CATEGORY 3
                        function category3QuestionPopulate() {
                            //GO DOWN THIS PATH IF THE SAME QUESTIONS IS DUPLICATED
                            if (category3Q1 == category3Q2 || category3Q1 == category3Q3 || category3Q2 == category3Q3) {
                                var rand7;
                                var rand8;
                                var rand9;
                                rand7 = Math.floor(Math.random() * response.length);
                                rand8 = Math.floor(Math.random() * response.length);
                                rand9 = Math.floor(Math.random() * response.length);
                                category3Q1 = response[rand7].question;
                                category3A1 = response[rand7].answer;
                                category3Q2 = response[rand8].question;
                                category3A2 = response[rand8].answer;
                                category3Q3 = response[rand9].question;
                                category3A3 = response[rand9].answer;
                                category3QuestionPopulate();
                            }
                            //GO DOWN THIS PATH IF NONE OF THE QUESTIONS ARE DUPLICATED
                            else {
                                category3RandomQuestions = [];
                                category3RandomAnswers = [];
                                category3RandomQuestions.push(category3Q1);
                                category3RandomQuestions.push(category3Q2);
                                category3RandomQuestions.push(category3Q3);
                                category3RandomAnswers.push(category3A1);
                                category3RandomAnswers.push(category3A2);
                                category3RandomAnswers.push(category3A3);
                                console.log('Question Arrary: ' + category3RandomQuestions);
                                console.log('Answer Arrary: ' + category3RandomAnswers);
                            }
                        }

                        //FIRST ITERATION THROUGH RESPONSE - STORE VALUES FOR CATEGORY 1
                        if (category1RandomQuestions == '') {
                            //POPULATE CATEGORY 1 ARRARY
                            return category1QuestionPopulate();
                        }
                        //SECOND ITERATION THROUGH RESPONSE - STORE VALUES FOR CATEGORY 2
                        else if (category1RandomQuestions != '' && category2RandomQuestions == '' && category3RandomQuestions == '') {
                            //POPULATE CATEGORY 2 ARRARY
                            return category2QuestionPopulate();
                        }
                        //LAST ITERATION THROUGH ARRARY - STORE VALUES FOR CATEGORY 3
                        else {
                            //POPULATE CATEGORY 3 ARRARY
                            return category3QuestionPopulate();
                        }

                    }
                });
            }
        }
        //USER PATH IF THEY CHOSE HARD
        else if (difficulty == 'Hard') {
            for (i = 0; i < chosenCategories.length; i++) {
                //Endpoint for hard http://jservice.io/api/clues?catagory=42&
                var queryURL = 'http://jservice.io/api/clues?value=500&value=600&value=700&value=500&value=500&category=' + chosenCategories[i];
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    for (var i = 0; i < chosenCategories.length; i++) {
                        console.log(queryURL);
                        console.log(response);

                        //CHOOSE QUESTIONS FOR CATEGORY 1
                        function category1QuestionPopulate() {
                            //GO DOWN THIS PATH IF ANY QUESTIONS ARE DUPLICATED
                            if (category1Q1 == category1Q2 || category1Q1 == category1Q3 || category1Q2 == category1Q3) {
                                var rand1;
                                var rand2;
                                var rand3;
                                rand1 = Math.floor(Math.random() * response.length);
                                rand2 = Math.floor(Math.random() * response.length);
                                rand3 = Math.floor(Math.random() * response.length);
                                category1Q1 = response[rand1].question;
                                category1A1 = response[rand1].answer;
                                category1Q2 = response[rand2].question;
                                category1A2 = response[rand2].answer;
                                category1Q3 = response[rand3].question;
                                category1A3 = response[rand3].answer;
                                category1QuestionPopulate();
                            }
                            //GO DOWN THIS PATH IF NONE OF THE QUESTIONS ARE DUPLICATED
                            else {
                                category1RandomQuestions = [];
                                category1RandomAnswers = [];
                                category1RandomQuestions.push(category1Q1);
                                category1RandomQuestions.push(category1Q2);
                                category1RandomQuestions.push(category1Q3);
                                category1RandomAnswers.push(category1A1);
                                category1RandomAnswers.push(category1A2);
                                category1RandomAnswers.push(category1A3);
                                console.log('Category: ' + response[i].category_id);
                                console.log('Question Arrary: ' + category1RandomQuestions);
                                console.log('Answer Arrary: ' + category1RandomAnswers)
                            }
                        }

                        //CHOOSE THE QUESTIONS FOR CATEGORY 2
                        function category2QuestionPopulate() {
                            //GO DOWN THIS PATH IF ANY QUESTIONS ARE DUPLICATED
                            if (category2Q1 == category2Q2 || category2Q1 == category2Q3 || category2Q2 == category2Q3) {
                                var rand4;
                                var rand5;
                                var rand6;
                                rand4 = Math.floor(Math.random() * response.length);
                                rand5 = Math.floor(Math.random() * response.length);
                                rand6 = Math.floor(Math.random() * response.length);
                                category2Q1 = response[rand4].question;
                                category2A1 = response[rand4].answer;
                                category2Q2 = response[rand5].question;
                                category2A2 = response[rand5].answer;
                                category2Q3 = response[rand6].question;
                                category2A3 = response[rand6].answer;
                                category2QuestionPopulate();
                            }
                            //GO DOWN THIS PATH IF NONE OF THE QUESTIONS ARE DUPLICATED
                            else {
                                category2RandomQuestions = [];
                                category2RandomAnswers = [];
                                category2RandomQuestions.push(category2Q1);
                                category2RandomQuestions.push(category2Q2);
                                category2RandomQuestions.push(category2Q3);
                                category2RandomAnswers.push(category2A1);
                                category2RandomAnswers.push(category2A2);
                                category2RandomAnswers.push(category2A3);
                                console.log('Category: ' + response[i].category_id);
                                console.log('Question Arrary: ' + category2RandomQuestions);
                                console.log('Answer Arrary: ' + category2RandomAnswers)
                            }
                        }

                        //CHOOSE THE QUESTIONS FOR CATEGORY 3
                        function category3QuestionPopulate() {
                            //GO DOWN THIS PATH IF ANY OF THE QUESTIONS ARE DUPLICATED
                            if (category3Q1 == category3Q2 || category3Q1 == category3Q3 || category3Q2 == category3Q3) {
                                var rand7;
                                var rand8;
                                var rand9;
                                rand7 = Math.floor(Math.random() * response.length);
                                rand8 = Math.floor(Math.random() * response.length);
                                rand9 = Math.floor(Math.random() * response.length);
                                category3Q1 = response[rand7].question;
                                category3A1 = response[rand7].answer;
                                category3Q2 = response[rand8].question;
                                category3A2 = response[rand8].answer;
                                category3Q3 = response[rand9].question;
                                category3A3 = response[rand9].answer;
                                category3QuestionPopulate();
                            }
                            //GO DOWN THIS PATH IF NONE OF THE QUESTIONS ARE DUPLICATED
                            else {
                                category3RandomQuestions = [];
                                category3RandomAnswers = [];
                                category3RandomQuestions.push(category3Q1);
                                category3RandomQuestions.push(category3Q2);
                                category3RandomQuestions.push(category3Q3);
                                category3RandomAnswers.push(category3A1);
                                category3RandomAnswers.push(category3A2);
                                category3RandomAnswers.push(category3A3);
                                console.log('Category: ' + response[i].category_id);
                                console.log('Question Arrary: ' + category3RandomQuestions);
                                console.log('Answer Arrary: ' + category3RandomAnswers);
                            }
                        }
                        //FIRST ITERATION THROUGH RESPONSE - STORE VALUES FOR CATEGORY 1
                        if (category1RandomQuestions == '') {
                            //POPULATE CATEGORY 1 ARRARY
                            return category1QuestionPopulate();
                        }
                        //SECOND ITERATION THROUGH RESPONSE - STORE VALUES FOR CATEGORY 2
                        else if (category1RandomQuestions != '' && category2RandomQuestions == '' && category3RandomQuestions == '') {
                            //POPULATE CATEGORY 2 ARRARY
                            return category2QuestionPopulate();
                        }
                        //LAST ITERATION THROUGH ARRARY - STORE VALUES FOR CATEGORY 3
                        else {
                            //POPULATE CATEGORY 3 ARRARY
                            return category3QuestionPopulate();
                        }
                    }
                });
            }
        }
    }

    console.log(chosenCategories);
    //CHOOSE CATEGORIES AND QUESTIONS
    chooseQuestions();

});