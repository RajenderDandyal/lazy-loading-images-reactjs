let runLazyLoadImages = (removeListner) => {
  if (removeListner) {
    console.log('removeListner')
    document.removeEventListener("scroll", lazyload);
    window.removeEventListener("resize", lazyload);
    window.removeEventListener("orientationChange", lazyload);
    return
  }
  console.log('runn8ing')
  var lazyloadImages = document.querySelectorAll("img.lazy");
  console.log(lazyloadImages)
  var lazyloadThrottleTimeout;

  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(function () {
      var scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function (img) {
        //if(img.offsetTop < (window.innerHeight + scrollTop)) {
        if (img.getBoundingClientRect().top > 0 && img.getBoundingClientRect().top < window.innerHeight) {
          //console.log(img.offsetTop, (window.innerHeight + scrollTop))
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('imageTag');
        }

      });
      if (lazyloadImages.length == 0) {
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }, 20);
  }

  // to load for the first round .. for those images in viewport
  lazyload()
  //then lazyLoad through these events
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
// remove them when the component will unmount
}
export {runLazyLoadImages}