import Image from "next/image";

interface CategoryCardProps {
    name: string;
    img: string;
}

export function CategoryCard({ img, name }: CategoryCardProps) {
    return(
        <div className="w-[31%] h-[408px] bg-white rounded-[30px] shadow-[0_0_20px_0_#0000001A] flex justify-center items-center flex-col gap-[20px]">
            <Image src={img}
                   alt="Image"
                   width={151}
                   height={300}
            />
            <div className={"font-[600] text-[17px] text-center"}>
                {name}
            </div>
        </div>
    )
}