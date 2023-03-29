# TOTM Dungeons and Dragons Combat Tracker

A bespoke Dungeons and Dragons Combat Tracker!

My regular Dungeons and Dragons group recently tried to reduce our reliance on the battle grid and embrace a 'Theatre of the Mind' style of play. Challenges arose. Who did the cleric bless last round? How many of the minotaurs are on the arena floor and how many are up on the balcony? Which of those cultists failed their saving throw against the illusionists' faerie fire spell?

In TOTM I began with a simple philosophy: in D&D combat, you've got things, and you've got groups of things. Every player, monster, npc and event is represented as an AGENT. Every group of these is a CLUSTER. The groups are flexible; they can represent a faction or location (obviously), but they can also be a condition shared by several agents like poisoned or unconscious, or a spell effect like that cleric's bless I mentioned. Clusters don't even have to have agents in them to be useful: one of the handiest features is that any cluster can be assigned a timer which triggers helpful reminders when you might need them most!

## Description

### ENCOUNTERS

- Each of these represents a single combat encounter at your gaming table. Creation is simple, just give it a name and (optionally) a description.

### AGENTS

#### Creation

- Click on the **Character** link in the navbar.

- Here you'll be able to populate the app with all the information from your player's character sheets that you might need to reference during the encounter. Technically all of this is optional except for a **NAME** and a **TYPE**

- Once you've created models of all your player characters, you can do the same for **Monsters**, as well as any **NPCs** (non-player characters) and **Events** you might want to include. I can't count the number of times that I've planned to have an epic interruption to a battle only to completely forget about it until it's too late. Likewise, this ought to be the end of NPCs that arrive with the players only to sit on hands because everyone forgot they were there.

#### Importing Agents

- Most campaigns are going to have the same group of adventurers run through many encounters. But I didn't want to create the same agents over and over to re-use them across separate encounters. So while your library of agents you build grows, each time you use them in an encounter they're duplicated and treated as separate entities. This is also helpful when it comes to hordes of similar monsters; you wouldn't want damage done to one troglodyte to be reflected in the stats of all the others!

- Back at the dashboard, click on the encounter you'd like to run and then on the **IMPORT AGENTS** button. You'll be able to import as many of each agent as you need. (You can add or remove them later if you need to tweak the balance of combat)

- Agents of **character** type will be automatically added to the **Heroes** faction, while monsters will be added to the **Enemies** faction. (you can make case by case changes based on your needs)

### CLUSTERS

#### Creation

- You'll have noticed that, upon creating a new encounter, a whole bunch of clusters have already appeared in the encounter setup screen. These are populated by default and reflect the common conditions and statuses that many D&D encounters might need. It's very hard to predict what those little scamps we call players are going to get up to, so I figured it'd be smart to start with all of these in place.

- Clicking on **MANAGE CLUSTERS** will open a modal where you can create or edit your clusters prior to play. It might be handy to have a few custom clusters prepared prior to gametime, especially several locations that might arise during play, like 'Inside' or 'On the Roof' or 'On the crumbling shelf of basalt in the middle of the lava lake". Whatever suits. Here you can also toggle membership of you agents in these clusters so you know what's going on at the beginning of combat.

- Like agents, all a cluster technically requires is a **NAME** and a **TYPE**. The remaining form concerns their helpful timing features, allowing you to set 'reminders' that appear as pop-ups during the encounter based on the countdown and timer terms you assign. A timer term of 'until timer end' will create reminders until the start or end of the next round. Meanwhile a term of 'at timer end' will create one reminder at the expiry of the timer, and a term of 'indefinite' will never expire, repeating your reminder until the cluster is removed.

- Reminders can be set for the beginning or ending of: each of their members' turns, each of their owner's turns, each of everyone's turns, or the whole round. Mix and match to suit your needs.

- Design assumes that while your agents are likely to have been planned ahead of time, many of the clusters you'll require are unpredictable and will need to be crafted on the fly. We'll cover 'Quick Creation' in the next section.

### RUNNING YOUR ENCOUNTER

#### Initiative

