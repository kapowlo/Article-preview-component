const body = document.body;

/*
 no vertical scroll bar on my webpage i'll use this instead of window.innerWidth, 
i want this variable so i can pass it as an arg to determineScreenSize func
*/
let screenWidth =body.clientWidth; 

const shareSvgImg = document.querySelector('.share-icon');
const shareSvgContainer = document.querySelector('.share-icon-container');

// grab second share svg img and add an event to it
const jsShareIcon2 = document.getElementById('js-share-icon-2');

const jsHiddenMobile = document.getElementById('js-hidden-mobile');

const jsHiddenContainer =document.getElementById('js-hidden-container');

const jsHiddenDesktop = document.getElementById('js-hidden-desktop');



/*the function debounce limits the frequency of my resize event by adding a timer(wait time)  
this is a bit too advanced as i still dont understand closure 

but i got this code from 
https://dev.to/yanagisawahidetoshi/boost-your-javascript-performance-with-the-debounce-technique-497i
*/ 
function debounce(func, wait) {
  let timeout;
  return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          func.apply(context, args);
      }, wait);
  };
}

const handleResize = debounce(() => {
  screenWidth = body.clientWidth;
  console.log(`Screen resized updated width: ${screenWidth}px`);
}, 300);

/*this resize event listener i added to window object, will update screenWidth variable when window size is modified 
fixes issue where after changing screen size from mobile to pc the screenwidth variable would'nt update correctly
*/

window.addEventListener('resize',handleResize);

function determineScreenSize(vw){
  /* when this func is called it will return true or false based on user screen size
    if it returns true then desktop styles will be aplied to share svg img otherwise apply mobile styles to share svg img
  */
  if(vw >= 1000){
    console.log(`applying pc layout your viewport width is :${screenWidth}px`);
    
    return true;
  }
  else{
    console.log(`applying mobile layout your viewport width is :${screenWidth}px`);
    
    return false;
    
  }
}



/*
code modification:
when user click on share img svg i'll check the screen size and use the correct layout

so all func call should be in the click even for the svg image
*/
console.log('\n');

shareSvgImg.addEventListener("click",()=>{
  console.log(`checking screen size... \n its ${screenWidth} px`);
  handleResize();
  
  //pass the vw of the user as arg to determineScreenSize func, will apply correct layout based on true/false
  if(!determineScreenSize(screenWidth)){
    console.log('mobile device detected...');
    if(!jsHiddenContainer.classList.contains('hidden')){
      jsHiddenContainer.classList.add('hidden'); // when class hidden is on it means the element is hidden
      jsHiddenMobile.classList.remove('hidden'); //remove hidden class,the element now appears on the webpage(so the mobile activestate should appear)
  }
  else{
    // if the element has the class remove it, the hiddencontainer and its content appears on the webpage
    jsHiddenContainer.classList.remove('hidden'); 
  
  }
  jsShareIcon2.addEventListener('click',()=>{
    // when the second share img is clicked re introduce the old layout and remove the mobile active layout by adding hidden class
    /*when 2nd share svg img is clicked must remove hidden class on container so old layout can re appear and new one disappears */
    jsHiddenContainer.classList.remove('hidden'); //remove hidden class, go back to original non-activestate layout
    jsHiddenMobile.classList.add('hidden'); //  add hidden class, so mobile activestate should disappear 
  })
    
  }


  /*pc layout   jsHiddenDesktop.classList.toggle('hidden')*/
  else{
    console.log('\n pc master race layout...');
    if(jsHiddenDesktop.classList.contains('hidden')){
      
      jsHiddenDesktop.classList.remove('hidden') // remove hidden class, the pc active state will be visible
    }
    else{
      jsHiddenDesktop.classList.add('hidden') // add hidden class, the pc active state should not be visible
    }

    /* fix bug: when going from desktop active state, reducing screen size to mobile,then clicking on share svg img
    the mobile active state appears correctly, but then when clicking on the second share svg img the layout would go back to pc active state
    instead of displaying the original mobile layout(test by commentting out the code below)
    
    */
    jsShareIcon2.addEventListener('click',()=>{
      jsHiddenDesktop.classList.add('hidden');
    })
  }
})

/*fix issue: once the mobile activestate is visible, if i increase the screen size to be above 1000px
the mobile active state stays present.
Same issue when the desktop active state is isible and ireduce the screen size to be below 1000px
the desktop active state stays present


solution : whenever user adjust his screen remove the active state layout


*/


// on the window object add an resize event second arg arrow func

window.addEventListener('resize',()=>{
  //anytime user resizes his screen remove the active state layout if it is visible by adding the class hidden to mobile or desktop div
  if(!jsHiddenMobile.classList.contains('hidden')){
      // if hidden class is absent element is visible
      jsHiddenMobile.classList.add('hidden');
      jsHiddenContainer.classList.remove('hidden'); // needed to fully bring back original mobile layout(not active state)
  }
  else if(!jsHiddenDesktop.classList.contains('hidden')){
    // if hidden class is absent element is visible
    jsHiddenDesktop.classList.add('hidden');
  }
  handleResize(); // limits frequency of the resize event triggering
})