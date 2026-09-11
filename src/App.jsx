import { useEffect, useMemo, useRef, useState } from 'react'
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

const equipes = [
  ['marketing', 'Marketing', marketing],
  ['ti', 'T.I.', timeDeTi],
  ['rh', 'RH', timeDeRh],
  ['comercial', 'Comercial', comercial],
  ['producao', 'Produção', producao],
  ['ambiental', 'Gestão Ambiental', gestaoAmbiental],
]

const solucoes = [
  ['Gestão Ambiental', 'Melhorar o bem-estar e o ambiente físico por meio de práticas sustentáveis.'],
  ['Produção', 'Organizar processos e aumentar a produtividade da equipe.'],
  ['RH', 'Promover respeito, igualdade e combater o preconceito.'],
  ['Marketing', 'Proteger a imagem da empresa e incentivar o bom uso das redes sociais.'],
  ['T.I.', 'Proteger os dados da empresa e prevenir ataques cibernéticos.'],
  ['Comercial', 'Melhorar comunicação e negociação para aumentar as vendas.'],
]

function App() {
  const [menu, setMenu] = useState(false)
  const [equipe, setEquipe] = useState('marketing')
  const [qs, setQs] = useState(0)
  const [busca, setBusca] = useState('')
  const [imagemTelaCheia, setImagemTelaCheia] = useState(null)

  const inicioQuemSomos = useRef(null)
  const inicioEquipe = useRef(null)
  const arrastouQuemSomos = useRef(false)
  const arrastouEquipe = useRef(false)

  const selecionada = useMemo(
    () => equipes.find((item) => item[0] === equipe) ?? equipes[0],
    [equipe],
  )

  const quem = [quemSomos1, quemSomos2]
  const indiceEquipe = equipes.findIndex((item) => item[0] === equipe)

  useEffect(() => {
    function fecharComEsc(event) {
      if (event.key === 'Escape') setImagemTelaCheia(null)
    }

    document.addEventListener('keydown', fecharComEsc)
    document.body.style.overflow = imagemTelaCheia ? 'hidden' : ''

    return () => {
      document.removeEventListener('keydown', fecharComEsc)
      document.body.style.overflow = ''
    }
  }, [imagemTelaCheia])

  const ir = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenu(false)
  }

  const pesquisar = (event) => {
    event.preventDefault()
    const q = busca.trim().toLowerCase()
    if (!q) return

    const mapa = [
      ['inicio', 'inicio início gardentech'],
      ['sobre', 'sobre quem somos'],
      ['produto', 'produto techvaso vaso'],
      ['equipes', 'equipe equipes marketing ti rh comercial producao produção ambiental'],
      ['parcerias', 'parcerias parceiro leroy syngenta ettori'],
      ['atividades', 'atividades espro verde voltinho'],
      ['solucoes', 'solucoes soluções objetivos'],
      ['contato', 'contato email e-mail telefone'],
    ]

    const achou = mapa.find((item) => item[1].includes(q))
    if (achou) ir(achou[0])
  }

  function iniciarSwipe(ref, flag, event) {
    ref.current = event.clientX
    flag.current = false
  }

  function finalizarSwipe(ref, flag, event, esquerda, direita) {
    if (ref.current === null) return

    const diferenca = event.clientX - ref.current

    if (Math.abs(diferenca) >= 45) {
      flag.current = true
      if (diferenca < 0) esquerda()
      else direita()
    }

    ref.current = null
  }

  function proximoQuemSomos() {
    setQs((atual) => (atual + 1) % quem.length)
  }

  function anteriorQuemSomos() {
    setQs((atual) => (atual === 0 ? quem.length - 1 : atual - 1))
  }

  function proximaEquipe() {
    const novoIndice = (indiceEquipe + 1) % equipes.length
    setEquipe(equipes[novoIndice][0])
  }

  function equipeAnterior() {
    const novoIndice = indiceEquipe === 0 ? equipes.length - 1 : indiceEquipe - 1
    setEquipe(equipes[novoIndice][0])
  }

  function abrirImagem(imagem, flag) {
    if (flag?.current) {
      setTimeout(() => {
        flag.current = false
      }, 0)
      return
    }
    setImagemTelaCheia(imagem)
  }

  return (
    <>
      <header className="topo">
        <div className="barra">
          <button className="logo" onClick={() => ir('inicio')} aria-label="Ir para o início">
            <img src={logoGarden} alt="GardenTech" />
          </button>

          <nav className={menu ? 'menu aberto' : 'menu'}>
            {['inicio', 'sobre', 'produto', 'equipes', 'parcerias', 'contato'].map((id, i) => (
              <button key={id} onClick={() => ir(id)}>
                {['Início', 'Sobre nós', 'TechVaso', 'Equipes', 'Parcerias', 'Contato'][i]}
              </button>
            ))}
          </nav>

          <form className="busca" onSubmit={pesquisar}>
            <span>⌕</span>
            <input
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Pesquisa"
              aria-label="Pesquisar no site"
            />
          </form>

          <button className="hamb" onClick={() => setMenu(!menu)} aria-label="Abrir menu">
            {menu ? '×' : '☰'}
          </button>
        </div>
      </header>

      <section id="inicio" className="hero" style={{ backgroundImage: `url(${fundo})` }}>
        <div className="overlay" />
        <div className="heroConteudo">
          <h1>GARDENTECH</h1>
          <div className="linha"><span /><b>♧</b><span /></div>
          <p>TECNOLOGIA AMBIENTAL</p>
          <button className="cta" onClick={() => ir('produto')}>Conheça o TechVaso</button>
        </div>
        <div className="site">www.gardentech.com</div>
      </section>

      <section id="sobre" className="secao clara">
        <div className="container">
          <Cab
            rotulo="Sobre nós"
            titulo="Quem somos?"
            texto="Com nossos vasos inteligentes, entregamos mais do que um objeto: oferecemos uma ponte de volta às nossas raízes. Fundimos a sensibilidade da natureza com a precisão da tecnologia."
          />

          <div className="carousel">
            <button onClick={anteriorQuemSomos} aria-label="Imagem anterior">‹</button>

            <div
              className="imagemArrastavel"
              onPointerDown={(event) => iniciarSwipe(inicioQuemSomos, arrastouQuemSomos, event)}
              onPointerUp={(event) => finalizarSwipe(
                inicioQuemSomos,
                arrastouQuemSomos,
                event,
                proximoQuemSomos,
                anteriorQuemSomos,
              )}
              onPointerCancel={() => { inicioQuemSomos.current = null }}
            >
              <img
                src={quem[qs]}
                alt={`Quem somos ${qs + 1}`}
                draggable="false"
                onClick={() => abrirImagem(quem[qs], arrastouQuemSomos)}
                className="imagemClicavel"
              />
              <span className="dicaImagem">Arraste para o lado ou toque para ampliar</span>
            </div>

            <button onClick={proximoQuemSomos} aria-label="Próxima imagem">›</button>
          </div>

          <div className="dots">
            {quem.map((_, i) => (
              <button
                key={i}
                className={qs === i ? 'on' : ''}
                onClick={() => setQs(i)}
                aria-label={`Abrir imagem ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="produto" className="secao produto">
        <div className="container produtoGrid">
          <div className="produtoImg">
            <img
              src={vasoProduto}
              alt="TechVaso"
              className="imagemClicavel"
              onClick={() => setImagemTelaCheia(vasoProduto)}
            />
          </div>
          <div>
            <span className="rotulo">Produto principal</span>
            <h2>TechVaso</h2>
            <p className="lead">O vaso inteligente que cuida da sua planta enquanto você vive.</p>
            <div className="recursos">
              <Card  t="Irrigação automática" p="Cuida da água na medida certa." />
              <Card  t="Monitoramento em tempo real" p="Acompanhe a saúde da planta." />
              <Card  t="Alertas e dicas no app" p="Receba avisos quando necessário." />
              <Card  t="Design sustentável" p="Tecnologia, praticidade e sustentabilidade." />
            </div>
            <strong className="frase">Mais tempo para você. Mais vida para sua planta.</strong>
          </div>
        </div>
      </section>

      <section id="equipes" className="secao escura">
        <div className="container">
          <Cab
            claro
            rotulo="Pessoas"
            titulo="Conheça nossas equipes"
            texto="Escolha uma área ou arraste a imagem para o lado para visualizar os integrantes da GardenTech."
          />

          <div className="tabs">
            {equipes.map((item) => (
              <button
                key={item[0]}
                className={equipe === item[0] ? 'on' : ''}
                onClick={() => setEquipe(item[0])}
              >
                {item[1]}
              </button>
            ))}
          </div>

          <div
            className="equipeImg imagemArrastavel equipeArrastavel"
            onPointerDown={(event) => iniciarSwipe(inicioEquipe, arrastouEquipe, event)}
            onPointerUp={(event) => finalizarSwipe(
              inicioEquipe,
              arrastouEquipe,
              event,
              proximaEquipe,
              equipeAnterior,
            )}
            onPointerCancel={() => { inicioEquipe.current = null }}
          >
            <img
              src={selecionada[2]}
              alt={`Equipe ${selecionada[1]}`}
              draggable="false"
              className="imagemClicavel"
              onClick={() => abrirImagem(selecionada[2], arrastouEquipe)}
            />
            <span className="dicaImagem dicaImagemEscura">Arraste para trocar • toque para ampliar</span>
          </div>
        </div>
      </section>

      <section id="parcerias" className="secao clara">
        <div className="container">
          <Cab
            rotulo="Conexões"
            titulo="Empresas parceiras"
            texto="Parcerias que aproximam agricultura, varejo, logística e inovação."
          />
          <div className="parceiros">
            <Parceiro img={syngenta} nome="Syngenta" txt="Referência em agricultura e inovação." />
            <Parceiro img={leroyMerlin} nome="Leroy Merlin" txt="Conexão com o público de casa e jardinagem." />
            <Parceiro img={grupoEttori} nome="Grupo Ettori" txt="Transporte, armazenamento e distribuição." />
          </div>
        </div>
      </section>

      <section id="atividades" className="secao atividades">
        <div className="container">
          <Cab
            claro
            rotulo="Ações da turma"
            titulo="Atividades desenvolvidas"
            texto="Iniciativas de sustentabilidade, conscientização e trabalho em equipe."
          />
          <div className="ativGrid">
            <Atividade
              img={esproVerde}
              titulo="Espro Verde"
              txt="Reaproveitamento de resíduos orgânicos para produção de adubo e uso de garrafas PET recicladas como vasos."
              abrir={() => setImagemTelaCheia(esproVerde)}
            />
            <Atividade
              img={voltinho}
              titulo="Voltinho"
              txt="Mascote criado para incentivar o descarte correto de pilhas, baterias e outros resíduos."
              abrir={() => setImagemTelaCheia(voltinho)}
            />
          </div>
        </div>
      </section>

      <section id="solucoes" className="secao clara">
        <div className="container">
          <Cab
            rotulo="Nosso propósito"
            titulo="O que buscamos melhorar"
            texto="Cada área contribui para construir um ambiente mais eficiente, seguro e sustentável."
          />
          <div className="solucoes">
            {solucoes.map((item, i) => (
              <article key={item[0]}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{item[0]}</h3>
                <p>{item[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="secao contato">
        <div className="container contatoGrid">
          <div>
            <span className="rotulo">Fale com a gente</span>
            <h2>Contato</h2>
            <p>Conheça mais sobre a GardenTech e nossas soluções de tecnologia ambiental.</p>
          </div>
          <div className="dados">
            <p><small>TELEFONE</small><b>+55 19 00000-0000</b></p>
            <p><small>E-MAIL</small><b>gardentech@gmail.com</b></p>
            <p><small>SITE</small><b>www.gardentech.com.br</b></p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container rodape">
          <img src={logoGarden} alt="GardenTech" />
          <span>GardenTech • Tecnologia Ambiental</span>
        </div>
      </footer>

      {imagemTelaCheia && (
        <div className="lightbox" onClick={() => setImagemTelaCheia(null)} role="dialog" aria-modal="true">
          <button
            className="lightboxFechar"
            onClick={() => setImagemTelaCheia(null)}
            aria-label="Fechar imagem"
          >
            ×
          </button>
          <img
            src={imagemTelaCheia}
            alt="Visualização ampliada"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

function Cab({ rotulo, titulo, texto, claro = false }) {
  return (
    <div className={claro ? 'cab claroTxt' : 'cab'}>
      <div><span className="rotulo">{rotulo}</span><h2>{titulo}</h2></div>
      <p>{texto}</p>
    </div>
  )
}

function Card({ icon, t, p }) {
  return <div className="recurso"><span>{icon}</span><div><b>{t}</b><p>{p}</p></div></div>
}

function Parceiro({ img, nome, txt }) {
  return <article className="parceiro"><div className="parceiroImg"><img src={img} alt={nome} /></div><h3>{nome}</h3><p>{txt}</p></article>
}

function Atividade({ img, titulo, txt, abrir }) {
  return (
    <article className="atividadeCard">
      <img src={img} alt={titulo} className="imagemClicavel" onClick={abrir} />
      <div><h3>{titulo}</h3><p>{txt}</p></div>
    </article>
  )
}

export default App
