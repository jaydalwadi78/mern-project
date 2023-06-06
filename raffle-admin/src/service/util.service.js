// import CONFIG from '../config';

// export default callApi = async (url = '', method, data = {}, upload = false) => {
//     if (!upload) {
//         headers['Content-Type'] = 'application/json';
//     }

//     let options = {
//         method: method,
//         headers: headers,
//     };
//     if (method !== 'GET') {
//         if (upload) {
//             options.body = data
//         } else {
//             options.body = JSON.stringify(data)
//         }
//     }
//     const response = await fetch(CONFIG.API_ENDPOINT + "v1/" + url, options);
//     if (response.ok) {
//         return await response.json();
//     }else {
//         let err = {};
//         if (response.status === 401) {
//             err.err = "Your session time out, please login again.";
//         } else {
//             err.err = "Please wait for some time";
//         }
//         return await err.json();
//     }
// }