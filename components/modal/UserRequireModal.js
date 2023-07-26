// This component included in ServiceHeader.js page
import React, { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSession } from "next-auth/react";
import AlertwithBadge from "../Alerts/AlertwithBadge";
import AlertwithError from "../Alerts/AlertwithError";

export default function UserRequireModal({ handleModal, modalStatus }) {
  // const [showUserReqModal, setShowUserReqModal] = useState(false)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_number, setMobilenumber] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [merror, setPhoneError] = useState("");
  const [token, setToken] = useState();
  const [openAlert,setAlert]=useState(false)
  
  const { data, status } = useSession();
  console.log(data, "user.email");

  const captchaRef = useRef(null);

  const handleRequirement = () => {
    // Retrieve data from local storage
    let getdata = localStorage.getItem("all_data");
  
    // Prepare request options for the API call
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          firstname: firstname,
          lastname: lastname,
          company_email: email,
          phone_number: mobile_number,
          description: description,
          requirements: getdata,
          token: token,
        },
      }),
    };
  
    // Check if the email field is empty
    if (email === "") {
      let err = "Email Field Connot be empty (OR) Enter a Valid Email";
      setError(err);
    }
  
    // Check if the mobile number is empty
    if (mobile_number === "") {
      let err = "Enter Mobile Number";
      setPhoneError(err);
    }
  
    // Make an API call to submit user requirements
    // fetch("https://backend.intelops.app/api/user-requirements", requestOptions)
    fetch("`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}`/api/user-requirements", requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("comes in user requirements form");
          setAlert(true)
          
          // Reload the page
          location.reload();
          
          // Return the JSON data from the response
          return response.json();
        }
      })
      .then((data) => {
        // Store the retrieved data
        setData(data);
      })
      .catch((e) => e);
  };
  
 useEffect(()=>{
  if(openAlert){
    setTimeout(()=>{
      handleModal(!modalStatus);
    },2000)
  }
 },[openAlert])
  function onTokenChange(value) {
    setToken(value);
    console.log("Captcha value:", value);
  }

  const handleChange = (event) => {
    // 👇 Get input value from "event"
    console.log(event.target.name);
    if (event.target.name === "firstname") {
      setFirstname(event.target.value);
    }
    if (event.target.name === "lastname") {
      setLastname(event.target.value);
    }
    if (status === "authenticated") {
      setEmail(data?.user.email);
    }
    if (event.target.name === "email" && status !== "authenticated") {
      setEmail(event.target.value);
    }
    if (event.target.name === "mobile_number") {
      setMobilenumber(event.target.value);
    }
    if (event.target.name === "description") {
      setDescription(event.target.value);
    }

    console.log(firstname, "firstnamefirstnamefirstnamefirstname");
  };

  return (
    <div className="flex">
      
    <div className="absolute inset-0 flex justify-center items-center z-10000">
      
      <button
        onClick={() => handleModal(!modalStatus)}
        className="absolute top-20 right-20"
      >
        X
      </button>
      
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6 ">
        {openAlert? 
            <AlertwithBadge handleAlert={setAlert}/>
            :
            ""            
            }
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/> */}
            <input
              onChange={handleChange}
              name="firstname"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
              value={firstname}
              key="firstname"
            />
            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            <p className="text-gray-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              onChange={handleChange}
              name="lastname"
              value={lastname}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Company Email
            </label>
            {status === "authenticated" ? (
              <input
                onChange={handleChange}
                name="email"
                value={data?.user.email}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="text"
                disabled
              />
            ) : (
              <input
                onChange={handleChange}
                name="email"
                value={email}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="text"
              />
            )}

            {/* <input onChange={handleChange} name='email' value={data?.user.email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="text" /> */}
            {error.length > 0 ? (
              <p className="text-red-600 text-xs italic">{error}</p>
            ) : (
              <p className="text-gray-600 text-xs italic">
                Enter a Valid Email
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Phone
            </label>
            <input
              onChange={handleChange}
              name="mobile_number"
              value={mobile_number}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
            />
            {merror.length > 0 ? (
              <p className="text-red-600 text-xs italic">{merror}</p>
            ) : (
              <p className="text-gray-600 text-xs italic">
                Enter a Valid Phone Number
              </p>
            )}
          </div>
        </div>

        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="message"
          rows="4"
          onChange={handleChange}
          name="description"
          value={description}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <div>
          {/* <Tags /> */}
          {/* onClick={() => handleModal(!modalStatus)} */}

          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            ref={captchaRef}
            onChange={onTokenChange}
          />

          <button type="button" className="btn" onClick={handleRequirement}>
            Submit
          </button>
        </div>
      </form>
      
    </div>
    </div>
  );
}
