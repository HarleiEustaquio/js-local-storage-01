class Imovel {
    constructor(id, tipo, endereco, valor, status) {
        this._id = id;
        this._tipo = tipo;
        this._endereco = endereco;
        this._valor = valor;
        this._status = status;
    }

    get id() {
        return this._id;
    }

    get tipo() {
        return this._tipo;
    }

    get endereco() {
        return this._endereco;
    }

    get valor() {
        return this._valor;
    }

    get status() {
        return this._status;
    }

    set tipo(tipo) {
        this._tipo = tipo;
    }

    set endereco(endereco) {
        this._endereco = endereco;
    }

    set valor(valor) {
        this._valor = valor;
    }

    set status(status) {
        this._status = status;
    }
}

document.getElementById('imovelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const endereco = document.getElementById('endereco').value;
    const valor = document.getElementById('valor').value;
    const status = document.getElementById('status').value;

    const id = new Date().getTime();
    const imovel = new Imovel(id, tipo, endereco, valor, status);

    cadastrarImovel(imovel);
    displayImoveis();
    this.reset();
});

function cadastrarImovel(imovel) {
    const imoveis = JSON.parse(localStorage.getItem('imoveis')) || [];
    imoveis.push(imovel);
    localStorage.setItem('imoveis', JSON.stringify(imoveis));
}

function listarImoveis() {
    return JSON.parse(localStorage.getItem('imoveis')) || [];
}

function displayImoveis() {
    const imoveis = listarImoveis();
    const imoveisDiv = document.getElementById('imoveis');
    imoveisDiv.innerHTML = '';

    imoveis.forEach(imovel => {
        const imovelDiv = document.createElement('div');
        imovelDiv.classList.add('imovel');
        imovelDiv.innerHTML = `
            <div>
                <strong>Tipo:</strong> ${imovel._tipo}<br>
                <strong>Endereço:</strong> ${imovel._endereco}<br>
                <strong>Valor:</strong> ${imovel._valor}<br>
                <strong>Status:</strong> ${imovel._status}
            </div>
            <button onclick="excluirImovel(${imovel._id})">Excluir</button>
        `;
        imoveisDiv.appendChild(imovelDiv);
    });
}

function excluirImovel(id) {
    let imoveis = listarImoveis();
    imoveis = imoveis.filter(imovel => imovel._id !== id);
    localStorage.setItem('imoveis', JSON.stringify(imoveis));
    displayImoveis();
}

document.addEventListener('DOMContentLoaded', displayImoveis);
