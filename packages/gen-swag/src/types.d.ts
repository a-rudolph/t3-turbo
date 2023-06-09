export type DefinitionRef = { $ref: `#/definitions/${string}` };

export type Parameter = {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  type?: string;
  format?: string;
  items?: Parameter;
  schema?: Parameter | DefinitionRef;
};

export interface Endpoint {
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

export interface EndPoints {
  [path: string]: {
    [method: string]: Endpoint;
  };
}

export interface Property {
  type: string;
  format?: string;
  items?: Property | DefinitionRef;
  enum?: string[];
}

export interface Definition {
  type: string;
  properties: {
    [propertyName: string]: Property | DefinitionRef;
  };
  required?: string[];
}

export interface SwaggerConfig {
  swagger: string;
  host: string;
  basePath: string;
  paths: EndPoints;
  definitions: {
    [definitionName: string]: Definition;
  };
}
