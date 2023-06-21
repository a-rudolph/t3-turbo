# gen-swag

`gen-swag` is a command-line tool for generating TypeScript API clients from Swagger/OpenAPI specifications.

example is from https://petstore.swagger.io/

## Installation

You can install `gen-swag` using npm:

## Usage

To generate a TypeScript API client from a Swagger/OpenAPI specification, run the following command:

Where `<spec-file>` is the path to the Swagger/OpenAPI specification file, and `<output-dir>` is the directory where the generated files will be saved.

By default, `gen-swag` generates a single file containing all API endpoints. You can use the `--split` option to generate separate files for each endpoint:

You can also customize the generated code using templates. `gen-swag` uses the [Handlebars](https://handlebarsjs.com/) templating engine to generate code. You can provide your own templates using the `--template-dir` option:

Where `<template-dir>` is the path to the directory containing the Handlebars templates.

For more information on how to use `gen-swag`, see the [documentation](https://github.com/example/gen-swag).

## License

`gen-swag` is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
