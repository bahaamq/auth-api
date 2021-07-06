('use strict');
const supergoose = require('@code-fellows/supergoose');
const {server} = require('../server');
//Accessing app to have the ability to send mockRequests
const mockRequest = supergoose(server);
let createToken =0
let readToken=0;

describe('signup Server', () => {
let data={}
    it('sign up user who has create permission', async () => {

        data={
           "username":"ssasaadsdadsfdfddfsaasdfdaffddfsfsdaasfdfsdsadddfdfdadsdsaasdfssfdafdfddfdfdds",
           "password":"12345SSSfaddfdsasafsaddfdffdasasdafdfdsddsaasdsdasdafd6626",
           "role":"admin"
       }
       //  const output = 
       const result = await mockRequest.post('/signup').send(data);
   
       createToken=result.body.token
   
   console.log(result.body.user)
       expect(result.status).toEqual(201);
       expect(result.body.user).toBeDefined()
       expect(result.body.token).toBeDefined()
   
   
     })


     it('sign up user who has read permission', async () => {

        data={
            "username":"ssasaadsdadafssfdfddfsaasdfdaffddfsfsdaasfdfsdsadddfdfdadsdsaasdfssfdafdfddfdfdds",
            "password":"12345SSSfdfadfaaddfdsasafsaddfdffdasasdafdfdsddsaasdsdasdafd6626",
            "role":"user"
        }
        //  const output = 
        const result = await mockRequest.post('/signup').send(data);
    
        readToken=result.body.token
    
    console.log(result.body.user)
        expect(result.status).toEqual(201);
        expect(result.body.user).toBeDefined()
        expect(result.body.token).toBeDefined()
    
   
     })
});




describe('API Server', () => {

  let testId=0
  let data={}


  it('add item', async () => {

     data={
        "name":"apple",
        "calories":"2",
        "type":"FRUIT"
    }
    //  const output = 
    const result = await mockRequest.post('/api/v2/food').send(data) 
    .set('Authorization', 'bearer ' + createToken)
    ;


testId=result.body._id
console.log("wooooooooooooooooow")
    expect(result.status).toEqual(201);
    expect(result.body.calories).toEqual(2)
    expect(result.body.type).toEqual("FRUIT")
    expect(result.body.name).toEqual("apple")


  })


  
  it('get all items', async () => {

    data={
       "name":"apple",
       "calories":"2",
       "type":"FRUIT"
   }
   //  const output = 
   const result = await mockRequest.get('/api/v2/food')
   .set('Authorization', 'bearer ' + readToken)
   ;

   expect(result.status).toEqual(200);
   expect(result.body.length).toEqual(1);


 })
 
 
 it('get food by id', async () => {
    const result = await mockRequest.get(`/api/v2/food/${testId}`)
    .set('Authorization', 'bearer ' + readToken)
    ;

//     console.log(result.body.length)
// expect(result.body.length).toBeGreaterThan(0)
expect(result.body.name).toEqual("apple")

    expect(result.status).toEqual(200);
  });



  it('update by id', async () => {

    const NewUpdatedData={
        "name":"banana",
        "calories":"3",
        "type":"FRUIT"
    }

    const result = await mockRequest.put(`/api/v2/food/${testId}`).send(NewUpdatedData)
    .set('Authorization', 'bearer ' + createToken)
    ;
    expect(result.status).toEqual(200);
    expect(result.body.name).toEqual("banana")

  });


  it('delete item by id', async () => {
    const result = await mockRequest.delete(`/api/v2/food/${testId}`)
    .set('Authorization', 'bearer ' + createToken)
    ;

    console.log('from delete', result.body)
    expect(result.status).toEqual(200);


  });

  it('checking after delete get food by id', async () => {
    const result = await mockRequest.get(`/api/v2/food/${testId}`)
    .set('Authorization', 'bearer ' + readToken)
    ;

expect(result.body).toBeNull()


  });

});