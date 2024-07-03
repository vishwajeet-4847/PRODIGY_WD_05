let maincity =["ranchi","varanasi","new delhi"];
let fields=["temp_c","humidity","cloud","wind_kph","wind_dir","wind_degree","heatindex_c","precip_in"];

let searchcity = document.getElementById("search-city");
let searchcityimg = document.getElementById("search-city-img");
let tabledata= document.getElementById("table-data");
let searchform = document.getElementById("search-form");

let a=1;

let cards = document.querySelectorAll(".card");
let databox = document.querySelector("#data");
let nodatabox = document.querySelector("#nodata");

cards.forEach(async (card,index)=>{
    try{
        nodatabox.classList.add("d-none");
        databox.classList.add("d-block");
        setInterval(async ()=>{
            let  data = await fetch(`http://api.weatherapi.com/v1/current.json?key=a4879229fe3144f2a96171713242206&q=${maincity[index].toLocaleLowerCase()}&aqi=no`);
            let weatherData = await data.json();
        
            card.innerHTML =` <div class="card-header py-3 text-bg-dark">
                      <h4 class="my-0 fw-normal">${maincity[index].toUpperCase()}</h4>
                    </div>
                    <div class="card-body">
                      <h1 class="card-title pricing-card-title"><img src=${"https:"+weatherData.current.condition.icon} /></h1>
                      <ul class="list-unstyled mt-3 mb-4">
                        <li>Temperate in celcius:  ${weatherData.current.temp_c}</li>
                        <li>Humidity: ${weatherData.current.humidity}</li>
                        <li>Cloud: ${weatherData.current.cloud}</li>
                        <li>Wind Speed in km_h:  ${weatherData.current.wind_kph}</li>
                        <li>Wind direction:  ${weatherData.current.wind_dir}</li>
                      </ul>
                     
                    </div>`;
        },1000);
       // card.innerHTML =` <h1>${weatherData.current.temp_c}</h1>`;
  
    }catch(e){
        databox.classList.add("d-none");
        nodatabox.classList.add("d-block");
        


    }
});

searchform.addEventListener("submit", async (e)=>{
    e.preventDefault();
   try{ 
    clearInterval(a);
    let searchval = document.getElementById("search").value.toLowerCase();
     a= setInterval(async()=>{
        let  data = await fetch(`http://api.weatherapi.com/v1/current.json?key=a4879229fe3144f2a96171713242206&q=${searchval}&aqi=no`);
        let weatherData = await data.json();
        searchcity.innerText=searchval.toUpperCase()+" weather details";
        searchcityimg.innerHTML = `<img src=https:${weatherData.current.condition.icon} />`;
        tabledata.innerHTML =` <thead>
                  <tr>
                    <th>#</th>
                    <th>Property</th>
                    <th>value</th>
                    
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <th>Temperature in celcius</th>
                        <th> ${weatherData.current.temp_c}</th>
                        
                      </tr>
                  <tr>
                    <th>2</th>
                    <td>Humidity</td>
                    <td>${weatherData.current.humidity}</td>
                    
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Cloud</td>
                    <td>${weatherData.current.cloud}</td>
                    
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>Wind Speed in km_h</td>
                    <td>${weatherData.current.wind_kph}</td>
                 
                  </tr>
                  <tr>
                    <th>5</th>
                    <td>Wind direction</td>
                    <td>${weatherData.current.wind_dir}</td>
                 
                  </tr>
                  <tr>
                    <th>6</th>
                    <td>Wind degree</td>
                    <td>${weatherData.current.wind_degree}</td>
                 
                  </tr>
                  <tr>
                    <th>7</th>
                    <td>Heat index in celcius</td>
                    <td>${weatherData.current.heatindex_c}</td>
                 
                  </tr>
                  <tr>
                    <th>8</th>
                    <td>Preciptation index</td>
                    <td>${weatherData.current.precip_in}</td>
                 
                  </tr>
                </tbody>`;
    },1000);
   
   }catch(e) {
        tabledata.innerHTML = `  <tr>
                
                <th>details not found</th>
                <th>${e}</th>
                
              </tr>`
   };
        searchform.reset();    
});