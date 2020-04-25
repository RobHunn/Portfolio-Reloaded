// ****** Typed Text animation start ******
class TypeWriter {
  constructor(txtElement, words, wait = 1500) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];
    // Check if deleting
    if(this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    // Initial Type Speed
    let typeSpeed = 200;
    if(this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
window.addEventListener('load', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
// ****** Typed Text animation end ******


// ****** Easter Egg ******
const esterEgg = ( ()=>{
const myAudioElement = document.getElementById("navbar-brand-mp3");
const audioObj = new Audio('images/body-bag.mp3');
const audioObj1 = new Audio('images/No-Sensei.mp3');
const audioObj2 = new Audio('images/luck.mp3');
let audioObjAll = [];
let count = 0;
audioObjAll.push(audioObj2,audioObj1,audioObj);

return{
  myAudioElement :myAudioElement,
  audioObj:audioObj,
  audioObj1:audioObj1,
  audioObj2:audioObj2,
  audioObjAll:audioObjAll,
  count:count
}
})()

esterEgg.myAudioElement.addEventListener("click", event => {
  if(esterEgg.count <= 2){
      esterEgg.audioObjAll[esterEgg.count].play();
      esterEgg.count ++
  }else{
    esterEgg.count = 0;
    esterEgg.audioObjAll[esterEgg.count].play();
  }
});
const funfunfunction =  () => {
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jsKings')
 .then((res) => res.json())
 .then((data) => {
    const res = data.items
    const posts = res.filter(item => item.categories.length > 0);

    function toText(node) {
       let tag = document.createElement('div')
       tag.innerHTML = node
       node = tag.innerText
       return node
    }
    function shortenText(text,startingPoint ,maxLength) {
     return text.length > maxLength?
        text.slice(startingPoint, maxLength):
        text
    }
     let output = '';
    posts.forEach((item) => {
       output += `
        <div class="col-lg-4 col-md-6 col-12">
            <div class="blog-box-inner">
              <div class="blog-img-box">
                <img class="img-fluid" src="${item.thumbnail}" alt=" blog post ">
              </div>
              <div class="blog-detail">
                <h4>${shortenText(item.title, 0, 30)+ '...'}</h4>
                <ul>
                  <li><span>Post by ${item.author}</span></li>
                  <li>|</li>
                  <li><span>${shortenText(item.pubDate,0 ,10)}</span></li>
                </ul>
                <p>${shortenText(item.content,0, 350)+ '...'}</p>
                <a class="btn btn-lg btn-circle btn-outline-new-white" href="${item.link}">Read More</a>
              </Read>
            </div>
        </div>`;
    })
    document.querySelector('.blog__slider').innerHTML = output
  })
     .catch( err => console.log( err ) )
}
window.addEventListener('load', funfunfunction);