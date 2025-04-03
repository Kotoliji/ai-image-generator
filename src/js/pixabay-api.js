import axios from "axios";
const PROXY = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "https://pixabay.com/api";

export async function showImage(reqvest,curentPage){ 

    if (!reqvest){
      alert("ВВЕДІТЬ ЗАПРОС")
      return;
    }
    try{
    const response = await axios.get(PROXY + BASE_URL,{
        params:{
            q: reqvest,
            key:'48904272-bbce21e261483c6f45f0aefa4',
            image_type: 'photo',
            orientation:'horizontal',
            safesearch:'true',
            per_page: 40,  
            page: curentPage,       
        }, 
      })
        return response.data
        
    }catch(error){
        console.error("error:"[error]); 
        return null
      }

  }
  