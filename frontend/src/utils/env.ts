type ProjectEnvVariableType = Pick<ImportMetaEnv, "VITE_BACKEND_URL" | "VITE_ENVIRONMENT_NAME" | "VITE_APPLICATION_NAME" | "VITE_APPLICATION_VERSION" | "VITE_GENERATE_SOURCEMAP">

const projectEnvVariables: ProjectEnvVariableType = {
  VITE_APPLICATION_NAME: "{VITE_APPLICATION_NAME}",
  VITE_APPLICATION_VERSION: "{VITE_APPLICATION_VERSION}",
  VITE_ENVIRONMENT_NAME: "{VITE_ENVIRONMENT_NAME}",
  VITE_GENERATE_SOURCEMAP: "{VITE_GENERATE_SOURCEMAP}",
  VITE_BACKEND_URL: "{VITE_BACKEND_URL}",
}

export const getProjectEnvVariables = (): {
  envVariables : ProjectEnvVariableType
} => {
  return {
    envVariables: {
      VITE_ENVIRONMENT_NAME: !projectEnvVariables.VITE_ENVIRONMENT_NAME.includes("VITE_") ? projectEnvVariables.VITE_ENVIRONMENT_NAME : import.meta.env.VITE_ENVIRONMENT_NAME,
      VITE_GENERATE_SOURCEMAP: !projectEnvVariables.VITE_GENERATE_SOURCEMAP.includes("VITE_") ? projectEnvVariables.VITE_GENERATE_SOURCEMAP : import.meta.env.VITE_GENERATE_SOURCEMAP,
      VITE_APPLICATION_NAME: !projectEnvVariables.VITE_APPLICATION_NAME.includes("VITE_") ? projectEnvVariables.VITE_APPLICATION_NAME : import.meta.env.VITE_APPLICATION_NAME,
      VITE_APPLICATION_VERSION: !projectEnvVariables.VITE_APPLICATION_VERSION.includes("VITE_") ? projectEnvVariables.VITE_APPLICATION_VERSION : import.meta.env.VITE_APPLICATION_VERSION,
      VITE_BACKEND_URL: !projectEnvVariables.VITE_BACKEND_URL.includes("VITE_") ? projectEnvVariables.VITE_BACKEND_URL : import.meta.env.VITE_BACKEND_URL
    }
  }
}