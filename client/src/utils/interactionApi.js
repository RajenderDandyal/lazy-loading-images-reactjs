////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// for production ..attach a intersection api polyfill scritp inside index.html
// to provide support for old browsers
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/// how intersection api works
// with events, scroll method invokes call back on every scroll theat tracks the position of target..
// which is executed by the main thread.. can lead to ui issues if having a lot of listeners on scroll events...
// ex displaying add dynamically on infinite scroll
// running animations based on scoll events
//so all these callbacks runs in ain thread whenever user scroll.. to track their target position/element
// Intersection api to rescue.. this only calls callBack when the target interects the position/viewport
// not on every scroll .. hence saving the workload on main thread
///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
// if the callback is to perform heavy task then use
// 1. workers .. for heavy duty work eg image processing or iterating a big loop
// 2. getAnimationFrame() for animations .. not setTimeout.. if callback needs to change the DOM
// 3. request​Idle​Callback()  aka Background Tasks API --> for less important work -->
// -->provides the ability to queue tasks to be executed automatically by the user agent when it determines that there is free time to do so
// 4. promises ... can be used for heavy lifting tasks ...takes that workload to new microTask api and return when resolved .. into the main thread
// 5. setTimeOut .. bad choice for heavy duty tasks ... as it will simply queue the callback .. but call back will finally be executed in the main thread



function interactionApi() {

  var lazyloadImages;
  console.log('intractionApi')
  if ("IntersectionObserver" in window) {

    lazyloadImages = document.querySelectorAll("img.lazy");
    console.log(lazyloadImages)
    let options = {
      root: null,//document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: 1.0
    }
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          image.classList.add("imageTag");
          imageObserver.unobserve(image);
        }
      });
    }, options);

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  }
  /*else {
     var lazyloadThrottleTimeout;
     lazyloadImages = document.querySelectorAll(".lazy");

     function lazyload () {
       if(lazyloadThrottleTimeout) {
         clearTimeout(lazyloadThrottleTimeout);
       }

       lazyloadThrottleTimeout = setTimeout(function() {
         var scrollTop = window.pageYOffset;
         lazyloadImages.forEach(function(img) {
           if(img.offsetTop < (window.innerHeight + scrollTop)) {
             img.src = img.dataset.src;
             img.classList.remove('lazy');
           }
         });
         if(lazyloadImages.length == 0) {
           document.removeEventListener("scroll", lazyload);
           window.removeEventListener("resize", lazyload);
           window.removeEventListener("orientationChange", lazyload);
         }
       }, 20);
     }

     document.addEventListener("scroll", lazyload);
     window.addEventListener("resize", lazyload);
     window.addEventListener("orientationChange", lazyload);
   }*/
}

export {interactionApi}