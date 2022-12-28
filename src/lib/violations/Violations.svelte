<script>
    import { flip } from 'svelte/animate';
    import { fadeFly } from '../transitions';
    import { cubicInOut } from 'svelte/easing';

    import Violation from './Violation.svelte'

    export let violations
    export let timestamp
    export let tick


    $: violations?.sort((a, b) => {
        let byTime = b.tick - a.tick;
        if (byTime === 0) return a.closestDistance - b.closestDistance;
        return byTime;
    });
</script>

<div id="container">
    <span id="header">
        <h3>List of violators</h3>
        <h5 class="subheading">(past 10 minutes)</h5>
    </span>
    <div id="violations">
        {#if violations}
            <ul>
                {#each violations as violation (violation.pilot.pilotId)}
                    <li animate:flip={{duration: 1000}}
                        in:fadeFly={{ y: 200, duration: 1000, easing: cubicInOut }}>
                        <Violation {...violation}
                                   captureTimestamp={timestamp}
                                   captureTick={tick} />
                    </li>
                {/each}
            </ul>
        {:else}
            <p>Loading...</p>
        {/if}
    </div>
</div>

<style>
    #violations::-webkit-scrollbar {
        display: none;
    }

    #header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        color: white;
        font-size: 2rem;
    }

    #header * {
        margin-block: 1rem;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    .subheading {
        filter: opacity(0.2);
    }

    #container {
        display: flex;
        flex-direction: column;

        width: 50rem;
        max-height: 50rem;
        height: 50rem;

        background-color: #00000011;
        border-radius: 1rem;
        padding: 2rem;
    }

    #violations {
        display: inline-flex;
        flex-direction: column;

        width: 100%;
        border-radius: 1rem;

        overflow-y: scroll;
    }
</style>
