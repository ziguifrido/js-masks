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

    var sum = 0
        
    for (var i = 1; i <= 9; i++) sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i)
    var rest = (sum * 10) % 11

    if ((rest == 10) || (rest == 11))  rest = 0
    if (rest != parseInt(value.substring(9, 10)) ) return false

    sum = 0
    for (var i = 1; i <= 10; i++) sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i)
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
         
    var size = value.length - 2
    var numbers = value.substring(0, size)
    var digits = value.substring(size)
    var sum = 0
    var pos = size - 7

    for (var i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--
      if (pos < 2) pos = 9
    }

    var result = sum % 11 < 2 ? 0 : 11 - sum % 11
    if (result != digits.charAt(0)) return false
         
    size += 1
    numbers = value.substring(0, size)
    sum = 0
    pos = size - 7

    for (var i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--
      if (pos < 2) pos = 9
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11
    return result != digits.charAt(1) ? false : true
}

export { validateCpf, validateCnpj }