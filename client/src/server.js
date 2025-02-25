Create a Form Component:

    Replace the contents of src/App.js with the following code:
    javascript
    Copy

    import React, { useState } from "react";
    import axios from "axios";

    const App = () => {
      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        address: "",
        age: "",
        height: "",
        weight: "",
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:5000/api/users", formData);
          alert("User added successfully!");
          console.log(response.data);
        } catch (error) {
          alert("Error adding user");
          console.error(error);
        }
      };

      return (
        
          Add User
          
            
              First Name:
              
            
            
              Last Name:
              
            
            
              Password:
              
            
            
              Email:
              
            
            
              Address:
              
            
            
              Age:
              
            
            
              Height (cm):
              
            
            
              Weight (kg):
              
            
            Submit
          
        
      );
    };

    export default App;
