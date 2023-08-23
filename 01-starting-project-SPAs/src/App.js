import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Product";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetails";
// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage/>}></Route>
//     <Route path="/products" element={<ProductsPage/>}></Route>
//   </Route>
// )

const route = createBrowserRouter([
  {
    path: '/root',
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <HomePage/>},
      {path: 'products', element: <ProductsPage/>},
      {path: 'products/:productID', element: <ProductDetailPage/>}
    ]
  },
])

//absolute path -> truyen thang vao mien 
//relative path -> noi voi link dang chay

function App() {
  return <RouterProvider router={route} />
}

export default App;
