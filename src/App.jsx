import { useMemo,useState } from 'react'
import './App.css'
import fundo from './assets/fundo.png'
import logoGarden from './assets/logoGarden.png'
import quemSomos1 from './assets/quemSomos1.png'
import quemSomos2 from './assets/quemSomos2.png'
import vasoProduto from './assets/vasoProduto.png'
import marketing from './assets/marketing.png'
import timeDeTi from './assets/timeDeTi.png'
import timeDeRh from './assets/timeDeRh.png'
import comercial from './assets/comercial.png'
import producao from './assets/producao.png'
import gestaoAmbiental from './assets/gestaoAmbiental.png'
import leroyMerlin from './assets/leroyMerlin.jpg'
import syngenta from './assets/syngenta.jpg'
import grupoEttori from './assets/grupoEttori.jpg'
import esproVerde from './assets/esproVerde.png'
import voltinho from './assets/voltinho.png'

const equipes=[
 ['marketing','Marketing',marketing],['ti','T.I.',timeDeTi],['rh','RH',timeDeRh],
 ['comercial','Comercial',comercial],['producao','Produção',producao],['ambiental','Gestão Ambiental',gestaoAmbiental]
]
const solucoes=[
 ['Gestão Ambiental','Melhorar o bem-estar e o ambiente físico por meio de práticas sustentáveis.'],
 ['Produção','Organizar processos e aumentar a produtividade da equipe.'],
 ['RH','Promover respeito, igualdade e combater o preconceito.'],
 ['Marketing','Proteger a imagem da empresa e incentivar o bom uso das redes sociais.'],
 ['T.I.','Proteger os dados da empresa e prevenir ataques cibernéticos.'],
 ['Comercial','Melhorar comunicação e negociação para aumentar as vendas.']
]

