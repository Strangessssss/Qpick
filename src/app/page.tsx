import {Hero} from "@/components/pages/hero";
import {CategoriesContainer} from "@/components/pages/categories-container";
import {ProductsContainer} from "@/components/pages/earbuds-container";
import {ProductCard} from "@/components/ui/product-card";
import React from "react";


export default function Home() {
  return (
         <div className="min-h-screen flex items-center flex-col gap-[30px] flex-flo">
             <Hero/>
             <CategoriesContainer/>
             <ProductsContainer name={"Наушники"}>
                 <ProductCard name="Airpods Pro 2" img="/airpods-pro-2.png" price={389} rating={4.5}/>
                 <ProductCard name="Airpods 3" img="/airpods-3.png" price={249} rating={4.2}/>
                 <ProductCard name="Airpods 2" img="/airpods-2.png" price={189} rating={3.8}/>
                 <ProductCard name="Airpods Pro 2" img="/earpods.png" price={25} rating={2.3}/>
                 <ProductCard name="Samsung Earbuds" img="/earbuds.png" price={370} rating={4.3}/>
                 <ProductCard name="Xiaomi Earbuds 4 Lite" img="/xiaomi-4-lite.png" price={55} rating={2.9}/>
             </ProductsContainer>
         </div>
  );
}
