function popupwindow(url, title, w, h)
{ 
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

    var left = (screen.width/2)-(w/2) + dualScreenLeft; 
    var top = (screen.height/2)-(h) + dualScreenTop; 
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left); 
}
