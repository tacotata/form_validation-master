//es5버전

function MyForm() {
  this.init()
  this.bindingEvent()
}

//프로토타입에 등록

MyForm.prototype.init = function () {
  this.form = $('#myForm')
  this.btnSubmit = this.form.find('input[type=submit]')
}
MyForm.prototype.bindingEvent = function () {
  this.btnSubmit.on(
    'click',
    function (e) {
      //검증해야하니까 일단 submit 기본 이벤트 막아
      //isText의 결과값이 false면 전송 중지
      //name 값
      if (!this.isTxt('userid', 5)) e.preventDefault()
      if (!this.isTxt('comments', 10)) e.preventDefault()
      if (!this.isEmail('email', 10)) e.preventDefault()
      if (!this.isCheck('gender')) e.preventDefault()
      if (!this.isCheck('hobby')) e.preventDefault()
      if (!this.isSelect('edu')) e.preventDefault()
      if (!this.isPwd('pwd1', 'pwd2', 5)) e.preventDefault()
    }.bind(this),
  )
}

//text 인증 , 이메일 @들어가야함 , 체크 인증 ,비밀번호 어려워 글자수 숫자 특수문자
//텍스트 항목 인증 메서드
MyForm.prototype.isTxt = function (name, len) {
  //userid value 가 공백이거나 길이가 5보다 작거나 같으면  false
  if (len === undefined) len = 5
  const txt = $(`[name=${name}]`).val()
  $(`[name=${name}]`).parent().find('p').remove()
  //이걸 if문 위에  놔두면 안되나?
  if (txt.length >= len) {
    // $(`[name=${name}]`).parent().find('p').remove()
    return true
  } else {
    // $(`[name=${name}]`).parent().find('p').remove()
    $(`[name=${name}]`)
      .parent()
      .append(`<p>텍스트를 ${len}글자 이상 입력하세요</p>`)

    return false
  }
}

//이메일 항목 인증 메서드
MyForm.prototype.isEmail = function (name, len) {
  $(`[name=${name}]`).parent().find('p').remove()
  //이걸 if문 위에  놔두면 안되나?
  if (len === undefined) len = 10
  const txt = $(`[name=${name}]`).val()

  if (txt.length >= len && /@/.test(txt)) {
    return true
  } else {
    $(`[name=${name}]`)
      .parent()
      .append(`<p>이메일을 ${len}글자 이상 @를 포함해서 입력하세요</p>`)
    return false
  }
}

//체크 항목 인증
MyForm.prototype.isCheck = function (name) {
  const isCheck = $(`[name=${name}]`).is(':checked')

  if (isCheck) {
    $(`[name=${name}]`).parent().find('p').remove()
    return true
  } else {
    $(`[name=${name}]`).parent().find('p').remove()
    $(`[name=${name}]`).parent().append(`<p>필수 입력사항을 체크해주세요</p>`)
    return false
  }
}

//select  항목 인증 메서드
MyForm.prototype.isSelect = function (name) {
  const sel = $(`select[name=${name}]`).children('option:selected').val()

  if (sel !== '') {
    $(`select[name=${name}]`).parent().find('p').remove()
    return true
  } else {
    $(`select[name=${name}]`).parent().find('p').remove()
    $(`select[name=${name}]`)
      .parent()
      .append(`<p>필수 입력사항을 체크해주세요</p>`)
    return false
  }
}

//패스워드 인증
MyForm.prototype.isPwd = function (name1, name2, len) {
  const pwd1 = $(`[name=${name1}]`).val()
  const pwd2 = $(`[name=${name2}]`).val()

  const num = /[0-9]/
  const eng = /[a-zA-Z]/
  const spc = /[-!@#$%^&*()_+{}\[\]]/

  if (
    pwd1 === pwd2 &&
    pwd1.length > len &&
    num.test(pwd1) &&
    eng.test(pwd1) &&
    spc.test(pwd1)
  ) {
    $(`[name=${name1}]`).parent().find('p').remove()
    return true
  } else {
    $(`[name=${name1}]`).parent().find('p').remove()
    $(`[name=${name1}]`)
      .parent()
      .append(
        `<p>비밀번호는 ${len}글자 이상, 숫자 영문 특수문자를 모두 포함해서 동일하세 입력하세요</p>`,
      )
    return false
  }
}
