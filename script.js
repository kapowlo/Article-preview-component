const body = document.body;

/*
 no vertical scroll bar on my webpage i'll use this instead of window.innerWidth, 
i want this variable so i can pass it as an arg to determineScreenSize func
*/
const screenWidth =body.clientWidth; 

const shareSvgImg = document.querySelector('.share-icon');
const shareSvgContainer = document.querySelector('.share-icon-container');

// grab second share svg img and add an event to it
const jsShareIcon2 = document.getElementById('js-share-icon-2');

const jsHiddenMobile = document.getElementById('js-hidden-mobile');
const jsHiddenContainer =document.getElementById('js-hidden-container');




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
      if(!jsHiddenContainer.classList.contains('hidden')){
          jsHiddenContainer.classList.add('hidden') // when class hidden is on it means the element is hidden
          jsHiddenMobile.classList.remove('hidden') // remove hidden class so the element will now appear on the webpage
      }
     
      else{
        jsHiddenContainer.classList.remove('hidden'); // if the element has the class remove it
      }
     
    })
  
    jsShareIcon2.addEventListener('click',()=>{
      // when the second share img is clicked re introduce the old layout and remove the mobile active layout by adding hidden class
      /*when 2nd share svg img is clicked must remove hidden class on container so old layout can re appear and new one disappears */
      jsHiddenContainer.classList.remove('hidden') 
      jsHiddenMobile.classList.add('hidden')
    })
  }



  //for pc layout 
  else{
    console.log(`your screen is big it is currently ${screenWidth}px  \napplying desktop layout styles`);
     shareSvgImg.addEventListener('click',(e)=>{
      console.log(`You clicked on this element: ${e.target.outerHTML}`,shareSvgImg);
    })
  }
  
}

acrticlePreviewActiveState();
