import fs from "fs";
import path from "path";

import config from "../swagger.json";
import type {
  DefinitionRef,
  Endpoint,
  Parameter,
  Property,
  SwaggerConfig,
} from "./types";

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

      const searchParams = getSearchParams(endpoint.parameters);

      // TODO: headers
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
  ${searchParams}${getRequestBody(endpoint.parameters)}
  const response = await makeFetch<${responseType}>(
    \`${replaceUrlParams(url, endpoint.parameters)}\`${
        searchParams ? "+ searchParams" : ""
      },
    options
  )
   
  return response
}
`;
      apiClient.push(code);
    }
  }

  return apiClient;
}

function replaceUrlParams(url: string, parameters: Parameter[]) {
  return url.replace(/{(.*?)}/g, (_, paramName) => {
    const param = parameters.find((param) => param.name === paramName)!;
    return `\${${param.name}}`;
  });
}

function getSearchParams(parameters: Parameter[]) {
  const searchParams = parameters.filter((param) => param.in === "query");
  if (!searchParams.length) {
    return "";
  }

  let code = ``;

  for (const param of searchParams) {
    if (param.type === "array") {
      code += `
  if (${param.name}) {
    ${param.name}.forEach((value) => {
      params.push(\`${param.name}=\${value}\`);
    });
  }
`;
    } else {
      code += `
  if (${param.name}) {
      params.push(\`${param.name}=\${${param.name}}\`);
  }
`;
    }
  }

  return `
  const params: string[] = []

  ${code}

  const searchParams = '?'.concat(params.join('&'))
  `;
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

const getTypeFromRef = (ref: DefinitionRef) =>
  ref.$ref.split("/").pop()!.concat("Type");

function getType(param: Parameter | Property | DefinitionRef): string {
  if ("$ref" in param) {
    return getTypeFromRef(param);
  }

  if ("schema" in param && param.schema) {
    return getType(param.schema);
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

  if ("enum" in param && param.enum) {
    return `(${param.enum.map((value) => JSON.stringify(value)).join(" | ")})`;
  }

  return param.type!;
}

function getRequestBody(parameters: Parameter[]) {
  const formData = parameters.filter((param) => param.in === "formData");

  if (formData.length) {
    return `
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const formData = {} as Record<string, string>
  ${formData
    .map(
      (param) => `
  if (typeof ${param.name} === 'string') { 
    formData.${param.name} = ${param.name}
  }`,
    )
    .join("\n  ")}

  options.body = new URLSearchParams(formData).toString()
    `;
  }

  const body = parameters.find((param) => param.in === "body");

  if (!body) {
    return "";
  }
  return `options.body = JSON.stringify(${body.name})
  `;
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
  const typeDefinitions: string[] = [];

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

const filePath = path.join(
  __dirname,
  "..",
  "..",
  "__generated__",
  "api-client.ts",
);

const apiClientCode = apiClient.join("");
const typeDefinitionsCode = typeDefinitions.join("");

fs.writeFileSync(
  filePath,
  `// This file is generated by gen-swag
// Do not edit this file directly

import { makeFetch } from '../lib/fetch'
${typeDefinitionsCode}

${apiClientCode}
`,
);
