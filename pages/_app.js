import CustomCheckbox from "@/components/Checkboxs/CustomCheckbox";
import { Context, DataContext } from "@/components/libs/Context";
import Nav from "@/components/Nav";
import "@/styles/globals.css";
import { getCookieParser } from "next/dist/server/api-utils";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
  ApolloProvider,
} from "@apollo/client";
import MainNavbar from "@/components/Navbar/MainNavbar";
import Header from "@/components/Header/Header";
import Home from ".";

export const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});
// const GET_CATEGORIE_SUBCATO = client
//   .query({
//     query: gql`
//       query {
//         categories {
//           data {
//             id
//             attributes {
//               name
//               subcategories {
//                 data {
//                   id
//                   attributes {
//                     name
//                     features
//                     checked
//                     category {
//                       data {
//                         id
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [sidebarHover, setSidebar] = useState("invisible");
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState([]);
  const [handleCustomModal, sethandleModal] = useState(false);

  // const {loading,error,data1}=useQuery(GET_CATEGORIE_SUBCATO)
  // console.log(loading,'loadingloading',data1,'datadatadata',error,'errorerrorerror');
  useEffect(() => {
    // fetch("`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}`/api/categories?populate=*")
    // // fetch("https://backend.intelops.app/api/categories?populate=*")
    //   .then((response) => response.json())
    //   .then((data) => setCategory(data.data));
    // console.log(data,"datadatadata");
  }, []);

  if (category?.length > 0) {
    console.log(items, "itemsitemsitems");
    // console.log(category.length, 'category.length', category[0].attributes.category_name);
  }
  // console.log(category, "categorycategorycategorycategory");
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <div className="relative">
          {/* <ApolloProvider client={client}>
      <DataContext.Provider value={items}> */}

          <Component {...pageProps} />
          <Header />
        </div>
      </SessionProvider>
    </>
  );
}
