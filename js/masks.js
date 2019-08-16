import { validateCpf, validateCnpj } from "./validators.js"

const masks = {
    // CPF: 999.999.999-99
    cpf (value, $input) {
        var cpf = value.replace(/\D/g, '').trim()
        if (cpf.length >= 11){
            $input.className = $input.className
                .replace("isok", "")
                .replace("isnotok", "").trim()
                .concat(validateCpf(cpf) ? " isok" : " isnotok") 
        } else {
            $input.className = $input.className
                .replace("isok", "")
                .replace("isnotok", "").trim()
        }

        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')
            .replace(/(-\d{2})(\d)/, '$1')
    },

    // CNPJ: 99.999.999/9999-99
    cnpj (value, $input) {
        var cnpj = value.replace(/\D/g, '').trim()
        if (cnpj.length >= 14){
            $input.className = $input.className
                .replace("isok", "")
                .replace("isnotok", "").trim()
                .concat(validateCnpj(cnpj) ? " isok"  : " isnotok") 
        } else {
            $input.className = $input.className
                .replace("isok", "")
                .replace("isnotok", "").trim()
        }

        return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})(\d)/, '$1')
    },

    cpfcnpj (value, $input) {
        return value.trim().length <= 14
            ? this.cpf(value, $input)
            : this.cnpj(value, $input)
    },

    // Telefone: (99)9 9999-9999 / (99)9999-9999
    phone (value, $input) {
        return value.replace(/\D/g, '').trim().length > 10
            ? value.replace(/\D/g, '')
                .replace(/(\d{2})/, '($1')
                .replace(/(\d{2})(\d)/, '$1)$2')
                .replace(/(\)\d)(\d)/, '$1 $2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .replace(/(-\d{4})(\d)/, '$1')
            : value.replace(/\D/g, '')
                .replace(/(\d{2})/, '($1')
                .replace(/(\d{2})(\d)/, '$1)$2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .replace(/(-\d{4})(\d)/, '$1')
    }
}

document.querySelectorAll('input').forEach(($input) => {
    const field = $input.dataset.js

    $input.addEventListener('input', (e) => {
        e.target.value = masks[field](e.target.value, $input)
    }, false)
})

