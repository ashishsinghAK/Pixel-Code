import { toast } from "react-hot-toast"
import { ApiConnector } from "./ApiConnector"
import { categories } from "./API"

export const CategoryDetail = async (categoryId) => {
  let result =[]
  try{
    const response = await ApiConnector("POST",categories.CATEGORIES_DETAIL,{categoryId})
    if(!response?.data?.success){
        throw new Error("Could not fetch Category fetch data")
    }
    result=response?.data?.data;
  }catch(error){
    console.log("API Call Error in Course-Category.....",error);
    result = error?.response?.data
  }
  return result;
}