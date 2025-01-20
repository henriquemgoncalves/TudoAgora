import React, { useEffect, useState } from 'react'
import '../styles/components/news.sass'

const getCategoriesTwo = [
    {
        slug: "technology",
        title: "Tecnologia"
    },
    {
        slug: "politics",
        title: "Política"
    },
]

const NewsTwo = () => {
    const [getNewsTwo, setGetNewsTwo] = useState([]);

    useEffect(() => {
        const fetchAllNews = async () => {
            const storedNewsTwo = JSON.parse(localStorage.getItem('newsCategoriesTwo')) || [];
            const cacheTwoTimestamp = localStorage.getItem('newsCategoriesTwoTimestamp');
            const now = Date.now();

            if (cacheTwoTimestamp && now - cacheTwoTimestamp < 8 * 60 * 60 * 1000) {
                setGetNewsTwo(storedNewsTwo);
                return;
            }

            const missingCategories = getCategoriesTwo.filter((category) => !storedNewsTwo.find((news) => news.category === category.title));

            try {
                const fetchedNewsTwo = await Promise.all(
                    missingCategories.map(async (category) => {
                        const response = await fetch(`https://newsdata.io/api/1/latest?country=br&size=6&category=${category.slug}&apikey=pub_65533d7611bfbf6b839fecea4417f3b4133db`);
                        const data = await response.json();

                        const filteredResults = (data.results || []).filter(newsItem => newsItem.image_url);

                        return { category: category.title, results: filteredResults };
                    })
                );

                const updatedNews = [...storedNewsTwo, ...fetchedNewsTwo];
                localStorage.setItem('newsCategoriesTwo', JSON.stringify(updatedNews));
                localStorage.setItem('newsCategoriesTwoTimestamp', now);
                setGetNewsTwo(updatedNews);

            } catch (error) {
                console.log('Erro ao buscar dados: ', error);
            }
        };

        fetchAllNews();
    }, []);

    return (
        <section id='news'>
            {getNewsTwo.length > 0 ? (
                getNewsTwo.map((categoryData, index) => (
                    <div key={index} className='category-section'>
                        <h1>{categoryData.category}</h1>
                        <div className='container'>
                            {categoryData.results && categoryData.results.length > 0 ? (
                                categoryData.results.map((newsItem, newsIndex) => (
                                    <div className="item" key={newsIndex}>
                                        <a href={newsItem.link} target='_blank'>
                                            <img src={newsItem.image_url} alt='Imagem Noticia' />
                                            <h3>{newsItem.title}</h3>
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p>Sem notícias para exibir.</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>Carregando Notícia...</p>
            )}
        </section>
    );
};

export default NewsTwo;