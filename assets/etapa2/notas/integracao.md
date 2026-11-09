# Como entrar no jogo

- O jogo guarda arte em base64 dentro do `index.html` (`ASSET`). Estes arquivos ainda **não** estão embutidos.
- Atlas dos objetos: `props/atlas_props_etapa2.png` + `.json` (mesmo formato do `atlas.props`). Para entrar, converter o PNG para base64 e registrar como `atlas.props2`.
- Retratos: `personagens/port_*.png` são 32×36, mesma ordem das três expressões (0 neutro, 1 sorriso, 2 preocupada).
- Cenário: `blockout_*` são só referência de composição e escala; a arte final vem do Gemini. `layout_quintal_zefa.json` traz as áreas clicáveis em coordenadas da cena 640×270.
- Animação da panela: alternar `obj/panela_caruru_0` e `_1` a cada ~500 ms (vapor).
- Nada foi commitado nem enviado ao repositório.

## Provisório x final
- Provisório (feito à mão, pode ir ao jogo): 16 objetos, 6 retratos.
- Provisório de referência apenas: blockouts de cenário.
- Pendente (Gemini): folhas de sprite de Zefa e Rita, cenário final do quintal e do restaurante.
