<ul>
    <li v-for="result in results" class="questionsLi" v-bind:value="result.question" v-bind:key="result.question">{{ result.question }}
        <ul>
            <li v-for="result in results" class="questionsLi" v-bind:value="result.correct_answer" v-bind:key="result.correct_answer">{{ result.correct_answer }}</li>
        </ul>
    </li>
</ul>


<li v-for="result in results" :key="result.question" class="questionsLi">{{ result.question }}</li>