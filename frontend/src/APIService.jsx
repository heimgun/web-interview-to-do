import { client } from "./APIClient";

const getLists = () => {
    return client.get("/lists");
}

const updateLists = (listId, todos) => {
    return client.put(`/lists/${listId}`, {
        todos: todos
    });
}


const APIService = {
    getLists,
    updateLists,
}

export default APIService;