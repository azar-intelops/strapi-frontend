import React, { Fragment, useContext, useEffect, useState } from "react";
import { Checkbox } from "@material-tailwind/react";
import { Context, DataContext } from "../libs/Context";
// import Tags from "../Cards/Tags";


var additems = []
export const DataItemsContext = React.createContext([additems]);
export default function CustomCheckbox({ items, selected }) {
    const [sidebarHover, setSidebar] = useState("invisible");
    console.log(items, "itemsitemsitemsitemsitemsitems",items.attributes?.services.data);
    // Object.entries(items.subcategories).map((v, k) => {
    //     console.log(v);
    // })
    
    useEffect(()=>{
        // console.log(items,"itemsitemsitemsitemsitems");
    },[])
    const [additem, setAdditem] = useState([])
    const [checked, setChecked] = React.useState(false);
    function appendItems(e, item) {
        // debugger
        if (item.attributes.checked) {
            item.attributes.checked = false
            if (Object.entries(additems).length >= 0) {
                console.log(additems, 'more than one');
                // additems.push(item)
                Object.entries(additems).map((v, k) => {
                    if (Object.entries(additems).length > 0) {
                        // if (additems[k].attributes.checked === false) {
                        console.log(additems[k]?.id, '===', item.id);
                        if (additems[k]?.id === item.id) {
                            var numbersToRemove = additems.filter(x => x.id === item.id)//item.                    
                            numbersToRemove.forEach(x => additems.splice(additems.findIndex(n => n === x), 1));
                            console.log(numbersToRemove, 'numbersToRemovenumbersToRemove');
                        }
                        // }
                    }

                })
            }
        } else {
            item.attributes.checked = true
            additems.push(item)
        }

        localStorage.setItem("data", JSON.stringify(additems));

    }

    return (
        
            <Fragment className="py-2">
                {items===undefined? "No services":<div>
                {Object.keys(items.attributes?.services.data||{}).length > 0 ?

                    Object.values(items?.attributes?.services.data).map((v, k) => {
                        return (
                          <div className="flex gap-6 p-3" key={k}>
                            <div
                              onClick={() =>
                                setSidebar(
                                  sidebarHover === "visible"
                                    ? "invisible"
                                    : "visible"
                                )
                              }
                            >
                              <Checkbox
                                id="ripple-on"
                                onClick={(e) => appendItems(e, v)}
                                ripple={true}
                                value={v}
                                key={k}
                                defaultChecked={v.attributes.checked}
                              />{" "}
                              <div>{v.attributes.name}</div>
                              <br />
                            </div>
                          </div>
                        );
                    })
                    : 'No Services for this SubCategory'} 
                    </div>
                }
            </Fragment>
        
    );
}