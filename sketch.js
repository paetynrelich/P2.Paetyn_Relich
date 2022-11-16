let capture;
let x = 575;
let y = 475;
let z = 80;
let button = false;
let box1;
let rec1;
let article1;
let a1;
let article2;
let a2;
let art2;
let article3;
let a3;
let slider;
var newsURL='https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=OvOtoti6bxpfio1IbYNchXwSamhB8pjE'; 

// //API
async function get_weather(){
    const response = await fetch('he/api.weather.gov/points/33.5779,-101.8552');
    const json = await response.json()
    //console.log(json)
}
get_weather()

async function get_hourly_forecast(){
    const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
    const json = await response.json()
    //console.log(json)
}
get_hourly_forecast()

async function get_forecast(){
    const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast');
    const json = await response.json()
    //console.log(json)
}
get_forecast()

//DISPLAY API
let curr_temp;
let curr_short_forecast;

async function get_temp(){
    const response = await
      fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
    const json = await response.json();
    //console.log(json)
    curr_temp = json.properties.periods[0].temperature;
    curr_short_forecast = json.properties.periods[0].shortForecast;
}

function changeBG() {
  let val = random(255);
  background(val);
}

function newsdraw(news){
  article1 = news.results[0].title;
  a1 = news.results[0].url;
  article2 = news.results[1].title;
  a2 = news.results[1].url;
  article3 = news.results[2].title;
  a3 = news.results[2].url;
}

function setup() {
  
  createCanvas(750, 600);
  capture = createCapture(VIDEO);
  capture.size(750, 600);
  capture.hide();
  get_temp();
  newsURL = loadJSON(newsURL, newsdraw);
  colorMode(HSB, 255);
  slider = createSlider(10, 255, 127);
  box1 = new Drag_Box(100, 100, 50, 200, 'Box', 0);
  rec1 = new Drag_Rect(200, 100, 50, 100, 200, art2, 0);

  
}

function draw() {
  background(230);
  fill(0);
  rect(x, y, z, z, 20);
  if( button == true ) {
    image(capture, 0, 0, 750, 600);
    noFill();
    rect(x, y, z, z, 20);
    // box1.display();
    //rec1.display();
    let m = month();
    let d = day();
    let yr = year();
    textSize(30);
    fill(0);
    noStroke();
    text(m + '/'+ d + '/'+ yr, 15, 50);

    let h = hour();
    var newformat = h >= 12 ? 'PM' : 'AM'; 
    h = h % 12;
    let min = minute();
    fill(0);
    text(h + ':' + min + ' ' + newformat, 15, 80);

    textSize(30);
    fill(0);
    text('Current Temp: '+ curr_temp, 15, 110);

    draw_news(15, 200);
    
    strokeWeight(10);
    stroke(slider.value(), 255, 255);
    noFill();
    rect(0,0,750,600);
  }

}

function mousePressed(){
  if( mouseX > x && mouseY > y && mouseX < x + z && mouseY < y + z){
    button = !button;
  }
  
  box1._pressed();
  rec1._pressed();  
}

function mouseReleased() {
    box1.released();
    rec1.released();
}

function draw_news(){
  fill(200,400,220,75);
  fill(0)
  textSize(18);
  text('News to Start the Day:', 15, 160);
  textSize(15);
  let art1 = createA(a1, article1);
  art1.position(15, 170);
  //text(article1, 15, 170);
  let art2 = createA(a2, article2);
  art2.position(15, 200);
  //text(article2, 15, 200);
  let art3 = createA(a3, article3);
  art3.position(15, 230);
  //text(article3, 15, 230);
}

