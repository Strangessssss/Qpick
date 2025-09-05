import {CategoryCard} from "@/components/ui/category-card";

export function CategoriesContainer() {
    return (
        <div className="w-[77%] h-[452px] flex flex-col justify-center gap-[20px]">
            <div className="font-[600] text-[#838383] tex-[20px]">Чехлы</div>
            <div className="flex flex-row justify-between">
                <CategoryCard name="Стеклянные" img="/glass-case.png"/>
                <CategoryCard name="Силиконовые" img="/silicon-case.png"/>
                <CategoryCard name="Кожаные" img="/leather-case.png"/>
            </div>
        </div>
    )
}
