'use strict'
document.addEventListener( 'DOMContentLoaded', function() {

	async function formSend(event) {
		event.preventDefault();

    console.log('Сабмит на форме -> ', event.target.closest('.reg-form').id);
    
    let form = event.target.closest('.reg-form');

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			body.classList.add('js-sending');
			let response = await fetch('', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
        //console.log(response);
        
//				let result = await response.json();
        body.classList.remove('js-sending');
        if (form === stepOne) {
          console.log('Вызываем ШАГ 2!');          
        }
        if (form === stepTwo) {
          console.log('сообщение что все ок');          
        }        
//				console.log(result.message);        
			} else {
        body.classList.remove('js-sending');
        if (form === stepOne) {
          console.log('Сообщение что ошибка на ШАГЕ 1!');          
          stepOne.style = 'display: none';
          stepTwo.style = '';
          stepTwo.addEventListener('submit', formSend);
        }
        if (form === stepTwo) {
          console.log('Сообщение что ошибка на ШАГЕ 2!');          
        }
			}
		}

	}


	function formValidate(form) {
		let error = 0;
		let formReq = form.querySelectorAll('.js-req');
    function formRemoveErrorFocus(event) {
      formRemoveError(event.target);
      removeEventListener('focus', formRemoveErrorFocus);
    }

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];

			formRemoveError(input);
      switch (input.id) {
        case 'email':
          if (emailTest(input)) {
            formAddError(input, 'E-mail должен быть непустым и корректным.');
            input.addEventListener('focus', formRemoveErrorFocus);
            error++;
          }          
          break;
      
        case 'confirm': 
          if (!input.checked) {
            formAddError(input, 'Для продолжения вы должны согласиться с условиями.');
            input.addEventListener('focus', formRemoveErrorFocus);
            error++;
          }          
          break;

        case 'password': 
          if (input.value ==='') {
            formAddError(input, 'Пароль должен быть не пустым.');
            input.addEventListener('focus', formRemoveErrorFocus);
            error++;
          }
          break;

        case 'passwordConfirm': 
          if (input.value !== form.querySelector('#password').value) {
            formAddError(input, 'Введенные паролли должны совпадать.');
            input.addEventListener('focus', formRemoveErrorFocus);
            error++;
          }
          break;

        default:
          if (input.value === '') {
            formAddError(input, 'Поле ввода не может быть пустым.');
            input.addEventListener('focus', formRemoveErrorFocus);
            error++;
          }
          break;
      }
		}
		return error;
	}
	function formAddError(input, message) {
		input.classList.add('js-error');
    let errorElement = document.createElement('div');
    errorElement.classList = 'reg-form__error';
    errorElement.innerHTML = message;
    input.parentNode.append(errorElement);
	}
	function formRemoveError(input) {
		input.classList.remove('js-error');
    let errors = [...input.parentNode.querySelectorAll('.reg-form__error')];
    errors.forEach((item) => {
      item.remove();
    });
	}
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

  const da = new DynamicAdapt("max");  
  const stepOne = document.getElementById('step1');
  const stepTwo = document.getElementById('step2');
  const body = document.body;

  da.init();
	stepOne.addEventListener('submit', formSend);  
  menuSlide({
    addHeaderPadding: true,
  });
});