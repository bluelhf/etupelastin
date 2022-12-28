import { onDestroy, onMount } from "svelte";

export class Updater {
    constructor(url, predicate, periodFunction, onUpdate) {
        this.url = url;
        this.predicate = predicate;
        this.periodFunction = periodFunction;
        this.onUpdate = onUpdate;
        this.lastResult = null;

        this.isUpdating = true;

        onMount(() => {
            let _ =  this.update();
        });

        onDestroy(() => this.stop());
    }

    async update() {
        let candidate;
        try {
            candidate = await (await fetch(this.url)).json();
            if (this.predicate(candidate)) {
                this.lastResult = candidate;
                this.onUpdate();
            }
        } catch (e) {
            // We don't care, the browser reports these anyway.
            // Just try again in a bit.
        }

        if (this.isUpdating) setTimeout(() => {
            this.update();
        }, this.periodFunction(candidate), this);
    }

    stop() {
        this.isUpdating = false;
    }
}