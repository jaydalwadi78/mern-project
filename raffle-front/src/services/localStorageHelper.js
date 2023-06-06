import CONFIG from '../config';
import CryptoJS from 'crypto-js';

export const localStorageHelper = {
    getStorage(key){
        let getdata = localStorage.getItem(key);
        if (getdata) {
            let data = CryptoJS.AES.decrypt(getdata, CONFIG.SECRET_KEY).toString(CryptoJS.enc.Utf8);
            return data;
        }else{
            return null;
        }
    },
    setStorage(key, value){
        let valueNew;
        if(typeof value === "object"){
            valueNew = JSON.stringify(value);
        }else{
            valueNew = value;
        }
        localStorage.setItem(key , CryptoJS.AES.encrypt(valueNew, CONFIG.SECRET_KEY).toString());
        return true;
    },
    logout(){
        localStorage.clear();
        return true;
    },
    async getLoginId(){
        let isLogin = localStorageHelper.getStorage("isLogin");
        let userid = localStorageHelper.getStorage("userid");
        if((isLogin === "true") && userid != ""){
            return true;
        }else{
            return false;
        }
    }
}