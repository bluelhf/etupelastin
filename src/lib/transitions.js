import { fly } from 'svelte/transition';

export function fadeFly(node, options) {
    const flyTrans = fly(node, options);

    return {
        ...options,
        css: (t, u) => `
            ${flyTrans.css(t, u)};
            opacity: ${t};
        `
    };
}