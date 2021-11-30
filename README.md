https://sharedgame.github.io/test/

[You need a modern browser which supports private class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields#browser_compatibility)

# Usage

## Fork the repo to display your changes

To change/enable/take over things, you must first fork this repo:

- Fork this repo on GitHub
- Switch to your own Branch Name (optional):
  - Click on "Code" (if not already there)
  - Select the dropdown with the branches
  - Select *Original Branch* (it probably is not `master`)
  - Click the dropdown with the branches again
  - Enter some *New Branch* name (it must be unique)
  - Click on "Create branch: *New Branch* from *Original Branch*"
- "Settings" then "Pages"
- Chose *New Branch* (if not changed use *Original Branch*)
  - Select `docs/` as path
  - Click `save`
- Above that you will see "Your site is published at" and some URL
  - Wait a minute to give GitHub the chance to update the URL
  - Click on this URL
  - If you like, edit `README.md` (this file) to refer to the changed URL

## Fork the backend to change how it works

After having forked the repo, you can provide your own backend:

- Go to some of your servers with web pages
  - This needs `https`, to do this with localhost or IPs is beyond the scope of this here (it works, but you will dislike it)
  - Checkout your forked repository there with the correct *New Branch* from above
  - Softlink `web/` directory to your webpages under some URL, such that the contents of `web` shows up under `https://example.com/path/`
  - Enable PHP for the web directory (`php-fpm` recommended)
  - Run the `nodejs` backend (T.B.D.)

Example

    GITHUBUSER="Your Username"
    GITHUBREPO="Repo Name"
    GITHUBPAGES="https://$GITHUBUSER.github.io/$GITHUBREPO/"
    BRANCH="New Branch"                 # Your chosen branch
    WEBPATH="/var/www/html/Some Path"   # Avoid paths with spaces in them!
    cd
    cd git
    git clone --branch="$BRANCH" git@github.com:$GITHUBUSER/$GITHUBREPO.gig  # use ssh to allow push
    cd "$GITHUBREPO"
    sudo mkdir -p "/var/www/html/$WEBPATH"
    sudo ln -fnrs web "$WEBPATH"

Now configure the backend URL into `docs/backend.json`.

    printf '"%q"' "$GITHUBPAGES" > docs/backend.json
    git commit -m "docs/backend.json updated" docs/backend.json
    git push

And then run the backend in background:

    nodejs node/backend.js

Wait until GitHub refreshes the pages from the push.

Reload you browser.  You now can send requests to the backend.

# FAQ

`docs/`?

- [GitHub Pages](https://docs.github.com/en/pages/quickstart) only allows `/docs/` when the pages shall not be in `/`
- This way (perhaps in Future) we also can generate the pages (babel)?

PHP?

- PHP is used for "Medienbruch".
  - The German word "Medienbruch" means "broken media".  Here this stands for discontinuity in how the data is processed.
  - This creates an additional layer of security, because you have to leave the JavaScript monoculture ecosystem.
- If PHP is used properly, there is no bad security impact.
  - All PHP scripts are used just as interfaces to the backend.
- The node backend this way can be kept completely isolated from the Web.
  - Hence PHP is just used as Middleware.

NodeJS?

- This is used for longer running continuous operations.
- You can implement your backend in any other language like Python.  But the rich ecosystem Python has the GIL.
- However using JS in Frontend and Backend is probably better, because you can reuse certain code bases at both sides.
- While communication must be done firewalled through the middleware.

NginX?

- You can use Apache, too, to use PHP with FPM.
- However I recommend to use NginX with a dedicated clear configuration.
  - Warning! **NginX configuration is not particular easy!**
  - Warning! **At least 99,9% of NginX recipes on StackOverflow get it wrong or are extremely dangerous or both!**
- So if you are not an NginX Pro or do not carefully and cleverly design your NginX configuration, probably better stay with Apache. 
  - But, due to the nature of Apache .. stupid Apache recipes may be even worse than stupid NginX recipes ..
- YMMV.  Read:  Use the web service you are mostly comfortable with.
  - With Apache you have to live with how it is done the Apache way, so many obvious errors on your side are mitigated by Apache.
  - In contrasst with NginX you are 101% in control, so all errors are 101% solely your fault!
- You have been warned.

FPM?

- It is good practice to separate the Scripting Engine from the Web Server.
- Also FPM scales better from my point of view.
- However it is a little bit more difficult to setup.
- With NginX you have not much of a choice.
  - Except if you want to use LUA as Scripting Engine, of(f) course.

Bug? Question? Fixes? Contrib?

- Issue or PR on GitHub, eventually I listen
- Please abide by the license!

License?

- [COPYLEFT.CLL](https://github.com/hilbix/license/blob/master/LICENSES/CLL/0/ascii.txt/COPYRIGHT.CLL)
- Free as free beer, free speech and free baby
- Copyrighting babies is a crime.
