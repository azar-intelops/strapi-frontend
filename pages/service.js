// This is Services page routes to (http://localhost:3000/service)
import AlertwithBadge from "@/components/Alerts/AlertwithBadge";
import Card from "@/components/Cards/Card";
import ServiceHeader from "@/components/Header/ServiceHeader";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import SeriviceSubLayout from "@/components/Layouts/ServiceSubLayout";
import Wrapper from "@/components/Main/Wrapper";
import CustomService from "@/components/modal/CustomService";
import SocialMediaAuth from "@/components/modal/SocialMediaAuth";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import React, { useEffect, useState } from "react";


var additems = [];

function Service({ cat }) {
  const [navInfo, setNavInfo] = useState({
    currentCategory: "",
    categoriesStatus: false,
    currentSubcategory: "",
  });
  const [openModel, setOpenModel] = useState(false);
  const [openCustomModel, setOpenCustomModel] = useState(false);
  
  let [data, setData] = useState({});
  let [current_data, setCurrentData] = useState({});
  const [openAlert,setAlert]=useState(true)
  
  //   console.log(cat);
  console.log(navInfo, "\n\n");
  console.log(data, "datadatadatadata");
  
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_URL,"NEXT_PUBLIC_API_URL");
    addElementsToArray('service-empty',{currentItem:{checked:true}},current_data,0)
    localStorage.setItem("all_data", JSON.stringify(data));  
  }, [data]);

  // Additional comment: This function is triggered when a Add Custom Service event occurs, such as a button click, to open the custom model.
  const addServices = (e) => {        
    setOpenCustomModel(true)          
  };
  const addElementsToArray = (arr, currentItem, complete_data, element) => {
    // Store complete_data in local storage
    localStorage.setItem("all_data", JSON.stringify(data));
    
    // Retrieve complete_data from local storage
    let all = localStorage.getItem("all_data");
    
    // Set currentData to the parsed value of all
    setCurrentData(JSON.parse(all));
    setData(JSON.parse(all))
    if (currentItem.checked) {
      // If currentItem is checked, uncheck it and remove matching items
      currentItem.checked = false;
      
      if (Object.entries(complete_data).length > 0) {
        // Loop through each key-value pair in complete_data
        Object.entries(complete_data).map((val, key) => {
          if (Object.entries(val).length > 0) {
            // Loop through each nested value in the current key-value pair
            Object.values(val).map((v, k) => {
              // Check if the nested value is an object
              if (typeof v === "object") {
                // Loop through each item in the nested value
                Object.values(v).map((items, ind) => {
                  // Check if the item's name matches currentItem's name
                  if (typeof v === "object") {
                    var numbersToRemove = items.filter(
                      (x) => x.name === currentItem.name
                    ); //item.
                    
                    // Remove the matching items from the array
                    numbersToRemove.forEach((x) =>
                      items.splice(
                        items.findIndex((n) => n === x),
                        1
                      )
                    );
                  }
                });
              }
            });
          }
        });
      }
      
      // Update the data with the modified complete_data
      setData(complete_data);
    } else {
      // If currentItem is not checked, check it
      currentItem.checked = true;
    }
  };
  
  
  const callbackforData =(data)=>{
    console.debug("gggggggggggggggggg", data)
  }

  return (
    <Wrapper>      
      <ServiceHeader />      
      <hr />      
      <div className="flex">
        <div>
        
          <div className="max-w-[20vw] min-h-screen border-r-2">
            <ul className="space-y-2 px-8">
              {cat.map((value, index) => {
                return (
                  <li key={index} className="space-y-1">
                    <button
                      className="text-lg font-semibold"
                      onClick={() => {
                        setNavInfo({
                          ...navInfo,
                          currentCategory: value.attributes.name,
                          categoriesStatus: !navInfo.categoriesStatus,
                        });
                        if (
                          !Object.keys(data).includes(value.attributes.name)
                        ) {
                          setData({
                            ...data,
                            [value.attributes.name]: {},
                          });
                        }
                      }}
                    >
                      {value.attributes.name}
                    </button>
                    <div
                      className={
                        navInfo.currentCategory === value.attributes.name
                          ? "block"
                          : "hidden"
                      }
                    >
                      {navInfo.currentCategory === "" ? null : (
                        <ul className="space-y-2 px-4">
                          {value.attributes.subcategories.data.map(
                            (subcat, index) => {
                              if (
                                navInfo.currentCategory ===
                                value.attributes.name
                              ) {
                                return (
                                  <li key={index}>
                                    <button
                                      onClick={() => {
                                        setNavInfo({
                                          ...navInfo,
                                          currentSubcategory:
                                            subcat.attributes.name,
                                        });
                                        if (
                                          !Object.keys(
                                            data[value.attributes.name]
                                          ).includes(subcat.attributes.name)
                                        ) {
                                          data[value.attributes.name][
                                            subcat.attributes.name
                                          ] = [];
                                        }
                                      }}
                                    >
                                      {subcat.attributes.name}
                                    </button>
                                    <div
                                      className={
                                        navInfo.currentSubcategory ===
                                        subcat.attributes.name
                                          ? "block"
                                          : "hidden"
                                      }
                                    >
                                      {navInfo.currentSubcategory ===
                                      "" ? null : (
                                        <ul className="space-y-2 px-4">
                                          {subcat.attributes.services.data.map(
                                            (service, index) => {
                                              return (
                                                <li key={index}>
                                                  <div className="flex gap-2 py-2 items-center">
                                                    <input
                                                      type="checkbox"
                                                      name="service"
                                                      id="service"
                                                      value={
                                                        service.attributes.name
                                                      }
                                                      onChange={(e) => {
                                                        if (e.target.checked) {
                                                          // service.attributes.checked=e.target.checked
                                                          console.log(
                                                            e.target.value,
                                                            service.attributes,
                                                            "service.attributes"
                                                          );
                                                          addElementsToArray(
                                                            e.target.value,
                                                            service.attributes,
                                                            data,
                                                            data[
                                                              value.attributes
                                                                .name
                                                            ][
                                                              subcat.attributes
                                                                .name
                                                            ].push(
                                                              service.attributes
                                                            )
                                                          );
                                                        } else {
                                                          addElementsToArray(
                                                            e.target.value,
                                                            service.attributes,
                                                            data
                                                          );
                                                          
                                                        }
                                                      }}
                                                    />
                                                    <label htmlFor="service">
                                                      {service.attributes.name}
                                                    </label>
                                                  </div>
                                                </li>
                                              );
                                            }
                                          )}
                                        </ul>
                                      )}
                                    </div>
                                  </li>
                                );
                              }
                            }
                          )}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div>
              <button onClick={addServices} value={openCustomModel}>
                add custom service
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          {Object.values(data).length > 0
            ? Object.entries(data).map((val, ind) => {
                // console.log(val,"vallllllllllllllllllllllllll",ind);
                return (
                  <>
                    {val[0]}
                    <ServiceLayout>
                      <div className="space-y-4">
                        {Object.values(val[1]).length > 0
                          ? Object.entries(val[1]).map((v, i) => {
                              console.log(
                                v,
                                typeof v,                                
                                i
                              );
                              return (
                                <div className="h-[20vh] bg-white-900 py-10 overflow-auto ">
                                  {v[0]}
                                  <div className="flex gap-4 flex-wrap justify-center">
                                    {Object.values(v[1]).length > 0 ? (
                                      Object.values(v[1]).map((sub, subind) => {
                                        console.log(
                                          sub,                                          
                                          subind
                                        );
                                        return (
                                          <div className="">
                                            <Card data={sub} />
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                      
                    </ServiceLayout>
                    <div className=""></div>
                  </>
                );
              })
            : ""}
        </div>
      </div>
      <div>          
        </div>
      {openCustomModel ? (
        <div
          className={`max-h-screen bg-cyan-300 absolute inset-0 transition-all duration-500 ${
            openCustomModel ? "opacity-100" : "opacity-0"
          }`}
        >
          <CustomService handleModal={setOpenCustomModel} modalStatus={openCustomModel}  callbackforData = {callbackforData}/>
        </div>
        
      ) : null}
    </Wrapper>
  );
}

export default Service;

export async function getServerSideProps() {
  // Create a new ApolloClient instance
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/graphql`, // Specify the GraphQL server URL
    cache: new InMemoryCache(), // Create a new cache instance
  });

  // Perform a query to fetch category data from the GraphQL server
  const category_data = await client.query({
    query: gql`
      query {
        categories {
          data {
            id
            attributes {
              name
              description
              subcategories {
                data {
                  id
                  attributes {
                    name
                    services {
                      data {
                        id
                        attributes {
                          name
                          features
                          checked
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  // Return the category data as props
  return {
    props: {
      cat: category_data?.data?.categories?.data,
    },
  };
}

