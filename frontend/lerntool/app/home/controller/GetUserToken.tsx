
export default function GetUserToken() {
    // Fetch the user email and token from local storage

    // Fetch the user email and token from local storage
    const userItem = localStorage.getItem('user');

    if (!userItem) 
        return false;

    const user = JSON.parse(userItem);
    if (!user || !user.token) 
        return false;

    return user.token;
}