export function GetAuthenticationToken(){
    const token = localStorage.getItem('token');

        return token;

}