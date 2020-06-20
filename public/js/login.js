const form = document.getElementById('form-login');

form.addEventListener('submit', async (e) => {
    // impedindo a submissão
    e.preventDefault();

    // capturando email e senha
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    let resultado = await login(email, senha);

    if (resultado?.token) {
        const { token } = resultado;
        localStorage.setItem("@todom:token", token);
        getTarefas();
    } else {
        alert("Login inválido!");
    }
});

async function login(email, senha) {

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let response = await fetch('/api/login', {
        method: "POST",
        body: JSON.stringify({ email, senha }),
        headers,
    });

    response = await response.json();

    return response;
}

async function getTarefas() {
    const token = localStorage.getItem("@todom:token");

    let response = await fetch("/api/tarefas", {
        headers: {
            Accept: "application/json",
            Authentication: `Bearer ${token}`,
        },
    });

    response = await response.json();

    console.log(response);
    localStorage.setItem("@todom:tasks", JSON.stringify(response))

    window.location.href = '/';
}
