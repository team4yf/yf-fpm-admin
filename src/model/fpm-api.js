import fetch from 'node-fetch'

function fetchData(method, param){
  return new Promise( (resolve, reject) => {
     fetch('http://api.yunplus.io/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify ({
        appkey: '123123',
        method: method,
        v: '0.0.1',
        sign: 123123123,
        timestamp: 123123123,
        param: JSON.stringify(param)
      })
    })
    .then((response) => {
      response.json()
        .then((json) => {
          if(json.errno === 0){
            resolve(json)
          }else{
            reject(json)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
    .catch((err) => {
      reject(err)
    })

  })
}
export default fetchData
