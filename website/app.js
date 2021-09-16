/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '1ee5a4d556c3b0bea1d1a53cedf8a6b1';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

// define the get request function which returns the tempreature
const getRequest = async(baseUrl, location, apiKey)=> {
    const url = baseUrl + location + '&appid=' + apiKey + '&units=metric';
    const dataFetched = await fetch(url);
    const data = await dataFetched.json();
    return data.main.temp;
}
const postRequest = async(url='', data={}) => {
    const dataFetched = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.feeling,
        }),
    });
    const dataToReturn = await dataFetched.json();
    return dataToReturn;
}

// get the generate button element
const button = document.getElementById("generate");
// add an even for when the button is pressed
button.addEventListener('click', function (thisObject) {
    thisObject.preventDefault();

    const location = document.querySelector('#zip').value;
    const feeling = document.querySelector('#feelings').value;

    // check if the user didn't type anything in the zipcode area
    if (location != 'null') {
        getRequest(baseUrl, location, apiKey)
        .then(function(temp) {
            postRequest('/weather', {
                temp: temp, date: newDate, feeling: feeling
            }).then(function(postData) {
                document.querySelector('#date').innerHTML = 'Date: ' + postData.date;
                document.querySelector('#temp').innerHTML = 'Tempreature: ' + postData.temp.toFixed(2).toString() + ' degree C';
                document.querySelector('#content').innerHTML = 'You are feeling ' + postData.content;
            })
        });
    }
});
