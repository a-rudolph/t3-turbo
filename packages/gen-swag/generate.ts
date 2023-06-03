import fs from "fs";
import path from "path";

import config from "./swagger.json";

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
  host: string;
  basePath: string;
  paths: EndPoints;
  definitions: {
    [definitionName: string]: Definition;
  };
}

function createApiClient(config: SwaggerConfig) {
  const baseUrl = `${config.host}${config.basePath}`;

  const endpoints = config.paths;
  const apiClient: string[] = [];

  for (const path in endpoints) {
    const methods = endpoints[path];
    for (const method in methods) {
      const endpoint = methods[method]!;
      const functionName = endpoint.operationId;
      const url = `https://${baseUrl}${path}`;
      const headers = {};

      const responseType = getResponseType(endpoint);

      const code = `
export async function ${functionName}(${getFunctionParameters(
        endpoint.parameters,
      )}) {
  const options: RequestInit = {
    method: '${method.toUpperCase()}',
    headers: ${JSON.stringify(headers)},
  }
  ${getRequestBody(endpoint.parameters)}
  const response = await makeRequest<${responseType}>(\`${replaceUrlParams(
        url,
        endpoint.parameters,
      )}\`, options)
  
  return response
}
`;
      apiClient.push(code);
    }
  }

  return apiClient;
}

const helpers = `
async function makeRequest<T extends any>(...fetchArgs: Parameters<typeof fetch>) {
  const response= await fetch(...fetchArgs)
  const json = (await response.json()) as T

  if (response.status !== 200) {
    throw {
      code: response.status,
      type: response.statusText,
      data: json,
    };
  }

  return {
    code: response.status,
    type: response.statusText,
    data: json,
  } as ApiResponse<T>
} 
`;

function replaceUrlParams(url: string, parameters: Parameter[]) {
  return url.replace(/{(.*?)}/g, (_, paramName) => {
    const param = parameters.find((param) => param.name === paramName)!;
    return `\${${param.name}}`;
  });
}

function getFunctionParameters(parameters: Parameter[]) {
  const requiredParams = parameters.filter((param) => param.required);
  const optionalParams = parameters.filter((param) => !param.required);

  const sortedParams = [...requiredParams, ...optionalParams];

  return sortedParams
    .map(
      (param) => `${param.name}${param.required ? "" : "?"}: ${getType(param)}`,
    )
    .join(", ");
}

function getType(param: Parameter | Property | DefinitionRef): string {
  if ("$ref" in param) {
    return param.$ref.split("/").pop()!.concat("Type");
  }

  if (param.type === "array") {
    return `${getType(param.items!)}[]`;
  }

  if (param.type === "integer" || param.format === "int64") {
    return "number";
  }

  if (param.type === "file") {
    return "File";
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
const apiClient = createApiClient(config);

const createTypeDefinitions = (config: SwaggerConfig) => {
  const definitions = config.definitions;
  const typeDefinitions: string[] = [
    `
export type ApiResponse<T> = {
  code: number;
  type: string;
  data: T;
}
`,
  ];

  for (const definitionName in definitions) {
    const definition = definitions[definitionName]!;
    const properties = definition.properties;
    const required = definition.required || [];

    const code = `
export type ${definitionName}Type = {
  ${Object.entries(properties)
    .map(([propertyName, property]) => {
      const isRequired = required.includes(propertyName);
      return `${propertyName}${isRequired ? "" : "?"}: ${getType(property)}`;
    })
    .join("\n  ")}
}
`;
    typeDefinitions.push(code);
  }

  return typeDefinitions;
};

// @ts-ignore
const typeDefinitions = createTypeDefinitions(config);

const filePath = path.join(__dirname, "..", "__generated__", "api-client.ts");

const apiClientCode = apiClient.join("");
const typeDefinitionsCode = typeDefinitions.join("");

fs.writeFileSync(
  filePath,
  `// This file is generated by gen-swag
// Do not edit this file directly
${typeDefinitionsCode}

${helpers}
${apiClientCode}
`,
);
