const footer = document.getElementById('footer');
    const fetchFooter = async()=>{
        const response = await fetch('./componentes/footer/footer.html')
        const data = await response.text()

        const shadowRoot = footer.attachShadow({mode:"open"})
        
        shadowRoot.innerHTML=data;

        const fetchCss = await fetch('./componentes/footer/style.css')
        const css = await fetchCss.text()
        const style = document.createElement('style')
        style.textContent=css
        shadowRoot.appendChild(style)

    }

    fetchFooter()