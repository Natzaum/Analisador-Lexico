class Automato {
  constructor() {
    this.estados = {
      q0: "INICIAL",
      q_final: "ACEITO",
      q_erro: "ERRO"
    }

    this.matrizTransicao = {
      [this.estados.q0]: {
        "LETRA": this.estados.q_final,
        "OUTRO": this.estados.q_erro
      },
      [this.estados.q_final]: {
        "LETRA": this.estados.q_final,
        "OUTRO": this.estados.q_erro
      },
      [this.estados.q_erro]: {
        "LETRA": this.estados.q_erro,
        "OUTRO": this.estados.q_erro
      }
    }
    this.estadoAtual = this.estados.q0
  }

  _classificarSimbolo(simbolo) {
    if (simbolo >= "a" && simbolo <= "z") {
      return "LETRA"
    } else {
      return "OUTRO"
    }
  }

  processarSimbolo(simbolo) {
    const tipoSimbolo = this._classificarSimbolo(simbolo)
    this.estadoAtual = this.matrizTransicao[this.estadoAtual][tipoSimbolo]
  }

  verificarAceitacao() {
    return this.estadoAtual === this.estados.q_final
  }

  resetar() {
    this.estadoAtual = this.estados.q0
  }
}