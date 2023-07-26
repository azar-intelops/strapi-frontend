import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSession, signIn, signOut } from 'next-auth/react';
export default function SocialMediaAuth({openLoginModel,handleOpen}) {
//  console.log(ha);
  const { data, status } = useSession();
  const setMyHandler = () => handleOpen(!openLoginModel);
 useEffect(()=>{
  handleOpen(openLoginModel)
 },[])
//  if(status!=="authenticated"){
  console.log(openLoginModel,"authenticatedauthenticatedauthenticated",data,process.env.NEXTAUTH_URL);
 
  if(data===null ||data===undefined){
    return (
      <Fragment className="h-full w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
      
      <Dialog open={openLoginModel} handler={setMyHandler}>
      <DialogHeader>Please Login To Continue</DialogHeader>
      <DialogBody divider>
      <div>
        <button onClick={() => signIn('google')}>sign in with gooogle</button>
      </div>
      </DialogBody>
      <DialogFooter>      
      </DialogFooter>
    </Dialog>
    
    </Fragment>
    )
  }else{
    console.log(Object.values(data));
    if(Object.values(data).length>0){
      console.log(Object.values(data));
    }else{
      console.log("else",Object.values(data));
    }
    fetch("`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}`/api/users?filters[$and][0][email][$eq]="+data?.user?.email).then((response)=>response.json()).then((check_user_data)=>{
      console.log(check_user_data,"datadata",Object.values(check_user_data).length, "or array",check_user_data.length);
      if(check_user_data.length>0)
      {
        console.log(check_user_data,"check_user_datacheck_user_datacheck_user_data");

      }else{
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                    'abcdefghijklmnopqrstuvwxyz0123456789@#$';
        let pass=''
        for (let i = 1; i <= 8; i++) {
            var char = Math.floor(Math.random()
                        * str.length + 1);
            console.log(i,"str.charAt(char)",str.charAt(char));
            pass += str.charAt(char)
        }
        console.log(pass,"Math.random().toString(10).slice(2)"); 
        let user={
          "username":(data?.user?.email).split('@')[0],
          "email": data?.user?.email,
          "password":pass
        }        
    console.log("user register successfully");
      }
    })  
    console.log(Object.values(data?.user).length,"Object.values(data?.user)",Object.values(data?.user));
    return(
      <Fragment className="h-full w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
      
      <Dialog open={openLoginModel} handler={setMyHandler}>
      <DialogHeader>Do You Want To Logout?</DialogHeader>
      <DialogBody divider>
      <div>
        <div>Click On Confirm</div>
      </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={setMyHandler}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={signOut}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
    </Fragment>
    )
  }
  return (
    <div>
      {status==="authenticated"?
  <Fragment className="h-full w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
      
  <Dialog open={openLoginModel} handler={setMyHandler}>
  <DialogHeader>Do You Want To Logout?</DialogHeader>
  <DialogBody divider>
  <div>
    <div>Click On Confirm</div>
  </div>
  </DialogBody>
  <DialogFooter>
    <Button
      variant="text"
      color="red"
      onClick={setMyHandler}
      className="mr-1"
    >
      <span>Cancel</span>
    </Button>
    <Button variant="gradient" color="green" onClick={signOut}>
      <span>Confirm</span>
    </Button>
  </DialogFooter>
</Dialog>

</Fragment>
      :
    <Fragment className="h-full w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
      
      <Dialog open={openLoginModel} handler={setMyHandler}>
      <DialogHeader>Please Login To Continue</DialogHeader>
      <DialogBody divider>
      <div>
        <button onClick={() => signIn('google')}>sign in with gooogle</button>
      </div>
      </DialogBody>
      <DialogFooter>
        {/* <Button
          variant="text"
          color="red"
          onClick={setMyHandler}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={signOut}>
          <span>Confirm</span>
        </Button> */}
      </DialogFooter>
    </Dialog>
    
    </Fragment>
    }
    </div>
  );
//  }
 
}