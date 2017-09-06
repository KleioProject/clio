<template>
  <div class="playground-details">
    <h1>Child Route > Playground Details: {{$route.params.id}}</h1>
    <h2>Query param: {{$route.query.lang}}</h2>
    <div style="height: 700px"></div>
    <h2 id="scroll-to-me">Scroll to this point after navigation</h2>
    </div>
</template>
