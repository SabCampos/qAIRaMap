const viewLogin =`
<h3 class="white-text center-align">Know your air, become the change</h3>

  <!-- LOGIN FORM -->

  <div class="container">
    <div class="container row">
      <form class="col s8 offset-s2  login">
        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input id="email" type="email" class="validate">
            <label for="email" data-error="wrong" data-success="right">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input id="password" type="password" class="validate">
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
          <div class="center-align">
          <button id="submit-btn" class="btn waves-effect waves-light" >Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
        <div class="chip hide"><i class="material-icons" style="color:red">warning</i>
        La dirección de email o contaseña ingresada es incorrecta.
        <i class="close material-icons close-tag">close</i>
      </div>
        </div>
      </form>
    </div>
  </div>
  
`
const  viewTheLogin = () => {
    const loginElem = document.createElement('div');
    loginElem.innerHTML = viewLogin;

    const loginBtn = loginElem.querySelector('#submit-btn');
    const legendMenu= document.getElementById('legend-menu');
    legendMenu.classList.add('hide');

    const legendMobile = document.getElementById('legend-menu-mobile');
    legendMobile.classList.add('hide');
    
    loginBtn.addEventListener('click', (e)=>{
        e.preventDefault()

        const password = window.btoa(loginElem.querySelector('#password').value);
        const email = window.btoa(loginElem.querySelector('#email').value);

        fetch(`https://qairamapnapi.qairadrones.com/api/login/?email=${email}&password=${password}`)
        .then(res =>res.json())
        .then(res => {
            sessionStorage.setItem('companyID', res.company_id)
            sessionStorage.setItem('companyName', res.company_name)
            
            if (res === 'User and password not valid') {
             const card_alert = loginElem.querySelector('.chip');
             card_alert.classList.remove('hide')
             const close_tag = loginElem.querySelector('.close-tag');
             close_tag.addEventListener('click',()=>window.location.reload())
                
            } else  {
              
              window.location.replace('..#/download');
              window.location.reload();
             
            }

        })
        
        
    })
    return loginElem;
}

export { viewTheLogin };