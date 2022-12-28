<script>
    import { fade } from 'svelte/transition'

    export let position
    export let violation
    export let manufacturer
    export let model
    export let serialNumber
    export let tick

    export let diameter

    $: currentlyViolating = violation?.tick === tick
    $: pilot = violation?.pilot

    $: relativePosition = {
        x: position?.x / 500_000,
        y: position?.y / 500_000
    }
</script>

<span class="drone object {currentlyViolating ? 'violating' : ''}" style="
    --drone-diameter: {diameter};
    transform: translate(
        calc({relativePosition.x} * var(--size)),
        calc({relativePosition.y} * var(--size)));" transition:fade>

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
        width: var(--drone-diameter);
        height: var(--drone-diameter);
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

        border-radius: 1rem;
        margin-top: 1.5rem;
        padding: 1rem;

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