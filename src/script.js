const novaPalavraInput = document.getElementById("novaPalavra")
const adicionarBtn = document.getElementById("adicionar")
const criarBtn = document.getElementById("criar")
const listaPalavrasDiv = document.getElementById("lista-palavras")
const entrada = document.getElementById("entrada")
const tabela = document.getElementById("tabela")
const resultadoDiv = document.getElementById("resultado")

let automato = null
let palavraAtual = ""
let palavrasAdicionadas = []

adicionarBtn.onclick = () => {
  const palavra = novaPalavraInput.value.trim().toLowerCase()
  if (!palavra) {
    alert("Digite uma palavra primeiro!")
    return
  }
  if (!/^[a-z]+$/.test(palavra)) {
    alert("Use apenas letras minúsculas (a-z).")
    return
  }
  if (palavrasAdicionadas.includes(palavra)) {
    alert("Essa palavra já foi adicionada.")
    return
  }

  palavrasAdicionadas.push(palavra)
  novaPalavraInput.value = ""
  atualizarListaPalavras()
}

criarBtn.onclick = () => {
  if (palavrasAdicionadas.length === 0) {
    alert("Adicione pelo menos uma palavra antes de gerar o autômato!")
    return
  }

  automato = new Automato(palavrasAdicionadas)
  entrada.disabled = false
  entrada.value = ""
  palavraAtual = ""
  resultadoDiv.innerHTML = ""

  montarMatriz()
  atualizarMatriz()
}

entrada.addEventListener("input", (e) => {
  if (!automato) return

  const valor = entrada.value
  const ultima = valor.slice(-1)

  if (valor.length < palavraAtual.length) {
    palavraAtual = valor
    automato.resetar()
    for (const s of palavraAtual) automato.processarSimbolo(s)
    atualizarMatriz()
    return
  }

  if (ultima === " ") {
    const aceita = automato.verificarAceitacao()
    resultadoDiv.innerHTML += aceita
      ? `<b style="color:lime">'${palavraAtual}' aceita</b><br>`
      : `<b style="color:red">'${palavraAtual}' rejeitada</b><br>`

    automato.resetar()
    palavraAtual = ""
    entrada.value = ""
    atualizarMatriz()
    return
  }

  if (/[a-z]/.test(ultima)) {
    palavraAtual += ultima
    automato.processarSimbolo(ultima)
    atualizarMatriz()
  }
})

function atualizarListaPalavras() {
  if (palavrasAdicionadas.length === 0) {
    listaPalavrasDiv.innerHTML = "<i>Nenhuma palavra adicionada.</i>"
  } else {
    listaPalavrasDiv.innerHTML = `<b>Palavras adicionadas:</b> ${palavrasAdicionadas.join(", ")}`
  }
}

function montarMatriz() {
  const letras = automato.alfabeto
  const estados = [...automato.estados]

  tabela.innerHTML = `
        <tr>
          <th>Estado</th>
          ${letras.map(l => `<th>${l}</th>`).join("")}
        </tr>
        ${estados.map(e => `
          <tr data-estado="${e}">
            <td>${e}</td>
            ${letras.map(l => {
    const destino = automato.matrizTransicao[e]?.[l] || "-"
    return `<td data-simbolo="${l}">${destino}</td>`
  }).join("")}
          </tr>
        `).join("")}
        <tr data-estado="ERRO">
          <td>ERRO</td>
          ${letras.map(() => `<td>-</td>`).join("")}
        </tr>
      `
}

function atualizarMatriz() {
  tabela.querySelectorAll("tr").forEach(tr => tr.className = "")

  const linha = tabela.querySelector(`tr[data-estado="${automato.estadoAtual}"]`)
  if (linha) linha.classList.add("ativo")

  automato.estadosFinais.forEach(f => {
    const lf = tabela.querySelector(`tr[data-estado="${f}"]`)
    if (lf) lf.classList.add("final")
  })

  if (automato.estadoAtual === "ERRO") {
    const linhaErro = tabela.querySelector(`tr[data-estado="ERRO"]`)
    if (linhaErro) linhaErro.classList.add("erro")
  }
}