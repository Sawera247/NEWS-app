const API_KEY = "088154aa4c7804ad34d32440fb0782ed";
const API_URL = "https://gnews.io/api/v4/search?q=";

window.addEventListener('load', () => fetchNews("Pakistan"));

function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${API_URL}${query}&token=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    
    bindData(data.articles)
    
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.image) return
        const testImg = new Image();
        testImg.src = article.image;

        testImg.onload = () => {
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article);
            cardsContainer.appendChild(cardClone);
        };
    });
}

function fillDataInCard(cardClone, article){
    const newsImage = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImage.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
        weekday: "short",  
        year: "numeric",   
        month: "short",    
        day: "numeric",
        timeZone: "Asia/Karachi"
    })

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    })
}

let curSelectedNav = null

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchBtn = document.getElementById('search-btn');
const searchText = document.getElementById('search-text');

searchBtn.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})