import axios from "axios"
import {GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT} from "./types";

export const createProject = (project, history) => async dispatch => {
    try {
        const res = await axios.post("/api/project/create", project)
        history.push("/dashboard");
/*        dispatch({
            type: GET_ERRORS,
            payload: {}
        });*/
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }
}

export const getProjects = () => async dispatch =>{
    const res = await axios.get('/api/project/all')
    console.log(res);
    dispatch({
        type:GET_PROJECTS,
        payload: res.data
    });
};

export const getProject = (id, history) => async dispatch =>{

    try{
        const res = await axios.get(`/api/project/${id}`)
        console.log(res);
        dispatch({
            type:GET_PROJECT,
            payload: res.data
        });
    }catch (error){
        history.push('/dashboard');
    }

};


export const deleteProject = id => async dispatch => {
    if (
        window.confirm(
            "Are you sure? This will delete the project and all the data related to it"
        )
    ) {
        await axios.delete(`/api/project/${id}`);
        dispatch({
            type: DELETE_PROJECT,
            payload: id
        });
    }
};