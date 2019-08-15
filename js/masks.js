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
        return value.length <= 14
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

const validateCpf = (value) => {

    value = value.trim().substring(0, 11)

    if (value == "00000000000" || 
        value == "11111111111" || 
        value == "22222222222" || 
        value == "33333333333" || 
        value == "44444444444" || 
        value == "55555555555" || 
        value == "66666666666" || 
        value == "77777777777" || 
        value == "88888888888" || 
        value == "99999999999")
        return false

    sum = 0
        
    for (i = 1; i <= 9; i++) sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i)
    rest = (sum * 10) % 11

    if ((rest == 10) || (rest == 11))  rest = 0
    if (rest != parseInt(value.substring(9, 10)) ) return false

    sum = 0
    for (i = 1; i <= 10; i++) sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i)
    rest = (sum * 10) % 11

    if ((rest == 10) || (rest == 11))  rest = 0
    return rest != parseInt(value.substring(10, 11)) ? false : true
}

const validateCnpj = (value) => {
 
    value = value.trim().substring(0, 14)
 
    if (value == "00000000000000" || 
        value == "11111111111111" || 
        value == "22222222222222" || 
        value == "33333333333333" || 
        value == "44444444444444" || 
        value == "55555555555555" || 
        value == "66666666666666" || 
        value == "77777777777777" || 
        value == "88888888888888" || 
        value == "99999999999999")
        return false
         
    size = value.length - 2
    numbers = value.substring(0, size)
    digits = value.substring(size)
    sum = 0
    pos = size - 7

    for (i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--
      if (pos < 2) pos = 9
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11
    if (result != digits.charAt(0)) return false
         
    size += 1
    numbers = value.substring(0, size)
    sum = 0
    pos = size - 7

    for (i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--
      if (pos < 2) pos = 9
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11
    return result != digits.charAt(1) ? false : true
}