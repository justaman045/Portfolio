---
title: Watching YouTube from the terminal only
publishedDate: "2022-11-09"
lastUpdatedDate: "2023-12-09"
tags: ["YouTube", "script", "automation"]
status: "published"
type: Post
description: In this article, we'll try to automate YouTube search results directly from the Terminal
---

# Watching YouTube from the terminal only

I am a big fan of Linux Terminal but these days I'm forced to use Windows OS and with a company limited access I'm not even able to access [Hotstar](https://www.hotstar.com/in) on my Company laptop.

To find an alternative to watch the Shows I was just casually browsing the internet and came across [ytfzf](https://github.com/pystardust/ytfzf) which is a very powerful and good piece of software but to my bad luck now able to install this in my Company Laptop.

So I decided to develop something of my own, which is simple, unique, and lightweight. In this article, I'll tell you how I developed this and you can too and also write this in your Resume if you want something related to Web Scraping Projects.

## Features that I was in need

There were not so many features which I needed but there were some basics features like:-

- I wanted an Option to play Audio only ( you know if I ever wanted to listen [Naruto: Shippuden OSTs](https://www.youtube.com/watch?v=hFxCDbiPWJk) )
- I wanted an Option to control the Video Quality ( If the Internet Connection were in case not so good then I have the option to play in low quality too )
- I wanted an Option to play the video in a Loop
- I wanted an option to implement all these options at once also

All of these were already present in modern Media players like MPV or VLC, I'm using MPV here but you can opt for whatever you want to.

## Development

In this let's have a look at what we want to develop and create a Road map of all the things required.

- Get user inputs and search over YouTube
- Get the URL of the First Video
- Add the way to implement the Options discussed above
- Play the Video with the player we wanted

### Get user inputs and search over YouTube

We're getting user inputs from the terminal like all the old school thing _( black and white input terminal )_ so getting user input was the kind-a easy thing

The main thing here is searching on YouTube, so in my experience, YouTube always makes a GET request on the following URL.

```
https://www.youtube.com/results?search_query=
```

So we'll make use of the URL OPEN feature in the urllib package and decode the HTML, after decoding the HTML we'll search for the Video IDs that YouTube has with the same 11 Digits unique ID.

```py
uri = f'https://www.youtube.com/results?search_query={term}'
html = urllib.request.urlopen(uri)
video_ids = re.findall(r"watch\?v=(\S{11})", html.read().decode())
```

Now we've our Video IDs available on the entire search page of YouTube which we wished for.

### Get the URL of the Video

Now as we have the Video IDs of the Videos we can easily return with the first Video ID, but recently I thought why not the user can give the input to choose the video to play from?

So I made changes to the input of this script from this

```py
searchQuery = input("Enter the Search Term on YouTube : ")
```

to this

```py
print("To change the video number type something like below")
print("{Your Query} number {any video number}")
print("to play 1st video you don't have to do anything")
searchQuery = input("Enter the Search Term on YouTube : ")
```

and then added an If condition and split the input based on the number keyword inside a Try except for the condition

```py
try:
    if searchQuery.split('number')[1]:
        numberOfVideo = int(searchQuery.split('+')[1]) -1
except:
    numberOfVideo = 0
```

from this, the user doesn't have to listen to the same video again and again and got the power of freedom to my coding skills.

and we'll return the URL of the Video based on the variable `numberOfVideo`

```py
return f'https://www.youtube.com/watch?v={video_ids[numberOfVideo]}'
```

### Add the way to implement the Options discussed above

Now as we have the URL of the Video we now have to just play the video using an Online Media Player which we're using MPV here.

but to implement those options we have to apply some of the logic here

I used this logic in my script _( Don't ask me why I used this and is sooo long even if it's in Python because my skills suck)_

```py
isVideo, isLoop, lowQuality, directPlay = False, False, False, False
video, loop, quality = "", "", "--ytdl-format=m4a"
query = ""
for i in sys.argv[1:]:
    if i == "v":
        isVideo = True
    if i == "l":
        isLoop = True
    if i == "low":
        lowQuality = True
    if i != "v" and i != "l" and i != "low" and i != " " and i != '"':
        query += str(i).replace(" ", "+")
        directPlay = True
if lowQuality == True and isVideo == True:
    video = 'video'
    quality = '--ytdl-format=worst'
if isLoop == True:
    loop = '--loop'
if isVideo == True and lowQuality == False:
    video = 'video'
    quality = '--ytdl-format=best'
```

So with this, we now get an option to implement all 4 Features from an Argument level.

### Play the Video with the player we wanted

After obtaining the values of the options and applying all the logic to it and with the Video URL we can now easily play the video with just a one-line statement

```py
os.system(f"mpv {GetAndPlayVideo()} {quality} {loop} {video}")
```

and we're done with all the code and script. It'll now play the Video with the quality you've selected.

## Complete Code

```py
import os
import sys
import urllib.request
import re

isVideo, isLoop, lowQuality, directPlay = False, False, False, False
video, loop, quality = "", "", "--ytdl-format=m4a"
query = ""
for i in sys.argv[1:]:
    if i == "v":
        isVideo = True
    if i == "l":
        isLoop = True
    if i == "low":
        lowQuality = True
    if i != "v" and i != "l" and i != "low" and i != " " and i != '"':
        query += str(i).replace(" ", "+")
        directPlay = True
if lowQuality == True and isVideo == True:
    video = 'video'
    quality = '--ytdl-format=worst'
if isLoop == True:
    loop = '--loop'
if isVideo == True and lowQuality == False:
    video = 'video'
    quality = '--ytdl-format=best'


def GetAndPlayVideo(query = ""):
    if query == "":
        print("To change the video number type something like below")
        print("{Your Query} number {any video number}")
        print("to play 1st video you don't have to do anything")
        searchQuery = input("Enter the Search Term on YouTube : ")
    else:
        searchQuery = query
    try:
        if searchQuery.split('number')[1]:
            numberOfVideo = int(searchQuery.split('+')[1]) -1
    except:
        numberOfVideo = 0
    if isVideo != True:
        term = searchQuery.replace(" ", "+")
    else:
        term = searchQuery.replace(" ", "+").join("+lyrics")
    uri = f'https://www.youtube.com/results?search_query={term}'
    html = urllib.request.urlopen(uri)
    video_ids = re.findall(r"watch\?v=(\S{11})", html.read().decode())
    return f'https://www.youtube.com/watch?v={video_ids[numberOfVideo]}'

if directPlay != True:
    os.system(f"mpv {GetAndPlayVideo()} {quality} {loop} {video}")
else:
    os.system(f"mpv {GetAndPlayVideo(query)} {quality} {loop} {video}")
```

## Signin out

I know most of you are like

- **What happened to [Code It Down](https://codeitdown.vercel.app/) and other Projects**
- **Where have you been these Days??**
- **What happened to our Services of Monthly Article??**

But try to understand I was under my Training and Masters's degree not to mention I was also writing Articles for [CodeDamn](https://codedamn.com) which you can find [by clicking here](https://codedamn.com/news/author/amanojha).

I'll Upload an Article most recently but also by that time please do share any of my articles to support me as I don't make money from this **_all I want is to have an audience that truly loves reading my content that's it_**.

So taking a step back [Code It Down](https://codeitdown.vercel.app) will be on hold and more information will be sent to you via Mail to be sure to subscribe to my [New Mailing List](https://coderaman7.hashnode.dev/newsletter).

Thanks for reading
Happy Hacking
