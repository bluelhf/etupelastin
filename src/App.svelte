<script>
    import Violations from './lib/violations/Violations.svelte';
    import Tracker from './lib/tracker/Tracker.svelte';

    import { API_URL } from './lib/configuration.js';
    import { Updater } from './lib/updater';

    let updater = new Updater(API_URL,
        (candidate) => candidate?.tick > 0,
        (candidate) => candidate?.updatePeriodMillis,
        () => {
            updater = updater; /* trick to update svelte */
        });

    $: state = updater?.lastResult;
</script>

<div id="container">
    <h1 id="header">
        <svg id="logo" viewBox="0 0 284.73 227.31">
            <use href="/loon.svg#img" xlink:href='/loon.svg#img'></use>
        </svg>
        Kuikanpelastin
    </h1>

    <div class="section" id="violations">
        <Violations {...state}/>
    </div>

    <div class="section" id="tracker">
        <Tracker {...state}/>
    </div>
</div>

<style>
    #logo {
        flex-basis: auto;
        margin-right: 1rem;
        height: 10rem;
    }

    #header {
        grid-area: header;
        font-size: 5rem;
        margin-block-end: 0;

        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
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
        width: 100%;
        height: 100%;

        display: grid;
        justify-content: center;
        justify-items: center;
        align-items: center;

        grid-template-areas:
            "header header"
            "violators tracker";
    }

    @media (max-width: 1660px) {
        #container {
            grid-template-areas:
                "header"
                "violators"
                "tracker"
        }
    }

    @media (max-width: 930px) {
        :root {
            font-size: 1.5vw;
        }
    }
</style>
