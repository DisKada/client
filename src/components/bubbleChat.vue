<template>
  <div class="chatBubble">
      <p><b>{{message.username}}:</b> {{message.text}}</p>
  </div>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style>
  .chatBubble {
    border: 2px solid #dedede;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 10px;
    margin: 20px;
    width: max-content;
  }
</style>
