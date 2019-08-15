const masks = {
    // CPF: 999.999.999-99
    cpf (value, $input) {

        var cpf = value.replace(/\D/g, '').trim()

        if (cpf.length >= 11){
            $input.className = $input.className
                .replace("isok", "")
                .replace("isnotok", "")
                .trim()
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
                .replace("isnotok", "")
                .trim()
                .concat(
                    validateCnpj(cnpj) ? " isok"  : " isnotok") 
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
        return false;

    var Soma = 0;
    var Resto;
        
    for (i=1; i<=9; i++) Soma = Soma + parseInt(value.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(value.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(value.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(value.substring(10, 11) ) ) return false;
    return true;
}

const validateCnpj = (value) => {
 
    value = value.trim().substring(0, 14)
 
    // Elimina CNPJs invalidos conhecidos
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
        return false;
         
    // Valida DVs
    tamanho = value.length - 2
    numeros = value.substring(0,tamanho);
    digitos = value.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = value.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}