# Versão tijolinhos

`index_lego.html` é o jogo inteiro com um pós-processamento por cima: o mundo (cenário, personagens, objetos) vira mosaico de peças 1x1 com pino, numa paleta de 33 cores de tijolo. Relógio, bandeja, diálogos e botões ficam nítidos, numa segunda câmera.

- **L** liga e desliga o efeito. **[** e **]** mudam o tamanho do pino (2 a 4 pixels do jogo).
- Tamanho padrão: 3 px em telas menores, 2 px em telas grandes (pino de ~6 px na tela).
- Usa WebGL. Sem WebGL o jogo abre normal, sem o efeito.
- Gerado, não editado à mão: depois de mudar o `index.html`, rode `python3 tools/make_lego.py index.html tools/lego_inject.js lego/index_lego.html`.
