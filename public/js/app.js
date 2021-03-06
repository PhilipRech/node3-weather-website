const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

// msgOne.textContent = 'From Js'

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const location = search.value

  if(!location){
    console.log('No location provided.')
  }else{
    const query = '/weather?address=' + location
  
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    fetch(query).then((response) => {
      response.json().then((data) => {
        if(data.error){
          msgOne.textContent = data.error
        }else{
          msgOne.textContent = data.location
          msgTwo.textContent = data.forecast
        }
      })
    })
  }
})

