function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function toLowerCaseNonAccentVietnamese(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
}

function loadAllNews() {
    setCookie('count_index_news', 0, 1)
    const count_index_news = getCookie('count_index_news')
    fetch(`/api/get-all-news-WxTPlLXkXsNBQ1vW`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            count_index_news: count_index_news
        })
    }).then(response => response.json())
        .then((data) => {
            const list_all_news_client = document.getElementById('list-all-news-client')
            const list_most_news_client = document.getElementById('list-most-news-client')

            data.list_all_news.forEach(news => {
                let query_html = `<div class="single-blog-post post-style-4 d-flex align-items-center my-2">
                                      
                <div class="post-thumbnail">
                <a href="${'/tin-tuc-du-hoc-va-xuat-khau-lao-dong/' + news._id}">
                    <img src="${'/images/' + news.image_title}" alt="${news.title}"></a>
                </div>
             
                <div class="post-content">
                    <a href="${'/tin-tuc-du-hoc-va-xuat-khau-lao-dong/' + news._id}" class="headline">
                        <h5>${news.title}</h5>
                    </a>
                    <p>${news.some_text + '...'}</p>
                  
                    <div class="post-meta">
                        <p><i class="fas fa-calendar-alt"></i>  ${news.created_date}</p>
                    </div>
                </div>
            </div>`

                let div = document.createElement('div')
                div.innerHTML = query_html
                list_all_news_client.append(div)
            });

            data.list_most_news.forEach((news) => {
                let query_html = `<div class="single-blog-post post-style-2 d-flex align-items-center widget-post">
                                
                <div class="post-thumbnail">
                <a href="${'/tin-tuc-du-hoc-va-xuat-khau-lao-dong/' + news._id}">
                    <img src="${'/images/' + news.image_title}" alt="${news.title}"></a>
                </div>
           
                <div class="post-content">
                    <a href="${'/tin-tuc-du-hoc-va-xuat-khau-lao-dong/' + news._id}" class="headline">
                        <h5 class="mb-0">${news.title}</h5>
                    </a>
                </div>
            </div>`
                let div = document.createElement('div')
                div.innerHTML = query_html
                list_most_news_client.append(div)
            })
        }).catch((error) => {
            console.error('Error:', error);
        });
}


function loadMoreNews() {
    setCookie('count_index_news', parseInt(getCookie('count_index_news')) + 1, 1)
    const count_index_news = getCookie('count_index_news')

    const btn_loading = document.getElementById('button-loading-news')
    const spinner_loading = document.getElementById('loading-news')

    btn_loading.style.display = 'none'
    spinner_loading.style.display = 'block'

    fetch(`/api/get-all-news-WxTPlLXkXsNBQ1vW`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            count_index_news: count_index_news
        })
    }).then(response => response.json())
        .then((data) => {
            if (data.list_all_news.length > 0) {
                const list_all_news_client = document.getElementById('list-all-news-client')

                data.list_all_news.forEach(news => {

                    let query_html = `<div class="single-blog-post post-style-4 d-flex align-items-center my-2">
                                      
                <div class="post-thumbnail">
                <a href="${'/tin-tuc-du-hoc-va-xuat-khau-lao-dong/' + news._id}">
                    <img src="${'/images/' + news.image_title}" alt="${news.title}"></a>
                </div>
             
                <div class="post-content">
                <a href="${'/tin-tuc-du-hoc-va-xuat-khau-lao-dong/' + news._id}">
                        <h5>${news.title}</h5>
                    </a>
                    <p>${news.some_text + '...'}</p>
                  
                    <div class="post-meta">
                        <p><i class="fas fa-calendar-alt"></i>  ${news.created_date}</p>
                    </div>
                </div>
            </div>`
                    setTimeout(() => {
                        let div = document.createElement('div')
                        div.innerHTML = query_html
                        list_all_news_client.append(div)


                        btn_loading.style.display = 'block'
                        spinner_loading.style.display = 'none'
                    }, 1000)
                })
            }
            else {
                setTimeout(() => {
                    spinner_loading.style.display = 'none'
                }, 500)
            }




        }).catch((error) => {
            console.error('Error:', error);
        });
}



