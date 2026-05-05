# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.ts >> API Tests >> TC-API-002: GET /users with pagination
- Location: tests\api.spec.ts:39:7

# Error details

```
Error: expect(received).toHaveProperty(path)

Expected path: "data"
Received path: []

Received value: [{"address": {"city": "Gwenborough", "geo": {"lat": "-37.3159", "lng": "81.1496"}, "street": "Kulas Light", "suite": "Apt. 556", "zipcode": "92998-3874"}, "company": {"bs": "harness real-time e-markets", "catchPhrase": "Multi-layered client-server neural-net", "name": "Romaguera-Crona"}, "email": "Sincere@april.biz", "id": 1, "name": "Leanne Graham", "phone": "1-770-736-8031 x56442", "username": "Bret", "website": "hildegard.org"}, {"address": {"city": "Wisokyburgh", "geo": {"lat": "-43.9509", "lng": "-34.4618"}, "street": "Victor Plains", "suite": "Suite 879", "zipcode": "90566-7771"}, "company": {"bs": "synergize scalable supply-chains", "catchPhrase": "Proactive didactic contingency", "name": "Deckow-Crist"}, "email": "Shanna@melissa.tv", "id": 2, "name": "Ervin Howell", "phone": "010-692-6593 x09125", "username": "Antonette", "website": "anastasia.net"}, {"address": {"city": "McKenziehaven", "geo": {"lat": "-68.6102", "lng": "-47.0653"}, "street": "Douglas Extension", "suite": "Suite 847", "zipcode": "59590-4157"}, "company": {"bs": "e-enable strategic applications", "catchPhrase": "Face to face bifurcated interface", "name": "Romaguera-Jacobson"}, "email": "Nathan@yesenia.net", "id": 3, "name": "Clementine Bauch", "phone": "1-463-123-4447", "username": "Samantha", "website": "ramiro.info"}, {"address": {"city": "South Elvis", "geo": {"lat": "29.4572", "lng": "-164.2990"}, "street": "Hoeger Mall", "suite": "Apt. 692", "zipcode": "53919-4257"}, "company": {"bs": "transition cutting-edge web services", "catchPhrase": "Multi-tiered zero tolerance productivity", "name": "Robel-Corkery"}, "email": "Julianne.OConner@kory.org", "id": 4, "name": "Patricia Lebsack", "phone": "493-170-9623 x156", "username": "Karianne", "website": "kale.biz"}, {"address": {"city": "Roscoeview", "geo": {"lat": "-31.8129", "lng": "62.5342"}, "street": "Skiles Walks", "suite": "Suite 351", "zipcode": "33263"}, "company": {"bs": "revolutionize end-to-end systems", "catchPhrase": "User-centric fault-tolerant solution", "name": "Keebler LLC"}, "email": "Lucio_Hettinger@annie.ca", "id": 5, "name": "Chelsey Dietrich", "phone": "(254)954-1289", "username": "Kamren", "website": "demarco.info"}, {"address": {"city": "South Christy", "geo": {"lat": "-71.4197", "lng": "71.7478"}, "street": "Norberto Crossing", "suite": "Apt. 950", "zipcode": "23505-1337"}, "company": {"bs": "e-enable innovative applications", "catchPhrase": "Synchronised bottom-line interface", "name": "Considine-Lockman"}, "email": "Karley_Dach@jasper.info", "id": 6, "name": "Mrs. Dennis Schulist", "phone": "1-477-935-8478 x6430", "username": "Leopoldo_Corkery", "website": "ola.org"}, {"address": {"city": "Howemouth", "geo": {"lat": "24.8918", "lng": "21.8984"}, "street": "Rex Trail", "suite": "Suite 280", "zipcode": "58804-1099"}, "company": {"bs": "generate enterprise e-tailers", "catchPhrase": "Configurable multimedia task-force", "name": "Johns Group"}, "email": "Telly.Hoeger@billy.biz", "id": 7, "name": "Kurtis Weissnat", "phone": "210.067.6132", "username": "Elwyn.Skiles", "website": "elvis.io"}, {"address": {"city": "Aliyaview", "geo": {"lat": "-14.3990", "lng": "-120.7677"}, "street": "Ellsworth Summit", "suite": "Suite 729", "zipcode": "45169"}, "company": {"bs": "e-enable extensible e-tailers", "catchPhrase": "Implemented secondary concept", "name": "Abernathy Group"}, "email": "Sherwood@rosamond.me", "id": 8, "name": "Nicholas Runolfsdottir V", "phone": "586.493.6943 x140", "username": "Maxime_Nienow", "website": "jacynthe.com"}, {"address": {"city": "Bartholomebury", "geo": {"lat": "24.6463", "lng": "-168.8889"}, "street": "Dayna Park", "suite": "Suite 449", "zipcode": "76495-3109"}, "company": {"bs": "aggregate real-time technologies", "catchPhrase": "Switchable contextually-based project", "name": "Yost and Sons"}, "email": "Chaim_McDermott@dana.io", "id": 9, "name": "Glenna Reichert", "phone": "(775)976-6794 x41206", "username": "Delphine", "website": "conrad.com"}, {"address": {"city": "Lebsackbury", "geo": {"lat": "-38.2386", "lng": "57.2232"}, "street": "Kattie Turnpike", "suite": "Suite 198", "zipcode": "31428-2261"}, "company": {"bs": "target end-to-end models", "catchPhrase": "Centralized empowering task-force", "name": "Hoeger LLC"}, "email": "Rey.Padberg@karina.biz", "id": 10, "name": "Clementina DuBuque", "phone": "024-648-3804", "username": "Moriah.Stanton", "website": "ambrose.net"}]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { APIService } from '../utils/APIService';
  3   | 
  4   | /**
  5   |  * API Test Suite
  6   |  * Tests for REST API endpoints
  7   |  * Update BASE_URL to match your API endpoint
  8   |  */
  9   | 
  10  | const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/1'; // ← Update with your API base URL
  11  | 
  12  | test.describe('API Tests', () => {
  13  |   let apiService: APIService;
  14  | 
  15  |   test.beforeEach(async ({ request }) => {
  16  |     apiService = new APIService(request, BASE_URL);
  17  |     
  18  |     // Optional: Set default headers for all requests
  19  |     // apiService.setDefaultHeaders({
  20  |     //   'Content-Type': 'application/json',
  21  |     //   'Accept': 'application/json',
  22  |     // });
  23  | 
  24  |     // Optional: Set authorization token
  25  |     // apiService.setAuthToken('your-token-here');
  26  |   });
  27  | 
  28  |   // Example GET request test
  29  |   test('TC-API-001: GET /users returns 200', async () => {
  30  |     const response = await apiService.get('/users');
  31  |     
  32  |     await apiService.validateStatus(response, 200);
  33  |     const body = await apiService.getJsonBody(response);
  34  |     
  35  |     expect(Array.isArray(body)).toBeTruthy();
  36  |   });
  37  | 
  38  |   // Example GET with query parameters
  39  |   test('TC-API-002: GET /users with pagination', async () => {
  40  |     const response = await apiService.get('/users', {
  41  |       params: {
  42  |         page: 1,
  43  |         limit: 10,
  44  |       },
  45  |     });
  46  | 
  47  |     await apiService.validateStatus(response, 200);
  48  |     const body = await apiService.getJsonBody(response);
  49  |     
> 50  |     expect(body).toHaveProperty('data');
      |                  ^ Error: expect(received).toHaveProperty(path)
  51  |     expect(body).toHaveProperty('total');
  52  |   });
  53  | 
  54  |   // Example POST request test
  55  |   test('TC-API-003: POST /users creates new user', async () => {
  56  |     const newUser = {
  57  |       name: 'Test User',
  58  |       email: 'test@example.com',
  59  |       age: 30,
  60  |     };
  61  | 
  62  |     const response = await apiService.post('/users', newUser);
  63  | 
  64  |     await apiService.validateStatus(response, 201);
  65  |     const body = await apiService.getJsonBody(response);
  66  |     
  67  |     expect(body).toHaveProperty('id');
  68  |     expect(body.name).toBe(newUser.name);
  69  |     expect(body.email).toBe(newUser.email);
  70  |   });
  71  | 
  72  |   // Example GET single resource
  73  |   test('TC-API-004: GET /users/:id returns specific user', async () => {
  74  |     const userId = 1;
  75  |     const response = await apiService.get(`/users/${userId}`);
  76  | 
  77  |     await apiService.validateStatus(response, 200);
  78  |     const body = await apiService.getJsonBody(response);
  79  |     
  80  |     expect(body).toHaveProperty('id');
  81  |     expect(body.id).toBe(userId);
  82  |   });
  83  | 
  84  |   // Example PUT request test
  85  |   test('TC-API-005: PUT /users/:id updates user', async () => {
  86  |     const userId = 1;
  87  |     const updatedData = {
  88  |       name: 'Updated User',
  89  |       email: 'updated@example.com',
  90  |     };
  91  | 
  92  |     const response = await apiService.put(`/users/${userId}`, updatedData);
  93  | 
  94  |     await apiService.validateStatus(response, 200);
  95  |     const body = await apiService.getJsonBody(response);
  96  |     
  97  |     expect(body.name).toBe(updatedData.name);
  98  |     expect(body.email).toBe(updatedData.email);
  99  |   });
  100 | 
  101 |   // Example PATCH request test
  102 |   test('TC-API-006: PATCH /users/:id partially updates user', async () => {
  103 |     const userId = 1;
  104 |     const patchData = { name: 'Patched User' };
  105 | 
  106 |     const response = await apiService.patch(`/users/${userId}`, patchData);
  107 | 
  108 |     await apiService.validateStatus(response, 200);
  109 |     const body = await apiService.getJsonBody(response);
  110 |     
  111 |     expect(body.name).toBe(patchData.name);
  112 |   });
  113 | 
  114 |   // Example DELETE request test
  115 |   test('TC-API-007: DELETE /users/:id removes user', async () => {
  116 |     const userId = 1;
  117 |     const response = await apiService.delete(`/users/${userId}`);
  118 | 
  119 |     await apiService.validateStatus(response, 204);
  120 |   });
  121 | 
  122 |   // Example error handling test
  123 |   test('TC-API-008: GET /users/:id returns 404 for non-existent user', async () => {
  124 |     const response = await apiService.get('/users/99999');
  125 | 
  126 |     expect(response.status()).toBe(404);
  127 |   });
  128 | 
  129 |   // Example response header validation
  130 |   test('TC-API-009: Response headers contain required fields', async () => {
  131 |     const response = await apiService.get('/users');
  132 | 
  133 |     await apiService.validateHeaders(response, {
  134 |       'content-type': 'application/json',
  135 |     });
  136 |   });
  137 | 
  138 |   // Example with response body property validation
  139 |   test('TC-API-010: Response body contains all required properties', async () => {
  140 |     const response = await apiService.get('/users');
  141 | 
  142 |     await apiService.validateStatus(response, 200);
  143 |     const body = await apiService.getJsonBody(response);
  144 |     
  145 |     expect(Array.isArray(body)).toBeTruthy();
  146 |     if (body.length > 0) {
  147 |       expect(body[0]).toHaveProperty('id');
  148 |       expect(body[0]).toHaveProperty('name');
  149 |       expect(body[0]).toHaveProperty('email');
  150 |     }
```