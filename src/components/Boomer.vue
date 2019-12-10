<template>
  <div class="boomer">
    <div class="welcomeDiv">
      <h1><span class="millennialFont">Millennials</span> vs. <span class="boomerFont">BOOMER</span></h1>
    </div>
    <div class="showcaseDiv">
      <h2>Ok Boomer!</h2>
    </div>
    <div class="boomerImages">
      <h2 class="boomerFont">BOOMER</h2>
      <div class="boomerImage">
          <img src="@/assets/boomer.png" alt="boomer" />
      </div>
      <button>Play</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Boomer',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.boomer {
  text-align: center;
}
.welcomeDiv {
  background-color: #E38120;
  color: white;
}
.showcaseDiv h2{
  margin-top: 50px;
}
.boomerImages {
  width: 100%;
  background-color: #E38120;
  color: white;
}
.boomerImage {
  width: 45%;
  display: inline-block;
}
.chooseH2 {
  font-size: 32px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.boomerImage img {
  width: 70%;
}
button {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  display: block;
  padding: 20px 50px 20px;
  background-color: #ffffff;
  color: #E38120;
  font-size: 24px;
  border: 2px solid #ffffff;
  border-radius: 6px;
}
button:hover {
    background-color: #E38120;
    color: #ffffff;
}
</style>
