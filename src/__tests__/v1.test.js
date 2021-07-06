('use strict');
const supergoose = require('@code-fellows/supergoose');
const {server} = require('../server');
//Accessing app to have the ability to send mockRequests
const mockRequest = supergoose(server);
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
    const result = await mockRequest.post('/api/v1/food').send(data);


testId=result.body._id

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
   const result = await mockRequest.get('/api/v1/food');

   expect(result.status).toEqual(200);
   expect(result.body.length).toEqual(1);


 })
 
 
 it('get food by id', async () => {
    const result = await mockRequest.get(`/api/v1/food/${testId}`);

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

    const result = await mockRequest.put(`/api/v1/food/${testId}`).send(NewUpdatedData);
    expect(result.status).toEqual(200);
    expect(result.body.name).toEqual("banana")

  });


  it('delete item by id', async () => {
    const result = await mockRequest.delete(`/api/v1/food/${testId}`);

    console.log('from delete', result.body)
    expect(result.status).toEqual(200);


  });

  it('checking after delete get food by id', async () => {
    const result = await mockRequest.get(`/api/v1/food/${testId}`);
//     console.log(result.body.length)
// expect(result.body.length).toBeGreaterThan(0)
expect(result.body).toBeNull()


  });

});