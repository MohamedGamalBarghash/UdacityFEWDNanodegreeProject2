/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = "1ee5a4d556c3b0bea1d1a53cedf8a6b1";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// get the generate button element
const generateButton = document.getElementById("generate");
// add an even for when the button is pressed
generateButton.addEventListener('click', activateButton);

function activateButton (e) {
    e.preventDefault();

    // get the values entered by the user
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    if (zipCode !== '') {
        // generateButton.classList.remove('invalid');
        GETRequest(baseUrl, zipCode, apiKey)
            .then(function(data) {
                // do the POST request
                POSTRequest('/all', { temp: convertKelvinToCelsius(data.main.temp), date: newDate, content: content });
            }).then(function() {
                // update the UI after gathering the data
                updateUI();
            }).catch(function(error) {
                console.log(error);
                alert('The zip code is invalid. Try again');
            });
    }/* else {
        generateBtn.classList.add('invalid');
    }*/
}


// function to GET the weather data
const GETRequest = async (baseUrl, zipCode, apiKey) => {
    // fetch the weather data
    const res = await fetch(baseUrl + zipCode + '&APPID=' + apiKey);
    try {
        // get the data fetched and return it
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("ERROR:" + error);
    }
};

// function to POST the weather data
const POSTRequest = async (url='', data={})=> {
    const res = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });
    try {
        const newData = await res.json();
        return newData;
    }catch (error) {
        console.log('ERROR: ' + error);
    }
};


// update the UI elements
const updateUI = async() => {
    //fetch the response
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        // update new entry values
        if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined) {
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = allData.temp + ' degree C';
            document.getElementById('content').innerHTML = allData.content;
        }
    } catch (error) {
        console.log('ERROR: ', error);
    }
};

// helper function to convert temperature from Kelvin to Celsius
function convertKelvinToCelsius(kelvin) {
    if (kelvin < 0) {
        return 'below absolute zero (0 K)';
    } else {
        return (kelvin - 273.15).toFixed(2);
    }
}