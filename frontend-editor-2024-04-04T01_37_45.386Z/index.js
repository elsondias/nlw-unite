let participantes = [
    {
        nome: "Elson Dias",
        email: "elson@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 00)
    },
    {
        nome: "Maria Silva",
        email: "maria.silva@example.com",
        dataInscricao: new Date(2024, 3, 10, 14, 30),
        dataCheckIn: new Date(2024, 3, 12, 10, 45)
    },
    {
        nome: "João Oliveira",
        email: "joao.oliveira@example.com",
        dataInscricao: new Date(2024, 3, 15, 18, 55),
        dataCheckIn: new Date(2024, 3, 17, 9, 20)
    },
    {
        nome: "Ana Souza",
        email: "ana.souza@example.com",
        dataInscricao: new Date(2024, 3, 20, 20, 10),
        dataCheckIn: new Date(2024, 3, 22, 11, 35)
    },
    {
        nome: "Pedro Santos",
        email: "pedro.santos@example.com",
        dataInscricao: new Date(2024, 3, 25, 15, 40),
        dataCheckIn: new Date(2024, 3, 27, 13, 15)
    },
    {
        nome: "Juliana Lima",
        email: "juliana.lima@example.com",
        dataInscricao: new Date(2024, 4, 2, 10, 20),
        dataCheckIn: new Date(2024, 4, 4, 8, 55)
    },
    {
        nome: "Rafaela Pereira",
        email: "rafaela.pereira@example.com",
        dataInscricao: new Date(2024, 4, 7, 17, 15),
        dataCheckIn: new Date(2024, 4, 9, 12, 30)
    },
    {
        nome: "Fernando Costa",
        email: "fernando.costa@example.com",
        dataInscricao: new Date(2024, 4, 12, 21, 50),
        dataCheckIn: new Date(2024, 4, 14, 14, 25)
    },
    {
        nome: "Carla Vieira",
        email: "carla.vieira@example.com",
        dataInscricao: new Date(2024, 4, 18, 12, 40),
        dataCheckIn: new Date(2024, 4, 20, 9, 10)
    },
    {
        nome: "Lucas Almeida",
        email: "lucas.almeida@example.com",
        dataInscricao: new Date(2024, 4, 22, 9, 30),
        dataCheckIn: new Date(2024, 4, 24, 16, 45)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now())
        .to(participante.dataInscricao)

    let dataCheckIn = dayjs(Date.now())
        .to(participante.dataCheckIn)

    if (participante.dataCheckIn == null) {
        dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
    }

    return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
    let output = ""
    for (let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }

    // substituir informação do HTML
    document
        .querySelector('tbody')
        .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    // verificar se o particpante já existe
    const participanteExiste = participantes.find(
        (p) => p.email == participante.email
    )

    if (participanteExiste) {
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    // limpar o formulario
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    // confirmar se realmente quer o check-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

    if (confirm(mensagemConfirmacao) == false) {
        return
    }

    // encontrar o participante dentro da lista
    const participante = participantes.find(
        (p) => p.email == event.target.dataset.email
    )

    // atualizar o check-in do participante
    participante.dataCheckIn = new Date()

    // atualizar a lista de participantes
    atualizarLista(participantes)
}