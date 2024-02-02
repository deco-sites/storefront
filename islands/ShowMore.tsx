import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import { Product } from "apps/commerce/types.ts";
import ProductCard from "$store/components/product/ProductCard.tsx";
import {Layout as CardLayout} from "$store/components/product/ProductCard.tsx";
import {Columns} from "$store/components/product/ProductGallery.tsx";
import Spinner from "$store/components/ui/Spinner.tsx";

export interface Props {
    nextPage: string;
    count: number;
    platform: "shopify" | "vtex";
    layout?: {
        card?: CardLayout;
        columns?: Columns;
    };
}

export default function ShowMore({nextPage, count, platform, layout}: Props){

    const products = useSignal<Array<Product | null>>([])
    const _nextPage = useSignal(nextPage)
    const loading = useSignal(false)

    const handleLoadMore = async () => {
        loading.value = true
        const page = await invoke[platform].actions.showMore.productListingPage({
            count,
            nextPage: window.location.origin + window.location.pathname + _nextPage
        })
        loading.value = false
        console.log(page.nextPage)

        if(page){
            _nextPage.value = page.nextPage
            products.value = [...products.value, ...page.products]
        }
        
    }

    return(
        <>
            {products.value.map((product, index) => {
                if(!product) return null
                return(
                    <ProductCard
                        product={product}
                        preload={index === 0}
                        layout={layout?.card}
                        platform={platform}
                    />
                )
            })}
            {_nextPage.value && <button 
                onClick={handleLoadMore}
                class="btn w-auto mx-auto col-span-full"
            >
                {loading.value ? <Spinner /> : "Show More"}
            </button>}
        </>
    )
}