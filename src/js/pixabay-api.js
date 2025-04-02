import axios from "axios";

export async function showImage(reqvest,curentPage){ 

    if (!reqvest){
      alert("ВВЕДІТЬ ЗАПРОС")
      return;
    }
    try{
    const response = await axios.get("https://pixabay.com/api",{
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
  