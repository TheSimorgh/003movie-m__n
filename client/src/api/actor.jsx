/* eslint-disable no-unused-vars */
import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const create_actor =async(formData)=>{
    const token=getToken()
    try {
        
        const {data}=await client.post("/actor/create",formData,{
            headers:{
                authorization:"Bearer"+token,
                "content-type":"multipart/form-data",
            }
        });
        return data
    } catch (error) {
        return catchError(error)
    }
    
}


export const update_actor=async(id,formData)=>{
    const token=getToken()
    try {
        const {data} =await client('/actor/update/'+id,formData,{
            headers:{
                authorization:"Bearer "+token,
                "content-type": "multipart/form-data",
            }
        })
        return data;
    } catch (error) {
        return catchError(error)
    }
}

export const delete_actor=async(id)=>{
    const token=getToken()
    try {
        const {data} =await client('/actor/'+id,{
            headers:{
                authorization:"Bearer "+token,
                "content-type": "multipart/form-data",
            }
        })
        return data;
    } catch (error) {
        return catchError(error)
    }
}

export const get_actors=async(pageNo,limit)=>{
    const token = getToken();
    try {
        const {data}=await client(`/actor/actors?pageNo=${pageNo}&limit=${limit}`,
        
        {headers:{authorization:"Bearer "+token,
        "content-type":"multipart/form-data"
        }})
        return data
    } catch (error) {
        return catchError(error)
    }
}

export const get_actor_profile=async(id)=>{
    const token = getToken();
    try {
        const {data}=await client(`/actor/single/${id}`);
        return data
    } catch (error) {
        return catchError(error)
    }
}

export const search_actor=async(query)=>{
    const token=getToken()
    try {
        const {data} = await client(`/actor/search?name=${query}`,{
            headers:{
                authorization:"Bearer "+token,
            },
        });
        return data;
    } catch (error) {
        return catchError(error);
 
    }
}