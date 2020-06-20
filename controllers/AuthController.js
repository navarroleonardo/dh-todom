const { Usuario } = require("../models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    login: async (req, res) => {

        // Lendo dados do vorpo da requisição
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: "Email ou senha em branco" });
        }

        // Encontrando o usuário com o email passado
        const usuario = await Usuario.findOne({ where: { email } })

        if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
            return res.status(403).json({ error: "Usuário não autorizado" });
        }

        // Removendo hash de usuário
        usuario.senha = undefined;

        // Criando o token
        let token = jwt.sign({ usuario }, "segredo", { expiresIn: 5 * 60 });

        // Retornando as info do usuário com o token
        return res.json({ usuario, token })
    }
}