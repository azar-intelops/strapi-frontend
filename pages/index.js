// main root page routes to(http://localhost:3000/).
import React from "react";
import Nav from "@/components/Nav";
import { ApolloClient, InMemoryCache, useQuery, gql, ApolloProvider } from '@apollo/client'
// export async function getServerSideProps(context) {
// const res = await fetch('http://strapi-client-backend.default.svc.cluster.local:1337/api/categories/')
// const data = await res.json()
// return {
//   props: { data }, // will be passed to the page component as props
// }
// }

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
})


export default function Home({ data }) {
  const [context, setContext] = React.useState(data);
  
  return (
    <>
      <ApolloProvider client={client}>        
          <Nav />
      </ApolloProvider>
    </>
  );
}
