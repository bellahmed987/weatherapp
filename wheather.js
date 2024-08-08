const wheatherform=document.querySelector(".wheatherform");
const input=document.querySelector(".input");
const apikey="2559b90b6e579193232f1f712680170a";
const card=document.querySelector(".card");
wheatherform.addEventListener("submit", async event=>{
    event.preventDefault();
const city=input.value;
if(city){
   try{ const wheatherdata=await getwheather(city);
    displaywheather(wheatherdata);

   }
   catch(eror){
    console.error(eror);
displayeror(eror);
   }

}
else{
displayeror("please enter a valid city");
}
});
async function getwheather(city){
const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
const response= await fetch(apiurl);
return await response.json();
}
async function displaywheather(data){
const {name: city, 
    main: {temp, humidity}, 
    weather: [{description, id}]} = data;
    card.textContent="";
    card.style.display="flex";
    const citydisplay=document.createElement("h1");
    const tempdisplay=document.createElement("p");
    const humiditydisplay=document.createElement("p");
    const discodisplay=document.createElement("p");
    const img=document.createElement("p");
    citydisplay.textContent=city;
    tempdisplay.textContent=`Temprature:${(temp - 273.15).toFixed(1)}°C`;
    humiditydisplay.textContent=`Humidity:${humidity}`;
    citydisplay.classList.add(".citydisplay");
    discodisplay.textContent=description;
    img.textContent=emojidisplay(id);
    img.classList.add(".emoji");
   
    tempdisplay.classList.add(".temprature");
    humiditydisplay.classList.add(".humidity")
    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(discodisplay);
    card.appendChild(img);
}
 function emojidisplay(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "⛅";
        case (weatherId >= 500 && weatherId < 600):
            return "🌨️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 && weatherId < 800):
            return "☀️";
        case (weatherId === 800):
            return "🌤️";
        case (weatherId >= 801 && weatherId < 810):
            return "⛈️";
        default:
            return "❓";
    }

}
async function displayeror(msg){
    const erordis=document.createElement("p");
    erordis.textContent=msg;
    erordis.classList.add("erordis");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(erordis);

}
