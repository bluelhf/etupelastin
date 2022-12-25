<script lang="ts">
	import { fade } from "svelte/transition";


    export let position: any;
    export let violation: any;
    export let manufacturer: any;
    export let model: any;
    export let serialNumber: any;

    $: currentlyViolating = violation?.currentlyViolating;
    $: pilot = violation?.pilot;
</script>

<span transition:fade class="drone object {currentlyViolating ? 'violating' : ''}" style="
    transform: translate(
        calc({position.x / 500_000} * var(--size)),
        calc({position.y / 500_000} * var(--size)));">
    {#if currentlyViolating && pilot}
        <span class="hidden hoverText">
            <p>{pilot.firstName} {pilot.lastName}</p>
            <p>{manufacturer} {model}</p>
            <p>{serialNumber}</p>
        </span>
    {/if}
</span>

<style>
    .drone {
        width: 2rem;
        height: 2rem;

        background-color: #444444;
        transition-property: transform;
        transition-duration: 0.5s;
    }

    .violating {
        background-color: red !important;
    }

    .hoverText {
        display: block;

        z-index: 999;

        width: max-content;
        height: max-content;
        margin-top: 1.5rem;
        padding: 1rem;
        border-radius: 1rem;
        background-color: #00000011;
        transition-property: opacity;
        transition-duration: 0.2s;
    
    }

    .hoverText * {
        margin-block: 0;
        color: #ff4444;
    }

    .hidden {
        opacity: 0;
    }

    .drone:hover .hidden {
        opacity: 1;
    }
</style>