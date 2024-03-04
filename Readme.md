# Shop API 
## Products and Orders can be added and removed
### Order can be created only if that Product exists

## Starting
```bash
In .env file place your
JWT KEY as #JWT_KEY 
and MongoDB URL as #MONGODB_KEY
```
Installing Dependencies
```bash
npm i
```
Starting the API
```bash
npm run dev
```
# Endpoints

## Products
#### HEADER USED IN ALL CASES EXCEPT DISPLAYING PRODUCTS
#### HEADER :
```bash
 Authorization : Bearer + Token
 ```
### DISPLAY ALL PRODUCTS
Method : ```GET```
```bash
/products
```
### DISPLAY  PRODUCT BY ID
Method : ```GET```
```bash
/products/:productId
```
#### BODY : ```productId```

### ADDING PRODUCT 
Method : ```POST```
```bash
/products
```
#### BODY : ```name```,```price```and ```productImage```
### UPDATING PRODUCT 
Method : ```PATCH```
```bash
/products/:productId
```
#### BODY : 
```bash
"propName" : "FieldtoUpdate" , "value" : #newUpdate
```
### DELETING PRODUCT 
Method : ```DELETE```
```bash
/products/:productId
```
#### BODY : ```productId```

### INCLUDE THE TOKEN IN HEADER 
#### HEADER : 
```bash
Authorization : Bearer + Token 
```
### TO DISPLAY ALL ORDERS
Method : ```GET```
```bash
/orders
```

### TO CREATE ORDER
Method : ```POST```
```bash
/orders
```
#### Body : ```Product Id``` and ```Quantity``` : By default, quantity is set to 1




### TO DISPLAY ORDER BY ID
Method : ```GET```
```bash
/orders/:orderId
```
#### Body : ```orderId```


###  TO DELETE ORDER BY ID
Method : ```DELETE```
```bash
/orders/:orderId
```
#### Body : ```orderID```


## Users

### SIGNUP
Method : ```POST```
```bash
/users/signup
```
#### BODY : ```email``` & ```password```
### LOGIN
Method : ```POST```
```bash
/users/login
```
#### BODY : ```email``` & ```password```
### DELETE USER
Method : ```DELETE```
```bash
/users/:userID
```
#### BODY : ```userID``` 
#### HEADER : 
```bash
Authorization : Bearer + Token 
```