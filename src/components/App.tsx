import { getPost } from "../api/post";

getPost((res: { data: any; }) => {
    // success
    console.log(res.data);
},(err: any) => {
    // error
    alert(err);
});

function App() {
  return <div>Hello World</div>;
}

export default App;
