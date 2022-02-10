//variables
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // variables
    const location = search.value

    // reset last search
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    //fetch data
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
    //console the location searched.
    console.log(location)
})