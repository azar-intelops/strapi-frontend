import React,{useEffect,useState} from 'react'

export default function CustomCard() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        console.log("comes in Card");
        let single_item = localStorage.getItem("data");
        setItems(
          JSON.parse(single_item),
          
          "single_itemsingle_itemsingle_itemsingle_item"
        );
        console.log(single_item,'single_itemsingle_item');
        // setItem(item)
      }, []);
  return (
    <div className="">
    {/* <div className="card"></div>    */}

    <div className="">
      <div className="custom-card-inside">
        <h1 className="text-center font-bold">
          {/* {item[key].attributes.name} */}
          {/* {data.name} */}
          {}
        </h1>
        <div>
          <p className="custom-card-desc">Description:</p>

          <p className="custom-card-desc-text">
            {/* {item[key].attributes.features} */}
            {/* {data.features} */}
          </p>
        </div>
        <div className="custom-card-price">
          <p>Price: 200$</p>
          {/* <CustomModal eachitem={item} /> */}
        </div>
      </div>
    </div>
    
   
  </div>
  )
}
