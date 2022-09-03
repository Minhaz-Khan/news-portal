// news list section 
const getAllNewsListData = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const allNewsList = await res.json();
        allListDisplay(allNewsList.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}
const allListDisplay = (allNewsList) => {
    const newsListContainer = document.getElementById('news-category');
    newsListContainer.innerHTML = `
       <div class="row g-md-0 g- p-4 justify-content-around align-item-center fw-semibold">
            <a class=" col-md col-3  text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[0].category_id},'${allNewsList[0].category_name}')">${allNewsList[0].category_name}</a>
            <a class=" col-md col-3 text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[1].category_id},'${allNewsList[1].category_name}')">${allNewsList[1].category_name}</a>
            <a class=" col-md col-4 text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[2].category_id},'${allNewsList[2].category_name}')">${allNewsList[2].category_name}</a>
            <a class=" col-md col-3 text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[3].category_id},'${allNewsList[3].category_name}')">${allNewsList[3].category_name}</a>
            <a class=" col-md col-4 text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[4].category_id},'${allNewsList[4].category_name}')">${allNewsList[4].category_name}</a>
            <a class=" col-md col-3 text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[5].category_id},'${allNewsList[5].category_name}')">${allNewsList[5].category_name}</a>
            <a class=" col-md col-3 text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[6].category_id},'${allNewsList[6].category_name}')">${allNewsList[6].category_name}</a>
            <a class=" col-md col-3 text-center pe-auto cursor-set" onclick="getAllNewsData(${allNewsList[7].category_id},'${allNewsList[7].category_name}')">${allNewsList[7].category_name}</a>
       </div>
    `
}


// display category news click by news list 
const getAllNewsData = async (newsId, newsName) => {
    isLoading(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/0${newsId}`);
        const allNews = await res.json();
        displayAllNews(allNews.data);
    }
    catch (error) {
        console.log(error)
    }
    // item found section 
    const numberofNews = allNews.data.length;
    const newsCount = document.getElementById('news-count');
    newsCount.classList.remove('d-none')
    newsCount.classList.add('bg-white', 'rounded')
    newsCount.innerHTML =
        `
    <div>${numberofNews} items found for category ${newsName}</div>
    `


}

const displayAllNews = (allNews) => {
    // console.log(allNews)
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';


    const errorContainer = document.getElementById('error-massage');
    // console.log(errorContainer);
    if (allNews.length === 0) {
        errorContainer.classList.remove('d-none')
    }
    else {
        errorContainer.classList.add('d-none')
    }


    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-3');
        newsDiv.innerHTML = `
    <div class=" row g-0 p-3">
        <div class="  col-md-2 col-12">
            <img src="${news.thumbnail_url ? news.thumbnail_url : 'no found img'}" class="w-100 rounded-start" alt="...">
        </div>
        <div class="col-md-8 col-12">
            <div class="card-body overflow-hidden news-info" style="height:200px;">
                <h5 class="card-title">${news.title ? news.title : 'title not fount'}</h5>
                <p class="card-text "><small class="text-muted">${news.details ? news.details : 'details not found'}</small></p>
            </div>
            <div class="ms-3 d-flex align-items-center justify-content-between"> 
                <div class="author-info d-flex align-items-center">
                    <img src="${news.author.img ? news.author.img : 'img not found'}"></img>  
                 
                 <div>
                    <p class="m-0">${news.author.name ? news.author.name : 'not found Name'}</p>
                    <p class="m-0">${news.author.published_date ? news.author.published_date : 'no date found'}</p>
                </div>
                </div>

                <div>
                <i class="fa-solid fa-eye"></i> <span>${news.total_view ? news.total_view : 'view not found'}
                </div>
                <button class="btn btn-primary px-3" onclick="openModal('${news._id ? news._id : 'id not found'}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
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
        .then(news => displayNewsDetails(news.data[0]))
        .catch(error = console.log(error))

}

// displayOn modal section 

const displayNewsDetails = (news) => {
    console.log(news);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <div>
        <img src="${news.image_url ? news.image_url : 'image not found'} " class="w-100"></img>
    </div>
    <p>${news.details ? news.details : 'no details found'}</p>
    <div class="d-flex author-info align-items-center justify-content-between">
        <div class="d-flex align-items-center ">
            <p  class="m-0">Author:</p> <img src="${news.author.img ? news.author.img : 'img not found'}"></img> 
            <div> 
            <p class="m-0">${news.author.name ? news.author.name : 'Name not found'}</p>
            <p class="m-0">${news.author.published_date ? news.author.published_date : 'Date not found'}</p>
            </div>
        </div>
        <div class="me-5">
            <i class="fa-solid fa-eye "></i> <span>${news.total_view ? news.total_view : 'view not found'}
         </div>
        
    </div>
    `
    const titleModal = document.getElementById('exampleModalLabel');
    titleModal.innerText = `${news.title ? news.title : 'title not found'}`
}


// spinner function area

const isLoading = (element) => {
    const spinnerContainer = document.getElementById('spinner');
    if (element === true) {
        spinnerContainer.classList.remove('d-none')
    }
    else {
        spinnerContainer.classList.add('d-none')
    }

}

document.getElementById('NewsButton').addEventListener('click', function () {
    getAllNewsListData();
    window.location.href = "index.html"


})
document.getElementById('blogButton').addEventListener('click', function () {
    window.location.href = "blog.html"
})


getAllNewsListData();

getAllNewsData(01);
