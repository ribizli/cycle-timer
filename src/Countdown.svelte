<script>
  import {formatTime} from './utils';

  export let time = 0;

  $: format = formatTime(time);
</script>

<style>
  div {
    font-size: 3em;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
</style>

<div>
  {format}
</div>