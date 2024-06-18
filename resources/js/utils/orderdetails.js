const orderdetails = async () => {
    try {

    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    let data = await fetch("/api/get/order", requestOptions);
    data = await data.json()
    const order =data.success
    return order
        
    } catch (error) {
        return error 
    }

};
export default orderdetails