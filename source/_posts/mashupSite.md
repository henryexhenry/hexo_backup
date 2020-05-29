---
title: mashupSite
date: 2020-05-25 16:09:36
tags: 
    - Django
    - SEO
categories: record
---

This is a team project about developing a web application of introduction of Marvel characters. The technologies we used are **Django** for web dev, **beautifulsoup** for parsing html, **Bootstrap** for frontend design and **json** for storage, **Google Statistic** for SEO.

<!--more-->

<p align="center">
    <img src="https://i.loli.net/2019/09/28/O2rgluRnKFBiqmD.png" width="400" height="400" />
</p>

## Problem statement

- choosing technologies
- techniques of web crawling
- indexing by google in the first page result

## Design and implementation

- Architechture of our mashup

  ![architecture of the mashup page.png](https://i.loli.net/2019/09/28/QpLcz8hZw46O9Nn.png)

  The home page is a mashup of differnt kinds of information. and we have specific categories for displaying only one kind of data.

  In the home page and hero page, we implemmented a voting function. Users can vote a superhero if user think that the hero will appear in Avengers 4 movie.

- Infomation collecting techniques
  - Web crawling

    ![DataCollection.png](https://i.loli.net/2019/09/28/SQO3fqRWby6FjtH.png)

    We used requests package to send HTTP request for getting html text from the target website, than we leverage beautifulsoup to parse the html text into html object, it helps us to locate the information we want.

    Once we found the desire information, we store it into a json file, such that we finish collecting web information

    - APIs introduction

        Some sources provide their own APIs, it saved our time on locating target information. In this project, we have used youtube, and marvel.com APIs.

      - Marvel.com API
        - apply for an account, get public key, private key
        - sum = random num + 2 keys
        - hash by md5 algorithm
        - concatenate all the above information into url
      - Youtube API
        - connect to youtube iframe_api server
        - input the video_id

- Techniques uesd to show the data
  - Data flow inside the webapp
    - We collect information from sources like rotten tomato, Marvel.com and Youtube into Json file for storage
    - We use service to manipulate the data and choose the data that we need
    - The Views will receive the data, it decide what data can be shown in template,
    - The template decide how the data display on the screen
  - Data display techniques
    - Bootstrap give us powerful library for beautiful and neat UI layout.
    - Card element and
    - Popup function in bootstrap
- Web server setup and web page development
  - Django framework
    - Why Django

      It is simple, it is easy to scaffold out a web app server, so that we can concentrate on the functionalities of the application. Also We need to do web crawling stuffs by using python, and Django is a popular framework for web development in python. So we decide to learn using Django as our web framework.
    - layout
      - Bootstrap and font-awesome

        Bootstrap is a popular front-end library to build responsive website, it means that the website can tranfrom its layout to suit different size of screen, it can be simoutaniously suitable for computer screen and mobile phone screen which have huge difference in screen size.

- Functionalities

  ![CharacterCard.png](https://i.loli.net/2019/09/28/jA7M4bqt5dNfKTD.png)
  - Mashup of avengers4 information
    - marvel API heroes
    - rotten tomato News
    - reddit posts
    - Youtube trailer
  - Main functions
  
    The main function of our web app is to collect avengers4 relevant information shuch as text, image, and video, from different web sources including
    - Marvel official site **marvel.com**,
    - the popular film review aggregation website **rotten-tomatoes**,
    - The famous social media forum **reddit**
    - and **youtube**.

## SEO

- On-page

    First, we have used On-page optimization techniques. Second, we added some meta information (HTML head tag), optimized the title of our website, added related description of our website, for the keywords (we added such as ‘marvel movie’, ‘mashup’, ‘ma4’, ‘marvel avengers 4’ and more). Third, for the contents, the contents in tags such as in `<h1>`, `<h2>`, `<p>` are important for SEO. Fourth, created XML Sitemap. Fifth, we made Mobile device adapation. Keywords Meta information, Contents, Sitemap, Mobile device adapation are important for Google SEO in which descripted in Google SEO guide.
- Off-page

    We created a sitemap for our web page. It is an xml file of a language that is specifically used to read a computer. Sitemap is the search engine that uses this specification to allow website owners to use it to create a directory file containing all the pages in the site and provide crawler reading to the search engine. Just like a map, let the search engine know what pages are in the site.

![searchingscreenshot.png](https://i.loli.net/2019/09/28/1VFmbuBJDU8fMwr.png)

## Conclusion

In conclusions, the design of web page is advanced, but lack of characteristics. Second, we did some SEO optimizations, but still have some work can be done. Third, We rank at the good positions when search ‘mashup page for marvel’, ‘ma4 mashup’ and ‘marvel avenger 4 mashup’ on Google. Finally, We used 3 sources, but there are more sources can be added. We also made a button for ticket purchase, so that users can go directly to purchase tickets after reading our website.
