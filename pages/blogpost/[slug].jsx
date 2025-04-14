import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/BlogPost.module.css';

const Slug = (props) => {
    const [blog,] = useState(props.blog);
    const createMarkup = (content) => {
        return { __html: content };
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>{blog?.title} - Hunting Coder</title>
            </Head>
            <main className={styles.main}>
                <h1>{blog?.title}</h1>
                <hr />
                {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)} className={styles.blog_text}></div>}
            </main>
        </div>
    );
};

const renderBlogPost = async (slug) => {
    let response = await fetch(`${process.env.HOST_URL}/data/${slug}.json`);
    let data = await response.json();
    return data;
};

export const getServerSideProps = async (context) => {
    const { slug } = context.query;
    return {
        props: {
            // Requesting Data When `slug` appears
            blog: await renderBlogPost(slug),
        },
    }
};

export default Slug;
