import { client } from "./APIClient";

const getLists = () => {
    console.log("Initializing GET requests - lists");
    return client.get("/lists");
}

const updateLists = (listId, todos) => {
    console.log("Initializing PUT request - lists");
    return client.put(`/lists/${listId}`, {
        todos: todos
    });
}


const APIService = {
    getLists,
    updateLists,
}

export default APIService;