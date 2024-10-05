const footer = document.getElementById('addItem');
    const fetchFooter = async()=>{
        const response = await fetch('./addNewItem.html')
        const data = await response.text()

        const shadowRoot = footer.attachShadow({mode:"open"})
        
        shadowRoot.innerHTML=data;

        const fetchCss = await fetch('./styles/admin.css')
        const css = await fetchCss.text()
        const style = document.createElement('style')
        style.textContent=css
        shadowRoot.appendChild(style)

    }

    fetchFooter()