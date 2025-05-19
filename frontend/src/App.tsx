import {getProjectEnvVariables} from "src/utils/env.ts";

function App() {


  return (
    <h1 className="text-xl font-bold underline">
      {getProjectEnvVariables().envVariables.VITE_APPLICATION_NAME}
      Hello world!
    </h1>
  )
}

export default App
