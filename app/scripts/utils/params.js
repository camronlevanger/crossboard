// This is not ideal, need a new way to provide these to app.config()
function getQueryVariable(variable) {
    var query = window.location.hash.substring(1);
    var nohash = query.split('?');
    var vars = nohash[1].split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
