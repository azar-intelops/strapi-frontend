import Card from "@/components/Cards/Card";
import CustomCheckbox from "@/components/Checkboxs/CustomCheckbox";
import ServiceHeader from "@/components/Header/ServiceHeader";
import Wrapper from "@/components/Main/Wrapper";
import React, { useEffect, useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { client } from "./_app";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import SubcategoryList from "@/components/Checkboxs/SubcategoryList";
import CustomCard from "@/components/Cards/CustomCard";

// export async function getStaticProps(){
//  const HOST_GRAHQL=process.env(HOST_GRAHQL)
// }


export async function getServerSideProps() {
  console.log(process.env.HOST_GRAPHQL);
  const client = new ApolloClient({
    uri: "`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}`/graphql",
    cache: new InMemoryCache(),
  });

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
  return {
    props: {
      category_data,
    },
  };
}

function SideBar({ cat, subcat }) {
  const [status, setStatus] = useState({
    cat: false,
    subcat: false,
    services: false,
  });
  console.log(status);
  return (
    <nav className="w-[15vw] bg-cyan-400">
      <ul>
        {cat.map((value, idx) => {
          return (
            <li
              key={idx}
              onClick={() =>
                setStatus({
                  ...status,
                  cat: !status.cat,
                })
              }
            >
              <p>{value}</p>
              <ul className={status.cat ? "block" : "hidden"}>
                {subcat[value].map((val) => (
                  <li>{val}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Services({ category_data }) {
  const [sidebarHover, setSidebar] = useState("invisible");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((state) => !state);

  const [category, setCategory] = useState([]);
  const cat = category_data.data.categories.data.map(
    (value) => value.attributes.name
  );
  let subcat = {};
  category_data.data.categories.data
    .map((value, index) => {
      var temp = {};
      if (value.attributes.name == cat[index]) {
        temp[cat[index]] = Object.values(
          value.attributes.subcategories.data
        ).map((v) => v.attributes.name);
      }
      return temp;
    })
    .map((val) => Object.assign(subcat, val));
  const service_list = {};
  category_data.data.categories.data
    .map((value, index) => {
      var temp_ser = {};

      if (value.attributes.name == cat[index]) {
        Object.values(value.attributes.subcategories.data).map((v, i) => {
          let temop_subcat = Object.values(
            value.attributes.subcategories.data
          ).map((v) => v.attributes.name);
          if (v.attributes.name === temop_subcat[i]) {
            temp_ser[temop_subcat[i]] = Object.values(
              v.attributes.services.data
            ).map((sv, si) => sv.attributes.name);
          }
        });
      }

      return temp_ser;
    })
    .forEach((val) => Object.assign(service_list, val));
  console.log(service_list);

  const [items, setItems] = useState([]);
  // HOST_GRAHQL

  let data_cate = category_data["data"]["categories"]["data"];

  useEffect(() => {
    setCategory(data_cate);
    // fetch("`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}`/api/categories?populate=*")
    //   // fetch("https://backend.intelops.app/api/categories?populate=*")
    //   .then((response) => response.json())
    //   .then((data) => setCategory(data.data));
  }, []);

  return (
    <Wrapper>
      <ServiceHeader />
      <div className="bg-gray-300 shadow h-[1px] max-w-screen" />
      <div className="flex justify-between">
        <div className="flex gap-4 h-screen bg-white-300 max-w-[20vw]">
          {category !== null ? (
            <>
              {/* <SideBar cat={cat} subcat={subcat} /> */}
              <div>
                {Object.keys(data_cate).map((keyName, i) => (
                  <div onClick={toggleSidebar}>
                    {category.length > 0 ? (
                      <Tooltip
                        className="max-w-[20vw]"
                        content={data_cate[keyName].attributes.description}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <span
                          className="input-label"
                          onClick={() =>
                            setItems(data_cate[keyName].attributes)
                          }
                        >
                          {data_cate[keyName].attributes.name}
                        </span>
                      </Tooltip>
                    ) : (
                      ""
                    )}
                    <div>
                      {/* {items.name} */}
                      {data_cate[keyName]?.attributes.name === items.name ? (
                        <SubcategoryList
                          items={items}
                          selected={data_cate[keyName]?.attributes.name}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-300 shadow w-[1px] h-screen" />
            </>
          ) : (
            "Loading..."
          )}
        </div>
        
        <ServiceLayout cate={items}>
          <Card />
          <CustomCard/>
        </ServiceLayout>
      </div>
    </Wrapper>
  );
}
