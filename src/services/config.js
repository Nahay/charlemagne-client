const config = (token) => {
    return { headers: {'x-access-token': token}};
}

export { config }