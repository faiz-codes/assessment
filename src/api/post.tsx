import axios from "axios";

export function getPost(callback, errorcallback){
    axios.get("/api/posts")
    .then(res => {
      //do something
      if(callback != null){
         callback(res);
      }
    })
    .catch(err => {
      // catch error
      if(errorcallback != null){
         errorcallback(err);
      }
    })
}