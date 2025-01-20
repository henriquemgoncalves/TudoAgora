import React, { useEffect, useState } from 'react'
import '../styles/components/news.sass'

const getCategories = [
    // {
    //     slug: "entertainment", 
    //     title: "Entretenimento"
    // },
    {
        slug: "sports", 
        title: "Esportes"
    },
    // {
    //     slug: "health", 
    //     title: "Saúde" 
    // },
]

const News = () => {

    const [getNews, setGetNews] = useState([]);

    useEffect(() => {
        const fetchAllNews = async() => {

            const storedNews = JSON.parse(localStorage.getItem('newsCategories')) || [];
            const cacheTimestamp = localStorage.getItem('newsCategoriesTimestamp');
            const now = Date.now()

            if(cacheTimestamp && now - cacheTimestamp < 8 * 60 * 60 * 1000){
                setGetNews(storedNews);
                return;
            }

            const missingCategories = getCategories.filter((category) => !storedNews.find((news) => news.category === category.title));

            try {
                const fetchedNews = await Promise.all(missingCategories.map(async(category) => {
                    const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category.slug}&lang=pt&country=br&max=9&apikey=3a550c9d9237cdfd4ebc1ff7de5f673f`);

                    const data = await response.json();

                    return {category: category.title, articles: data.articles || []};
                })
            );

            const updatedNews = [...storedNews, ...fetchedNews];
            localStorage.setItem('newsCategories', JSON.stringify(updatedNews));
            localStorage.setItem('newsCategoriesTimestamp', now);
            setGetNews(updatedNews)
            } catch (error) {
                console.log('Erro ao buscar dados: ', error)
            }
        }  

        fetchAllNews();
    },[]);

  return (
    <section id='news'>
        {getNews.length > 0 ? (
            getNews.map((categoryData, index) => (
                <div key={index} className='category-section'>
                    <h1>{categoryData.category}</h1>
                    <div className='container'>
                        {categoryData.articles.map((newsItem, newsIndex) => (
                            <div className="item" key={newsIndex}>
                                <a 
                                    href={newsItem.url} 
                                    target='_blank'
                                >
                                    <img src={newsItem.image} alt='Imagem Noticia'/>
                                    <h3>{newsItem.title}</h3>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ))
        ) : (
            <p>Carregando Notícia...</p>
        )}
    </section>
  )
}

export default News