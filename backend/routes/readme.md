## Api Routes

## Org Routes

### Auth Routes
**Register Routes**
```
/api/org/register
```
| Parameter | Type     | Description                                                                 |
| :-------- | :------- | :-------------------------------------------------------------------------- |
| `name`    | `string` | **Required**.                                                               |
| `code`    | `string` | **Required**. Unique Collage code to assign bus identity card number to user|
| `phone`   | `string` | **Required**.                                                               |
| `address` | `string` | **Required**.                                                               |
| `password`| `string` | **Required**.                                                               |


### Admin Routes

**Assign Routes to user**

```
/api/org/admin/routes/assign-route
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `email`   | `string` | **Required**. user email                     |
| `routeId` | `string` | **Required**. Id of route to assign the user |


**Register new User to organization**
```
/api/org/admin/users/new-user
```
| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `name`    | `string` | **Required**.                                |
| `email`   | `string` | **Required**.                                |
| `phone`   | `string` | **Required**.                                |
| `code`    | `string` | **Required**.```query?code=collegeCode```    |
-----------------------------------------------------------------------


## User Routes

### Auth Routes

**Sign in Route**

User will receive OTP
```
/api/users/auth/sign-up
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**.                     |
| `phone`   | `string` | **Required**.                     |

**Verify OTP Route**
```
/api/users/auth/verify-opt
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `otp`     | `string` | **Required**.                     |
| `phone`   | `string` | **Required**.                     |

### Update Routes

**Update user Details**

```
/api/users/update/details
```
`Not Yet Implemented`

--------------------------------------------------------------------------------------


## Bus Routes

### Bus Locations Routes
**Is sharing**

Is Bus Sharing live location
```
/api/buses/locations/is-sharing/:busId
```

**Set Bus Location**

Bus location set route
```
/api/buses/locations/setLocation
```
| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `busId`     | `string` | **Required**.                     |
| `latitude`  | `string` | **Required**.                     |
| `longitude` | `string` | **Required**.                     |

**Get Bus Location**

```
/api/buses/locations/getLocation
```

**Stop Sharing Location**
```
/api/buses/locations/stop-sharing/:busId
```

**Last Location of bus**
```
/api/buses/locations/last-location/:busId
```

## Bus Routes routes

**Create bus new route**

```
/api/buses/routes/new
```
| Parameter     | Type     | Description                       |
| :------------ | :------- | :-------------------------------- |
| `name`        | `string` | **Required**.                     |
| `startPoint`  | `string` | **Required**.                     |
| `endPoint`    | `string` | **Required**.                     |
| `latitude`    | `string` | **Required**.                     |
| `longitude`   | `string` | **Required**.                     |

**Get Bus route by id**
```
/api/buses/routes/get/:routeId
```

**Update bus routes**
All fields are required 
```
/api/buses/routes/update/:routeId
```
| Parameter     | Type     | Description                       |
| :------------ | :------- | :-------------------------------- |
| `name`        | `string` | **Required**.                     |
| `startPoint`  | `string` | **Required**.                     |
| `endPoint`    | `string` | **Required**.                     |
| `latitude`    | `string` | **Required**.                     |
| `longitude`   | `string` | **Required**.                     |