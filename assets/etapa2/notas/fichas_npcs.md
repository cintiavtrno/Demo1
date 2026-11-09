# Etapa 2 (1994) — NPCs

## Dona Zefa — anfitriã do caruru
- Já existe como figurante `fg_senhora` (turbante roxo, blusa branca, saia marrom, bengala). Passa a NPC falante.
- Mora no sobrado do quintal (cenário novo). Vizinha antiga da Rua; conhece a Vó e o Raimundo desde antes do Programa.
- Papel na fase: dona da mesa. O caruru é a promessa de Cosme e Damião (27 de setembro); o jogador ajuda a servir e escuta a Rua inteira falar de ficar ou sair.
- Voz: curta, mais velha que a Vó, fala em ditados. Não discursa sobre a reforma; conta o que viu acontecer nas casas vizinhas.
- Herda o estado da Etapa 1 por `vo` (Firme/Dividida/Cedeu) e `raimundo`: muda quem ela convida e como cumprimenta a Vó.
- Retratos: `personagens/port_zefa_0..2.png` (32×36; 0 neutro, 1 sorriso, 2 preocupada).
- Sprite andando: reaproveitar `fg_senhora_w/_i` até haver folha própria (ver prompt no `prompts_gemini.md`).

## Rita — voz pró-reforma (nome proposto, ainda a confirmar)
- Costureira, 40 e poucos anos, ateliê no térreo de um sobrado da Rua. Quer a reforma: goteira, fiação, o forro que cai. Também quer ficar.
- Não é vilã. Mostra o argumento de quem apoia o Programa sem que o jogo diga que está certo ou errado.
- Fala em concreto: orçamento do conserto, prazo, quanto o vizinho recebeu. Pergunta “e quem paga a goteira?”.
- Ligação com a Etapa 1: precisa aparecer lá primeiro (ver `plantios_etapa1.md`).
- Retratos: `personagens/port_rita_0..2.png`. Sprite: palette-swap do `fg_comerciante` como provisório (turquesa + fita métrica amarela), folha final via Gemini.
- Palavras-chave de design: fita métrica no pescoço, alfinetes na gola, cabelo solto em volume, blusa verde-água.

## Regra de estado (Etapa 2)
Os dois NPCs reagem ao mesmo campo `saber`/`vo`/`raimundo` que a Etapa 1 já grava; nada de campo novo além de `marcas` (ex.: `marcas.caruru_servido`).
