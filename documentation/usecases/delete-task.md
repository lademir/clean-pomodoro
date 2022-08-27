# DeleteTask Usecase

> ## Dados
* ID da tarefa
* ID do usuario

> ## Fluxo primario:
1. Localiza tarefa com ID acima
2. Certifica que essa tarefa pertence a esse usuario
3. Apaga tarefa da lista de tarefas deste usuario
4. Retornar a tarefa apagada

> ## Fluxo alternativo: Nao conseguiu localizar tarefa com o ID recebido
1. Retornar erro

> ## Fluxo alternativo: A tarefa nao pertence ao usuario
2. Retornar erro