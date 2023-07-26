// React component for a custom service form. Importing necessary dependencies from React

// Defining the CustomService component
import React, { useEffect, useState } from "react";

export default function CustomService({
  handleModal,
  modalStatus,
  callbackforData,
}) {
  // State variables
  const [servicename, setServicename] = useState("");
  const [service_desc, setServicedesc] = useState("");
  const [error, setError] = useState("");
  const [serviceData, setServiceData] = useState([]);
  
  // useEffect hook for handling service data changes
  useEffect(() => {    
    callbackforData(serviceData);
    if (Object.values(serviceData).length > 0) {
      // handleModal(!modalStatus)
    }
  }, [serviceData]);

  // Function to handle services
  const handleServices = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          name: servicename,
          features: service_desc,
          subcategory: 6,
          category: 3,
        },
      }),
    };
    fetch("`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}`/api/services", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "datadatadatadata", data.data);

        if (data.data !== null) {
          setServiceData(data);// Set the service data
          location.reload();//Reload the page

          handleModal(!modalStatus); // Handle the modal
        } else {
          setError("this service name already exists"); // Set the error message
        }
      });
    
  };
  // Function to handle input changes
  const handleChange = (event) => {
    // Get input value from "event"

    if (event.target.name === "service_name") {
      setServicename(event.target.value);// Set the service name
    }
    if (event.target.name === "service_description") {
      setServicedesc(event.target.value); //Set the service description
    }
    console.log(servicename, "service_description", service_desc);
  };

  // JSX code for rendering the component
  return (
    <div className="absolute inset-0 flex justify-center items-center z-10000">
      <button
        onClick={() => handleModal(!modalStatus)}
        className="absolute top-20 right-20"
      >
        X
      </button>
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6 ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Service Name
          </label>
          <input
            name="service_name"
            value={servicename}
            onChange={handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Jane"
          />
          <label className="text-red-500">{error}</label>
        </div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          name="service_description"
          value={service_desc}
          id="message"
          rows="4"
          onChange={handleChange}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <button type="button" className="btn" onClick={handleServices}>
          Submit
        </button>
      </form>
    </div>
  );
}
