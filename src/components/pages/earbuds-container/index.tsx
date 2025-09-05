import {ProductCard} from "@/components/ui/product-card";

export function EarbudsContainer() {
    return (
        <div className="w-[77%] flex flex-col justify-center gap-[20px] ">
            <div className="font-[600] text-[#838383] tex-[20px]">Наушники</div>
            <div className="flex flex-row justify-evenly flex-wrap gap-[30px]">
                <ProductCard name="Airpods Pro 2" img="/airpods-pro-2.png" price={389} rating={4.5}/>
                <ProductCard name="Airpods 3" img="/airpods-3.png" price={249} rating={4.2}/>
                <ProductCard name="Airpods 2" img="/airpods-2.png" price={189} rating={3.8}/>
                <ProductCard name="Airpods Pro 2" img="/earpods.png" price={25} rating={2.3}/>
                <ProductCard name="Samsung Earbuds" img="/earbuds.png" price={370} rating={4.3}/>
                <ProductCard name="Xiaomi Earbuds 4 Lite" img="/xiaomi-4-lite.png" price={55} rating={2.9}/>
            </div>
        </div>
    )
}
