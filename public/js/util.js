const token = getCookie("token");

function successAlertTimer(msg, url) {
    Swal.fire({
        icon: 'success',
        text: msg,
        timer: 1500,
        heightAuto: false,
        showConfirmButton: false,
        onAfterClose: () => {
            location.href = url;
        }
    });
}

function errorAlert(msg, status) {
    Swal.fire({
        icon: 'error',
        heightAuto: false,
        text: msg,
        title: status,
        confirmButtonText: 'المحاولة مرة اخرى',
        confirmButtonColor: '#00bfd8',
    });
}

// Check if the user login or not
if (token) {
    $('.logout').removeClass('d-none');
    $('.login').addClass('d-none');
    $('.settings').removeClass('d-none');
}

function createCookie(name, value, expires) {
    cookie = name + "=" + value + ";";

    if (expires) {
        // If it's a date
        if (expires instanceof Date) {
            // If it isn't a valid date
            if (isNaN(expires.getTime()))
                expires = new Date();
        }
        else
            expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);

        cookie += "expires=" + expires.toGMTString() + ";";
    }

    cookie += "Path=/; expires=" + expires.toGMTString() + "; ";
    document.cookie = cookie;
}
function deleteCookie(name) {
    // If the cookie exists delete it 
    if (getCookie(name))
        createCookie(name, "", -1,);
}
function getCookie(name) {
    let result;
    const cookieList = document.cookie.split(';');
    cookieList.forEach(cookie => {
        if (cookie.trim().startsWith(name)) {
            result = cookie;
            return;
        }
    });
    return (result == null) ? null : result;
}
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}