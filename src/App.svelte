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
  import { timeInputMask } from './time-input-mask'
  import Countdown from "./Countdown.svelte";

  let video;

  if (!($config && $config.length)) {
    $config = [{ name: "action", time: 60 }, { name: "break", time: 15 }];
  }

  const createInputs = () => $config.map(c => ({
    name: c.name,
    time: timeInputValue(c.time)
  }));

  let configInputs = createInputs();

  $: timeLeft = $current ? $current.timeLeft : -1;
  $: currentIndex = $current && $current.index;

  $: {
    if (timeLeft < 4 && timeLeft > 0) {
      new Audio('sound/beep-ping.mp3').play();
    } else if (timeLeft === 0) {
      new Audio('sound/horn-honk.mp3').play();
    }
  }

  $: {
    if (currentIndex != null) {
      new Audio('sound/electronic-chime.mp3').play();
    }
  }

  const onStart = () => {
    if ($started && $running) {
      video.pause();
      return pause();
    }

    // update config
    if (!$started) {
      $config = configInputs.map(input => ({
        name: input.name,
        time: input.time.value
      }));
      configInputs = createInputs();
    }
    video.play();
    start(!$started);
  };

  const onStop = () => {
    video.pause();
    stop();
  };

  const removeConfig = idx => {
    configInputs = configInputs.filter((_, i) => idx !== i);
  };

  const addConfig = () => {
    configInputs = [...configInputs, { name: "new", time: timeInputValue(10) }];
  };

  let screenWidth = 250;

  $: scale = screenWidth / 250;

</script>

<style>
  main {
    display: flex;
    align-content: center;
    flex-direction: column;
    height: 100%;
    max-height: 100%;
    overflow: auto;
  }

  main > div {
    flex: 0 0 auto;
    text-align: center;
    width: 250px;
    padding: 20px;
    margin: 0 auto;
    transform-origin: top;
    box-sizing: border-box;
  }

  .round {
    font-size: 1.5em;
    margin: .25em 0;
  }

  .input-row {
    display: flex;
  }
  .input-row input {
    border: none;
    border-bottom: 1px solid lightgray;
    padding: 0 5px;
    margin: 0;
    background: transparent;
  }
  .input-row input:read-only {
    border: none;
  }
  .input-row input.time {
    flex: 0 0 auto;
    text-align: right;
    width: 3.2em;
    font-variant-numeric: tabular-nums;
  }
  .input-row input.name {
    flex: 1 1 auto;
    width: 0;
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
    width: 24px;
    height: 24px;
  }

  video {
    display: none;
  }
</style>

<main bind:offsetWidth={screenWidth}>
  <div class:running={$running} class:started={$started} style="transform: scale({scale});">
    <div class="buttons">
      <button on:click={onStart}>
        {#if $running}
          <img src="images/pause.svg" alt="pause" />
        {:else}
          <img src="images/play.svg" alt="play" />
        {/if}
      </button>
      <button on:click={onStop}>
        <img src="images/stop.svg" alt="stop" />
      </button>
    </div>
    <div class="round">Round: {$round}</div>
    <Countdown time={timeLeft} />
    {#each configInputs as item, idx (item)}
      <div class="input-row" class:active={idx === currentIndex}>
        <input bind:value={item.time.value$} use:timeInputMask readonly={$started} class="time" />
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
<video bind:this={video} loop muted playsinline>
  <source src="video/blank.m4v">
  <source src="video/blank.ogv" type="video/ogg">
  <source src="video/blank.webm" type="video/webm">
</video>
