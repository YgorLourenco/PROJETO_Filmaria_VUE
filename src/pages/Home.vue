<template>
  <div id="home">
    <!-- Adicionando o componente "Loading" -->
    <!-- Se o v-if for true ele vai exibir o componente Loading, se não vai exibir a estrutura debaixo com v-else -->
    <div class="lista-filmes" v-if="loading">
      <Loading />
    </div>

    <!-- Estrutura para mostrar dados da API -->
      <div class="lista-filmes" v-else>
        <!-- Repetir a estrutura com v-for -->
        <article class="filme" v-for="filme in filmes" :key="filme.id">
          <strong>{{filme.nome}}</strong>
          <img :src="filme.foto" :alt="filme.nome" >
          <router-link :to="`/filme/${filme.id}`">Acessar</router-link>
        </article>
      </div>

  </div>
</template>

<script>
import api from '../service/api'
import Loading from '../components/Loading'

export default {
 
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Home',
     // Pegando o componente Loading para utilizar
    components:{
      Loading
    },
    data(){
      return{
        filmes:[],
        loading: true,
      }
    },
    // Fazendo requisição com create
    async created(){
      // Esse pedaço da URL e a que vai fazer a requisição de fato na API
      const response = await api.get('?api=filmes');
      this.filmes = response.data;
      this.loading = false;
      //Testando API
     //console.log(response.data)
    }
}
</script>

<style scoped>

  #home{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 800px;
  }
  .lista-filmes{
    margin: 15px;
  }
  .lista-filmes article{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    margin: 15px;
    padding: 15px;
    border-radius: 5px;
  }
  .lista-filmes strong{
    padding-bottom: 15px;
    font-size: 20px;
  }
  img{
    max-height: 350px;
    width: 900px;
  }
  .lista-filmes article a{
    text-decoration: none;
    color: #FFF;
    font-size: 25px;
    background-color: brown;
    width: 100%;
    height: 40px;
    margin-top: -30px;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

</style>