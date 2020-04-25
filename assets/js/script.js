window.onload = () => {

    const init = () => {
        initialInteraction();
    };

    const historico = $('#historico'),
        respostas = [];

    let delay = 500;

    const interaction = (question, info, next, middleFunction = null) => {
        setTimeout(() => {
            historico.append(`
                        <li class="bot">${question}</li>
                    `);
            respostas[`${info}`] = prompt(question);
            historico.append(`
                        <li class="user">${respostas[`${info}`]}</li>
                    `);
            if (respostas[`${info}`]) {
                if (middleFunction !== null && middleFunction !== undefined) {
                    middleFunction();
                }
                next();
            }
        }, delay);
        return respostas;
    }

    const buscar = termo => {
        $('#historico').append(`
            <li class="bot">
                <h3>Algumas curiosidades sobre ${termo}</h3>
        `);
        fetch(`https://pt.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${termo}`)
            .then(response => response.json())
            .then(data => {
                const resultados = data.query.search;
                for (resultado of resultados) {
                    $('#historico').append(`
                        <h4>${resultado.title}</h4>\n
                        <p>${resultado.snippet}</p>
                    `);
                }
            })
            .catch(() => {
                console.log('Algo de errado não deu certo...')
            })
        $('#historico').append(`</li>`);
    };

    const initialInteraction = () => {
        historico.append(`
            <li class="bot">Nossas boas vindas! Vamos fazer algumas perguntas e então trazer curiosidades a você!</li>
            <li class="bot">Clique em <b>começar</b> para iniciar</li>
            <li class="btn">
                <div class="opcoes-container">
                    <button id="btnComecar">Começar</button>
                </div>
            </li>
        `);
        $('#btnComecar').on('click', () => {
            interaction('Qual seu nome?', 'nome', secondInteraction);
        });

    };

    const secondInteraction = () => interaction(`E quantos anos você tem ${respostas['nome']}?`, 'idade', thirdInteraction);

    const thirdInteraction = () => interaction(`${respostas['nome']}, você já fez aniversário esse ano?`, 'aniversariou', fourthInteraction, anoNascimento);

    const fourthInteraction = () => interaction(`Hmmm... então você nasceu em ${respostas['anoNascimento']}!\nQual seu estilo musical preferido?`, 'preferenciaMusical', fifthInteraction);

    const fifthInteraction = () => buscar(`${respostas['preferenciaMusical']} em ${respostas['anoNascimento']}`);

    const anoNascimento = () => {
        const anoAtual = new Date().getFullYear(),
            idade = respostas['idade'],
            aniversariou = respostas['aniversariou'];
        let anoNascimento;
        anoNascimento = aniversariou.toLowerCase() === 'sim' ? anoAtual - idade : anoAtual - idade - 1;
        respostas['anoNascimento'] = anoNascimento;
        return anoNascimento;
    }




    init();

};