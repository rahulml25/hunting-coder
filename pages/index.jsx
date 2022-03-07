import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';


const Home = (props) => {
  const [blogs,] = useState(props.blogs);

  return (
    <div className={styles.container}>
      <Head>
        <title>Hunting Coders</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="keywords" content="nextjs, hunting coder, hunting coder blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles['image-wrap']}>
          <Image src="/coder.jpg" className={styles['home-coder-img']} width={157} height={157} />
        </div>

        <h1 className={styles.title}>
          <span className="greating-span dummy">
            {"<Hunting Coders/>"}
          </span>
        </h1>

        <div className="blogs">
          <h2 className={styles.h2}>Latest Blogs</h2>

          {blogs.map((blog, idx) =>
            <div className={styles.blogItem} key={`blog_${idx}`}>
              <Link href={`/blogpost/${blog.slug}`}>
                <h3 className={`${styles.link} ${styles.h3}`}>{blog.title}</h3>
              </Link>

              <p className={styles.metadesc}>
                {String(blog.metadesc).slice(0, 200)}{'...'}
              </p>

              <div className={styles.buttons}>
                <Link href={`/blogpost/${blog.slug}`}>
                  <button className={styles.readmore_button}>Read More</button>
                </Link>
              </div>

            </div>
          )}

        </div>
      </main>

      <footer className={styles.footer} />
    </div>
  );
};

const renderBlogs = async () => {
  let response = await fetch(`${process.env.HOST_URL}/api/blogs/`);
  let data = await response.json();
  return data;
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      blogs: await renderBlogs(),
    },
  }
};

export default Home;
