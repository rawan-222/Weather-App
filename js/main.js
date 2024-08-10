let link=`http://api.weatherapi.com/v1/forecast.json?key=e27df1c467ec493d847231930231902 &q=egypt&days=3&aqi=no&alerts=no`

async function test(){
   let response=await fetch(link)
   res=await response.json();
   display(res)
   
  }
  test()
function display(myobject){
  let monthnumber=( myobject.forecast.forecastday[0].date.substring((myobject.forecast.forecastday[0].date.indexOf("-"))+1,7))
  let day=new Date( myobject.location.localtime.slice(0,4) , myobject.location.localtime.slice(5,7)-1 , myobject.location.localtime.slice(8,10)   )
  let index=day.getDay()
  let DayName=days[index];
  let NextDay=days[index+1];//7-(7-6+2)
  let ThirdDay=days[index+2];
  
  if(NextDay==undefined){
    NextDay=days[days.length-1-index]
  }
  
  if(ThirdDay==undefined){
    
    ThirdDay=days[index+2-days.length]

  }
  
  
  document.getElementById("displayarea").innerHTML=`
    <div class="col-md-4 col-sm-12 w2 px-0 my-4 " >
            <div class="day d-flex justify-content-between pt-2 px-2 text-white ">
              <p>${DayName}</p>
              <p id="date">${myobject.forecast.forecastday[0].date.slice(8)+" "+month[monthnumber-1]}</p>
            </div>
            <div class="px-4 mt-2 " >
              <h3 class="text-white">${myobject.location.name}</h3>
              <p class="w3 text-white">${myobject.current.temp_c}<sup>o</sup>c</p>
              <img src="${'https:'+myobject.current.condition.icon}" alt="icon">
              <p class="text-white">${myobject.current.condition.text}</p>
            </div>
            <div class="px-4 mb-4">
              <img src="icon-umberella.png" alt="icon-umberella">
              <p class="d-inline me-3">${myobject.forecast.forecastday[1].day.daily_chance_of_rain}%</p>
              <img src="icon-wind.png" alt="wind icon">
              <p class="d-inline me-3">${myobject.current.wind_kph}Km/h</p>
              <img src="icon-compas.png" alt="icon-compass">
              <p class="d-inline me-3">${myobject.current.wind_dir}</p>
            </div>
           </div>   
           
           <div class="col-md-4 col-sm-12 w4 px-0 my-4 text-center  " >
            <div class="day d-flex justify-content-center pt-2 px-2 text-white ">
              <p>${NextDay}</p>
              
            </div>
            <div class="px-4 mt-2 pt-4" >
              <img src="${'https:'+myobject.forecast.forecastday[1].day.condition.icon}" alt="">
              <p class="fs-3 fw-semibold text-white">${myobject.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>c</p>
              <p class="fs-5 fw-semibold text-white">${myobject.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
              <p class="text-info">${myobject.forecast.forecastday[1].day.condition.text}</p>
            </div>
           </div>  
           <div class="col-md-4 col-sm-12 w2 px-0 my-4 text-center " >
            <div class="day d-flex justify-content-center pt-2 px-2 text-white ">
              <p>${ThirdDay}</p>
            </div>
            <div class="px-4 mt-2 pt-4 " >
              <img src="${'https:'+myobject.forecast.forecastday[2].day.condition.icon}" alt="">
              <p class="fs-3 fw-semibold text-white">${myobject.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>c</p>
              <p class="fs-5 fw-semibold text-white">${myobject.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
              <p class="text-info">${myobject.forecast.forecastday[2].day.condition.text}</p>
            </div>
           </div>  

`

}
let month=["January","February","March" ,"April","May","June","July","August","September","October","November","December"]
let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday',"Saturday"]

function findLocation(){
   link=`http://api.weatherapi.com/v1/forecast.json?key=e27df1c467ec493d847231930231902&q=${document.querySelector(".locationinput").value}&days=3&aqi=no&alerts=no`
    test()    
    
}
document.querySelector(".locationinput").addEventListener("keyup",function(e){
  if(e.code!="backspace"&&document.querySelector(".locationinput").value!=""){
    findLocation()
  }
})
document.querySelector(".findbutton").addEventListener("click",function(e){
  if(e.code!="backspace"&&document.querySelector(".locationinput").value!=""){
    findLocation()
  }
})

