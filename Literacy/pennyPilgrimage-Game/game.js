const gameArea = document.querySelector('canvas');
const element = document.getElementById("startButton")
const context = gameArea.getContext('2d');
const backgroundImage = new Image();
const navBarIcons1 = new Image();
const previousButtonImage = new Image();
const nextButtonImage = new Image();
const dialogueBoxImage = new Image();

const messageChunks = [
  "Welcome to the Penny Pilgrimage mini game - a fun and interactive way to learn money management skills!",
  "Financial literacy is the ability to manage money wisely. Its never too late or early to start learning. ",
  "It encompasses 9 areas: budgeting, saving, investing, insurance, banking, debt, credit, payment methods, and earning.",
];
  
// Paths to images

backgroundImage.src = "img/gameMap2.png";
navBarIcons1.src = "img/navBarIcons1.png";
previousButtonImage.src = "img/leftArrow.png";
nextButtonImage.src = "img/rightArrow.png";
dialogueBoxImage.src = "img/ameliaDialogue.png";

startButton.addEventListener('click',() =>{
    console.log('start clicked');
    //hides the button once clicked
    startButton.style.display = 'none';
    startGame();
    revealLink('navBarData');
    revealLink('questOnePrompt');   
});
    
    
document.getElementById('helpLink').addEventListener('click', ()=>{
  //Toggle the vivbility of the help screen
  const helpContent = document.getElementById('helpContent');
  helpContent.style.display = (helpContent.style.display === 'none' || helpContent.style.display === '') ? 'block' : 'none';
})

document.getElementById('questOnePrompt').addEventListener('click', ()=>{
  revealLink("ameliaDialogue");
  revealLink("previous");
  revealLink("next");
  revealLink("dialogue1");
  queueDialogue();
  //revealLink("dialogueBox");
})

function startGame(){
    context.drawImage(backgroundImage, 0, 0, gameArea.width, gameArea.height);
    context.drawImage(navBarIcons1, 20, 7 );
};

function revealLink(elementId){
  var element = document.getElementById(elementId);
  element.style.display = 'flex';
};

function hideLink(elementId) {
    var element = document.getElementById(elementId);
    element.style.display = 'none';
};

var currentChunk = 1;

function queueDialogue(){
  previous.addEventListener('click',() =>{
    console.log('previous clicked');
    if (currentChunk == 2){
      hideLink("dialogue2");
      revealLink("dialogue1");
      currentChunk--;
    }
    else if(currentChunk == 3){
      hideLink("dialogue3");
      revealLink("dialogue2");
      currentChunk--;
    }

  })



next.addEventListener('click',() =>{
    console.log('next clicked');
    if (currentChunk == 1){
      hideLink("dialogue1");
      revealLink("dialogue2");
      currentChunk++;
    }
    else if(currentChunk == 2){
    hideLink("dialogue2");
    revealLink("dialogue3");
    currentChunk++;
    }
    

  })
};

   
var levelNumber = 0;
//var currentChunk = 1;
var dialoguesLength = 3;

/*function showNextChunk() {
  if (currentChunk < messageChunks.length - 1) {
    currentChunk++;
    updateCurrentChunk();
  }
}

function showPreviousChunk() {
  if (currentChunk > 0) {
    currentChunk--;
    updateCurrentChunk();
  }
}

function updateCurrentChunk(){
  const message = messageChunks[currentChunk];
  quest1Launch();
}*/

/*function showNextDialogue() {
  if (currentDialogueIndex < dialoguesLength - 1) {
    hideLink(dialogues[currentDialogueIndex]);
    currentDialogueIndex++
    revealLink(dialogues[currentDialogueIndex]);
  }
};

function showPreviousDialogue() {
  if (currentDialogueIndex > 0) {
    hideLink(dialogues[currentDialogueIndex]);
    currentDialogueIndex--;
    revealLink(dialogues[currentDialogueIndex]);
  }
    
};*/

/*function showDialogue(index) {
    var humbleBeginningsIndex = document.getElementById('dialogue' + humbleBeginningsIndex);
    humbleBeginningsIndex = index;

    // Show the new current dialogue
    var nextDialogue = document.getElementById('dialogue' + humbleBeginningsIndex);
    nextDialogue.style.display = 'block';
}*/


function quest1Launch(){
  const message = messageChunks[currentChunk];
  //level up sequence
  var levelUp = false;
  if (levelUp) {
      levelNumber++;
      document.getElementById('levelNumber').textContent = levelNumber;
  }
};




 
 
  