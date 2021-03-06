

window.onload = () => {
    document.querySelector('#SuperForm').addEventListener('submit', evt => {
     
        let valid = new Validator('SuperForm');
        
        if(!valid.valid)
        {
            evt.preventDefault();
        }
    })
}

class Validator {
    constructor (form) {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/
        }

        this.errors = {
            name: 'Имя содержит только буквы',
            phone: 'Шаблон телефона +7(000)000-0000',
            email: 'Шаблон e-mail mymail@mail.ru, my.mail@mail.ru, my-mail@mail.ru'
        }

        this.errorClass = 'error-msg'
        this.form = form
        this.valid = false
        this._validateForm ()
    }

    _validateForm () {
        let errors = [... document.getElementById(this.form).querySelectorAll (`.${this.errorClass}`)]
        for (let error of errors) {
            error.remove ()
        }

        let formFields = [... document.getElementById(this.form).querySelectorAll ('input')]
        formFields.forEach (el => {this._validateField (el)})

        if (![... document.getElementById(this.form).querySelectorAll ('.invalid')].length) {
            this.valid = true
        }
    }

    _validateField (field) {
        if (this.patterns [field.name]) {
            if (!this.patterns [field.name].test (field.value)) {
                field.classList.add ('invalid')
                this._addErrorMsg (field)
                this._watchField (field)
            }
        }
    }

    _addErrorMsg (field) {
        let err = `<div class="${this.errorClass}">${this.errors [field.name]}</div>`
        field.parentNode.insertAdjacentHTML ('beforeend', err)
    }

    _watchField (field) {
        field.addEventListener ('input', () => {
            let error = field.parentNode.querySelector (`.${this.errorClass}`)
            if (this.patterns [field.name]) {
                if (this.patterns [field.name].test (field.value)) {
                    field.classList.remove ('invalid')
                    field.classList.add ('valid')
                    if (error) error.remove ()
                } else {
                    field.classList.remove ('valid')
                    field.classList.add ('invalid')
                    if (!error) this._addErrorMsg (field)
                }
            }
        })
    }
}



