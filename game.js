let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgain = document.querySelector('#play-again')

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 

let randomNumber = Math.floor(Math.random() * countriesAndCodes.length)
let randomCountryName = countriesAndCodes[randomNumber].name
randomCountryElement.innerHTML = randomCountryName

submitButton.addEventListener('click',function (){
    let answer = userAnswerElement.value
    let countryCode = countriesAndCodes[randomNumber]["alpha-2"]

    fetch(`https://api.worldbank.org/v2/country/${countryCode}?format=json`).then(result => result.json() )
        .then( (countryData) =>{

            let countryCapital= countryData[1][0].capitalCity
            answer = answer.toUpperCase()
            countryCapital = countryCapital.toUpperCase()

            if (answer === countryCapital){
                resultTextElement.innerHTML = `ANSWER IS CORRECT! The Capital of ${randomCountryName} is ${answer}`
            } else {
                resultTextElement.innerHTML = `ANSWER IS FALSE! The Capital of ${randomCountryName} is not ${answer}, it's ${countryCapital}`
            }

        }).catch( (error) =>{
            alert('Error occured' + error)
    })
})

playAgain.addEventListener('click',function (){
    randomNumber = Math.floor(Math.random() * countriesAndCodes.length)
    randomCountryName = countriesAndCodes[randomNumber].name
    randomCountryElement.innerHTML = randomCountryName
    userAnswerElement.value = ''
    resultTextElement.innerHTML = 'Replaced with result'
})



