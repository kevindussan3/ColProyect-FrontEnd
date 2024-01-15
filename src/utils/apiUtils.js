async function handleErrors(response) {
    if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        throw new Error(error.message || 'Hubo un error en la solicitud.');
    }
    return response.json();
}

export default {
    handleErrors
};