// function myAjax(methods, url, data) {
//     return new Promise((resolve, reject) => {
//         var xml = new XMLHttpRequest();
//         if (methods == 'GET') {
//             xml.open(methods, url, true);
//             xml.send()
//             xml.onreadystatechange = function () {
//                 if (xml.status == 200 && xml.readyState == 4) {
//                     resolve(xml.response)
//                 }
//             }
//         }
//         if (methods == 'POST') {
//             xml.open(methods, url, true);
//             xml.send(JSON.stringify(data))
//             xml.onreadystatechange = function () {
//                 if (xml.status == 200 && xml.readyState == 4) {
//                     resolve(xml.response)
//                 }
//             }
//         }
        
//     })
// }

function myAjax(methods,url,data){
    return new Promise((resolve,reject)=>{
        var xml = new XMLHttpRequest();
        xml.open(methods , url , true);
        xml.send(JSON.stringify(data))
        xml.onreadystatechange = function(){
            if(xml.status == 200 && xml.readyState == 4){
                resolve(xml.response)
            }
        }
    })
}




