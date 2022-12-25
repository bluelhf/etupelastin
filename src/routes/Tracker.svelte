<script lang="ts">
    import Drone from "./Drone.svelte";
	import { memoize } from "./utils";

    export let drones: any = [];
    export let violations: any = [];
    export let size: string = "40rem";

    const findViolation = memoize((drone: any) => {
        for (let violation of violations) {
            if (violation.droneSerialNumber == drone.serialNumber) {
                return violation;
            }
        }
    });
</script>

<div id="container" style="--size: {size}">
    <span class="circle object"></span>
    {#each drones as drone (drone.serialNumber)}
        <Drone {...drone}, violation={findViolation(drone)} />
    {/each}
</div>

<style>
    :global(.object) {
        position: absolute;
        border-radius: 50%;
    }

    .circle {
        width:  calc(2 * 100 * 1000 / 500000 * var(--size));
        height: calc(2 * 100 * 1000 / 500000 * var(--size));
        transform: translate(75%, 75%);

        background-color: #22000022;
    }

    #container {
        position: static;
        background-color: #00000011;
        width: var(--size);
        height: var(--size);
        
        border-radius: 2rem;
        padding: 2rem;
    }
</style>