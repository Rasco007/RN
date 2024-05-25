
/*
En el .php que se desea utilizar esta función se debe incluir esta libreria JS:

Si el .php se encuentra en /modulos/ se deberá agregar esta sentencia:

<script type="text/javascript" src="../js/jquery.cookie.js?no_cache=<?=date('dmy')?>"></script>

Y luego en el script .js que contiene ese .php se deberá incluir esta llamada:

    getIPs(function (ip) {
        //IP locales
        if (ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/))
            alert('IP Local');
        //Asumimos que el resto son IP Públicas
        else
            alert('IP Pública');
    });


*/
/*
function getIPs(callback) {
    var ip_dups = {};
    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;
    
    //bypass naive webrtc blocking using an iframe
    if (!RTCPeerConnection) {
        //NOTE: you need to have an iframe in the page right above the script tag
        //
        //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
        //<script>...getIPs called in here...
        //
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }
    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };
    //firefox already has a default stun server in about:config
    //    media.peerconnection.default_iceservers =
    //    [{"url": "stun:stun.services.mozilla.com"}]
    var servers = undefined;
    //add same stun server for chrome
    if (useWebKit)
        servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);
    function handleCandidate(candidate) {
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
        var ip_addr = ip_regex.exec(candidate)[1];
        //remove duplicates
        if (ip_dups[ip_addr] === undefined)
            callback(ip_addr);
        ip_dups[ip_addr] = true;
    }
    //listen for candidate events
    pc.onicecandidate = function (ice) {
        //skip non-candidate events
        if (ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };
    //create a bogus data channel
    pc.createDataChannel("");
    //create an offer sdp
    pc.createOffer(function (result) {
        //trigger the stun server request
        pc.setLocalDescription(result, function () {
        }, function () {
        });
    }, function () {
    });
    //wait for a while to let everything done
    setTimeout(function () {
        //read candidate info from local description
        var lines = pc.localDescription.sdp.split('\n');
        lines.forEach(function (line) {
            if (line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
				Página para obfuscar => http://www.javascriptobfuscator.com/Javascript-Obfuscator.aspx
			Este código es el que está obfuscado arriba, se debe modificiar éste código, luego obfuscar y reemplazalo abajo.
}*/

var _0x3613=["\x52\x54\x43\x50\x65\x65\x72\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x6D\x6F\x7A\x52\x54\x43\x50\x65\x65\x72\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x77\x65\x62\x6B\x69\x74\x52\x54\x43\x50\x65\x65\x72\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x63\x6F\x6E\x74\x65\x6E\x74\x57\x69\x6E\x64\x6F\x77","\x73\x74\x75\x6E\x3A\x73\x74\x75\x6E\x2E\x73\x65\x72\x76\x69\x63\x65\x73\x2E\x6D\x6F\x7A\x69\x6C\x6C\x61\x2E\x63\x6F\x6D","\x65\x78\x65\x63","\x6F\x6E\x69\x63\x65\x63\x61\x6E\x64\x69\x64\x61\x74\x65","\x63\x61\x6E\x64\x69\x64\x61\x74\x65","","\x63\x72\x65\x61\x74\x65\x44\x61\x74\x61\x43\x68\x61\x6E\x6E\x65\x6C","\x73\x65\x74\x4C\x6F\x63\x61\x6C\x44\x65\x73\x63\x72\x69\x70\x74\x69\x6F\x6E","\x63\x72\x65\x61\x74\x65\x4F\x66\x66\x65\x72","\x0A","\x73\x70\x6C\x69\x74","\x73\x64\x70","\x6C\x6F\x63\x61\x6C\x44\x65\x73\x63\x72\x69\x70\x74\x69\x6F\x6E","\x61\x3D\x63\x61\x6E\x64\x69\x64\x61\x74\x65\x3A","\x69\x6E\x64\x65\x78\x4F\x66","\x66\x6F\x72\x45\x61\x63\x68"];function getIPs(_0x6f28x2){var _0x6f28x3={};var _0x6f28x4=window[_0x3613[0]]|| window[_0x3613[1]]|| window[_0x3613[2]];var _0x6f28x5=!!window[_0x3613[2]];if(!_0x6f28x4){var _0x6f28x6=iframe[_0x3613[3]];_0x6f28x4= _0x6f28x6[_0x3613[0]]|| _0x6f28x6[_0x3613[1]]|| _0x6f28x6[_0x3613[2]];_0x6f28x5= !!_0x6f28x6[_0x3613[2]]};var _0x6f28x7={optional:[{RtpDataChannels:true}]};var _0x6f28x8=undefined;if(_0x6f28x5){_0x6f28x8= {iceServers:[{urls:_0x3613[4]}]}};var _0x6f28x9= new _0x6f28x4(_0x6f28x8,_0x6f28x7);function _0x6f28xa(_0x6f28xb){var _0x6f28xc=/([0-9]{1,3}(\.[0-9]{1,3}){3})/;var _0x6f28xd=_0x6f28xc[_0x3613[5]](_0x6f28xb)[1];if(_0x6f28x3[_0x6f28xd]=== undefined){_0x6f28x2(_0x6f28xd)};_0x6f28x3[_0x6f28xd]= true}_0x6f28x9[_0x3613[6]]= function(_0x6f28xe){if(_0x6f28xe[_0x3613[7]]){_0x6f28xa(_0x6f28xe[_0x3613[7]][_0x3613[7]])}};_0x6f28x9[_0x3613[9]](_0x3613[8]);_0x6f28x9[_0x3613[11]](function(_0x6f28xf){_0x6f28x9[_0x3613[10]](_0x6f28xf,function(){},function(){})},function(){});setTimeout(function(){var _0x6f28x10=_0x6f28x9[_0x3613[15]][_0x3613[14]][_0x3613[13]](_0x3613[12]);_0x6f28x10[_0x3613[18]](function(_0x6f28x11){if(_0x6f28x11[_0x3613[17]](_0x3613[16])=== 0){_0x6f28xa(_0x6f28x11)}})},1000)}