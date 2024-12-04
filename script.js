const body = document.body;

/*
 no vertical scroll bar on my webpage i'll use this instead of window.innerWidth, 
i want this variable so i can pass it as an arg to determineScreenSize func
*/
const screenWidth =body.clientWidth; 

const shareSvgImg = document.querySelector('.share-icon');
const shareSvgContainer = document.querySelector('.share-icon-container');



function determineScreenSize(vw){
  /* when this func is called it will return true or false based on user screen size
    if it returns true then desktop styles will be aplied to share svg img otherwise apply mobile styles to share svg img
  */
  if(vw >= 1000){
   
    return true
  }
  else{
    return false
    
  }
}

function acrticlePreviewActiveState(){
  // will contain code for the sharesvgimg event for both mobile and desktop
  // will temporarily contain code to append those social media icons to the container, but func will probly get too big so will move that code out 
  
  if(!determineScreenSize(screenWidth)){
    console.log(`your screen is small it is currently ${screenWidth}px \napplying mobile layout styles`);
    shareSvgImg.addEventListener("click",(e)=>{
      console.log(`You clicked on this element: ${e.target.outerHTML}`,shareSvgImg);
      
    })
  }
  else{
    console.log(`your screen is big it is currently ${screenWidth}px  \napplying desktop layout styles`);
     shareSvgImg.addEventListener('click',(e)=>{
      console.log(`You clicked on this element: ${e.target.outerHTML}`,shareSvgImg);
    })
  }
  
}

acrticlePreviewActiveState();
