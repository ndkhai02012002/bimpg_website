'use strict'

let list_element = []
const first_step = document.getElementById('first-step-add-news')
const second_step = document.getElementById('second-step-add-news')
const third_step = document.getElementById('third-step-add-news')

function addTitleNews() {
    let add_news_form = document.getElementById('add-news-form')
    let content = `<form class="my-3" id="form-create-element-h1" enctype="application/json">
            <div class="input-group">
                <span class="input-group-text">Nhập</span>
                <textarea name="h1" class="form-control" aria-label="With textarea"></textarea>
            </div>
            </form>
            <div class="d-flex justify-content-center">
            <button class="btn btn-dark" onclick="addElements('h1')">Lưu</button>
            </div>`
            
    add_news_form.innerHTML = content
    add_news_form.style.display = 'block'
}

function addLargeText() {
    let add_news_form = document.getElementById('add-news-form')
    let content = `<form class="my-3" id="form-create-element-h3" enctype="application/json">
            <div class="input-group">
                <span class="input-group-text">Nhập</span>
                <textarea name="h3" class="form-control" aria-label="With textarea"></textarea>
            </div>
            </form>
            <div class="d-flex justify-content-center">
            <button class="btn btn-dark" onclick="addElements('h3')">Lưu</button>
            </div>`
    add_news_form.innerHTML = content
    add_news_form.style.display = 'block'
}

function addMediumText() {
    let add_news_form = document.getElementById('add-news-form')
    let content = `<form class="my-3" id="form-create-element-h4" enctype="application/json">
            <div class="input-group">
                <span class="input-group-text">Nhập</span>
                <textarea name="h4" class="form-control" aria-label="With textarea"></textarea>
            </div>
            </form>
            <div class="d-flex justify-content-center">
            <button class="btn btn-dark" onclick="addElements('h4')">Lưu</button>
            </div>`
    add_news_form.innerHTML = content
    add_news_form.style.display = 'block'
}

function addSmallText() {
    let add_news_form = document.getElementById('add-news-form')
    let content = `<form class="my-3" id="form-create-element-p" enctype="application/json">
            <div class="input-group">
                <span class="input-group-text">Nhập</span>
                <textarea name="p" class="form-control" aria-label="With textarea"></textarea>
            </div>
            </form>
            <div class="d-flex justify-content-center">
            <button class="btn btn-dark" onclick="addElements('p')">Lưu</button>
            </div>`
    add_news_form.innerHTML = content
    add_news_form.style.display = 'block'
}


function addElements(type) {
    let form = document.getElementById('form-create-element' + '-' + type)
    let content = null

    content = form[type].value
    let x = {}
    x[type] = content
    list_element.push(x)
    let element = document.createElement(type)
    let demo_news = document.getElementById('demo-news')
    let new_content = document.createElement('div')
    element.innerHTML = content
    new_content.append(element)
    demo_news.append(new_content)

    if(type == 'h1') { 
        second_step.style.display = 'block'
        third_step.style.display = 'block'
        first_step.style.display = 'none'
    }

    form.style.display = 'none'
}

function addImage() {
    let form = document.getElementById('form-img-create-element')
    let content = null
    content = form['img'].files[0]

    let filename = content.name
    let new_filename = Date.now() + '-' + filename
    let x = {}
    x['img'] = new_filename
    list_element.push(x)
    const newContent = new File([content], new_filename, { type: content.type })
    let request = new FormData()
    request.append('news_img', newContent)
    fetch(`/api/admin/add-images`, {
        method: 'POST',
        body: request
    }).then(response => response.json())
        .then((status) => {
            const check_add_img = document.getElementById('check-add-img')
            if(status == "Thêm ảnh thành công") {
                check_add_img.innerHTML = status
                check_add_img.style.display = 'block'
            }
            else if (status == "Thêm ảnh thất bại") {
                check_add_img.innerHTML = status
                check_add_img.style.display = 'block'
            }
            else {
                check_add_img.style.display = 'none'
            }

        }).catch((error) => {
            console.error('Error:', error);
        });

    let title = form['title-img'].value
    let y = {}
    y['i'] = title
    list_element.push(y)
    let title_img = document.createElement('i')
    title_img.innerHTML = title
    let element = document.createElement('img')
    element.classList.add('news-img-demo-admin')
    let demo_news = document.getElementById('demo-news')
    let new_content = document.createElement('div')
    new_content.classList.add('d-flex', 'justify-content-center')
    title_img.classList.add('d-flex', 'justify-content-center')
    element.innerHTML = content
    new_content.append(element)
    
    demo_news.append(new_content)
    demo_news.append(title_img)
    element.src = URL.createObjectURL(content)
}

function saveNews() {
    const request = {
        list_element: list_element
    }
    fetch(`/api/admin/add-news`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list_element),
    }).then(response => response.json())
        .then((status) => {
            const check_add_news = document.getElementById('check-add-news')
            if(status == "Thêm tin tức thành công") {
                check_add_news.innerHTML = status
                check_add_news.style.display = 'block'
                setTimeout(() => window.location.replace("/admin/all-news"), 2000)
            }
            else if (status == "Thêm tin tức thất bại") {
                check_add_news.innerHTML = status
                check_add_news.style.display = 'block'
            }
            else {
                check_add_news.style.display = 'none'
            }

        }).catch((error) => {
            console.error('Error:', error);
        });
}


