// This is Questions page routes to (http://localhost:3000/questions)
import { Fragment, useEffect, useState } from "react";
import ServiceHeader from "@/components/Header/ServiceHeader";
import Wrapper from "@/components/Main/Wrapper";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import SocialMediaAuth from "@/components/modal/SocialMediaAuth";
import { useSession, signIn, signOut } from 'next-auth/react';
import axios from "axios";


export default function questions({ cat, menus,cat_sea }) {
  const [open, setOpen] = useState(1);
  const [cate_subcate, serCatSub] = useState([]);
  const [navInfo, setNavInfo] = useState({
    currentCategory: "",
    categoriesStatus: false,
    currentSubcategory: "",
  });
  const [menus_data, serMenuData] = useState({});
  const [question, setQuestion] = useState({});//cat
  const [search, setSearch] = useState("");
  const [filtertag,setFiltertag]=useState('')
  const { data, status } = useSession();
  const [openLoginModel, setLoginOpenModel] = useState(false);
  const [limit] = useState(10)//Setting the pageSize   
  const [start,setStart]=useState(1)
  const [total,setQuestionTotal]=useState()
  
  const [startOffset, setStartOffset] = useState(10);  
  
  useEffect(() => {
    console.log(data, "datadatadatadata");
  
    if (status === "authenticated") {
      // Fetch user data based on the email
      fetch(
        "`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}`/api/users?filters[$and][0][email][$eq]=" +
          data?.user?.email
      )
        .then((response) => response.json())
        .then((check_user_data) => {          
          if (check_user_data.length > 0) {
            console.log("User already Exists",check_user_data);
          } else {
            let get_username = data?.user?.email.split('@');
            const required_fields={        
              "username": get_username[0],
              "email": data?.user?.email,
              "password":"password123"
            }

            // Register user if no user data is found
            fetch("`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}`/api/auth/local/register", {required_fields})
              .then((response) => response.json())
              .then((user_data) => {
                console.log(user_data, "user successfully register");
              });
          }
        });
    }
  
    async function fetchData() {
      // Fetch questions data using axios post request
      const { data } = await axios.post("`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}`/graphql", {
        query: `
            query {
              questions(pagination:{page:${start},pageSize:${limit}}) {
                data {
                  id
                  attributes {    
                    question
                    answer        
                  }      
                }
                meta{
                    pagination{
                      page
                      pageSize
                        total
                        pageCount
                    }
                    }          
              }
            }             
                `,
      });
      
  
      // Update question and questionTotal state with fetched data
      setQuestion(data?.data?.questions?.data);
      setQuestionTotal(data?.data?.questions?.meta?.pagination);
    }
  
    fetchData(); // Call fetchData function
  
    
  }, [start, limit]);
  
  // Comment: Function for navigating to the next page
  function nextPage() {
    console.log(typeof start,"start+1",start+1);
    setStart(start+1);// Updating the start state by incrementing its value
    setStartOffset(startOffset + limit);//Setting the value of the next page and Updating the startOffset state by adding the limit

    
}

// Comment: Function for navigating to the previous page
function prevPage() {
    setStart(start - 1);//Updating the start state by decrementing its value
    setStartOffset(startOffset - limit);//Setting the value of the previous page
}

// Comment: Function to filter questions by subcategory
  const filterBySubcate=(e)=>{
    console.log(e.currentTarget.value,"ques",question);
    setFiltertag(e.currentTarget.value)    
  }
  // Updating the filtertag state with the selected value
  useEffect(()=>{
    if(openLoginModel){
      setLoginOpenModel(false)// Closing the login model if it is open
    }else{
      setLoginOpenModel(true)// Opening the login model if it is closed
    }

    // Filtering questions based on category and subcategory names
    let filtered=cat.filter((ques) => {            
      if(ques?.attributes?.category?.data?.attributes?.name.toLowerCase().includes((filtertag).toLowerCase())||ques?.attributes?.subcategory?.data?.attributes?.name.toLowerCase().includes((filtertag).toLowerCase())){        
        return ques;
      }          
    });
    setQuestion(filtered); // Updating the question state with the filtered questions
    console.log(filtered,"filteredfilteredfiltered")   
  },[filtertag])
  const filterCategory = (e) => {
    
    setFiltertag(e.currentTarget.value)
   
    setNavInfo({
      ...navInfo,
      currentCategory: e.currentTarget.value, // Updating the currentCategory in the navInfo state
      categoriesStatus: !navInfo.categoriesStatus, //Toggling the categoriesStatus in the navInfo state
    });
  };
  
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);    
  };
  const searchByQuestion = (e) => {
    
    setSearch(e?.currentTarget?.value);

    // Server side filter
      const filterBySearch=fetch("`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}`/api/questions?filters[question][$contains]="+e?.currentTarget?.value).then((response)=>response.json()
  ).then((data)=>{
    setQuestion(data?.data)    
  })

    if (e?.currentTarget?.value === "") {      
      // If search input is empty, reset the question data
      setQuestion(data);
      return;
    }    
    setQuestion(filterBySearch);
  };  

  return (
    <>
      <Wrapper>
        {status==="authenticated"?
        <div className="flex">
          <div className="min-w-[13vw] min-h-screen border-r-2">
            <ul className="divide-y divide-slate-200">
              {menus.map((value, index) => {
                return (
                  <li key={index} className="p-2 first:border-t-[1px] border-slate-200">
                    <button
                      className="text-lg font-semibold"
                      value={value.attributes?.name}
                      onClick={filterCategory}
                    >
                      {value.attributes?.name}
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
                                      value={subcat.attributes.name}
                                      onClick={filterBySubcate}
                                    >
                                      {subcat.attributes.name}
                                    </button>
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

            <div></div>
          </div>
          <div className="w-full p-2">
            <div className="flex justify-end items-center">
              Search:{" "}
              <input type="text" value={search} onChange={searchByQuestion} />
            </div>
            {question?.length > 0
              ? question.map((k, ind) => {
                  let i = ind + 1;
                  return (
                    <Fragment>
                      <Accordion open={open === i}>
                        <AccordionHeader onClick={() => handleOpen(i)}>
                          {k.attributes.question}
                        </AccordionHeader>
                        <AccordionBody>{k.attributes.answer}</AccordionBody>
                      </Accordion>
                    </Fragment>
                  );
                })
              : ""}
             <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
  <div class="flex flex-1 justify-between sm:hidden">
    <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
    <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
  </div>
  <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{start}</span>
        to
        <span class="font-medium">{startOffset}</span>
        of
        <span class="font-medium">{total?.total}</span>
        results
      </p>
    </div>
    <div>
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        {start===1?
        <button type="button" disabled>Previous</button> :
        <a href="#" onClick={prevPage} class="relative inline-flex items-center rounded-l-md px-2 py-2 text-black-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
        Previous                  
        </a>
        
        }    
        <button type="button" onClick={nextPage} class="relative inline-flex items-center rounded-r-md px-2 py-2 text-black-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          
          Next
          </button>                
      </nav>
    </div>
  </div>
</div>

          </div>
        </div>:
        openLoginModel?<div className={`max-h-screen 
 absolute flex justify-center items-center transition-all duration-500 ${
            openLoginModel ? "opacity-100" : "opacity-0"
          }`}>
            <SocialMediaAuth handleOpen={setLoginOpenModel} openLoginModel={openLoginModel}/>
          
        </div>:
          <h2>You Need to Login watch Questions Page</h2>
          }
      </Wrapper>
    </>
  );
}

// Function to fetch data from the server side
export async function getServerSideProps() {  
  // Creating a new Apollo client
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/graphql`,
    url: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/questions?pagination[page]=1&pagination[pageSize]=10`,
    cache: new InMemoryCache(),
  });

  // Querying the server for question data using Graphql Quesry
  const question_data = await client.query({
    query: gql`
      query {
        questions {
          data {
            id
            attributes {
              question
              answer
              category {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
              subcategory {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
  // Querying the server for category data
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
                  }
                }
              }
            }
          }
        }
      }
    `,
  })
  // Returning the fetched data as props
  return {
    props: {      
      cat: question_data?.data?.questions?.data,
      menus: category_data?.data?.categories?.data,
    },
  };
}
