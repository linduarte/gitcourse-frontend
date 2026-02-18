document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const resultDiv = document.getElementById("result");
    const API_URL = "http://127.0.0.1:8000"; // backend local

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        resultDiv.innerText = ""; // limpa mensagens anteriores

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // salva token
                localStorage.setItem("access_token", data.access_token);

                // redireciona para topics.html (um nível acima de /auth/)
                window.location.href = "../topics.html";
                return;
            }

            // tratamento de erro elegante
            if (Array.isArray(data.detail)) {
                resultDiv.innerText = "Erro: " + data.detail[0].msg;
            } else if (typeof data.detail === "string") {
                resultDiv.innerText = "Erro: " + data.detail;
            } else {
                resultDiv.innerText = "Erro ao fazer login.";
            }

        } catch (error) {
            console.error("Erro inesperado:", error);
            resultDiv.innerText = "Erro inesperado ao conectar ao servidor.";
        }
    });
});
