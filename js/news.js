// news list section 
const getAllNewsListData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const allNewsList = await res.json();
    allListDisplay(allNewsList.data.news_category);
}
const allListDisplay = (allNewsList) => {
    const newsListContainer = document.getElementById('news-category');
    newsListContainer.innerHTML = `
       <div class="row row-col-4 p-4 justify-content-around fw-semibold">
            <a class="col text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[0].category_id})">${allNewsList[0].category_name}</a>
            <a class="col text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[1].category_id})">${allNewsList[1].category_name}</a>
            <a class="col-2 text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[2].category_id})">${allNewsList[2].category_name}</a>
            <a class="col text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[3].category_id})">${allNewsList[3].category_name}</a>
            <a class="col text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[4].category_id})">${allNewsList[4].category_name}</a>
            <a class="col text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[5].category_id})">${allNewsList[5].category_name}</a>
            <a class="col text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[6].category_id})">${allNewsList[6].category_name}</a>
            <a class="col text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[7].category_id})">${allNewsList[7].category_name}</a>
       </div>
    `
}


// display category news click by news list 
const getAllNewsData = async (newsId) => {
    isLoading(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/0${newsId}`);
    const allNews = await res.json();
    displayAllNews(allNews.data);

}

const displayAllNews = (allNews) => {

    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    allNews.forEach(news => {
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-3');
        newsDiv.innerHTML = `
    <div class=" row g-0 p-3">
        <div class="col-md-2">
            <img src="${news.thumbnail_url ? news.thumbnail_url : 'no found img'}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body overflow-hidden news-info" style="height:200px;">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text "><small class="text-muted">${news.details}</small></p>
            </div>
            <div class="ms-3 d-flex align-items-center justify-content-between"> 
                <div class="author-info d-flex">
                    <img src="${news.author.img ? news.author.img : 'img not found'}"></img>  
                 
                 <div>
                    <p class="m-0">${news.author.name ? news.author.name : 'not found Name'}</p>
                    <p class="m-0">${news.author.published_date ? news.author.published_date : 'no date found'}</p>
                </div>
                </div>

                <div>
                <i class="fa-solid fa-eye"></i> <span>${news.total_view ? news.total_view : 'view not found'}
                </div>
                <button class="btn btn-primary px-3" onclick="openModal('${news._id}')">Deteles</button>
            </div>
    </div>
        `
        newsContainer.appendChild(newsDiv)
    })
    isLoading(false);
}

const openModal = (newsId) => {
    const url = ` https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(url)
        .then(res => res.json())
        .then(news => console.log(news))
}



const isLoading = (element) => {
    const spinnerContainer = document.getElementById('spinner');
    if (element === true) {
        spinnerContainer.classList.remove('d-none')
    }
    else {
        spinnerContainer.classList.add('d-none')
    }

}



getAllNewsListData();

