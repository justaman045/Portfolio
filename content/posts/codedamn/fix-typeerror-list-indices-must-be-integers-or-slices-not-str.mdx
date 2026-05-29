---
title: Fix TypeError list indices must be integers or slices, not str
publishedDate: "2022-10-01"
lastUpdatedDate: "2023-11-18"
tags: ["python", "programming", "developer", "tips"]
status: "published"
type: Post
description: In this article, I'll tell you how to fix the typeerror list lindexes must be integers or slices, not str
---

If you're a Python Developer or maybe a Beginner learning Development in Python you might have encountered this error `Type Error: list indices must be integers or slices, not str`. After this error, you might have googled this error or maybe changed something in the code and it worked out, but you still don't know what was the error or the reason behind this error.

Maybe if you're reading this article there's a high chance that you still are facing this issue, and you're here for the solution. In this article, we'll break down this error and solve this issue from ground zero.

## Why did this Error occur??

This Error occurs whenever we use Strings instead of indices or slices for list Indexing. Let's take a look at the code below

```Python

#  index =   0   1   2   3   4   5   6   7   8   9
Our_list = [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 ]
```

In the above code, we can see that to access for example element 5 we have to use `Our_list[4]`. We've to provide its index number.

```Python

    #  index =   0   1   2   3   4   5   6   7   8   9
    Our_list = [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 ]

    print(Our_list[4])
```

But what if we've given the index number as a String

```Python
print(Our_list['4'])
```

In this case, we'll see the Error named `Fix TypeError: list indices must be integers or slices, not str`.

List Indexing in python refers to giving the start point, endpoint, and step size to get the sub-list of the original list. Let's look at the code below to understand List Indexing in a better way.

```Python

Our_list = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

print(Our_list[2:7]) #gives us output -> [3, 4, 5, 6, 7]

print(Our_list[2:7:2]) #gives us output -> [3, 5, 7]
```

From the above code, we can see that list Indexing can help us in many ways.

In the first print statement, we got a sub-list of 5 Integers from index 2 to index 6 ( being the last given endpoint excluded ).

In the second print statement, we step forward and included a step value too which enables python to move forward with the step value.

As a Python Developer, you might face this problem a lot of times _obviosusly if the slicing indexes are not correctly managed_. But here in this article, we'll see the top 3 uses where you might face this error while working with Lists in Python.

## Common Cases when this Error occurs

The Three cases are listed below:-

- Unconverted Strings
- Treating Lists as Dictionaries
- Using List Values for Indexing

### UnConverted Strings

Unconverted Strings mean that you're trying to access a particular element of a string but you still giving the indexes as Strings. Let's look at the code below

```Python

List_Of_Games = ["CyberPunk 2077", "Call Of Duty: Warzone", "Counter Strike: Global Offensive", "Valorant", "Assassin's Creed Valhalla"]

for i in List_Of_Games:
    print(f"{List_Of_Games.index(i)+1}: {i}")

choice = input("Which game you wanna play with me??")

print(List_Of_Games[choice])
```

By seeing the above code, you might think about what the error is here. It should be working fine. But, upon looking closely you might get to know that, we're getting input as a String in the `choice` variable.

For List Indexing, it always has to be Integer not a String to perform List Indexing. To rectify this error, you might have to typecast the choice variable to Integer.

#### Solution

To solve this issue, we've to explicitly typecast the input from the user, and based on that input we can provide the indexes to the list.

```Python

List_Of_Games = ["CyberPunk 2077", "Call Of Duty: Warzone", "Counter Strike: Global Offensive", "Valorant", "Assassin's Creed Valhalla"]

for i in List_Of_Games:
    print(f"{List_Of_Games.index(i)+1}: {i}")

try:
    choice = int(input("Which game you wanna play with me??"))
except:
    print("Wrong Input Entered!! Quitting the Program")
    exit()

print(List_Of_Games[choice])
```

Upon Typecasting the choice variable we'll only receive the Integer value in the choice variable and be able to provide Index to `List_Of_Games` in Integer rather than of String.

### Treating Lists as Dictionaries

Based on the previous Code we saw let's try to build a List with the usernames and try to print the username when a certain Game matches with the hardcoded Game.

```Python

List_Of_Games = [
    {
        "Name":"CyberPunk 2077",
        "Username": "iDontPlayCyberPunk"
    },
    {
        "Name": "Call Of Duty: Warzone",
        "Username": "minininja"
    },
    {
        "Name": "Counter Strike: Global Offensive",
        "Username": "the_brave_gamer"
    },
    {
        "Name": "Valorant",
        "Username": "thebravegamer#askmeforusername"
    },
    {
        "Name": "Assassin's Creed Valhalla",
        "Username": "CompetetiveNahiKhelta"
    },
]
if List_Of_Games["Name"] == "CyberPunk 2077":
    print("It's full of bugs but still I Play Pirated Game.")
```

