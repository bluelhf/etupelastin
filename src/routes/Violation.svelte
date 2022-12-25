<script lang="ts">
    import { getRelativeTime } from "./utils";
    import { fadeFly } from './transitions';
    import { cubicInOut } from 'svelte/easing';

    export let captureTimestamp: any;

    export let pilot: any;
    export let timestamp: any;
    export let currentlyViolating: any;
    export let closestDistance: any;

    $: colour = currentlyViolating ? 'red' : 'inherit';
    $: relativeTime = getRelativeTime(new Date(timestamp), new Date(captureTimestamp));
    $: closestDistanceMetres = `${Math.round(closestDistance / 1000.0)} metres`;
</script>
<div id="card" style="--colour: {colour}"
    in:fadeFly={{
        y: 200,
        duration: 1000,
        easing: cubicInOut
    }}>

    <h3>{pilot.firstName} {pilot.lastName}</h3>
    <div id="information">
        <p id="violationTime">{relativeTime}</p>
        <p>Closest distance: {closestDistanceMetres}</p>
        <p><a href="mailto:{pilot.email}">{pilot.email}</a></p>
        <p><a href="tel:{pilot.phoneNumber}">{pilot.phoneNumber}</a></p>
    </div>

</div>

<style>
    * {
        margin-block: 0;
        color: var(--colour);
    }

    #information {
        margin-left: 1rem;
        filter: opacity(0.5);
    }


    #violationTime {
        margin-bottom: 1rem;
    }

    a, a:link, a:visited, a:hover, a:active {
        color: inherit;
        text-decoration-color: #00000033;
    }

    #card {
        min-width: fit-content;
        background-color: rgb(0, 0, 0, 0.1);
        padding: 2rem 0rem 2rem 2rem;
        border-radius: 2rem;

    }
</style>