<template>


  <div id="filme">
    <div v-if="loading">
      <LoadingItem />
    </div>
<!-- Estrutura que vai receber a requisição da API -->
    <div class="container" v-else>
      <h2>{{filme.nome}}</h2>
      <img :src="filme.foto" />
      <h3>
        Sinopse
      </h3>
      <p>{{filme.sinopse}}</p>
      <div class="botoes">
        <router-link tag="button" to="/">Ver mais filmes</router-link>
        <button @click="salvarFilme">Salvar</button>
        <button>
          <a :href="`https://youtube.com/results?search_query=${filme.nome}`" target="blank">
            Trailer
          </a>
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import api from '../service/api'
import LoadingItem from '../components/Loading'

export default {
    
    name:'Filme-item',
    // props vai ficar encarregado de fazer o dinamismo com os id
    props:['id'],
    components: {
      LoadingItem
    },
    data(){
      return{
        // Vai pegar só o objeto do id especifico e não todos
        filme: {},
        loading: true,
      }
    },
    async created(){
      // Fazendo requisição de id
      const response = await api.get(`?api=filmes/${this.id}`)
      this.filme = response.data
      this.loading = false
    },
    methods:{
      salvarFilme(){
        //alert('Clicou')
        // Vai pegar a string do Local Storage
        const minhaLista = localStorage.getItem('myFilme')

        let filmes = JSON.parse(minhaLista) || [];

        //console.log('LOG FILME' + filmes)
        // some() compara valores de um array
        // Se tiver um filme igual esta querendo adicionar, retorna TRUE
        const hasFilmes = filmes.some( (filme) => filme.id === this.filme.id )
        if(hasFilmes) {
          alert('Você já tem esse filme salvo!')
          return;
          // Vai parar o codigo aqui, se existir no array
        }
        // Adiciona o filme no objeto filmes
        filmes.push(this.filme)
        // Transforma filme em JSON
        localStorage.setItem('myFilme', JSON.stringify(filmes))
        alert('Filme salvo com sucesso!')
      }
    }
}
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 900px;
  }
  h2{
    color: #FFF;
    margin-bottom: 0px;
    background: brown;
    padding: 15px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .container img{
    width: 100%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  button{
    margin-right: 5px;
    border-radius: 5px;
    margin-top: 15px;
    cursor: pointer;
    border: 0;
    padding: 12px;
    font-size: 20px;
    transition: all 0.5s;
    outline: none;
  }
  button:hover{
    background: brown;
    color: #FFF;
  }
  a{
    text-decoration: none;
    color: #000;
    transition: all 0.5s;
  }
  a:hover{
    color: #FFF;
  }
</style>