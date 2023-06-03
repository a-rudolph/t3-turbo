// This file is generated by gen-swag
// Do not edit this file directly

export type ApiResponse<T> = {
  code: number;
  type: string;
  data: T;
}

export type CategoryType = {
  id?: number
  name?: string
}

export type PetType = {
  id?: number
  category?: CategoryType
  name: string
  photoUrls: string[]
  tags?: TagType[]
  status?: string
}

export type TagType = {
  id?: number
  name?: string
}

export type ApiResponseType = {
  code?: number
  type?: string
  message?: string
}

export type OrderType = {
  id?: number
  petId?: number
  quantity?: number
  shipDate?: string
  status?: string
  complete?: boolean
}

export type UserType = {
  id?: number
  username?: string
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  phone?: string
  userStatus?: number
}



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


export async function getPetById(petId: number) {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await makeRequest<PetType>(`https://petstore.swagger.io/v2/pet/${petId}`, options)
  
  return response
}

export async function updatePetWithForm(petId: number, name?: string, status?: string) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  
  const response = await makeRequest<void>(`https://petstore.swagger.io/v2/pet/${petId}`, options)
  
  return response
}

export async function deletePet(petId: number, api_key?: string) {
  const options: RequestInit = {
    method: 'DELETE',
    headers: {},
  }
  
  const response = await makeRequest<void>(`https://petstore.swagger.io/v2/pet/${petId}`, options)
  
  return response
}

export async function uploadFile(petId: number, additionalMetadata?: string, file?: File) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  
  const response = await makeRequest<ApiResponseType>(`https://petstore.swagger.io/v2/pet/${petId}/uploadImage`, options)
  
  return response
}

export async function addPet(body: undefined) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await makeRequest<void>(`https://petstore.swagger.io/v2/pet`, options)
  
  return response
}

export async function updatePet(body: undefined) {
  const options: RequestInit = {
    method: 'PUT',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await makeRequest<void>(`https://petstore.swagger.io/v2/pet`, options)
  
  return response
}

export async function findPetsByStatus(status: string[]) {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await makeRequest<PetType[]>(`https://petstore.swagger.io/v2/pet/findByStatus`, options)
  
  return response
}

export async function findPetsByTags(tags: string[]) {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await makeRequest<PetType[]>(`https://petstore.swagger.io/v2/pet/findByTags`, options)
  
  return response
}

export async function getInventory() {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await makeRequest<object>(`https://petstore.swagger.io/v2/store/inventory`, options)
  
  return response
}

export async function getOrderById(orderId: number) {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await makeRequest<OrderType>(`https://petstore.swagger.io/v2/store/order/${orderId}`, options)
  
  return response
}

export async function deleteOrder(orderId: number) {
  const options: RequestInit = {
    method: 'DELETE',
    headers: {},
  }
  
  const response = await makeRequest<void>(`https://petstore.swagger.io/v2/store/order/${orderId}`, options)
  
  return response
}

export async function placeOrder(body: undefined) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await makeRequest<OrderType>(`https://petstore.swagger.io/v2/store/order`, options)
  
  return response
}

export async function getUserByName(username: string) {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await makeRequest<UserType>(`https://petstore.swagger.io/v2/user/${username}`, options)
  
  return response
}

export async function updateUser(username: string, body: undefined) {
  const options: RequestInit = {
    method: 'PUT',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await makeRequest<void>(`https://petstore.swagger.io/v2/user/${username}`, options)
  
  return response
}

export async function deleteUser(username: string) {
  const options: RequestInit = {
    method: 'DELETE',
    headers: {},
  }
  
  const response = await makeRequest<void>(`https://petstore.swagger.io/v2/user/${username}`, options)
  
  return response
}

export async function createUser(body: undefined) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await makeRequest<void>(`https://petstore.swagger.io/v2/user`, options)
  
  return response
}

export async function createUsersWithArrayInput(body: undefined) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await makeRequest<void>(`https://petstore.swagger.io/v2/user/createWithArray`, options)
  
  return response
}

export async function createUsersWithListInput(body: undefined) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await makeRequest<void>(`https://petstore.swagger.io/v2/user/createWithList`, options)
  
  return response
}

export async function loginUser(username: string, password: string) {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await makeRequest<string>(`https://petstore.swagger.io/v2/user/login`, options)
  
  return response
}

export async function logoutUser() {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await makeRequest<void>(`https://petstore.swagger.io/v2/user/logout`, options)
  
  return response
}

