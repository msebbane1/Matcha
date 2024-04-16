# 1. VUE D'ENSEMBLE MATCHA

Utilisations Frameworks - micro-frameworks and any libraries -

    • Back-end : Flask pour Python
    • Front-end : Angular
    • Language : Javascript
    • Base de données : PostgreSQL
    • Web Server : Nginx

General Instructions

    • Database : create queries manually

    • Website : must have a header, a main section and a footer

    • Mobile : usable on a mobile phone and keep an acceptable layout on small resolutions

    • Errors : Not any errors, warnings or in the web console
    
    • Security : 
        - NOT have plain text passwords stored in the db
        - Protected against SQL injections
        - Validation of all the forms and upload

Lancement
    -> make ou docker-compose up --build
    -> backend : http://localhost:8080/
    -> frontend : http://localhost:3000/

# 2. MANDATORY PART

IV.1 Registration and Signing-in :

    • Register : E-mail, username, last name, first name, password (protected)

    • After Registration : an email with a unique link is send to the user to verify their account

    • Login : Username and password and reset password with email (if they forget it)

    • Log out : with just one click from any page on the site

IV.2 User profile :

    • For first connection user must provide :
    The gender, Sexual preferences, A biography, A list of interests with tags, Up to 5 pictures(including a profile picture)

    • Modifications : all informations of the user (GPS position, gender, email, password etc..)

    • Views : The user can see who has viewed their profile or "liked" them

    • Public “fame rating” : ?

    • GPS positioning : Choose to be positioned or not, if not must find a way to locate them

IV.3 Browsing - list of suggestions that match their profile -

    • Proposition of “interesting” profiles : only men for a hetero-sexual girls. If the user’s orientation isn’t specified is bisexual.

    • Matches :  Same geographic area (Priority), A maximum of common tags, A maximum “fame rating”

    • Sortable and filterable : by age, location, “fame rating”, and common tags

IV.4 Research - an advanced search -

    • Selecting criteria : age gap, “fame rating” gap, location, one or multiple tags

IV.5 Profile of other users

    • Public Profiles User : must contain all informations(not password and email)

    • Profile "Likes" : 
        - When two people “like” each other’s profiles, they are “connected” and can chat
        - Can remove a “like" and not be able to chat

    • History : add an visit history

    • Status : Can see if is online, if not add a date/time of the last connection

    • Report : Can report the profile as a “fake account”

    • Block User : Can block a user (will no appear in the search results, can't chat and notifs)


IV.6 Chat

    • Matches : Can chat only if they liked each other (considered as connected and matches)

    • Real-time chat : maximum delay of 10s, see from any page if a new msg is received

IV.7 Notifications

    • notified in real-time :
        - when the user receives a "like" or a msg,
        - When the user’s profile has been viewed
        - When they liked each other (Matchs)
        - When a connected user “unlikes” the user
        - See from any page, that a notif hasn’t been read

