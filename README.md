The beginning of a React app to track workouts in Kovaak 2.0 the Meta. 

-Only use in Chrome browser for now. Adding workSessions does not appear to currently work in Firefox. Working on fix.

The app displays all previously saved workouts on home page. Indvidual workouts can be compared by
selecting 2 different workouts and clicking "compare" in the adjacent pane. 

-Need to clean up display and change the displayed mongodb _id to something prettier.

A new workout for the current day can be added by selected "add worksession". Individual scenarios can then be 
added to that worksession.

-The button for adding needs to be moved from bottom of the page to the top.
-Add html select element for the supported scenarios when adding a scenarios
-Scenario info must be entered in the same format as in the displayed worksessions
	*ADD TEMPLATES FOR HOW TO ENTER DATA HERE BECAUSE IM UNCLEAR

Click "High Scores" to see all supported scenario types and the highest score acheived. 

TO USE:
-download aimerServer and enter "npm start" on command line in directory
-enter "npm start" in aimerReact directory
-visit "localhost:3000" using Chrome preferably
