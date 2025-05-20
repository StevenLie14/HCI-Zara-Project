import {AuthService} from "src/services/auth-service.ts";
import type {AuthRequest} from "src/models/dto/request/auth-request.ts";
import {useEffect} from "react";
import {ProductService} from "src/services/product-service.ts";

export const HomePage = () => {
  const createUser = async () => {
    const userRequest : AuthRequest = {
      email : "terserah",
      password : "terserah"
    }
    const response = await AuthService.login(userRequest)
    console.log(response)

  }

  const get = async () => {
    ProductService.getAllUser().then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }



  useEffect(() => {

  }, []);

  return (
    <>
      {/* <div id='main-bg'></div> */}
      <div id='main-container'>
        <button onClick={createUser}>Create User</button>
        <button onClick={get}>Get User</button>
      </div>
    </>
  )
}

