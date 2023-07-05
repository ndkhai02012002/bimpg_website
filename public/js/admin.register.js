'use strict'

function Register() {
    const form_resgiter = document.getElementById('register-form')
    let username = form_resgiter['username'].value
    let password = form_resgiter['password'].value
    let password_confirm = form_resgiter['password-confirm'].value
    const check_user_name = document.getElementById('register-check-user-name');
    const check_password = document.getElementById('register-check-password');
    const check_password_confirm = document.getElementById('register-check-password-confirm');
    const check_register = document.getElementById('check-register');

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

    if (password_confirm != password) {
        check_password_confirm.style.display = 'block';
        check_password_confirm.innerHTML = 'Re-enter password does not match';
        return
    }
    else {
        check_password_confirm.innerHTML = '';
    }

    if (check_user_name.style.display != 'block' && check_password.style.display != 'block' && check_password_confirm.style.display != 'block') {
        const information = {
            'username': username,
            'password': password
        }

        fetch(`/api/admin/register`, {
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
                if(status.status == 'Admin already exists') {
                    check_user_name.style.display = 'block';
                    check_user_name.innerHTML = status.status;
                    return
                }
                else {
                    check_register.style.display = 'block';
                    check_register.innerHTML =  status.status;
                }

            }).catch((error) => {
                console.error('Error:', error);
            });
    }
}

