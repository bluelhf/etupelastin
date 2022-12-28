<script>
    import { METRES } from '../constants.json';

    import { getRelativeTime } from '../time.js';

    export let captureTick;
    export let captureTimestamp;

    export let tick;
    export let closestDistance;
    export let timestamp;
    export let pilot;

    $: currentlyViolating = captureTick === tick;
    $: colour = currentlyViolating ? 'red' : 'inherit';
    $: relativeTime = getRelativeTime(new Date(timestamp), new Date(captureTimestamp));
    $: closestDistanceMetres = `${Math.round(closestDistance / METRES)} metres`;
</script>

<div id="card" style="--colour: {colour}">
    <h5 class="text" id="name">{pilot.firstName} {pilot.lastName}</h5>
    <div id="information">
        <p class="text" id="violationTime">{relativeTime}</p>
        <ul id="details">
            <li class="text">Closest distance: {closestDistanceMetres}</li>
            <li><a class="text" href="mailto:{pilot.email}">{pilot.email}</a></li>
            <li><a class="text" href="tel:{pilot.phoneNumber}">{pilot.phoneNumber}</a></li>
        </ul>
    </div>
</div>

<style>
    .text {
        color: var(--colour);
        transition: color 0.5s ease-in-out 0s;
    }

    #name {
        margin-block: 1rem;
    }

    #information {
        margin-left: 1rem;
        filter: opacity(0.5);
        font-size: 1.5rem;
    }

    #details {
        list-style: none;
        padding-inline: 0;
    }

    #details li {
        margin-bottom: 0.2rem;
    }

    #violationTime {
        margin-bottom: 1rem;
    }

    a, a:link, a:visited, a:hover, a:active {
        text-decoration: none;
    }

    #card {
        font-size: 3rem;
        border-radius: 2rem;
        padding: 2rem 0 2rem 2rem;
        margin-bottom: 1rem;

        background-color: rgb(0, 0, 0, 0.1);
    }
</style>