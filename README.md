# Websci lab 7

This is the readme file for the third lab of Web Systems & Science class.
RCSID: liuj42
Link to repo for this class: https://github.com/liuj-42/websci
discord tag: `e g g#0507` or `nothing excessive#7009`

> Every lab you turn in will have a README.md file. This file will contain a running work log of everything you did for this lab. I especially want to know where you got stuck along the way and what you did to get out of being stuck. One to two sentences isn’t going to cut it here: this is the only opportunity you are going to get to document your own progression so take it seriously. At the end of the semester, I should be able to read through all the README.md files and have a good idea of your growth--as should you!

This lab was pretty confusing as I had no experience with using d3 prior to this and had to make 2 graphs with only the example code given to me. I also saw some examples of other graphs online when researching how to do this lab, but every one was different and it was very confusing. As a result, I wasn't able to get my graphs to be as polished as I would like, but it fufills the minimum requirements I guess. I really wanted to get tooltips to work but my inexperience with d3 and svgs made the whole process very convoluted and confusing for me so I eventually gave up.

I liked using mongo for this though, as I used my API for lab 5 that I created to get data from. I would like to connect this lab to the previous ones so I can get a constantly updated visualization, but right now I don't have time for that.

```js
app.get('/lab7/populate', (req, res) => {
    const token = req.query.token;
    console.log(token)
    let options = {
        url: "https://api.spotify.com/v1/me/top/artists?limit=400",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
    };
    let data = [];
    request.get(options, function(error, response, body) {
        body['items'].forEach(el => {
            data.push({Artist: el['name'], Followers: el['followers']['total'], Popularity: el['popularity']});
        })
        // update specific thing
        const filter = {number: 1};
        const replace = {$set: {data: data}};
        const options = {upsert: false};
    
        collection.updateOne(filter, replace, options)
        .then(result => {
            // if (error) { return res.status(500).send(error); }
            console.log(result)
            if (result["modifiedCount"] == 0) {
            res.status(400).send(result);
            } else {
            res.status(200).send(result);
            }
        })
        
        fs.writeFileSync("test.json", JSON.stringify(data));
        // res.status(200).send(data)

    })


})
```