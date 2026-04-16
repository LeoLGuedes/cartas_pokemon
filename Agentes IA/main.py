import os
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process, LLM

load_dotenv()

llm = LLM(
    model="openrouter/deepseek/deepseek-r1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)

# ── Agentes ────────────────────────────────────────────────────────────────

analista_logica = Agent(
    role="Analista de Lógica Sênior",
    goal=(
        "Analisar o código fornecido em profundidade, identificando falhas de "
        "lógica, edge cases não tratados e problemas no fluxo de execução."
    ),
    backstory=(
        "Você é um engenheiro de software com mais de 15 anos de experiência "
        "em revisão de código. Sua especialidade é encontrar bugs sutis que "
        "passam despercebidos em code reviews comuns. Você pensa em termos de "
        "estruturas de dados, invariantes e contratos de função."
    ),
    llm=llm,
    verbose=True,
)

engenheiro_qa = Agent(
    role="Engenheiro de QA e Debugging",
    goal=(
        "Receber a análise do Analista de Lógica, confirmar os bugs encontrados, "
        "identificar problemas adicionais de sintaxe ou execução e reescrever o "
        "código corrigido de forma otimizada."
    ),
    backstory=(
        "Você é um engenheiro de QA meticuloso que não deixa nenhum bug escapar. "
        "Além de validar os problemas apontados pela análise lógica, você testa "
        "mentalmente cada linha buscando erros de sintaxe, tipagem, importações "
        "faltantes e problemas de compatibilidade. Ao final, você entrega o "
        "código corrigido e pronto para produção."
    ),
    llm=llm,
    verbose=True,
)

# ── Tarefas ────────────────────────────────────────────────────────────────

codigo_para_analise = """
def calcular_media(notas):
    soma = 0
    for nota in notas:
        soma += nota
    media = soma / len(notas)
    return media

def classificar_aluno(media):
    if media >= 7:
        return "Aprovado"
    elif media >= 5:
        return "Recuperação"
    else:
        return "Reprovado"

resultado = calcular_media([])
print(classificar_aluno(resultado))
"""

tarefa_analise = Task(
    description=(
        f"Analise o seguinte código Python e identifique TODOS os problemas "
        f"de lógica, edge cases e possíveis erros de execução:\n\n"
        f"```python\n{codigo_para_analise}\n```\n\n"
        f"Para cada problema encontrado, explique:\n"
        f"1. Qual é o problema\n"
        f"2. Em qual linha ele ocorre\n"
        f"3. Qual o impacto (erro de execução, resultado incorreto, etc.)\n"
        f"4. Sugestão de correção"
    ),
    expected_output=(
        "Um relatório detalhado listando todos os bugs e falhas de lógica "
        "encontrados, com explicações claras e sugestões de correção."
    ),
    agent=analista_logica,
)

tarefa_correcao = Task(
    description=(
        "Com base na análise de bugs recebida do Analista de Lógica, faça o seguinte:\n"
        "1. Confirme cada bug reportado (concordando ou discordando com justificativa)\n"
        "2. Identifique qualquer bug adicional que não tenha sido mencionado\n"
        "3. Reescreva o código completamente corrigido e otimizado\n"
        "4. Adicione comentários explicando cada correção feita"
    ),
    expected_output=(
        "O código Python completamente corrigido, com comentários explicando "
        "cada correção, seguido de um resumo das mudanças realizadas."
    ),
    agent=engenheiro_qa,
)

# ── Crew ───────────────────────────────────────────────────────────────────

crew = Crew(
    agents=[analista_logica, engenheiro_qa],
    tasks=[tarefa_analise, tarefa_correcao],
    process=Process.sequential,
    verbose=True,
)

if __name__ == "__main__":
    print("=" * 60)
    print("  Bug Hunter AI — Análise e Correção de Código")
    print("=" * 60)
    resultado = crew.kickoff()
    print("\n" + "=" * 60)
    print("  RESULTADO FINAL")
    print("=" * 60)
    print(resultado)