function App(){
 const [menu,setMenu]=useState(false)
 const [equipe,setEquipe]=useState('marketing')
 const [qs,setQs]=useState(0)
 const [busca,setBusca]=useState('')
 const selecionada=useMemo(()=>equipes.find(e=>e[0]===equipe)??equipes[0],[equipe])
 const quem=[quemSomos1,quemSomos2]

 const ir=id=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)}
 const pesquisar=e=>{
  e.preventDefault()
  const q=busca.trim().toLowerCase()
  const mapa=[
   ['inicio','inicio gardentech'],['sobre','sobre quem somos'],['produto','produto techvaso vaso'],
   ['equipes','equipe marketing ti rh comercial producao ambiental'],['parcerias','parcerias leroy syngenta ettori'],
   ['atividades','atividades espro verde voltinho'],['solucoes','solucoes objetivos'],['contato','contato email telefone']
  ]
  const achou=mapa.find(x=>x[1].includes(q))
  if(achou) ir(achou[0])
 }

 return <>
  <header className="topo"><div className="barra">
   <button className="logo" onClick={()=>ir('inicio')}><img src={logoGarden} alt="GardenTech"/></button>
   <nav className={menu?'menu aberto':'menu'}>
    {['inicio','sobre','produto','equipes','parcerias','contato'].map((id,i)=>
     <button key={id} onClick={()=>ir(id)}>{['Início','Sobre nós','TechVaso','Equipes','Parcerias','Contato'][i]}</button>
    )}
   </nav>
   <form className="busca" onSubmit={pesquisar}><span>⌕</span><input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Pesquisa"/></form>
   <button className="hamb" onClick={()=>setMenu(!menu)}>{menu?'×':'☰'}</button>
  </div></header>

  <section id="inicio" className="hero" style={{backgroundImage:`url(${fundo})`}}>
   <div className="overlay"/>
   <div className="heroConteudo">
    <h1>GARDENTECH</h1><div className="linha"><span/><b>♧</b><span/></div>
    <p>TECNOLOGIA AMBIENTAL</p>
    <button className="cta" onClick={()=>ir('produto')}>Conheça o TechVaso</button>
   </div>
   <div className="site">www.gardentech.com</div>
  </section>

  <section id="sobre" className="secao clara"><div className="container">
   <Cab rotulo="Sobre nós" titulo="Quem somos?" texto="Com nossos vasos inteligentes, entregamos mais do que um objeto: oferecemos uma ponte de volta às nossas raízes. Fundimos a sensibilidade da natureza com a precisão da tecnologia."/>
   <div className="carousel">
    <button onClick={()=>setQs(qs?qs-1:quem.length-1)}>‹</button>
    <img src={quem[qs]} alt="Quem somos"/>
    <button onClick={()=>setQs((qs+1)%quem.length)}>›</button>
   </div>
   <div className="dots">{quem.map((_,i)=><button key={i} className={qs===i?'on':''} onClick={()=>setQs(i)}/>)}</div>
  </div></section>

  <section id="produto" className="secao produto"><div className="container produtoGrid">
   <div className="produtoImg"><img src={vasoProduto} alt="TechVaso"/></div>
   <div><span className="rotulo">Produto principal</span><h2>TechVaso</h2>
    <p className="lead">O vaso inteligente que cuida da sua planta enquanto você vive.</p>
    <div className="recursos">
     <Card  t="Irrigação automática" p="Cuida da água na medida certa."/>
     <Card  t="Monitoramento em tempo real" p="Acompanhe a saúde da planta."/>
     <Card  t="Alertas e dicas no app" p="Receba avisos quando necessário."/>
     <Card  t="Design sustentável" p="Tecnologia, praticidade e sustentabilidade."/>
    </div>
    <strong className="frase">Mais tempo para você. Mais vida para sua planta.</strong>
   </div>
  </div></section>

  <section id="equipes" className="secao escura"><div className="container">
   <Cab claro rotulo="Pessoas" titulo="Conheça nossas equipes" texto="Escolha uma área para visualizar os integrantes da GardenTech."/>
   <div className="tabs">{equipes.map(e=><button key={e[0]} className={equipe===e[0]?'on':''} onClick={()=>setEquipe(e[0])}>{e[1]}</button>)}</div>
   <div className="equipeImg"><img src={selecionada[2]} alt={selecionada[1]}/></div>
  </div></section>

  <section id="parcerias" className="secao clara"><div className="container">
   <Cab rotulo="Conexões" titulo="Empresas parceiras" texto="Parcerias que aproximam agricultura, varejo, logística e inovação."/>
   <div className="parceiros">
    <Parceiro img={syngenta} nome="Syngenta" txt="Referência em agricultura e inovação."/>
    <Parceiro img={leroyMerlin} nome="Leroy Merlin" txt="Conexão com o público de casa e jardinagem."/>
    <Parceiro img={grupoEttori} nome="Grupo Ettori" txt="Transporte, armazenamento e distribuição."/>
   </div>
  </div></section>

  <section id="atividades" className="secao atividades"><div className="container">
   <Cab claro rotulo="Ações da turma" titulo="Atividades desenvolvidas" texto="Iniciativas de sustentabilidade, conscientização e trabalho em equipe."/>
   <div className="ativGrid">
    <Atividade img={esproVerde} titulo="Espro Verde" txt="Reaproveitamento de resíduos orgânicos para produção de adubo e uso de garrafas PET recicladas como vasos."/>
    <Atividade img={voltinho} titulo="Voltinho" txt="Mascote criado para incentivar o descarte correto de pilhas, baterias e outros resíduos."/>
   </div>
  </div></section>

  <section id="solucoes" className="secao clara"><div className="container">
   <Cab rotulo="Nosso propósito" titulo="O que buscamos melhorar" texto="Cada área contribui para construir um ambiente mais eficiente, seguro e sustentável."/>
   <div className="solucoes">{solucoes.map((s,i)=><article key={s[0]}><span>{String(i+1).padStart(2,'0')}</span><h3>{s[0]}</h3><p>{s[1]}</p></article>)}</div>
  </div></section>

  <section id="contato" className="secao contato"><div className="container contatoGrid">
   <div><span className="rotulo">Fale com a gente</span><h2>Contato</h2><p>Conheça mais sobre a GardenTech e nossas soluções de tecnologia ambiental.</p></div>
   <div className="dados"><p><small>TELEFONE</small><b>+55 19 00000-0000</b></p><p><small>E-MAIL</small><b>gardentech@gmail.com</b></p><p><small>SITE</small><b>www.gardentech.com.br</b></p></div>
  </div></section>

  <footer><div className="container rodape"><img src={logoGarden} alt="GardenTech"/><span>GardenTech • Tecnologia Ambiental</span></div></footer>
 </>
}

function Cab({rotulo,titulo,texto,claro=false}){return <div className={claro?'cab claroTxt':'cab'}><div><span className="rotulo">{rotulo}</span><h2>{titulo}</h2></div><p>{texto}</p></div>}
function Card({icon,t,p}){return <div className="recurso"><span>{icon}</span><div><b>{t}</b><p>{p}</p></div></div>}
function Parceiro({img,nome,txt}){return <article className="parceiro"><div className="parceiroImg"><img src={img} alt={nome}/></div><h3>{nome}</h3><p>{txt}</p></article>}
function Atividade({img,titulo,txt}){return <article className="atividadeCard"><img src={img} alt={titulo}/><div><h3>{titulo}</h3><p>{txt}</p></div></article>}
export default App
