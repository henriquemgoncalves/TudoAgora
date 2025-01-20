import React, { useState } from 'react'
import '../styles/components/form.sass'

const Form = () => {

    const [status, setStatus] = useState("");
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;

        setStatus("Enviando...");

        const data = new FormData(form);

        try{
            const response = await fetch("https://formspree.io/f/mldeykwk", {
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json",
                },
            });

            if(response.ok){
                setStatus("Mensagem enviada com Sucesso");
                form.reset();
            } else {
                setStatus("Erro ao enviar a mensagem");
            }
        } catch (error){
            setStatus("Erro ao enviar a mensagem");
                console.error("Erro", error);
        }
        ;
    }

  return (
    <section id='form'>
        <form
            id='contact-form'
            onSubmit={handleSubmit}
            >
                <h4>Deixe sua opinião ou sugestão sobre o App.</h4>
                <input 
                    type="text" 
                    name='nome' 
                    placeholder='Nome' 
                    required
                />
                
                <input 
                    type="email" 
                    name="email" 
                    placeholder='E-mail' 
                    required
                />
            
                <textarea 
                    name="message" 
                    placeholder='Mensagem' 
                    required
                ></textarea>

                <button type="submit">Enviar Mensagem</button>
                <p className='status'>{status}</p>
            </form>
    </section>
  )
}

export default Form;