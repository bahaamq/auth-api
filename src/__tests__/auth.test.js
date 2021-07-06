('use strict');
const supergoose = require('@code-fellows/supergoose');
const {server} = require('../server');
//Accessing app to have the ability to send mockRequests
const mockRequest = supergoose(server);
describe('API Server', () => {

  let testId=0
  let data={}


  it('sign up user', async () => {

     data={
        "username":"ssasaadsdadsfdfddfsaasdfdaffddfsfsdaasfdfsdsadddfdfdadsdsaasdfssfdafdfddfdfdds",
        "password":"12345SSSfaddfdsasafsaddfdffdasasdafdfdsddsaasdsdasdafd6626",
        "role":"editor"
    }
    //  const output = 
    const result = await mockRequest.post('/signup').send(data);



console.log(result.body.user)
    expect(result.status).toEqual(201);
    expect(result.body.user).toBeDefined()
    expect(result.body.token).toBeDefined()


  })
  it('Sign in', async () => {

 
    const result = await mockRequest.post('/signin')
    .auth('ssasaadsdadsfdfddfsaasdfdaffddfsfsdaasfdfsdsadddfdfdadsdsaasdfssfdafdfddfdfdds', '12345SSSfaddfdsasafsaddfdffdasasdafdfdsddsaasdsdasdafd6626')
 
 testId=result.body._id
 console.log(testId)
 
    expect(result.status).toEqual(200);
    expect(result.body.user).toBeDefined()
    expect(result.body.token).toBeDefined()

  })
 
 

});