function openNav() {
  document.getElementById("mobi-Sidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mobi-Sidenav").style.width = "0";
}

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 160 || document.documentElement.scrollTop > 160) {
    document.getElementById("mobi-navbar").style.padding = "5px 10px";
    document.getElementById("mobi-button-nav").style.top = "15px"
    document.getElementById("mobi-button-nav").children[0].style.fontSize = "25px"
    document.getElementById("mobi-logo").style.height = "40px";
  } else {
    document.getElementById("mobi-navbar").style.padding = "10px 10px";
    document.getElementById("mobi-button-nav").style.top = "20px"
    document.getElementById("mobi-button-nav").children[0].style.fontSize = "30px"
    document.getElementById("mobi-logo").style.height = "50px";
  }
}

var $window = $(window);

// :: Preloader Active Code
$window.on('load', function () {
  setTimeout(function () {
    $('#preloader').fadeOut('slow', function () {
      $(this).remove();
    });
  }, 800)

});

$(function () {
  $('input, select').on('focus', function () {
    $(this).parent().find('.input-group-text').css('border-color', '#80bdff');
  });
  $('input, select').on('blur', function () {
    $(this).parent().find('.input-group-text').css('border-color', '#ced4da');
  });
});

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

const regexPhoneNumber = (phone) => {

  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  return phone.match(regexPhoneNumber) ? true : false;
}

const regexBirth = (birth) => {

  const regexBirth = /(1|2)+(0|9)+([0-9]{2})\b/g;

  return birth.match(regexBirth) ? true : false;
}

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }
  return (false)
}

function SubmitForm() {
  const form_contact = document.getElementsByClassName('form-contact')[0]
  const fullname = form_contact['fullname'].value
  const email = form_contact['email'].value
  const contact = form_contact['contact'].value
  const birth = form_contact['birth'].value
  const city = form_contact['city'].value
  const active = form_contact['active'].value
  const national = form_contact['national'].value
  const more = form_contact['more'].value

  const check_fullname = document.getElementById('check-fullname')
  const check_email = document.getElementById('check-email')
  const check_contact = document.getElementById('check-contact')
  const check_birth = document.getElementById('check-birth')
  const check_city = document.getElementById('check-city')

  if (fullname == '') {
    check_fullname.style.display = 'block';
    check_fullname.innerHTML = 'Họ tên không được trống';
    window.scrollTo({ top: window.pageYOffset - 600, behavior: 'smooth' });
    return
  }
  else {
    check_fullname.innerHTML = '';
  }

  if (ValidateEmail(email) == false) {
    check_email.style.display = 'block';
    check_email.innerHTML = 'Email không hợp lệ';
    window.scrollTo({ top: window.pageYOffset - 600, behavior: 'smooth' });
    return
  }
  else {
    check_email.innerHTML = '';
  }

  if (regexPhoneNumber(contact) == false) {
    check_contact.style.display = 'block';
    check_contact.innerHTML = 'Số điện thoại không hợp lệ';
    window.scrollTo({ top: window.pageYOffset - 600, behavior: 'smooth' });
    return
  }
  else {
    check_contact.innerHTML = '';
  }

  if (regexBirth(birth) == false) {
    check_birth.style.display = 'block';
    check_birth.innerHTML = 'Năm sinh không hợp lệ';
    window.scrollTo({ top: window.pageYOffset - 600, behavior: 'smooth' });
    return
  }
  else {
    check_birth.innerHTML = '';
  }

  if (city == 0 || city == '0') {
    check_city.style.display = 'block';
    check_city.innerHTML = 'Bạn chưa chọn thành phố';
    window.scrollTo({ top: window.pageYOffset - 600, behavior: 'smooth' });
    return
  }
  else {
    check_city.innerHTML = '';
  }

  const request = {
    fullname: fullname,
    email: email,
    contact: contact,
    birth: birth,
    city: city,
    active: active,
    national: national,
    more: more
  }
  fetch(`/api/register-contact-form-WxTPlLXkXsNBQ1vW`, {
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
      const success = document.getElementById('register-contact-success')
      const failue = document.getElementById('register-contact-failue')

      if (status == "Đăng ký thành công") {
        success.innerHTML = status
        success.style.display = 'block'
        failue.style.display = 'none'
      }
      else {
        success.style.display = 'none'
        failue.innerHTML = status
        failue.style.display = 'block'
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
}
