import { SERVER_BASE } from "../consts/server-base";
import { authHeader } from "./headers-service";

const getContent = () => {
    return fetch(`${SERVER_BASE}posts`, {
        method: 'get',
        headers: {...authHeader()}
    })
}

const contentService = {
    getContent
}

export default contentService;

