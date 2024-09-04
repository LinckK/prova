
let usuarios = [];
let usuariosVisiveis = true;

function adicionarUsuario(nome, idade, email) {
    if (!nome || !idade || !email) {
        alert('Todos os campos devem ser preenchidos.');
        return;
    }

    if (idade <= 0) {
        alert('A idade deve ser um número maior que 0.');
        return;
    }else if (idade >= 110) {
        alert('A idade deve ser um número menor que 110.');
        return;
    }

    const usuario = {
        nome: nome,
        idade: idade,
        email: email
    };

    usuarios.push(usuario);
    listarUsuarios();
}


function listarUsuarios() {
    const usuariosList = document.getElementById('usuariosList');
    const searchTerm = document.getElementById('search').value.toLowerCase();

    usuariosList.innerHTML = '';

    if (usuarios.length === 0) {
        usuariosList.innerHTML = '<li>Nenhum usuário cadastrado.</li>';
        return;
    }

    const filteredUsuarios = usuarios.filter(usuario => 
        usuario.nome.toLowerCase().includes(searchTerm)
    );

    if (filteredUsuarios.length === 0) {
        usuariosList.innerHTML = '<li>Nenhum usuário encontrado com esse nome.</li>';
    } else {
        filteredUsuarios.forEach((usuario, index) => {
            if (usuariosVisiveis) {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. Nome: ${usuario.nome}, Idade: ${usuario.idade}, Email: ${usuario.email}`;
                usuariosList.appendChild(li);
            }
        });
    }
}


document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value, 10);
    const email = document.getElementById('email').value;

    adicionarUsuario(nome, idade, email);
    this.reset();
});

document.getElementById('search').addEventListener('input', listarUsuarios);

document.getElementById('toggleVisibility').addEventListener('click', function() {
    usuariosVisiveis = !usuariosVisiveis;
    this.textContent = usuariosVisiveis ? 'Ocultar Usuários' : 'Mostrar Usuários';
    listarUsuarios();
});
