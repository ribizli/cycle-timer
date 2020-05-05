<script>
  import {
    config,
    start,
    stop,
    pause,
    current,
    running,
    started,
    round
  } from "./timer-store";
  import { formatTime, timeInputValue } from "./utils";
  import Countdown from "./Countdown.svelte";

  $config = [{ name: "action", time: 10 }, { name: "break", time: 5 }];

  let configInputs = $config.map(c => ({
    name: c.name,
    time: timeInputValue(c.time)
  }));

  $: timeLeft = ($current && $current.timeLeft) || 0;
  $: currentIndex = $current && $current.index;

  const onStart = () => {
    if ($started && $running) return pause();

    // update config
    if (!$started) {
      $config = configInputs.map(input => ({
        name: input.name,
        time: input.time.value
      }));
    }
    start(!$started);
  };

  const removeConfig = idx => {
    configInputs = configInputs.filter((_, i) => idx !== i);
  };

  const addConfig = () => {
    configInputs = [...configInputs, { name: "new", time: timeInputValue(0) }];
  };
</script>

<style>
  main {
    display: flex;
    align-content: center;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
		overflow: auto;
  }

  main > div {
    flex: 0 0 auto;
    text-align: center;
    font-size: 5vw;
		max-height: 100%;
  }

  .input-row {
    display: flex;
    margin: 0 20%;
    font-size: 3vw;
  }
  .input-row input {
    border: none;
    border-bottom: 1px solid lightgray;
    margin: 0 2vw;
    padding: 0;
		background: transparent;
  }
  .input-row input:read-only {
    border: none;
  }
  .input-row input.time {
    width: 12vw;
    text-align: right;
  }
  .input-row.active {
		background-color: lightgray;
  }

	.started .input-row button {
		visibility: hidden;
	}

	.started .add {
		visibility: hidden;
	}

  button {
    background: transparent;
    border: none;
		margin: 0;
  }
  button > img {
    width: 6vw;
    height: 6vw;
  }
</style>

<main>
  <div class:running={$running} class:started={$started}>
    <div class="buttons">
      <button on:click={onStart}>
        {#if $running}
          <img src="images/pause.svg" alt="pause" />
        {:else}
          <img src="images/play.svg" alt="play" />
        {/if}
      </button>
      <button on:click={() => stop()}>
        <img src="images/stop.svg" alt="stop" />
      </button>
    </div>
    <div class="round">Round: {$round}</div>
    <Countdown time={timeLeft} />
    {#each configInputs as item, idx (item)}
      <div class="input-row" class:active={idx === currentIndex}>
        <input bind:value={item.time.value$} readonly={$started} class="time" />
        <input bind:value={item.name} readonly={$started} class="name" />
        <button on:click={() => removeConfig(idx)}>
					<img src="images/remove.svg" alt="remove" />
				</button>
      </div>
    {/each}
    <div class="add">
      <button on:click={addConfig}>
				<img src="images/add.svg" alt="add" />
			</button>
    </div>
  </div>
</main>
