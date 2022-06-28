import axios from "axios";
import { Platform } from "react-native";

const apiEndpoint = Platform.OS === "ios" ? "http://localhost:4000" :"192.168.1.6:4000"

const handleError = (err)=>{
    const message = ""
    const {data} = err.response
    message = data.message
    return Promise.reject({message})

}

function isNetworkError(err) {
    return !!err.isAxiosError && !err.response;
}

export const initialAxios = async()=>{
    axios.defaults.baseURL = apiEndpoint
    axios.defaults.headers.common['Authorization'] = await Storage.getItem("token"),
    axios.defaults.headers.common['Authorization'] = await Storage.getItem("token"),
    console.log("axios default endPointSet set")

    if(axios.interceptors.request.handlers.length === 0){
        axios.interceptors.response.use(
            (response)=>{
                console.log("Request completed")
                return response.data
            },
            (error)=>{
                if(isNetworkError(err)){
                    const message = "Network error"
                    return Promise.reject({message})
                }
                else{
                    handleError(err)
                }
            }
            
        )
    }

}