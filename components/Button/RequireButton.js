import React, { useEffect,useState } from 'react';

function RequireButton(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
         // Retrieve 'data' from local storage and parse it as JSON
        const items = JSON.parse(localStorage.getItem('data'));
        
        if (items) {
        // If items exist, set them using the setItems function
         setItems(items);
        }
      }, []);
     const handleRequirement=()=>{
    
        console.log(items,'comes in handleRequirement');
    }
    return (
        <div>
            <button type="button" className="btn" onClick={handleRequirement} >Submit</button>
        </div>
    );
}

export default RequireButton;