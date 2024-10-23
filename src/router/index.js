import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Auth/Login";
import Transaction from "../pages/Transaction";
import Category from "../pages/Category";
import CategoryFormPage from "../pages/Category/CategoryFormPage";
import Supplier from "../pages/Supplier";
import SupplierFormPage from "../pages/Supplier/SupplierFormPage";
import Product from "../pages/Product";
import ProductFormPage from "../pages/Product/ProductFormPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import PurchasePage from "../pages/Transaction/PurchasePage"
import SalePages from "../pages/Transaction/SalePages";
import Inventory from "../pages/Inventory"
import PurchaseFormPage from "../pages/Transaction/PurchaseFormPage";
import SalesFormPage from "../pages/Transaction/SalesFormPage";
// import Education from "../pages/Education";
// import Skill from "../pages/Skill";
// import Project from "../pages/Project";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="transaction" element={<Transaction />} />
                <Route path="category" element={<Category />} />

                <Route path="category/form/:id?" element={<CategoryFormPage />} />
                <Route path="supplier" element={<Supplier />} />
                <Route path="supplier/form/:id?" element={<SupplierFormPage />} />
                <Route path="product" element={<Product />} />
                <Route path="product/form/:id?" element={<ProductFormPage />} />
                <Route path="purchase/" element={<PurchasePage />} />
                <Route path="purchase/form" element={<PurchaseFormPage />} />

                <Route path="sales/" element={<SalePages />} />
                <Route path="sales/form" element={<SalesFormPage />} />
                <Route path="inventory/" element={<Inventory />} />
                {/*<Route path="experience" element={<Experience />} />
                <Route path="education" element={<Education />} />
                <Route path="skill" element={<Skill />} />
                <Route path="project" element={<Project />} /> */}
            </Route>
        </Route>

    )
);