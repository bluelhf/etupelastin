<script>
    import Drone from "./Drone.svelte";
    import { memoize } from "../functions";
    import { METRES } from "../constants.json"

    export let violations = [];
    export let     drones = [];
    export let       tick = 0;

    export let droneDiameter = "2rem";

    const findViolation = memoize((drone) =>
        violations.find(violation => violation.droneSerialNumber === drone.serialNumber));

</script>
<div id="container" style="--METRES: {METRES}; --drone-diameter: {droneDiameter}">
    <span class="no-drone-zone object"></span>
    {#each drones as drone (drone.serialNumber)}
        <Drone {...drone}
               violation={findViolation(drone)}
               tick={tick} diameter={droneDiameter}/>
    {/each}
</div>

<style>
    #container {
        --size: 40rem;
    }

    @media (max-width: 1660px) {
        #container {
            --size: 50rem;
        }
    }

    :global(.object) {
        position: absolute;
        border-radius: 50%;
    }

    .no-drone-zone {
        z-index: 999;
        background-blend-mode: exclusion;

        /* Radius of no-drone-zone in API units */
        --radius: calc(100 * var(--METRES));

        /* Diameter of no-drone-zone in API units */
        --diameter: calc(2 * var(--radius));

        /* Diameter of no-drone-zone relative to the tracker size (in root ems) */
        --relative-diameter: calc(var(--diameter) / 500000 * var(--size) - var(--drone-diameter) / 4);

        /* Offset of no-drone-zone's top-left corner from top-left of tracker (in root ems) */
        --offset: calc((var(--size) - var(--relative-diameter)) / 2);

        width : var(--relative-diameter);
        height: var(--relative-diameter);

        transform: translate(var(--offset), var(--offset));

        background-color: #ff0000;
        opacity: 0.1;
    }

    #container {
        position: static;
        background-color: #00000022;
        width: var(--size);
        height: var(--size);
        
        border-radius: 2rem;
        padding: 2rem;
    }
</style>