# CheckLimitDate Usecase

> ## Dados:
* ID da tarefa

> ## Fluxo primario:
1. Obter dados da tarefa (data limite para conclusão da tarefa)
2. Retornar status "atrasada" se a data limite for menor que a data atual

> ## Fluxo de exceção: Tarefa não encontrada
1. Retornar erro "tarefa não encontrada"

> ## Fluxo de exceção: Tarefa não pertence ao usuário
1. Retornar erro "tarefa não pertence ao usuário"

> ## Fluxo alternativo: Data limite maior que a data atual
2. Retornar status "pendente" se a data limite for maior que a data atual

> ## Fluxo alternativo: Data limite não definida
2. Retornar status "sem data limite" se a data limite não estiver definida



