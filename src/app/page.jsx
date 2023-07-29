'use client';

import Image from 'next/image';
// import React, { useState } from 'react';
import React, { useState } from 'react';
import axios from 'axios';
export default function Home() {
  const [url, setUrl] = useState();
  const [shortUrl, setShortUrl] = useState('');

  const onSubmit = async () => {
    console.log('urlll:', url);
    await axios
      .post(
        'https://url-shortener-backend-9kai.onrender.com/shorten',
        {
          url: url,
        },
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((res) => {
        setShortUrl(
          `https://url-shortener-backend-9kai.onrender.com/${res.data.shortCode}`
        );
        console.log('frontend axios call', res.data.shortCode);
      })
      .catch((err) => console.error('error', err));
  };

  return (
    <div className='grid h-screen place-items-center'>
      <div className='border p-20 rounded-md'>
        <h1>URL Shortener</h1>
        <input
          className='p-[10px] my-[10px] text-black rounded-md'
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Enter URL'
        />
        <button
          onClick={onSubmit}
          className='bg-[#ffc0c0] text-black p-[10px] m-[10px] rounded-md'
        >
          Shorten
        </button>
        <br />
        <a href={shortUrl} target='_blank'>
          {shortUrl}
        </a>
        <p>Click again to get the shortened link.</p>
      </div>
    </div>
  );
}
