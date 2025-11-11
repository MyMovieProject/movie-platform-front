export const getCookie = (name) => {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');

    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];

        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(cookieName) === 0) {
            // 디코딩 없이 쿠키 값 원본을 그대로 반환
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null; // 쿠키를 찾지 못한 경우
};