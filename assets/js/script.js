const container = document.querySelector('.main-container')
const input = document.querySelector('.search-country')
const countryName = document.querySelectorAll('.country-name')
const regions = document.querySelector('#region-selection')
const icon = document.querySelector('.theme') 
const body = document.querySelector('body')
const description = document.querySelector('.theme-description')

window.addEventListener('load', () => {
  let page = document.querySelector(".page")
  
  setTimeout(function() {
      
    if (page.classList.contains('loading')) {
      page.classList.remove('loading')
    }

}, 1500);
})

regions.addEventListener('change', function(event) {
  let region = event.target.value
  if (region == 'af'){
    show('region/africa')
  }else if (region == 'am'){
    show('region/americas')
  }else if (region == 'as'){
    show('region/asia')
  }else if (region == 'eu'){
    show('region/europe')
  }else if (region == 'oce'){
    show('region/oceania')
  }else {
    show('all')
  }
})

function show(option) {
  const api = `https://restcountries.eu/rest/v2/${option}`

  fetch(api)
    .then(results => {
      results.json()
    .then(data => {
      let cards = ''
      for (i in data) {
        cards += `<div class="card">
                    <img src="${data[i].flag}" alt="Country Flag" class="country-flag">
                    <div class="country-info">
                        <h2 class="country-name">${data[i].name}</h2>
                        <br>
                        <p class="country-population">Population: ${data[i].population} </p>
                        <p class="country-region">Region: ${data[i].region}</p>
                        <p class="country-capital">Capital: ${data[i].capital}</p>
                    </div>
                  </div>`

        data[i] = data[i].name.toLowerCase()
      }

      container.innerHTML = cards
      
      input.onkeyup = function(e) {
        t = this.value
        
        r = new RegExp(t, 'g')

        for (i in data){
          if (data[i].match(r) ){
            container.children[i].removeAttribute('style')
          }else {
            container.children[i].style.display = 'none'
          }
        }
      };

    })
    })
}

icon.addEventListener('click', function() {
  if (icon.classList.contains('fa-sun')){
    icon.classList.remove('fa-sun')
    icon.classList.add('fa-moon')
    body.dataset.theme = 'dark'
    description.innerText = 'Dark Mode'
  }else {
    icon.classList.remove('fa-moon')
    icon.classList.add('fa-sun')
    body.dataset.theme = 'light'
    description.innerText = 'Light Mode'
  }
})

show('all')
