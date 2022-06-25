function isWeixn() {
    return true;
    var ua = navigator.userAgent.toLowerCase();
    if (false || ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

export default isWeixn