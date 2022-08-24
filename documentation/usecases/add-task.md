# AddTask Usecase

> ## Dados
* Titulo
* Descricao
* ID do usuario

> ## Fluxo primario:
1. Verifica se o nome é nulo
2. Verifica se já existe uma tarefa com o nome acima
3. Adiciona tarefa a lista de tarefas do usuario

> ## Fluxo alternativo: nome nulo
1. Retornar erro

> ## Fluxo alternativo: nome já existente
2. Retornar erro