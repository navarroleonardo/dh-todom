const { Tarefa } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
    index: async (req, res) => {

        // Verificando se o req tem a autenticação
        if (!req.headers.authentication) {
            res.status(403).json({ error: "Token não existente" });
        }

        // Capturando o token do header
        const token = req.headers.authentication.substr(7);

        // Validando o token
        jwt.verify(token, "segredo", function (err) {
            if (err) {
                return res.status(401).json({ erro: err.message });
            }
        });

        // Capturar usuario do token
        const { usuario } = jwt.decode(token);

        // Levantar as tarefas do usuário
        let tarefas = await Tarefa.findAll({ where: { usuario_id: usuario.id } });

        // Retornar o array de tarefas
        return res.status(200).json(tarefas);
    }
}