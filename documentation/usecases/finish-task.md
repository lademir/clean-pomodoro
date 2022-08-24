# FinishTask usecase

> ## Dados
* ID da tarefa
* ID do usuario

> ## Fluxo primario:
1. Localiza tarefa com o ID recebido
2. Verifica se a tarefa pertence ao usuario
3. Troca o status da tarefa para finalizado

> ## Fluxo alternativo: Nao encontra tarefa com ID solicitado
1. Retornar erro

> ## Fluxo alternativo: Tarefa nao pertence ao usuario
2. Retornar erro

> ## Fluxo alternativo: Tarefa ja marcada como finalizada
3. Retornar erro