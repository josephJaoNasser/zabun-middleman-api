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

## Finding the rooms, layouts, facilities
### Layouts
Contains info such as rooms, room types, and room counts as well as which floor they belong to.
This info can simply be found under products.layouts
```json
"layouts": [
  {
      "autoid": "1760662",
      "property_id": 475899,
      "layout_id": 4,
      "count": 1, // This is the number of this type of room
      "surface": 0,
      "floor": 1, // Probably the floor this room belongs to
      "creation": "2010-01-05T17:49:07+01:00",
      "creation_person_id": 1514,
      "changed": "2012-08-20T11:26:18+02:00",
      "changed_person_id": 1514,
      "company_id": 800,
      "sort": 2,
      "comment": {
          "nl": "Open keuken"
      },
      "name": {
          "nl": "Keuken" // name of the room type
      }
  }
]
```

### Facilities
Contains info such on the kinds of facilities the property offers.
This info can simply be found under products.facilities
```json
"facilities": [
  {
      "active": true, // if the facility is active
      "property_id": 492275,
      "facility_id": 1,
      "company_id": 800,
      "name": {
          "nl": "Elektriciteit"
      }
  }
]
```
### Environments
Can be found in property.environments
```json
"environments": [
      {
          "active": true,
          "property_id": 492379,
          "environment_id": 4,
          "creation": "2010-04-28T11:02:18+02:00",
          "creation_person_id": 1514,
          "changed": "2013-07-23T10:09:54+02:00",
          "changed_person_id": 1514,
          "company_id": 800,
          "comment": {
              "nl": ""
          },
          "name": {
              "nl": "Centrum"
          }
      }
  ],
```
