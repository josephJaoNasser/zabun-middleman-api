# zabun-middleman-api

### Usage

Add the following to the headers when making an API call
```json
{
  "client_id": "xxxx",
  "server_id": "xxx",
  "x-client-id": "1234",
  "api_key": "xxx"
}
```

# Routes
## /property
- Gets all properties. Pagination is also supported
- Listed below are the query parameters
```typescript
interface QueryParams {
    archived: boolean, // when true, fetch only archived properties
    transaction_ids: Array<number>, // filter the results that have these transaction ids
    type_ids: Array<number>, // filter the results that belong to certain types

    // pagination
    page: number,
    pageSize: number,

    // sorting
    sortBy: string, 
    sortOrder: "ASC" | "DESC",

    // price range
    priceMin: number, 
    priceMax: number,

    // number of bedrooms
    bedroomMin: number, 
    bedroomMax: number,

    // number of bathrooms
    bathroomMin: number,
    bathroomMax: number,
}
```
- In order to add query params that are arrays, separate each item with a comma. Example:
```
... /property?transaction_ids=1,2,3& ...
```
## /property/{propertyId}
- gets one property with a certain property ID
