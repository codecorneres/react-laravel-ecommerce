const categorydetail = async () => {
    try {

    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    let data = await fetch("/api/get/all/category", requestOptions);
    data = await data.json()
    const category =data.success
    return category
        
    } catch (error) {
        return error 
    }

};
export default categorydetail