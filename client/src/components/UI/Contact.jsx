import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";

function Contact(){
    const navigate = useNavigate();
    
    //getting user Authenticated Data using Context API
    const {user,userauthtoken} = useAuth();
    console.log(user);
     //for setting authenticated user data
     const [userData,SetUserData] = useState(true);

  
    const [usercontact,SetContactUser] = useState({
        name:"",
        mail:"",
        message:"",
    
    });
    if(user && userData){//userDAta=false
        SetContactUser({
            name:user.username,
            mail:user.email,
            message:""
        });

        SetUserData(false);
        // Finally, this line sets userData to false, indicating that the user's data has been set in the contact form.
        //  This prevents the code inside the if block from executing again on subsequent renders, 
        //  as userData will no longer be true.

        //Re-rendering stop with the help of flag userData
     }

    const handleinput=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
    
        SetContactUser({
            ...usercontact,
            [name]:value
        });
        }

        const handleSubmit = async (e)=>{
            e.preventDefault();
            if (!userauthtoken) {
              toast.error("User is not authenticated.");
              return;
             }
            console.log(usercontact)
       
            try {
             const response = await fetch('http://localhost:5000/api/auth/contact',{
               method:'POST',
               headers:{
                  Authorization:userauthtoken,
                 "Content-Type":"application/json"
               },
               body:JSON.stringify(usercontact)//JSON Form
               
             })
             if(response.ok){
               const res_data = await response.json();
               console.log("Response From Server for Contact: ",res_data);//res_data from server
              //  storeToken(res_data.token);//
               toast.success(res_data.msg);
               navigate('/');
             }
             else {
               // Handle error if response is not ok
               const errorData = await response.json();
               toast.error(errorData.msg);
               console.error("Register Error Response:", errorData);
           }
             console.log(response); 
           } catch (error) {
              console.log("Registeration Process Failed",error);
            }
        
           }
return (
<div>
  {/* Contact Form */}
  <section className="py-5">
    <div className="container bg-dark">
      <div className="row">
        <div className="col-md-6 mt-2">
          <div className="mt-1">
            <img
              width="400"
              height="400"
              className="rounded-circle"
              src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg"
              alt="Contact Illustration"
            />
          </div>
        </div>
        <div className="col-md-6 p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-white">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={usercontact.name}
                onChange={handleinput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="mail"
                value={usercontact.mail}
                onChange={handleinput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label text-white">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                value={usercontact.message}
                onChange={handleinput}
                required
                rows="4"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-warning text-white">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</div>


);
}

export default Contact;