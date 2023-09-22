<template>
  <h3>Vue app...</h3>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  setup() {
    axios
      .get("http://localhost:4000/shop")
      .then((resp) => {
        console.log("@resp!", resp?.data);
      })
      .catch((e) => console.log(e));
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
