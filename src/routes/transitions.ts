import { fly } from "svelte/transition";

export function fadeFly(node: any, options: any): any {
    const flyTrans: any = fly(node, options);

    return {
        ...options,
        css: (t: any) => `${flyTrans.css(t)}; opacity: ${t};`
    };
}