"use client";

import React, {useEffect, useState} from "react";
import {AddProductMenu} from "@/components/pages/dashboard/products/add-product-menu";
import {AddCategoryMenu} from "@/components/pages/dashboard/categories/add-category-menu";
import {DashboardProductsList} from "@/components/pages/dashboard/products/dashboard-products-list";
import {DashboardCategoriesList} from "@/components/pages/dashboard/categories/dashboard-categories-list";
import {AddBrandMenu} from "@/components/pages/dashboard/brands/add-brand-menu";
import {DashboardBrandsList} from "@/components/pages/dashboard/brands/dashboard-brands-list";
import {} from "@/contexts/ProductContext";

export default function Dashboard() {
    return (
        <div className="flex w-full h-full justify-start items-center flex-col gap-[20px] p-4">
            <AddProductMenu/>
            <DashboardProductsList/>
            <AddCategoryMenu/>
            <DashboardCategoriesList/>
            <AddBrandMenu/>
            <DashboardBrandsList/>
        </div>
    );
}

