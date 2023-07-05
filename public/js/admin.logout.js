'use strict'

function Logout() {
    fetch(`/api/admin/logout`, {
        method: 'POST',
    }).then(response => response.json())
        .then((status) => {
            if (status == 'Đăng xuất') {
                window.location.replace("/admin/login");
            }

        }).catch((error) => {
            console.error('Error:', error);
        });
}