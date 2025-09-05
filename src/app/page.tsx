import {Hero} from "@/components/pages/hero";
import {CategoriesContainer} from "@/components/pages/categories-container";
import {EarbudsContainer} from "@/components/pages/earbuds-container";
import {HeroUIProvider} from "@heroui/system";


export default function Home() {
  return (
      <HeroUIProvider>
          <div className="min-h-screen flex items-center flex-col gap-[30px] flex-flo">
              <Hero/>
              <CategoriesContainer/>
              <EarbudsContainer/>
          </div>
      </HeroUIProvider>
  );
}
