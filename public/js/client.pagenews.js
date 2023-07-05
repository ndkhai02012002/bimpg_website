function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
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

function createContentElement(type, value) {
    if (type == 'img') {
        const div = document.createElement('div')
        div.classList.add('d-flex', 'justify-content-center')
        const img = document.createElement('img')
        img.classList.add('news-img-demo-admin')
        img.src = '/images/' + value
        img.alt = 'News Image'
        div.append(img)
        return div
    }
    else if (type == 'i') {
        const div = document.createElement('div')
        div.classList.add('d-flex', 'justify-content-center')
        const i = document.createElement('i')
        i.innerHTML = value
        div.append(i)
        return div
    }
    else {
        const element_dom = document.createElement(type)
        element_dom.innerHTML = value
        return element_dom
    }

}

function loadPageNews() {
    const news_id = getCookie('news_id')

    const request = {
        news_id: news_id
    }

    fetch(`/api/get-news-by-id-WxTPlLXkXsNBQ1vW`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    }).then(response => response.json())
        .then((data) => {
            if (data != '404') {
                const news_page_body = document.getElementById('news-page-body')
                const dict_news = data.dict_news
                const l_random_news = data.l_random_news
                const l_most_news = data.l_most_news

                const loop_for_elements = (e) => {
                    let content = ``
                    let count = 1
                    e.forEach((element, index) => {
                        if (element.h3) {
                            if (count != 1) {
                                content += `</section>`
                            }
                            content += `<section id="news-${count}-collapsible">
                        <h3>${element.h3}</h3>`
                            count += 1
                        }
                        else if (element.h4) {
                            content += `<h4>${element.h4}</h4>`
                        }

                        else if (element.p) {
                            content += `<p>${element.p}</p>`
                        }
                        else if (element.img) {
                            content += `<div class="img-news-content">
                        <img src="../images/${element.img}" alt="${element.img}">
                        </div>`
                        }
                        else if (element.i) {
                            content += `<i>${element.i}</i>`
                        }
                    })
                    content += `</section>`

                    return content
                }


                const loop_most_news = (e) => {
                    let content = ``
                    e.forEach((element) => {
                        content += `<div class="single-blog-post post-style-2 d-flex align-items-center widget-post">
                    <!-- Post Thumbnail -->
                    <div class="post-thumbnail">
                    <a href="${'/tin-tuc-du-hoc-va-xuat-khau-lao-dong/' + element._id}">
                        <img src="../images/${element.image_title}" alt="${element.image_title}">
                        </a>
                    </div>
                    <!-- Post Content -->
                    <div class="post-content">
                        <a href="${'/tin-tuc-du-hoc-va-xuat-khau-lao-dong/' + element._id}">
                            <h5 class="mb-0">${element.title}</h5>
                        </a>
                    </div>
                </div>`
                    })
                    return content
                }

                const loop_section_news = (e) => {
                    let content = ``
                    let count = 1
                    e.forEach((element, index) => {
                        if (element.h3) {
                            content += `<li class="nav-item">
                        <a href="#news-${count}-collapsible">${element.h3}</a>
                    </li>`
                            count += 1
                        }
                    })

                    return content
                }

                const loop_more_news = (e) => {
                    let content = ``
                    e.forEach((element, index) => {
                        content += ` <div class="col-12 col-md-6 col-lg-4">
                 
                    <div class="single-blog-post bg-white rounded-1">
                       
                        <div class="post-thumbnail">
                        <a href="${'/tin-tuc-du-hoc-va-xuat-khau-lao-dong/' + element._id}">
                            <img src="../images/${element.image_title}" alt="${element.image_title}">
                            </a>
                                <div class="post-cta"><a href="#">Hot</a></div>
                        </div>
                  
                        <div class="post-content">
                            <a href="${'/tin-tuc-du-hoc-va-xuat-khau-lao-dong/' + element._id}">
                                <h5>${element.title}</h5>
                            </a>
                            <p>${element.some_text + '...'}</p>
                         
                            <div class="post-meta">
                                <p><i class="far fa-calendar mx-1"></i>${dict_news.created_date}</p>
                            </div>
                        </div>
                    </div>
                </div>`
                    })
                    return content
                }

                let query = `<div class="bg-page-news">
            <div class="title-page">
                <h1>${dict_news.title}</h1>
                <h6><i class="far fa-calendar"></i>${dict_news.created_date}</h6>
            </div>
        
            <div class="row news-page-by-id">
                <div class="col-lg-8">
                    <div class="breadcumb-div">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item"><a href="/"><i class="fas fa-home mx-1"></i> Trang chủ</a></li>
                                <li class="breadcrumb-item"><a href="/tin-tuc-du-hoc-va-xuat-khau-lao-dong">Tin tức</a></li>
                                <li class="breadcrumb-item active" aria-current="page">${dict_news.title}</li>
                            </ol>
                        </nav>
                    </div>
                    <div id="scrollspy-collapsible" class="section-news-mobi">
            <h5>Nội dung</h5>
            <ul class="nav flex-column nav-pills menu-sidebar">
                ${loop_section_news(dict_news.elements)}
            </ul>
        </div>
                    <div class="content-news-page scrollspy-example" data-mdb-spy="scroll"
                        data-mdb-target="#scrollspy-collapsible" data-mdb-offset="0">
                        ${loop_for_elements(dict_news.elements)}

                    </div >
                </div >
    <div class="col-lg-4">
        <div id="scrollspy-collapsible" class="section-news">
            <h5>Nội dung</h5>
            <ul class="nav flex-column nav-pills menu-sidebar">
                ${loop_section_news(dict_news.elements)}
            </ul>
        </div>

        <div class="top-news">
            <h4 class="title">Tin tức nổi bật</h4>
            <div class="widget-content">
               
              ${loop_most_news(l_most_news)}
            </div>
        </div>
        <div class="form-contact-news mx-4" data-mdb-spy="scroll"
                            data-mdb-target="#scrollspy1" data-mdb-offset="0">
                            <form class="form form-contact" id="contact-form">
                <p style="font-size:12px; font-weight: 600; opacity: 75%; color:#ecb390">Vui lòng điền thông tin
                    chính xác</p>
                <div class="inputContainer">
                    <input type="text" class="input" placeholder="Họ tên" name="fullname">
                        <label class="label">Họ tên</label>
                       
                </div> <span id="check-fullname"
                        style="color: red; font-size: 14px; margin-left: 10px; margin-bottom:10px; display: none;"></span>

                <div class="inputContainer">
                    <input type="email" class="input" placeholder="Email" name="email">
                        <label class="label">Email</label>
                       
                </div> <span id="check-email"
                        style="color: red; font-size: 14px; margin-left: 10px; margin-bottom:10px; display: none;"></span>

                <div class="inputContainer">
                    <input type="tel" class="input" placeholder="Số điện thoại" name="contact" pattern="^[0|84]">
                        <label class="label">Số điện thoại</label>
                       
                </div>
 <span id="check-contact"
                        style="color: red; font-size: 14px; margin-left: 10px; margin-bottom:10px; display: none;"></span>
                <div class="inputContainer">
                    <input type="text" class="input" placeholder="Năm sinh" name="birth" maxlength="4">
                        <label class="label">Năm sinh</label>
                        
                </div><span id="check-birth"
                        style="color: red; font-size: 14px; margin-left: 10px; margin-bottom:10px; display: none;"></span>

                <div class="custom-select my-3" style="width:100%;">
                    <select name="city">
                        <option value="0">Chọn Thành phố:</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
                        <option value="An Giang">An Giang</option>
                        <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                        <option value="Bắc Giang">Bắc Giang</option>
                        <option value="Bắc Kạn">Bắc Kạn</option>
                        <option value="Bạc Liêu">Bạc Liêu</option>
                        <option value="Bắc Ninh">Bắc Ninh</option>
                        <option value="Bến Tre">Bến Tre</option>
                        <option value="Bình Định">Bình Định</option>
                        <option value="Bình Dương">Bình Dương</option>
                        <option value="Bình Phước">Bình Phước</option>
                        <option value="Bình Thuận">Bình Thuận</option>
                        <option value="Bình Thuận">Bình Thuận</option>
                        <option value="Cà Mau">Cà Mau</option>
                        <option value="Cao Bằng">Cao Bằn</option>
                        <option value="Cần Thơ">Cần Thơ</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Đắk Lắk">Đắk Lắk</option>
                        <option value="Đắk Nông">Đắk Nông</option>
                        <option value="Điện Biên">Điện Biên</option>
                            <option value="Đồng Nai">Đồng Nai</option>
                                <option value="Đồng Tháp">Đồng Tháp</option>
                                    <option value="Đồng Tháp">Đồng Tháp</option>
                                        <option value="Gia Lai">Gia Lai</option>
                                            <option value="Hà Giang">Hà Giang</option>
                                                <option value="Hà Nam">Hà Nam</option>
                                                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                                                        <option value="Hải Dương">Hải Dương</option>
                                                            <option value="Hải Phòng">Hải Phòng</option>
                                                                <option value="Hậu Giang">Hậu Giang</option>
                                                                    <option value="Hòa Bình">Hòa Bình</option>
                                                                        <option value="Hưng Yên">Hưng Yên</option>
                                                                            <option value="Khánh Hòa">Khánh Hòa</option>
                                                                                <option value="Kiên Giang">Kiên Giang</option>
                                                                                    <option value="Kon Tum">Kon Tum</option>
                                                                                        <option value="Lai Châu">Lai Châu</option>
                                                                                            <option value="Lâm Đồng">Lâm Đồng</option>
                                                                                                <option value="Lạng Sơn">Lạng Sơn</option>
                                                                                                    <option value="Lào Cai">Lào Cai</option>
                                                                                                        <option value="Long An">Long An</option>
                                                                                                            <option value="Nam Định">Nam Định</option>
                                                                                                                <option value="Nghệ An">Nghệ An</option>
                                                                                                                    <option value="Ninh Bình">Ninh Bình</option>
                                                                                                                        <option value="Ninh Thuận">Ninh Thuận</option>
                                                                                                                            <option value="Phú Thọ">Phú Thọ</option>
                                                                                                                                <option value="Quảng Bình">Quảng Bình</option>
                                                                                                                                    <option value="Quảng Bình">Quảng Bình</option>
                                                                                                                                        <option value="Quảng Ngãi">Quảng Ngãi</option>
                                                                                                                                            <option value="Quảng Ninh">Quảng Ninh</option>
                                                                                                                                                <option value="Quảng Trị">Quảng Trị</option>
                                                                                                                                                    <option value="Sóc Trăng">Sóc Trăng</option>
                                                                                                                                                        <option value="Sơn La">Sơn La</option>
                                                                                                                                                            <option value="Tây Ninh">Tây Ninh</option>
                                                                                                                                                                <option value="Thái Bình">Thái Bình</option>
                                                                                                                                                                    <option value="Thái Nguyên">Thái Nguyên</option>
                                                                                                                                                                        <option value="Thanh Hóa">Thanh Hóa</option>
                                                                                                                                                                            <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                                                                                                                                                                                <option value="Tiền Giang">Tiền Giang</option>
                                                                                                                                                                                    <option value="Trà Vinh">Trà Vinh</option>
                                                                                                                                                                                        <option value="Tuyên Quang">Tuyên Quang</option>
                                                                                                                                                                                            <option value="Vĩnh Long">Vĩnh Long</option>
                                                                                                                                                                                                <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                                                                                                                                                                                                    <option value="Yên Bái">Yên Bái</option>
                                                                                                                                                                                                        <option value="Phú Yên">Phú Yên</option>
                                                                                                                                                                                                        </select>
                                                                                                                                                                                                        <span id="check-city"
                                                                                                                                                                                                            style="color: red; font-size: 14px; margin-left: 10px; margin-bottom:10px; display: none;"></span>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                    <h6 class="mt-2">Mục tiêu của bạn:</h6>
                                                                                                                                                                                                    <div class="checked-div">

                                                                                                                                                                                                        <label class="container">Du học
                                                                                                                                                                                                                                                                                            <input type="radio" class="input-checked" checked="checked" name="active"
                                                                                                                                                                                                                                                                                                value="Du học">
                                                                                                                                                                                                                                                                                                <span class="checkmark"></span>
                                                                                                                                                                                                                                                                                        </label>
                                                                                                                                                                                                                                                                                        <label class="container">Xuất khẩu lao động
                                                                                                                                                                                                                                                                                            <input type="radio" name="active" value="Xuất khẩu lao động">
                                                                                                                                                                                                                                                                                                <span class="checkmark"></span>
                                                                                                                                                                                                                                                                                        </label>

                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                    <h6 class="mt-2">Chọn quốc gia bạn muốn đi:</h6>
                                                                                                                                                                                                                                                                                    <div class="checked-div">

                                                                                                                                                                                                                                                                                        <label class="container">Hàn Quốc
                                                                                                                                                                                                                                                                                            <input type="radio" class="input-checked" checked="checked" name="national"
                                                                                                                                                                                                                                                                                                value="Hàn Quốc">
                                                                                                                                                                                                                                                                                                <span class="checkmark"></span>
                                                                                                                                                                                                                                                                                        </label>
                                                                                                                                                                                                                                                                                        <label class="container">Nhật Bản
                                                                                                                                                                                                                                                                                            <input type="radio" name="national" value="Nhật Bản">
                                                                                                                                                                                                                                                                                                <span class="checkmark"></span>
                                                                                                                                                                                                                                                                                        </label>

                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                    <div class="inputContainer" style="margin-bottom: 50px;">
                                                                                                                                                                                                                                                                                        <label for="subject" style="font-weight: 500;">Nguyện vọng của bạn sau khi chọn chúng tôi:</label>
                                                                                                                                                                                                                                                                                        <textarea placeholder="Viết nguyện vọng của bạn..." name="more"></textarea>
                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                </form>
                                                                                                                                                                                                                                                                                <div class="d-flex justify-content-center" style="margin-top: 80px;">  <span class="badge rounded-pill badge-success my-2" id="register-contact-success" style="display: none"></span>
                                                                                                                                                                                                                                                                                    <span class="badge rounded-pill badge-danger my-2" id="register-contact-failue" style="display: none"></span>
                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                <div class="d-flex justify-content-center my-2">
                                                                                                                                                                                                                                                                                <button
                                                                                                                                                                                                                                                                                    class="btn btn-primary" onclick="SubmitForm()">Đăng ký</button>
                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                    <div class="news-more">
                                                                                                                                                                                                                                                                        <div class="news-more-text">
                                                                                                                                                                                                                                                                            <h3>
                                                                                                                                                                                                                                                                                Tin tức khác
                                                                                                                                                                                                                                                                            </h3>
                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                        <div class="row">
                                                                                                                                                                                                                                                                            ${loop_more_news(l_random_news)}
                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                </div>`
                news_page_body.innerHTML = query
                var x, i, j, l, ll, selElmnt, a, b, c;
                /*look for any elements with the class "custom-select":*/
                x = document.getElementsByClassName("custom-select");
                l = x.length;
                for (i = 0; i < l; i++) {
                    selElmnt = x[i].getElementsByTagName("select")[0];
                    ll = selElmnt.length;
                    /*for each element, create a new DIV that will act as the selected item:*/
                    a = document.createElement("DIV");
                    a.setAttribute("class", "select-selected select-selected-bottom-rounded");
                    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
                    x[i].appendChild(a);
                    /*for each element, create a new DIV that will contain the option list:*/
                    b = document.createElement("DIV");
                    b.setAttribute("class", "select-items select-hide");
                    for (j = 1; j < ll; j++) {
                        /*for each option in the original select element,
                        create a new DIV that will act as an option item:*/
                        c = document.createElement("DIV");
                        c.innerHTML = selElmnt.options[j].innerHTML;
                        c.addEventListener("click", function (e) {
                            /*when an item is clicked, update the original select box,
                            and the selected item:*/
                            var y, i, k, s, h, sl, yl;
                            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                            sl = s.length;
                            h = this.parentNode.previousSibling;
                            for (i = 0; i < sl; i++) {
                                if (s.options[i].innerHTML == this.innerHTML) {
                                    s.selectedIndex = i;
                                    h.innerHTML = this.innerHTML;
                                    y = this.parentNode.getElementsByClassName("same-as-selected");
                                    yl = y.length;
                                    for (k = 0; k < yl; k++) {
                                        y[k].removeAttribute("class");
                                    }
                                    this.setAttribute("class", "same-as-selected");
                                    break;
                                }
                            }
                            h.click();
                        });
                        b.appendChild(c);
                    }
                    x[i].appendChild(b);
                    a.addEventListener("click", function (e) {
                        /*when the select box is clicked, close any other select boxes,
                        and open/close the current select box:*/
                        e.stopPropagation();
                        closeAllSelect(this);
                        this.nextSibling.classList.toggle("select-hide");
                        this.classList.toggle("select-arrow-active");
                        this.classList.toggle("select-selected-bottom-square");
                    });
                }
                function closeAllSelect(elmnt) {
                    /*a function that will close all select boxes in the document,
                    except the current select box:*/
                    var x, y, i, xl, yl, arrNo = [];
                    x = document.getElementsByClassName("select-items");
                    y = document.getElementsByClassName("select-selected");
                    xl = x.length;
                    yl = y.length;
                    for (i = 0; i < yl; i++) {
                        if (elmnt == y[i]) {
                            arrNo.push(i)
                        } else {
                            y[i].classList.remove("select-arrow-active");
                            y[i].classList.remove("select-selected-bottom-square");
                        }
                    }
                    for (i = 0; i < xl; i++) {
                        if (arrNo.indexOf(i)) {
                            x[i].classList.add("select-hide");
                        }
                    }
                }
                /*if the user clicks anywhere outside the select box,
                then close all select boxes:*/
                document.addEventListener("click", closeAllSelect);
            }

            else {
                const news_page_body = document.getElementById('news-page-body')

                let query = `<div class="bg-page-news">
                <div class="title-page">
                    <h1>Không tìm thấy tin tức</h1>
                </div> 
                <div class="error-page">
                    <h1>404 page</h1>
                    </div>
                </div>`

                news_page_body.innerHTML = query
            }

        }).catch((error) => {
            console.error('Error:', error);
        });
}