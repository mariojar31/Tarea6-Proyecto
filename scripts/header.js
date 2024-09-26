const header = document.getElementById('header');

        const fetchHeader = async()=>{
            const response = await fetch('./componentes/header/header.html')
            const data = await response.text()

            header.innerHTML=data;
            
            const fetchCss = await fetch('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css')
            const css = await fetchCss.text()
            const style = document.createElement('style')
            style.textContent=css
            header.appendChild(style)

        }



        fetchHeader()