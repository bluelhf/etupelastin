<script lang="ts">
	import Violation from "./Violation.svelte";
    
    export let violations: any;
    export let timestamp : any;

    $: violations = violations?.sort((a: any, b: any) => b.tick - a.tick);
</script>

<div id="container">
    <span id="header">
        <h2>List of violators</h2>
        <h5 class="subheading">(past 10 minutes)</h5>
    </span>
    <div id="violations">
        {#if violations}
            <ul>
                {#each violations as violation (violation.pilot.pilotId)}
                    <li>
                        <Violation {...violation}, captureTimestamp={timestamp}/>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>Loading...</p>
        {/if}
    </div>
</div>

<style>
    #header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        color: white;
    }

    ul {
        list-style: none;
    }

    .subheading {
        filter: opacity(0.2);
    }

    #container {
        min-width: 60rem;
        max-width: 70rem;

        min-height: 60rem;

        background-color: #00000011;
        padding: 2rem;
        border-radius: 1rem;

        display: inline-block;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 1rem;
        background-color: #00000011;
    }

    ::-webkit-scrollbar {
        border-radius: 1rem;
        background-color: transparent;
        display: none;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
        color: transparent;
    }

    #violations {
        min-height: auto;
        height: 60rem;

        width: 100%;

        overflow-y: scroll;
        overflow-x: hidden;

        display: inline-flex;
        flex-direction: column;

        border-radius: 1rem;
    }
</style>