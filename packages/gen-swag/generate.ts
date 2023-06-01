// write contents to file
import fs from "fs";
import path from "path";

import config from "./swagger.json";

interface ApiResponse<T> {
  code: number;
  type: string;
  message: string;
  data: T;
}

type DefinitionRef = { $ref: `#/definitions/${string}` };

type Parameter = {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  type?: string;
  format?: string;
  items?: Parameter;
};

interface Endpoint {
  tags: string[];
  summary: string;
  description: string;
  operationId: string;
  produces: string[];
  parameters: Parameter[];
  responses: {
    [statusCode: string]: {
      description: string;
      schema?: Parameter;
    };
  };
  security?: {
    [securityScheme: string]: string[];
  }[];
}

interface EndPoints {
  [path: string]: {
    [method: string]: Endpoint;
  };
}

interface Property {
  type: string;
  format?: string;
  items?: Property | DefinitionRef;
  enum?: string[];
}

interface Definition {
  type: string;
  properties: {
    [propertyName: string]: Property | DefinitionRef;
  };
  required?: string[];
}

interface SwaggerConfig {
  swagger: string;
  paths: EndPoints;
  definitions: {
    [definitionName: string]: Definition;
  };
}

function createApiClient(baseUrl: string, config: SwaggerConfig) {
  const endpoints = config.paths;
  const apiClient: { [endPointName: string]: string } = {};

  for (const path in endpoints) {
    const methods = endpoints[path];
    for (const method in methods) {
      const endpoint = methods[method]!;
      const functionName = endpoint.operationId;
      const url = `${baseUrl}${path}`;
      const headers = {};

      const code = `
export async function ${functionName}(${getFunctionParameters(
        endpoint.parameters,
      )}) {
  const options = {
    method: '${method.toUpperCase()}',
    headers: ${JSON.stringify(headers)},
  }
  ${getRequestBody(endpoint.parameters)}
  const response = await fetch('${url}', options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }
  return json.data as ${getResponseType(endpoint)}
}
`;
      apiClient[functionName] = code;
    }
  }

  return apiClient;
}

function getFunctionParameters(parameters: Parameter[]) {
  return parameters
    .map(
      (param) => `${param.name}${param.required ? "" : "?"}: ${getType(param)}`,
    )
    .join(", ");
}

function getType(param: Parameter | Property | DefinitionRef): string {
  if ("$ref" in param) {
    return param.$ref.split("/").pop()!.concat("Model");
  }

  if (param.type === "array") {
    return `${getType(param.items!)}[]`;
  }
  if (param.type === "integer" && param.format === "int64") {
    return "number";
  }
  return param.type!;
}

function getRequestBody(parameters: Parameter[]) {
  const body = parameters.find((param) => param.in === "body");
  if (!body) {
    return "";
  }
  return `options.body = JSON.stringify(${body.name})`;
}

function getResponseType(endpoint: Endpoint) {
  const response = endpoint.responses["200"];
  if (!response) {
    return "void";
  }
  if (response.description === "OK") {
    return "void";
  }
  if (response.schema) {
    return getType(response.schema);
  }
  return "void";
}

// @ts-ignore
const apiClient = createApiClient("http://localhost:3000", config);

const filePath = path.join(__dirname, "api-client.ts");
fs.writeFileSync(filePath, Object.values(apiClient).join("\n\n"));

console.log(apiClient);
