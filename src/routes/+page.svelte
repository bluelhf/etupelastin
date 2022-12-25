<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
	import Violations from './Violations.svelte';
    import Tracker from './Tracker.svelte';

    let status: any = {};
    let isUpdating = true;

    const update = async () => {
        status = await (await fetch("http://localhost:8002/status/")).json();
        if (isUpdating) setTimeout(update, status.updatePeriodMillis || 2000);
    };

    onMount(update);
    onDestroy(() => isUpdating = false);
</script>

<div id="container">
    <div class="section" id="header">
        <h1>Kuikanpelastin</h1>
    </div>

    <div class="section" id="violations">
        <Violations {...status}/>
    </div>

    <div class="section" id="tracker">
        <Tracker {...status} size="40rem"/>
    </div>
</div>

<style>
    #header {
        grid-area: header;
    }

    #violations {
        grid-area: violators;
    }

    #tracker {
        grid-area: tracker;
    }

    .section {
        margin: 1rem;
    }

    #container {
        display: grid;
        justify-content: center;
        justify-items: center;
        align-items: center;

        grid-template-areas:
            "header header"
            "violators tracker";
    }

    @media (max-width: 1040px) {
        #container {
            grid-template-areas:
                "header"
                "violators"
                "tracker"
        }
    }

    @media (max-width: 600px) {
        :root {
            font-size: 1.5vw;
        }
    }
</style>
