import Cookies from 'js-cookie';


export default function Logout() {
    Cookies.remove('Email');
    Cookies.remove('Password');
}

