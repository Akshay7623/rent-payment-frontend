import React from 'react'

const AdminAuth = async () => {
    const adminToken = localStorage.getItem("adminToken");
    const data = await fetch("http://localhost:5000/admin/authadmin",{
        method:"get",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${adminToken}`,
        }});
    const finalData = await data.json();
    return finalData;
}

export default AdminAuth;