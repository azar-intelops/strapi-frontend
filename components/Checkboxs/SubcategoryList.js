import React,{useState,useEffect} from "react";
import { Tooltip, Button } from "@material-tailwind/react";
import CustomCheckbox from "./CustomCheckbox";

export default function SubcategoryList({ items }) {
    const [sidebarHover, setSidebar] = useState("invisible");
    const [category, setCategory] = useState([]);
    // let category={}
    // if(items!==undefined){
        
        // let category =items?.services?.data
        
    // }
    useEffect(() => {
        setCategory(items?.subcategories?.data)
    
      
    }, [])
    
    console.log(category,'categorycategorycategorycategory',items);
  return (
    <div>
      {Object.keys(items).length > 0
        ? Object.values(items.subcategories?.data).map((v, k) => {
            return (
              <div className="flex gap-6 p-3" key={k}>
                <div
                  onClick={() =>
                    setSidebar(
                      sidebarHover === "invisible" ? "visible" : "invisible"
                    )
                  }
                >                                    
                  <div>{v.attributes.name}</div>
                  <br />
                  {/* {category[k]?.attributes.name} */}
                  {category[k]?.attributes.name === items.subcategories.data[k].attributes.name ? (
                        <CustomCheckbox items={items.subcategories.data[k]}
                          selected={category[k]?.attributes.name}
                        />
                      ) : (
                        ""
                      )}
                </div>

              </div>
            );
          })
        : "No Subcategory is there for Category"}
      {/* {Object.keys(items.subcategories.data).map((keyName, i) => (
        <div
          onClick={() =>
            setSidebar(sidebarHover === "visible" ? "invisible" : "visible")
          }
        >
          {category.length > 0 ? (
            <Tooltip
              className="max-w-[20vw]"
              content={category[keyName].attributes.description}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <span
                className="input-label"
                onClick={() => setItems(category[keyName].attributes)}
              >
                {category[keyName].attributes.name}
              </span>
            </Tooltip>
          ) : (
            ""
          )}
          <div>
            {category[keyName]?.attributes.name === items.name ? (
              <CustomCheckbox
                items={items}
                selected={category[keyName]?.attributes.name}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ))} */}
    </div>
  );
}
