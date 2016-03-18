var animalArray = [];
$(document).ready(function(){
   init();
});

function init(){
    console.log ('jquery is hot.');
    getAnimals();
    enable();
}

function enable(){
    console.log('add some listeners');
    $('.animal-form').on('submit',processForm);
}


function processForm(event){
    event.preventDefault();
    var values = {};
    $.each($('.animal-form').serializeArray(), function(i,field){
        values[field.name] = field.value;
    });
    console.log(values);
    postAnimals(values);
    $('.animal-form').find('input[type=text]').val("");

}

function postAnimals(animal){
    $.ajax({
        type:"POST",
        url:"/animals",
        data: animal,
        success: function (response){
            console.log(response);
            getAnimals();
        }
    });

}

function getAnimals() {
    $.ajax({
        type: "GET",
        url: "/animals",
        success: function (response) {
            console.log(response);
            animalArray = response;
            appendDom(animalArray);
        }
    });
}

function appendDom(animalArray){
    $('.animal-farm').empty();

    for(var i = 0; i < animalArray.length; i++){
        $('.animal-farm').append('<div class="container"></div>');
        $('.animal-farm').children().last().append('<p>Name of animal : '+ animalArray[i].name +'</p>');
        $('.animal-farm').children().last().append('<p>How Many : '+ animalArray[i].amount +'</p>');
    }

}