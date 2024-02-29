import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const defaultPost = [{defTitle:"Train Like an Athlete: Your Football Workout Plan",defAuthor:"Default",defContent:`3 days of Strength Training (upper, lower & full body)   |   1 day of speed and agility work   |   1 day of plyometrics   ||   Monday: Upper Body Strength Tuesday: Lower Body Strength Wednesday: Speed & Agility Thursday: Steady State Cardio Friday: Plyometrics Saturday: Full Body Explosive Strength Sunday: Rest`},
                    {defTitle:"Random game article: Final Fantasy XVI",defAuthor:"Default",defContent:`Final Fantasy XVI is set in the fictional world of Valisthea. Scattered throughout the two continents of Ash and Storm are colossal magical crystals, known as the Mothercrystals, which provide aether energy to the various populations and drive civilization with shards mined for commercial use. There are also humans that can use magic without crystals known as Bearers who are subject to prejudice and slavery, their overuse causing them to gradually petrify. A powerful force in Valisthea are the Eikons, magical creatures of incredible power that are utilized by hosts called Dominants. There are eight Eikons, one for each of the elements - Phoenix (fire), Shiva (ice), Ramuh (thunder), Leviathan (water), Titan (earth), Garuda (wind), Odin (darkness), and Bahamut (light); a seemingly impossible second Eikon of fire, Ifrit, drives the main plot by disrupting this balance. The core nations of Valisthea are the Grand Duchy of Rosaria, the Holy Empire of Sanbreque, and the Dhalmekian Republic on the Storm continent, the Kingdom of Waloed which dominates the Ash continent, and the neutral Crystalline Dominion sitting between Ash and Storm. An outlier is the Iron Kingdom, an isolated nation off the coast of Storm overseen by the Crystalline Orthodox. In the backstory an ancient people, humanity's ancestors the Fallen, once dominated Valisthea before a cataclysm destroyed their civilization, leaving ruins across the land. By the game's events, Valisthea is suffering from a depletion of aether dubbed the Blight which withers all life, driving the nations into conflict with each other. Because of their ability to manifest Eikons, Dominants play a key role in the nations' politics and military. Depending on where they are born, Dominants are hailed as political leaders, tolerated due to their power, or suffer abuse and are either killed or used as weapons of war.`}];

const postGrid = [];
var title;
var author;
var content;

app.get("/",(req,res)=>{
    res.render("index.ejs",{defaultPost});
});

// To view posts 
app.post("/postview",(req,res)=>{
    var flag = req.body.index;
    res.render("postX.ejs",{postGrid,flag});
});

// To view default posts
app.post("/postviewdefault",(req,res)=>{
    var sign = req.body.sign;
    res.render("postX.ejs",{defaultPost,sign});
})

// Blog app initiates
app.post("/Your-world",(req,res)=>{
    if(req.body.key==="update"){

        //Updating existing post (fetch data inside form)
        var titlex = req.body.titlex;
        var authorx = req.body.authorx;
        var contentx = req.body.contentx;
        var flagx = req.body.flagx;
        var message = req.body.key;
        res.render("index.ejs",{defaultPost,postGrid,titlex,authorx,contentx,flagx,message});

    } else if(req.body.message==="initiate-update"){

        //Perform update operation
        title = req.body.title;
        author = req.body.author;
        content = req.body.content;
        var index = req.body.index;
        postGrid[index] = {title,author,content};
        res.render("index.ejs",{defaultPost,postGrid});

    } else if(req.body.key==="delete"){
        
        //Delete post
        var flag = req.body.flag;
        postGrid.splice(flag,1);
        res.render("index.ejs",{defaultPost,postGrid});

    } else {

        //Create post
        title = req.body.title;
        author = req.body.author;
        content = req.body.content;
        postGrid.push({title,author,content});
        res.render("index.ejs", {defaultPost,postGrid});

    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});