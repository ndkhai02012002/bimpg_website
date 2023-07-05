'use strict'

function Login() {
    const form_login = document.getElementById('login-form')
    let username = form_login['username'].value
    let password = form_login['password'].value

    const check_user_name = document.getElementById('login-check-user-name');
    const check_password = document.getElementById('login-check-password');

    const check_login = document.getElementById('check-login');

    if (username.length < 6) {
        check_user_name.style.display = 'block';
        check_user_name.innerHTML = 'User name is too short.';
        return
    }
    else {
        check_user_name.innerHTML = '';
    }

    if (password.length < 6) {
        check_password.style.display = 'block';
        check_password.innerHTML = 'Password is too short.';
        return
    }
    else {
        check_password.innerHTML = '';
    }


    const information = {
        'username': username,
        'password': password
    }

    fetch(`/api/admin/login-WxTPlLXkXsNBQ1vW`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(information),
    }).then(response => response.json())
        .then((status) => {
            if (status.status == 'Tài khoản không tồn tại') {
                check_user_name.style.display = 'block';
                check_password.style.display = 'none';
                check_login.style.display = 'none';
                check_user_name.innerHTML = status.status;
                return
            }
            else if (status.status == 'Sai mật khẩu') {
                check_password.style.display = 'block';
                check_user_name.style.display = 'none';
                check_login.style.display = 'none';
                check_password.innerHTML = status.status;
                return
            }
            else {
                window.location.replace("/admin/all-news");
            }

        }).catch((error) => {
            console.error('Error:', error);
        });

}

