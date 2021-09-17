window.addEventListener("load", function(){
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function() {
        document.querySelector(".preloader").style.display="none";
    }, 1000)
})


//Portfolio Item Filter

const   filterContainer = document.querySelector(".portfolio-filter"),
        filterBtns = filterContainer.children,
        totalFilterBtn = filterBtns.length,
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        totalPortfolioItem=portfolioItems.length;

        for(let i = 0; i < totalFilterBtn; i++){
            filterBtns[i].addEventListener("click", function(){
                filterContainer.querySelector(".active").classList.remove("active");
                this.classList.add("active")

                const filterValue = this.getAttribute("data-filter");
                for(let k=0; k<totalPortfolioItem; k++ ){
                    if(filterValue === portfolioItems[k].getAttribute("data-category")){
                        portfolioItems[k].classList.remove("hide")
                        portfolioItems[k].classList.add("show")
                        
                    }else{
                        portfolioItems[k].classList.remove("show")
                        portfolioItems[k].classList.add("hide")
                    }

                    if (filterValue === "all"){
                        portfolioItems[k].classList.remove("hide")
                        portfolioItems[k].classList.add("show")
                    }
                }
            })
        }

//Portfolio Lightbox
const lightbox = document.querySelector(".lightbox"),
        lightboxImg = lightbox.querySelector(".lightbox-img"),
        lightboxClose = lightbox.querySelector(".lightbox-close"),
        lightboxText = lightbox.querySelector(".caption-text"),
        lightboxCounter = lightbox.querySelector(".caption-counter"),
        lightboxGithub = lightbox.querySelector(".github"),
        lightboxWebsite = lightbox.querySelector(".website"),
        lightboxLanguages = lightbox.querySelector(".languages")
    let itemIndex = 0;

    for(let i = 0; i < totalPortfolioItem; i++){
        portfolioItems[i].addEventListener("click", function(){
            itemIndex=i;
            changeItem();
            toggleLightbox();
        })
    }

    function nextItem(){
        if (itemIndex === totalPortfolioItem-1){
            itemIndex = 0;
        }else{
            itemIndex++
        }
        changeItem();
    }

    function prevItem(){
        if (itemIndex == 0){
            temIndex = totalPortfolioItem-1;
        }else{
            itemIndex--
        }
        changeItem();
    }

    function toggleLightbox(){
        lightbox.classList.toggle("open")
    }

    function changeItem(){
        imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
        lightboxImg.src=imgSrc;
        lightboxText.innerHTML=portfolioItems[itemIndex].querySelector("h4").innerHTML;
        lightboxCounter.innerHTML=portfolioItems[itemIndex].querySelector("p").innerHTML;
        lightboxLanguages.innerHTML=portfolioItems[itemIndex].querySelector("ul").innerHTML;
        lightboxGithub.href = portfolioItems[itemIndex].querySelector(".github").href;
        lightboxWebsite.href = portfolioItems[itemIndex].querySelector(".website").href;
    }

//close Lightbox
lightbox.addEventListener("click", function(event){
    if(event.target === lightboxClose || event.target === lightbox){
        toggleLightbox(); 
    }
})

const nav = document.querySelector(".nav"),
navList=nav.querySelectorAll("li"),
totalNavList=navList.length,
allSection =document.querySelectorAll(".section");
totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++){
    const a=navList[i].querySelector("a");
    a.addEventListener("click", function(){

        removeBackSectionClass();

        for (let j = 0; j < totalNavList; j++){
            if(navList[j].querySelector("a").classList.contains("active")){
                addBackSectionClass(j);
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);

        if(window.innerWidth < 1200){
            asideSectionTogglerBtn();
        }
    })
}

function addBackSectionClass(num){
    allSection[num].classList.add("back-section");
}

function showSection(element){
    for (let i = 0; i < totalSection; i++){
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

function removeBackSectionClass(){
    for (let i = 0; i < totalSection; i++){
        allSection[i].classList.remove("back-section");
    }
}

function updateNav(element){
    for(let i=0; i< totalNavList; i++){
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

document.querySelector(".hire-me") .addEventListener("click", function(){
    const sectionIndex = this.getAttribute("data-section-index");
    
    showSection(this);
    updateNav(this);
    removeBackSectionClass();
    addBackSectionClass(sectionIndex);
})

const navTogglerBtn = document.querySelector(".nav-toggler"),
aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click" , asideSectionTogglerBtn);


function asideSectionTogglerBtn(){
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++){
        allSection[i].classList.toggle("open");
    }
}

window.addEventListener("DOMContentLoaded", function () {
    // get the form elements defined in your form HTML above
  
    var form = document.getElementById("my-form");
    // var button = document.getElementById("my-form-button");
    var status = document.getElementById("status");
  
    // Success and Error functions for after the form is submitted
    function success() {
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Thank you! I will get back to you as soon as possible.',
            showConfirmButton: false,
            timer: 3000
          })
        form.reset();
    }
  
    function error() {
        Swal.fire({
            icon: 'error    ',
            title: 'Ooopss...',
            text: 'To contact me, please fill out the required fields. Thanks!',
          })
    }
  
    // handle the form submission event
  
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request
  
  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }

  var typed = new Typed(".typing", {
    strings:["Software Engineer", "Frontend Developer", "Backend Developer", "Mobile App Developer", "Quality Assurance Engineer", "Web Developer"],
    typeSpeed: 100,
    backspeed: 60,
    loop: true

});