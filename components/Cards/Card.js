import React, { memo, useContext, useEffect, useState } from "react";
import { DataItemsContext } from "../Checkboxs/CustomCheckbox";
import { DataContext } from "../libs/Context";
import { Button, ModalBody, ModalFooter } from "reactstrap";
import CustomModal from "../modal/index.jsx";
import Userrequirement from "../Form/Userrequirement";
import ServiceLayout from "../Layouts/ServiceLayout";


// This is a React functional component called "Card" that renders a card with data. Included in service.js page

export default function Card({data}) {
  const [items, setItems] = useState([]);
  const [item, setItem] = useContext(DataItemsContext);
  const [modalOpen, setModalOpen] = React.useState(false);
  useEffect(() => {    
    let single_item = localStorage.getItem("data");
    setItems(
      JSON.parse(single_item),
    );
    
  }, []);
  
  return (
    
      <div className="">
        {/* <div className="card"></div>    */}

        <div className="">
          <div className="custom-card-inside">
            <h1 className="text-center font-bold">
              {/* {item[key].attributes.name} */}
              {data.name}
              
            </h1>
            <div>
              <p className="custom-card-desc">Description:</p>

              <p className="custom-card-desc-text">
                {/* {item[key].attributes.features} */}
                {data.features}
              </p>
            </div>
            <div className="custom-card-price">
              <p>Price: 200$</p>
              <CustomModal eachitem={data} />
            </div>
          </div>
        </div>
        
       
      </div>
    
  );
}