- When you have the agents and clusters you need to begin (you can add or change things later, don't worry), click **ROLL INITIATIVE**. I would never deny my players the joy of rolling their own initiative at the start of combat, so a modal will appear with a form to record each of their rolls and automatically add their initiative bonuses. Every other agent however has their initiative generated behind the scenes, saving you time! Monsters of the same name will act under the same initiative count, which is pretty typical for most games. Ties are broken behind the scenes based on initiative modifiers, then agent type (players win ties because I'm a softy), then a couple backend things like database IDs to cover the corner cases.

- Once every agent has been updated with an initiative, the button appears to **RUN ENCOUNTER**. Click it!

#### Active Agent Panel

- On left panel, you'll see the details for the active character ie, the agent with the highest modified initiative roll.

- The agent's name is at the top, along with stats for saving throws and passives on the right.

- Under those is a handy space for notes that carry between rounds

- Beneath that are a pair of inputs for an alias (you can roll with Kobolds A, B, C and D if you want, but try referencing something distinct about each of your monsters, especially grievous wounds delivered by our heroes!) and another for the agent's current aggro (It really lends to the sense of permanence when you can remember which monster was attack which player last round so they don't just randomly attack whoever's nearest)

- The bottom left of the panel is a row of tools: The pencil icon brings up a modal which lets you toggle membership in any of the encounter clusters, or edit any of the stats for that agent.

- The lettered toggles represent the actions the player has according to the rules: Action, Movement, Bonus Action, Reaction, Free Object Interaction, and finally E is for Exclamation (this is a homerule I use to limit my players' tendencies to try endlessly yelling 'helpful' suggestions during each others' turns).

- The Shield and Heart Icons are numerical inputs that keep track of Armour Class and Hit Points. (I know what throughout the app and its code I stuck with ARMOR class, but this is the readme and I'm Canadian damnit, let's do things properly here at least).

- Finally along the upper left of the panel are a series of three icons that toggle the cluster sub-panel, showing current clusters, owned clusters, and the form to create quick clusters.

- Quick Clusters were conceived as a way to represent player spells with persistent effects. They streamline the options that a cluster allows, assigning ownership to the active agent, a reminder based on the title and the owner's name, and setting reminders for the beginning the owners' turn and for each of the member's turns. The cluster will be removed automatically at the end of its timer. Now that Bless spell takes 5 seconds to set up with handy reminders when you need them. No more inscrutable scribblings in the corner of your notebook!

#### Agent List

- The middle panel simply lists the encounter agents by initiative order, with collapsing menus that are simplified versions of the controls from the active agent panel. There's also a delete button that removes the agent from the encounter completely.

#### Cluster List

- The rightmost panel lists all the clusters currently in the encounter. Click on any of them will open a modal where you can edit the cluster and toggle membership of any of the encounter agents.

#### Turn Buttons

- The arrows on the furthest left and right of the UI move the encounter to the next turn or back to the previous on. In addition to changing the active agent, this will decrement or increment the timers of any clusters (except those with an 'indefinite' term) and delete any clusters that are set to expire at the end of their timer term. (Also there's a running clock on the navbar to help keep track of how long your players' have spent deciding the absolutely optimal thing to do with their turn).

#### Reminders

- The pop up reminders appear along the bottom of the screen. They will last until you click on them to remove them.

## Getting Started

### Dependencies

- Python
- Django
- Node

### Installing

- Make sure you've got the necessary node modules installed by typing:

```
npm i
```

- Then make sure you've got your python dependencies installed and updated:

```
pipenv sync
```

- That's it! You can proceed to execution.

### Executing program

- First, open two terminals.
- In one we'll run the backend server. Navigate to the /project folder and type the following commands:

```
pipenv shell
cd totm
python manage.py runserver
```

- In the second terminal we'll run our frontend. Navigate to the /project folder and type the following commands:

```
pipenv shell
npm run build
```

- Nice. Now you can navigate to [localhost:8000](http://localhost:8000) in your browser and register an account. (Granted, the whole thing runs locally, but it'll keep your players from futzing around with it while you're taking a leak.)

## Authors

Conor Meldrum

## License

This project is licensed under the MIT License

## Acknowledgments

- [Sly Flourish, The Tyranny of the Grid ](https://slyflourish.com/tyranny_of_the_grid.html) - This essay was my inspiration for ditching the battle map!
- [Brad Traversy](https://github.com/bradtraversy/lead_manager_react_django) - This tutorial got me started learning a brand new stack.
