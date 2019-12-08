<template>
  <div class="millennial">
    <div class="welcomeDiv">
      <h1><span class="millennialFont">Millennials</span> vs. <span class="boomerFont">Boomers</span></h1>
    </div>
    <div class="showcaseDiv">
      <h2>Ok Snowflake!</h2>
    </div>
    <div class="millennialImages">
      <h2 class="millennialFont">Millennial</h2>
      <div class="millennialImage">
          <img src="@/assets/millennial.png" alt="millennial" />
      </div>
      <router-link to="/Game"><button>Play</button></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Millennial',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.millennial {
  text-align: center;
}
.welcomeDiv {
  background-color: #6775B6;
  color: white;
}
.showcaseDiv h2{
  margin-top: 50px;
}
.millennialImages {
  width: 100%;
  background-color: #6775B6;
  color: white;
}
.millennialImage {
  width: 45%;
  display: inline-block;
}
.millennialImage img {
  width: 70%;
}
button {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  display: block;
  padding: 20px 50px 20px;
  background-color: #ffffff;
  color: #6775b6;
  font-size: 24px;
  border: 2px solid #ffffff;
  border-radius: 6px;
}
button:hover {
    background-color: #6775b6;
    color: #ffffff;
}
</style>
