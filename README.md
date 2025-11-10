## Linguagens formais - Analizador Léxico

Este projeto é uma simulação interativa de um Autômato Finito Determinístico (AFD) desenvolvido para fins didáticos, como parte da disciplina de Linguagens Formais.
O objetivo é representar o funcionamento de um autômato de forma visual, acompanhando em tempo real o reconhecimento de palavras.

## Funcionalidades

- Adição de palavras válidas uma por uma.

- Exibição de todas as palavras adicionadas no autômato.

- Geração automática da matriz de transição de estados.

- Processamento em tempo real conforme o usuário digita.

- Identificação imediata de palavras aceitas ou rejeitadas.

- Interface centralizada, simples e intuitiva.

## Como funciona

Cada palavra adicionada é usada para construir ou expandir o autômato.
Os prefixos comuns entre palavras são compartilhados, formando um único conjunto de estados e transições.
Durante a digitação de uma palavra, o sistema percorre as transições do autômato em tempo real.
Ao pressionar a tecla de espaço, o programa verifica se o estado atual é um estado final e informa se a palavra foi aceita.

## Como usar

- Abra o arquivo index.html no navegador (ou acesse via GitHub Pages).

- No campo "Adicionar palavra", insira uma palavra e clique em Adicionar Palavra.

- Após adicionar todas as palavras desejadas, clique em Gerar Autômato.

- No campo de teste, digite qualquer palavra.

- O sistema mostra a transição de estados em tempo real.

- Ao pressionar espaço, a palavra é avaliada como aceita ou rejeitada.

- A tabela exibe a matriz de transição do autômato e destaca o estado atual.

## Tecnologias utilizadas

HTML5

CSS3

JavaScript (puro, sem bibliotecas externas)

## Objetivo acadêmico

O projeto foi desenvolvido para demonstrar, de forma prática e visual, o funcionamento de um autômato finito determinístico e sua relação com linguagens regulares.
É uma ferramenta de apoio ao aprendizado, mostrando de maneira simples como as transições e estados se comportam diante das palavras de entrada.
