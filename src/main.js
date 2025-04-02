import iziToast from "izitoast";
import {showImage} from "./js/pixabay-api"
import {AddImage} from "./js/render-function"

import './css/style.css';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY; 

let request
let page = 1
let maxPage 
const refs = {
    allpicture : document.querySelector('.allPicture'),
    subBtn : document.querySelector(".imageButton"),
    input : document.querySelector(".inputs"),
    loadBtn : document.querySelector(".btnLoadMore"),
    loader: document.querySelector(".loader")
}

async function describeImageFromTags(tags, outputElement) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`, 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `На основі наступних тегів: "${tags}", придумай короткий опис зображення українською мовою.`
          }
        ],
        max_tokens: 100
      })
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;
    outputElement.textContent = result || "Опис недоступний.";
  } catch (error) {
    console.error("Помилка запиту:", error);
    outputElement.textContent = "Не вдалося отримати опис.";
  }
}


refs.subBtn.addEventListener('click',onFormSubmit);

async function onFormSubmit(e){
    showLouder()
    e.preventDefault();
    request =  refs.input.value;
    refs.allpicture.innerHTML ='';
    try{
    const pictures = await showImage(request,page);
        
        if(pictures.total == 0){emptyInputs()}
        else{
        AddImage(pictures.hits);
        maxPage = Math.ceil(pictures.totalHits / 40);
        checkBtnVisibleStatus();
        }

    } catch(error){ 
        console.log(error)
    }
    hideLouder()
}

refs.loadBtn.addEventListener('click',onLoadMoreClick)

async function onLoadMoreClick(){
    showLouder()

    try{
        page++
        const pictures = await showImage(request,page);
        AddImage(pictures.hits);
        checkBtnVisibleStatus();
        hideLouder()

        const heigth = refs.allpicture.firstElementChild.getBoundingClientRect().height

        scrollBy({
            behavior: 'smooth',
            top: heigth,
        })

    } catch(error){ 
        console.log(error)
    }

    
}
function hideBtn(){
    refs.loadBtn.classList.add('hide')
}
function showBtn(){
    refs.loadBtn.classList.remove('hide')   
}
function hideLouder(){
    refs.loader.classList.add("hide")
}
function showLouder(){ 
    refs.loader.classList.remove("hide")
}
function checkBtnVisibleStatus(){
    if(maxPage <= page){
        hideBtn();
        iziToast.show({
            title: 'Hey',
            message: "We're sorry, but you've reached the end of search results.",
            color: "blue",
            position: 'topRight',
            });
    }else{
        showBtn();
    }
}

function emptyInputs(){
    hideBtn()
    iziToast.show({
        title: 'Hey',
        message: "Sorry, there are no images matching your search query. Please try again!",
        color: "red",
    });
    return null
}
    
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("describeBtn")) {
    const tags = event.target.dataset.tags;
    const out = event.target.nextElementSibling;
    describeImageFromTags(tags, out);
  }
});
