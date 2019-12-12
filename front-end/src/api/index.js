import axios from 'axios';

// const httpUrl = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
//     ? 'http://localhost:500/api': 'https://us-central1-jerome-portfolio.cloudfunctions.net/api ';
const httpUrl =  'https://us-central1-jerome-portfolio.cloudfunctions.net/api' 
axios.defaults.withCredentials = true;
const getRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.get(httpUrl + url, { params: data || {}, withCredentials: true })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
};

const delRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.delete(httpUrl + url, { data })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
};

const putRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.put(httpUrl + url, data, { withCredentials: true })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
};

const postRequest = (url, data, token) => {
  return new Promise((resolve, reject) => {
    let config = { withCredentials: true }
    if (token) {
      config.headers = { 'Authorization': 'Bearer ' + token }
    }
    axios.post(httpUrl + url, data, config)
      .then(response => {
        resolve(response.data);
        console.log(response)
      })
      .catch(error => {
        reject(error);
      })
  })
};
export default {
  get: getRequest,
  del: delRequest,
  put: putRequest,
  post: postRequest
}