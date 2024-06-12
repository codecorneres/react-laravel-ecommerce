const usersdetail = async () => {
    try {

    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    let data = await fetch("/api/get/users", requestOptions);
    data = await data.json()
    const region =data.success
    return region
        
    } catch (error) {
        return error 
    }

};
export default usersdetail