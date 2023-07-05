function loadAllNews() {
    fetch(`/api/admin/get-all-news`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then((data) => {
            const list_all_news = document.getElementById('list-all-news')

            data.forEach(news => {
                let query = `<div class="d-flex justify-content-center">
                    <div class="card mb-3" style="max-width: 800px;">
                        <div class="row g-0">
                            <div class="col-md-4" class="card-news-img">
                                <img src="${'/images/' + news.image_title}" style="width: 100%;"
                                    alt="Tin Tức" />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${news.title}</h5>
                                    <p class="card-text">
                                        ${news._id}
                                    </p>
                                    <p class="card-text">
                                        <small class="text-muted">${news.created_date}</small>
                                    </p>
                                </div>
                                <div class="m-4">
                                    <button class="btn btn-danger" onclick="removeNews('${news._id}')">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`

                let card_element = document.createElement('div')
                card_element.innerHTML = query
                list_all_news.append(card_element)
            });
        }).catch((error) => {
            console.error('Error:', error);
        });
}

function removeNews(id) {
    const request = {
        news_id: id
    }

    if (confirm('Bạn có chắc muốn xóa tin tức: ' + id) == true) {
        fetch(`/api/admin/remove-news`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(response => response.json())
            .then((status) => {
                if (status == 'Xóa thành công') {
                    alert(status)
                    location.reload()
                }
                else {
                    alert("Xóa không thành công, hãy thử lại sau!")
                }

            }).catch((error) => {
                console.error('Error:', error);
            });
    }
    else {
        return
    }
}

function mostNews() {
    const most_news_form = document.getElementById('most-news-form')
    const value_1 = most_news_form['most-news-1'].value
    const value_2 = most_news_form['most-news-2'].value
    const value_3 = most_news_form['most-news-3'].value
    const value_4 = most_news_form['most-news-4'].value
    const value_5 = most_news_form['most-news-5'].value

    const check_1 = document.getElementById('check-most-news-1')
    const check_2 = document.getElementById('check-most-news-2')

    const check_3 = document.getElementById('check-most-news-3')

    const check_4 = document.getElementById('check-most-news-4')

    const check_5 = document.getElementById('check-most-news-5')

    if (value_1 == '') {
        check_1.innerHTML = 'ID 1 không được trống!'
        check_1.style.display = 'block'
    }
    else {
        check_1.innerHTML = ''
        check_1.style.display = 'none'
    }

    if (value_2 == '') {
        check_2.innerHTML = 'ID 2 không được trống!'
        check_2.style.display = 'block'
    }
    else {
        check_2.innerHTML = ''
        check_2.style.display = 'none'
    }

    if (value_3 == '') {
        check_3.innerHTML = 'ID 3 không được trống!'
        check_3.style.display = 'block'
    }
    else {
        check_3.innerHTML = ''
        check_3.style.display = 'none'
    }

    if (value_4 == '') {
        check_4.innerHTML = 'ID 4 không được trống!'
        check_4.style.display = 'block'
    }
    else {
        check_4.innerHTML = ''
        check_4.style.display = 'none'
    }

    if (value_5 == '') {
        check_5.innerHTML = 'ID 5 không được trống!'
        check_5.style.display = 'block'
    }
    else {
        check_5.innerHTML = ''
        check_5.style.display = 'none'
    }

    let list_id = [value_1, value_2, value_3, value_4, value_5]

    const request = {
        list_id: list_id
    }

    fetch(`/api/admin/insert-most-news`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    }).then(response => response.json())
        .then((status) => {
            if (status == 'Thêm thành công') {
                alert(status)
            }
            else {
                status.forEach((e) => {
                    document.getElementById('check-most-news-' + e).innerHTML = 'ID tin tức không tồn tại'
                    document.getElementById('check-most-news-' + e).style.display = 'block'
                })
            }

        }).catch((error) => {
            console.error('Error:', error);
        });
}