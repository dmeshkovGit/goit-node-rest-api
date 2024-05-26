
const pagination = (array, page, limit) => {

    const startIndex = page === 1 ? 0 :
        ((page - 1) * limit);
    const endIndex = page * limit;
        
    return array.slice(startIndex, endIndex)
}

export default pagination