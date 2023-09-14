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
    page: number, // the page number for pagination
    pageSize: number, // the number of items per page
    sortBy: string, // sort the items based on this property
    sortOrder: "ASC" | "DESC", // sort order
    priceMin: number, // minimum price to search
    priceMax: number, // maximum price to search,
    bedroomMin: number, // minimum amount of bedrooms in a property,
    bedroomMax: number, // maximum amount of bedrooms in a property,
    bathroomMin: number, // minimum amount of bathrooms in a property,
    bathroomMax: number, // maximum amount of bathrooms in a property,
    archived: boolean, // when true, fetch only archived properties
    transaction_ids: Array<number>, // filter the results that have these transaction ids
    type_ids: Array<number>, // filter the results that belong to certain types
}
```
- In order to add query params that are arrays, separate each item with a comma. Example:
```
... /property?transaction_ids=1,2,3& ...
```
## /property/{propertyId}
- gets one property with a certain property ID
