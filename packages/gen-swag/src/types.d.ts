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
