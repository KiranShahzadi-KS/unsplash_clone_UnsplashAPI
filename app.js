let searchParam = location.search.split('=').pop();

const access_key = 'lwQ9MJtpqsqWZpKsusBGqxTDBr98fvPhd-Oqwm2Kx9Q'

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`

const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`


const gallery = document.querySelector('.gallery');

let currentImage = 0; // this will store the current image index
let allImages;  // this will store all the images 


const getImages = () => {
    fetch(random_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        makeImages(allImages)
    });
}

const searchImages = () => {
    fetch(search_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data.results;
        makeImages(allImages)
    });
}


const makeImages = (data) => {
 
    
    data.forEach((item, index) => {
        // console.log(item);

        let img = document.createElement('img');
        img.src = item.urls.regular;
        img.className = 'gallery-img';

        gallery.appendChild(img);

        //popup image

        img.addEventListener('click', () => {
            currentImage = index; // set the current image index to the clicked image index
            showPopup(item);
        })
    })
}

const showPopup = (item) => {
    let popup = document.querySelector('.image-popup');
    const downloadBtn = document.querySelector('.download-btn');
    const closeBtn = document.querySelector('.close-btn')
    const image = document.querySelector('.large-img')

    popup.classList.remove('hide');
    downloadBtn.href = item.links.html;
    image.src = item.urls.regular;

    closeBtn.addEventListener('click', () => {
        popup.classList.add('hide');
    })

}

if(searchParam == ''){
    getImages()
}else{
    searchImages()
}




// controls 

const preBtns = document.querySelector('.pre-btn');
const nxtBtns = document.querySelector('.nxt-btn');

preBtns.addEventListener('clicks', () => {
    if (currentImage > 0) {
        currentImage--;
        showPopup(allImages[currentImage]);
    }
})

nxtBtns.addEventListener('click', () => {
    if (currentImage < allImages.length - 1) {
        currentImage++;
        showPopup(allImages[currentImage]);
    }
})