In the above code, we can see that we're trying to access the Names of the Games but we're giving indices as it's a dictionary. We're trying to access the dictionary which is inside the list. To make the program executable we've to give the proper index of the dictionary within the list.

#### Solution

```Python

List_Of_Games = [
    {
        "Name":"CyberPunk 2077",
        "Username": "iDontPlayCyberPunk"
    },
    {
        "Name": "Call Of Duty: Warzone",
        "Username": "minininja"
    },
    {
        "Name": "Counter Strike: Global Offensive",
        "Username": "the_brave_gamer"
    },
    {
        "Name": "Valorant",
        "Username": "thebravegamer#askmeforusername"
    },
    {
        "Name": "Assassin's Creed Valhalla",
        "Username": "CompetetiveNahiKhelta"
    },
]
for i in range(len(List_Of_Games)):
    if List_Of_Games[i]["Name"] == "CyberPunk 2077":
        print("It's full of bugs but still I Play Pirated Game.")
```

In the above Solution, we're trying to iterate over all the list elements, and with that, we're also iterating over the dictionary that's available on the first Index only.

So our new script works because from the for loop we can iterate over the list elements and then we can check for dictionary within the list.

### Using List Values for Indexing

This Error can also occur when you're trying to put the list elements as the index for another or the list itself. Let's take an example where you're trying to give the element of one list as the index for another list.

```Python
Number_Of_Games = [ "1", "2", "3", "4", "5" ]
List_Of_Games = ["CyberPunk 2077", "Call Of Duty: Warzone", "Counter Strike: Global Offensive", "Valorant", "Assassin's Creed Valhalla"]

print(List_Of_Games[Number_Of_Games[3]])
```

In the above Code we saw that `List_Of_Games` will have an index of 3rd element from `Number_Of_Games`, But due to the element being a type of string so it'll always be giving us an Error of `TypeError: list indices must be integers or slices, not str`.

#### Solution

So to get an output from this We have two options to rectify this code

- either make all the elements in `Number_Of_Games` into Integer
- or directly give input to `List_Of_Games`.

##### Approach 1

```Python
Number_Of_Games = [ 1, 2, 3, 4, 5 ]
List_Of_Games = ["CyberPunk 2077", "Call Of Duty: Warzone", "Counter Strike: Global Offensive", "Valorant", "Assassin's Creed Valhalla"]

print(List_Of_Games[Number_Of_Games[3]])
```

By Converting all the elements of `Number_Of_Games` to Integer we ultimately gave the input to `List_Of_Games` in an Integer type, resulting in us `Valorant`.

##### Approach 2

```Python
List_Of_Games = ["CyberPunk 2077", "Call Of Duty: Warzone", "Counter Strike: Global Offensive", "Valorant", "Assassin's Creed Valhalla"]

print(List_Of_Games[3])
```

In this approach, we're giving input directly to `List_Of_Games`, which is also an optimized way of operating with lists unless there is a need. As we can see the `List_Of_Games` list could've been overridden.

##### Approach 3

```Python
Number_Of_Games = [ 1, 2, 3, 4, 5 ]
List_Of_Games = ["CyberPunk 2077", "Call Of Duty: Warzone", "Counter Strike: Global Offensive", "Valorant", "Assassin's Creed Valhalla"]

print(List_Of_Games[int(Number_Of_Games[3])])
```

In this approach, we can just typecast the element we're getting from the first list before providing it as input to the second list. This saves a lot of time which we're exerting in the above both approaches.

## Summary

This error generally occurs whenever we try to access the list using indexes but give strings instead of integers or slices in place of either the start point, end point, or step value. The most common solution to this problem is explicitly typecasting the index to an integer. This helps the developer override the necessity to either convert the other list to an integer or hardcoding the index to the list.

If you're looking for a good but interactive Python Course, where all errors, problems, questions, and solutions can be available?? We'll recommend you to take up the [Python Intermediate course](https://codedamn.com/learn/learn-python-intermediate), and for more help try joining our community on Discord where all of us try to help and achieve good skills by learning and building together.

### Promotion

Currently, I am also focused on building the Community mentioned below:

1. Anime Community:- [Instagram/otakuanime69](https://instagram.com/otakuanime69)
2. Motivational Theme Page:- [Instagram/glorymotivation7](https://instagram.com/glorymotivation7)

also, I'm currently focused on building my Brand named Otaku Outfits currently it's in the approval stage on Etsy but once it is live I'll be sharing it with you all by making sure to subscribe to my Newsletter from the Newsletter tab.

Also, it'll be helpful if you can just follow this [link to Medium](https://justaman045.medium.com/4f8c92cfbb8f?source=friends_link&sk=cd115cbec34f873f98454a9faaf8fab7) and give me a like and follow there too.

### Contact

To contact you can join my Discord Server where I intend to keep the community in one place and also serve the community  
Discord Link:- [https://discord.gg/ZfAKPZvT](https://discord.gg/ZfAKPZvT) ( It's brand new and I'm okay if you help me out on setting up this ).

Thanks for Reading  
Happy Hacking
