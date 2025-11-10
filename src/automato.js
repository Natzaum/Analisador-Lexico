class Automato {
  constructor(listaPalavras) {
    this.estados = new Set(["q0"])
    this.estadoInicial = "q0"
    this.estadosFinais = new Set()
    this.matrizTransicao = { q0: {} }

    let proximoEstadoId = 1

    for (const palavra of listaPalavras) {
      let estadoAtual = "q0"

      for (const simbolo of palavra) {
        if (!this.matrizTransicao[estadoAtual]) {
          this.matrizTransicao[estadoAtual] = {}
        }

        if (!this.matrizTransicao[estadoAtual][simbolo]) {
          const novoEstado = `q${proximoEstadoId++}`
          this.matrizTransicao[estadoAtual][simbolo] = novoEstado
          this.estados.add(novoEstado)
          this.matrizTransicao[novoEstado] = {}
          estadoAtual = novoEstado
        } else {
          estadoAtual = this.matrizTransicao[estadoAtual][simbolo]
        }
      }

      this.estadosFinais.add(estadoAtual)
    }

    this.alfabeto = [...new Set(listaPalavras.join("").split(""))].sort()
    this.resetar()
  }

  resetar() {
    this.estadoAtual = this.estadoInicial
  }

  processarSimbolo(simbolo) {
    const proximo = this.matrizTransicao[this.estadoAtual]?.[simbolo]
    this.estadoAtual = proximo || "ERRO"
    return this.estadoAtual
  }

  verificarAceitacao() {
    return this.estadosFinais.has(this.estadoAtual)
  }
}