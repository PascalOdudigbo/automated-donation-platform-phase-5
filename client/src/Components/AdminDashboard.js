import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {Routes, Route, useNavigate} from "react-router-dom";
import AdminCharitiesList from "./AdminCharitiesList";
import AdminEditCharity from "./AdminEditCharity";

function AdminDashboard(){
    const [allCharities, setAllCharities] = useState([]);
    const [currentItem, setCurrentItem] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("/charities")
        .then(res=>{
            console.log(res.data);
            setAllCharities(res.data)
        })
        .catch(error=>{
            if(error.response){
                alert(error.response.data.error);
            }
        });
    }, [])

    
    function handleFilteredData(searchData){
        if(searchData === ""){
            axios.get("/charities")
            .then(res=>{
                console.log(res.data);
                setAllCharities(res.data)
            })
            .catch(error=>{
                if(error.response){
                    alert(error.response.data.error);
                }
            });
        }else{
            const filteredCharities = allCharities.filter((charity)=> charity.name.toLowerCase().includes(searchData.toLowerCase()));
            setAllCharities(filteredCharities);
        }
        
    }

    function handleCharityDelete(id){
        //console.log("called deletion");
        //const targetAddressId = event.target.parentNode.parentNode.id;
        axios.delete(`charities/${id}`)
        .then(() => alert('Delete successful'));

        const newCharitiesData = allCharities.filter(charity=> charity.id !== id);
        setAllCharities(newCharitiesData);
    }

    function handleCharityEdit(){
        axios.get("/charities")
            .then(res=>{
                console.log(res.data);
                setAllCharities(res.data)
            })
            .catch(error=>{
                if(error.response){
                    alert(error.response.data.error);
                }
            });
        navigate("/admin/manage-charities");
    }
    
    
    return(
        //NB full route path = "admin/*"
        <>
        <Routes>
            <Route path="manage-charities" element={
                <AdminCharitiesList
                allCharities={allCharities}
                setCurrentItem={setCurrentItem}
                handleFilteredData={handleFilteredData}
                handleDelete={handleCharityDelete}
                />
            }/>

            <Route path="manage-charities/edit-charity" element={
                <AdminEditCharity
                selectedItem={currentItem}
                handleDataEdit={handleCharityEdit}
                />
            }/>
        
        </Routes>
            
        
        </>
    )






}

export default AdminDashboard;