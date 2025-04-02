// import SimpleLightbox from "simplelightbox";

// import "simplelightbox/dist/simple-lightbox.min.css";



const allpicture = document.querySelector('.allPicture')

export function AddImage(pictures){
    const picture = pictures.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads})=>{
      return`<li class = "onePicture">
        <img src= "${webformatURL}" alt="${tags}" class ="pictureImage" />
       
            <div class = "tags">
       
            <p><b>Likes</b> <br>${likes}</p>
            <p><b>Views</b> <br>${views}</p>
            <p><b>Downloads</b> <br> ${downloads}</p>
            <p><b>Comments</b> <br> ${comments}</p>
            </div>
            <button class="describeBtn" data-tags="${tags}">Описати</button>
            <p class="descriptionText"></p>

       </li>`  
    }).join("");
    allpicture.insertAdjacentHTML("beforeend",picture)


}


