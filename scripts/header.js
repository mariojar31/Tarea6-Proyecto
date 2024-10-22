const header = document.getElementById('header');

        const fetchHeader = async()=>{
            
            const log = sessionStorage.getItem('log');
            const dataLog = JSON.parse(log);
            
            addEventListener('DOMContentLoaded',()=>{
                const userName = document.getElementById('userName');

                if(userName){
                    console.log("ENtro")
                    userName.innerText=dataLog.name;
                }
            })
            

            const response = await fetch(`./componentes/header/${dataLog && dataLog.rol=="Administrador"?"headerAdmin": dataLog && dataLog.rol=="Estudiante"?"headerUser":"header"}.html`)

            const data = await response.text()

            header.innerHTML=data;
            
            const fetchCss = await fetch('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css')
            const css = await fetchCss.text()
            const style = document.createElement('style')
            style.textContent=css
            header.appendChild(style)

        }

        const logout = ()=>{
            sessionStorage.removeItem('log');
            window.location.href = 'login.html'
        }


        fetchHeader()