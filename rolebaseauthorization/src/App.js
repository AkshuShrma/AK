import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Employee from './screens/Employee';
import Login from './screens/Login';
import Register from './screens/Register';
import Header from './screens/Header';
import Company from "./screens/Company";
import About from "./screens/About";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       {/* {<Header/> } */}
      <Routes>
        <Route path="" element={<Login/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="employee" element={<Employee/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="company" element={<Company/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// import React from "react";

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       users: null,
//     };
//   }
//   componentDidMount() {
//     fetch(" https://reqres.in/api/users").then((resp) => {
//       resp.json().then((result) => {
//         //console.warn(result)
//         this.setState({ users: result.data });
//       });
//     });
//   }
//   render() {
//     return (
//       <div className="App">
//         <h1>Fetch API Data</h1>
//         {this.state.users
//           ? this.state.users.map((item, i) => (
//               <div>
//                 <p>
//                   {i}---{item.first_name} {item.email}
//                 </p>
//               </div>
//             ))
//           : null}
//       </div>
//     );
//   }
// }

// export default App;
