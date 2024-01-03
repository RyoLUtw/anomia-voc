var words = [];

//initialize elements
//var button = document.getElementById("loadButton");
//var menu = document.getElementById("settingMenu");
const body = document.querySelector('body');
var starTW = [];
var fileName = "";
var definitions = {};
var translations = {};
var synonyms = {};
var exSenFinal = {}; 
var targetWords
var text;



const sectionTop = document.getElementById("top");
const sectionBottom = document.getElementById("bottom");
let deck = ["no cards"];
let deckcolor = ['#FFFFFF'];
let deckcolorTxt = ['#000000'];
const pageWidth = document.documentElement.clientWidth;
const colorArray = [
  '#cc0000',
  '#0000FF',
  '#008f18',
  '#FFFF00',
  '#800080',
  '#000000'
];
const textColorArray = [
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#000000',
  '#FFFFFF',
  '#FFFFFF'
];

document.getElementById("top").value = deck[deck.length - 1];
document.getElementById("bottom").value = deck[deck.length - 1];

// call resizeText on page load
window.onload = function() {
  resizeText(sectionTop);
  resizeText(sectionBottom);
};

// call resizeText on window resize
window.addEventListener("resize", function() {
  resizeText(sectionTop);
  resizeText(sectionBottom);
});

function toggleStar() {  
  const starImage = document.getElementById('starImage');
  
  if (starImage.src.endsWith('full-star.png')) {
    // If the full star image is displayed, switch to the hollow star image
    starImage.src = 'hollow-star.png'; // Replace with the path to your hollow star image
    starImage.alt = 'Hollow Star';
    removeStar()
  } else {
    // If the hollow star image is displayed, switch to the full star image
    starImage.src = 'full-star.png'; // Replace with the path to your full star image
    starImage.alt = 'Full Star';
    addStar()
  }
}

function addStar() {
  const TW = document.getElementById('top').innerHTML;
  starTW.push(TW); 
  console.log(starTW)
}


function removeStar() {
  const TW = document.getElementById('top').innerHTML;
  const index = starTW.indexOf(TW);
if (index !== -1) {
  starTW.splice(index, 1);
  console.log(starTW)
}
}

function loadStudySetFromDevice(event) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';

  fileInput.onchange = function (event) {
    const input = event.target;
    const file = input.files[0];
    fileName = file.name;
    console.log(fileName)

    const reader = new FileReader();

    reader.onload = function (e) {
      const jsonContent = e.target.result;
      const data = JSON.parse(jsonContent);
      processJSONData(data);
    };

    reader.readAsText(file);
  };

  fileInput.click();
}

function processJSONData(data) {
  // Use the loaded JSON data
  words.length = 0
  obj = data.exSenFinal
  words = Object.keys(obj)
  exSenFinal = data.exSenFinal;
  definitions = data.definitions;
  translations = data.translations;
  synonyms = data.synonyms;
  text=data.text;
  if(data.starTW){
    starTW = data.starTW;
    }
}

function draw() {
  if (words.length == 0) {
    alert("請載入單字")
  }
  else {
    //const words = ["aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa "]
    const min = 0;
    const max = words.length - 1;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomC = Math.floor(Math.random() * 6);
    //console.log("words: " + vocL4)
    //console.log("radom: " + random)
    //console.log(deck.length);
    deck[deck.length] = words[random];
    deckcolor[deckcolor.length] = colorArray[randomC];
    deckcolorTxt[deckcolorTxt.length] = textColorArray[randomC];
    var cardcolor = deckcolor[deckcolor.length - 1];
    var txtcolor = deckcolorTxt[deckcolorTxt.length - 1];
    //console.log(deck);
    document.getElementById("top").textContent = deck[deck.length - 1];
    document.getElementById("bottom").textContent = deck[deck.length - 1];
    body.style.backgroundColor = cardcolor;
    sectionTop.style.color = txtcolor;
    sectionBottom.style.color = txtcolor;
    //console.log("deck: " + deck)
    resizeText(sectionTop);
    resizeText(sectionBottom);
  }
  updateStar();
  
}

function discard() {
  //console.log(deck.length);
  if (deck.length > 1) {
    deck.pop();
    deckcolor.pop();
    deckcolorTxt.pop();
    cardcolor = deckcolor[deckcolor.length - 1];
    txtcolor = deckcolorTxt[deckcolorTxt.length - 1];
    body.style.backgroundColor = cardcolor;
    sectionTop.style.color = txtcolor;
    sectionBottom.style.color = txtcolor;
    document.getElementById("top").textContent = deck[deck.length - 1];
    document.getElementById("bottom").textContent = deck[deck.length - 1];
    //console.log("deck: " + deck);
    resizeText(sectionTop);
    resizeText(sectionBottom);
  }
  console.log(starTW)
  updateStar();
}

function updateStar() {
  const TW = document.getElementById('top').innerHTML;
  console.log("word displaying now is " + TW)
  for (i=0;i<starTW.length;i++){
    
    if(starTW[i] == TW){
      starImage.src = 'full-star.png'; 
      starImage.alt = 'Full Star';
      console.log('match in starTW')
      break;
    }
    else{
    starImage.src = 'hollow-star.png'; 
    starImage.alt = 'Hollow Star';
    console.log('no match in starTW')
    }
  };
}

function resizeText(element) {
  // get the section's dimensions


  // get the font size of the element
  let fontSize = parseInt(window.getComputedStyle(element).fontSize);
  fontSize = 100
  element.style.fontSize = fontSize + "px";
  const sectionWidth = document.getElementById("topSection").clientWidth - 20;
  const sectionHeight = document.getElementById("topSection").clientHeight - 20;
  // decrease the font size until the text fits within the section
  const minFontSize = 1;
  while ((element.scrollWidth > sectionWidth || element.scrollHeight > sectionHeight) && fontSize > minFontSize) {
    fontSize--;
    element.style.fontSize = fontSize + "px";

  }
  /*console.log("scrollHeight= " + element.scrollHeight)
  console.log("sectionHeight= " + sectionHeight)
  console.log("scrollWidth= " + element.scrollWidth)
  console.log("sectionWidth= " + sectionWidth)*/
}

function changeUnit() {
  const unit = document.getElementById("unit").value;
  //console.log("unit: " + unit)
  words = voc[unit];
  console.log("words: " + words)
  deck = ["no cards"];
  console.log(deck);
  deckcolor = ['#FFFFFF'];
  deckcolorTxt = ['#000000'];
  document.getElementById("top").textContent = deck[deck.length - 1];
  document.getElementById("bottom").textContent = deck[deck.length - 1];
  body.style.backgroundColor = '#FFFFFF';
  sectionTop.style.color = '#000000';
  sectionBottom.style.color = '#000000';
  menu.style.display = menu.style.display === "none" ? "flex" : "none";
}

function retrieveStudySetData() {
  const combinedData = {
    text: text,
    exSenFinal: exSenFinal,
    definitions: definitions,
    translations: translations,
    synonyms: synonyms,
    targetWords: targetWords,
    starTW: starTW
  };

  const jsonString = JSON.stringify(combinedData, null, 2);
  return jsonString;
}

function saveStudySetToDevice() {
  jsonString = retrieveStudySetData();
  const link = document.createElement('a');
  link.href = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);
  link.download = fileName;
  //document.body.appendChild(link);
  link.click();
}
