// This file is generated by gen-swag
// Do not edit this file directly

export interface ApiResponse<T> {
  code: number;
  type: string;
  message: string;
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



export async function getPetById(petId: number) {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/pet/${petId}`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<PetType>
}

export async function updatePetWithForm(petId: number, name?: string, status?: string) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/pet/${petId}`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<void>
}

export async function deletePet(petId: number, api_key?: string) {
  const options: RequestInit = {
    method: 'DELETE',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/pet/${petId}`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<void>
}

export async function uploadFile(petId: number, additionalMetadata?: string, file?: File) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/pet/${petId}/uploadImage`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<ApiResponseType>
}

export async function addPet(body: undefined) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await fetch(`petstore.swagger.io/v2/pet`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<void>
}

export async function updatePet(body: undefined) {
  const options: RequestInit = {
    method: 'PUT',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await fetch(`petstore.swagger.io/v2/pet`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<void>
}

export async function findPetsByStatus(status: string[]) {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/pet/findByStatus`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<PetType[]>
}

export async function findPetsByTags(tags: string[]) {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/pet/findByTags`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<PetType[]>
}

export async function getInventory() {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/store/inventory`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<object>
}

export async function getOrderById(orderId: number) {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/store/order/${orderId}`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<OrderType>
}

export async function deleteOrder(orderId: number) {
  const options: RequestInit = {
    method: 'DELETE',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/store/order/${orderId}`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<void>
}

export async function placeOrder(body: undefined) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await fetch(`petstore.swagger.io/v2/store/order`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<OrderType>
}

export async function getUserByName(username: string) {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/user/${username}`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<UserType>
}

export async function updateUser(username: string, body: undefined) {
  const options: RequestInit = {
    method: 'PUT',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await fetch(`petstore.swagger.io/v2/user/${username}`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<void>
}

export async function deleteUser(username: string) {
  const options: RequestInit = {
    method: 'DELETE',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/user/${username}`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<void>
}

export async function createUser(body: undefined) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await fetch(`petstore.swagger.io/v2/user`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<void>
}

export async function createUsersWithArrayInput(body: undefined) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await fetch(`petstore.swagger.io/v2/user/createWithArray`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<void>
}

export async function createUsersWithListInput(body: undefined) {
  const options: RequestInit = {
    method: 'POST',
    headers: {},
  }
  options.body = JSON.stringify(body)
  const response = await fetch(`petstore.swagger.io/v2/user/createWithList`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<void>
}

export async function loginUser(username: string, password: string) {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/user/login`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<string>
}

export async function logoutUser() {
  const options: RequestInit = {
    method: 'GET',
    headers: {},
  }
  
  const response = await fetch(`petstore.swagger.io/v2/user/logout`, options)
  const json = await response.json()

  if (json.code !== 200) {
    throw new Error(json.message)
  }

  return json as ApiResponse<void>
}

