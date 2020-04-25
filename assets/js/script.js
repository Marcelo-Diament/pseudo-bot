window.onload = () => {

    const init = () => {
        initialInteraction();
    };

    const historico = $('#historico'),
        respostas = [];

    let delay = 500;

    const interaction = (question, info, next) => {
        setTimeout(() => {
            historico.append(`
                        <li class="bot">${question}</li>
                    `);
            respostas[`${info}`] = prompt(question);
            historico.append(`
                        <li class="user">${respostas[`${info}`]}</li>
                    `);
            if(respostas[`${info}`]) next();
        }, delay);
        delay += 500;
        console.log(respostas);
        return respostas;
    }

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

    const secondInteraction = () => interaction(`E quantos anos você tem ${respostas['nome']}?`, 'idade');

    init();

};