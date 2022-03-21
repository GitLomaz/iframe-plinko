

# How To Run The Game Locally (Windows)

 -   Install the Apache webserver. XAMPP/WAMP (Windows) or MAMP (Mac).

		- XAMPP: [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html)

		- WAMP: [http://www.wampserver.com/en/](http://www.wampserver.com/en/)

		- MAMP: [https://www.mamp.info/en/](https://www.mamp.info/en/)

-   Open the installed application, then click **Run** apache

![](https://lh4.googleusercontent.com/06tg3Iyg1QOZASv0qczouv2Ap1IN_qC0FxqwQaVfZ1wWpFkdnJOm0dpzKq85cDOeotFpIN3yFdUlJPudYP9pdbZZFB8E5f5evEwV2P_EMRU8D5ZCKwv3-mY51f23BWTM217hOaK9)

-   Download the source code file, then unzip it to **.../xampp/htdocs**.

![](https://lh3.googleusercontent.com/xB_z7qLnXB44AyjTLYF8oE9PuRambYMjnc2chY1oOOvlZRadA8-pdzOebeFM3EFRgbdoTgsh31K1Nov9okpraseW_5MK24dFGJofGzsuRuLjEqrNQYoUjLu9ac5C4qGhfyM1heXQ)


-   Run the game via browser [http://localhost/**folder-name**/dev.html?nocache](http://localhost/folder-name/dev.html?nocache)  
    **Eg:** [http://localhost/**p2m-html5-game-cups**/dev.html?nocache](http://localhost/p2m-html5-game-cups/dev.html?nocache)  
    (**dev.html** for the development process, **?nocache** parameter to disable caching)
<br><br><br>
# How To Customize The Game

## Customize branding

-   Open **settings/dev.js**
    
-   Search **‘Branding’**

![](https://lh6.googleusercontent.com/rKS8uu-YqKY9oQ5E8qFHy9A9VHu8XQyOXHW5xA70vNfKeoL63Wzju5uSCP-im0uXPznyPMbPGFXPobSrAcf8uc0dhJfc_tZkva8rlIgSgtaqCiXrGmMP-ZrT8awu5CIiAoKv_fYA)

-   Change **‘Splash’ -> ‘Enabled’** to true to show branding screen after the game loading
-   Change the image in **branding/splash1.png**. Make sure that the resolution of the new image is the same as the original image.
<br>    
    
## Customize Background Music
  
-   Prepare music with ogg and mp3 extensions
    
-   Add the music files inside **“media/audio”** folder
    
-   Open **“lib/plugin/audio/sound-info.js”**
    
-   Find **“bgm”** and change the value based on the music properties
    
	-   **path:** the directory of the file without extension
    
	-   **startOgg:** music start time for the ogg extension (in seconds)
    
	-   **endOgg:** music length for the ogg extension (in seconds)
    
	-   **startMp3:** music start time for the mp3 extension (in seconds)
    
	-   **endMp3:** music length for the mp3 extension (in seconds)

![](https://lh5.googleusercontent.com/Y-vqrHhwf_vKrBd1Mxhr3UlXUl3ehBgdTUJni5T6k10nVzwfHkTumFn8zSVHnV2S_5ddWo67gK8DVjYut-BSOO4-eFqcl3e9JJcUkQ1iHPWkz2JB9BDlDzdz4wG4gM5CW_9AnCxE)
<br><br>

## Customize the sound effect audio
    
-   Prepare the audio files with mp3 and ogg extension.
    
-   Add them inside **"media/audio"** folder
    
-   Open **“lib/plugin/audio/sound-info.js”**
    
-   Find **“sfx”** and change the path of the audio that needs to be changed
    
-   The audio path should not include the file extension
    
![](https://lh5.googleusercontent.com/I25DCT9aiSwUXP6KZt2ZSjPXdIMlA2R1yKd1o3Py_qUxlldEMM326_1aUA4_OgbpQNK4ihArg6_WS0j1spuwjsQdFmkOUcmG0XFXD8GM_bchbJ6OMQjpmdGnTvkP8VR9qiqUoM-k)
<br><br>

## Customize the graphics

-   The graphics are located in **“media/graphics/”** folder
    
-   To customize the graphics without changing the game code, you need to replace the artwork with the same width, height, file directory structure, filename, file format, and alignment.
    
-   A common method is to trace directly above the original artwork.
<br>

## Customize the default configuration
    
-   If the getConfiguration response data can’t be retrieved or some parameters are blank/null, the game will set to the default configuration.
    
-   You can change the default configurations for graphics, colors, and translation text by editing **“settings/config.js”,** under **_DEFAULTDATA** variable.
    
**To further edit the game, open the subfolder “lib/game/”. This subfolder contains all relevant code.**

![](https://lh3.googleusercontent.com/wSDLIJadnwgujWExzQg8Wi62XI3pDBQYDqcmpN42wGqQy0lb3hDBcyoVsguBNtWG-X7alzQlODYT2H_mrFM7lu1-iBI4g3FMvg07CrS3LTMaXTldjYMM8tuzqjgqwZcYR3dzwJMW)
<br><br><br>
# How To Build The Game
## WINDOWS

-   Install the latest [OpenJDK](https://openjdk.java.net/install/) and check the installation.

![](https://lh4.googleusercontent.com/c8SGVoHNuS1M1s0lZR1GQPUPd4BqUaOdIhfAny01wAmbYy0c-zvTTMGQUo2ZEQ_H5BjjOaMFKxDmNDYF2UxXXF5Gum7heZ1oFZpvOzxjMGK7SK9iTzntF26oIdiJ-V52MaTIAZ6z)
-   Install [GIT for Windows](https://git-scm.com/download/win).
    
-   Install [Node.js, npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
    
-   **(Optional)** Install [javascript-obfuscator](https://www.npmjs.com/package/javascript-obfuscator).  
    Obfuscation makes the code unclear, or unintelligible, as an added layer of security. To disable/enable it, you need to comment/uncomment the “secure_regular” from the push.sh before building the game. If you wish to enable it, you have to install [javascript-obfuscator](https://www.npmjs.com/package/javascript-obfuscator) first.  
    Please open [MarketJS - Javascript Obfuscator (Client Guide).pdf](https://www.dropbox.com/s/5t38ofp8yzk6mdm/MarketJS%20-%20Javascript%20Obfuscator%20%28Client%20Guide%29.pdf?dl=0) for more details.  


![](https://lh3.googleusercontent.com/bKKNc3vK0VvoOxIQTwlfK4URwHsyfdTzO5ZrBBDVOqFcAasVJP0xlFaJUAXv8kWF-K1Vbxvxx_ln0BK_XhdXCxMjlkI6f1cUnbjNcN6bsVMJZhsyeo0B1Zd1UuH8tKu11W8lBiZt)
    
-   Download [zip.exe](https://www.dropbox.com/s/894urpmpcmp8tk0/zip.exe?dl=0) and put in the C drive **(C:)**.
    
-   Add **Environment Variables** for PHP and zip.
    

-   Press **Windows** and search **Environment Variables**.
    
-   Add values to variable **Path**. The values need to point to the location of the PHP and zip.

![](https://lh5.googleusercontent.com/mKG3tKc46qy8eFv0OUis-7ON3hL2gqG7eSRrfaB4evc-dabYAVpXlaOdWtNbn6mfqMbiClPNgS9Qe_JFpO4J52HERyFeDZxXiAMPyMsyLiepTsIgEXAUN5ZSq_IugyfGAcIjXTxO)

-   Check if the PHP is installed correctly using Command Prompt with **“php -v”** command.

![](https://lh6.googleusercontent.com/pgioJMYnjEELzb6tyzasGb3PlEmKE8mRq9BNtdiSrptgy8U0zeRtB_zRa-kA9oY1q4hFpBYmPX2rM1B25KFR5Uc-EhSfqLiMue2yZz7a8qdDZ3P3cjjRgHv864_Q714NZ1XF_s8J)

-   Open Git Bash (Windows)* and move to the game directory.

![](https://lh5.googleusercontent.com/vgg3lD81qe85IpJXaQ5x5D-bPrcRFllVh4NVCAuMGdF1USjvzDMlCcDSXdXPNAVdsw7UslgtcEKL3LotCFXI7OqxFMvKGiehdf1jQUtXpJ1z3dYqIvvxQcmOhizhUPgd3wk9RoIg)

-   To build (compile) the game, you can use **“sh <span>build</span>.sh”**. It will generate a zip file containing build files that you can upload to the server. The zip file name will be the same as the folder name.

![](https://lh5.googleusercontent.com/rTg84JJotEsvYaLH6x0DSckABgMVNl73AsonOfZ88Cu2qsv0MoLWA9JROS1yotdzOnlAlm92oJ2_TG6JVUCU8pBFMvXrmhvpt5iueeJUGQYgUM87G0i5UpIKtavOQfb14LohCX3H)

![](https://lh3.googleusercontent.com/9D33H5pU_6WQAH5qRar3SU9c2NfVubT2rt8Y53IwA3GptFvQ7hjDd0xo99VNrTkVKwxDulJ1zi_hcdZifODHfQyXBi2YVtW_Tq8SqslFfPmLe_qZfgwT4-KYMvc8qfQiOCMjTd4P)
<br><br>
  
## MAC

-   Install PHP via terminal **"curl -s https://php-osx.liip.ch/install.sh | bash -s 7.1"**. Check PHP and zip (normally zip is already installed on MAC).

![](https://lh4.googleusercontent.com/cRoAXxvYQsD1OliykHs7heyUinfJzteH9TLcYIE4i3QGOcs2lgt8UQ8GpbJPtx-rjOJVg5PK4cV6F83F-HNjKiQXbcR0wItTTRQYGDbm8QBixyihIfr-GVvTxvV3DzfDW27vjFap)

-   Install the latest [OpenJDK](https://openjdk.java.net/install/) and check the installation by executing **“java --version”** command in the terminal.
    
-   Open Git Bash and move to the game directory.

![](https://lh5.googleusercontent.com/vgg3lD81qe85IpJXaQ5x5D-bPrcRFllVh4NVCAuMGdF1USjvzDMlCcDSXdXPNAVdsw7UslgtcEKL3LotCFXI7OqxFMvKGiehdf1jQUtXpJ1z3dYqIvvxQcmOhizhUPgd3wk9RoIg)

-   To build (compile) the game, you can use **“<span>sh build</span>.sh”**. It will generate a zip file containing build files that you can upload to the server. The zip file name will be the same as the folder name.

![](https://lh5.googleusercontent.com/rTg84JJotEsvYaLH6x0DSckABgMVNl73AsonOfZ88Cu2qsv0MoLWA9JROS1yotdzOnlAlm92oJ2_TG6JVUCU8pBFMvXrmhvpt5iueeJUGQYgUM87G0i5UpIKtavOQfb14LohCX3H)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Note:** If you are getting an error like the screenshot below:

![](https://lh6.googleusercontent.com/UhMzHusR6mN7Pv4Z4-f4D0OMzEsRKAI-FUFZ0xfobG2cZMs34VFL7aeCN8nRJYTaqRNsx6nYXNe2yRjwbC1fON2G9hXwLSOt5xnw8hVZRCRt0dkkeEVJ1NkMVvEfIUSQZ8QfbHAu)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please change **Line Endings** into **Unix** for these files (We use **Sublime Text** to do this):
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span>css-append</span>.sh
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span>css-minify</span>.sh
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span>push</span>.sh
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span>build</span>.sh
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- tools/bake.sh
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- main.css
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- settings/ad/mobile/preroll/themes/light/ad.css
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- settings/ad/mobile/header/themes/light/ad.css
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- settings/ad/mobile/footer/themes/light/ad.css
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- settings/ad/mobile/end/themes/light/ad.css
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- settings/debug/debug.css

![](https://lh4.googleusercontent.com/_sFgRkIUb05qcCfR9Vka-_F2-Jlk7M4LVv4s2vZjNTixCJPKAjDDCkAhU61Ee8oX6-O-DEbZ2R6Jq52ipRJNN_coLvH2vfcTlLEbDxCmIGHIFUoSX8WA3EJ0-a1ingdazTFCT9hs)
<br><br><br>
# Test The Game

-   To test the game you may move and extract the build zip file into a different folder. After that, you can open the game by opening the index.html via localhost.  
    **Eg:** the folder name is **p2m-html5-game-cups**, so the test link will be
[http://localhost/**p2m-html5-game-cups**/index.html?nocache](http://localhost/p2m-html5-game-cups/index.html?nocache)

![](https://lh5.googleusercontent.com/3sG5GZ3PDXPqwqKVvBu5p3fYFVtpRSUM0wudicglNPXx7sBO_UN5uAigBnpeWp66bGLK8LfppcBn9gh7nI8elmvdlNeUZ3cFeCFS4G0DvkkXDu5goOrd3VAAJqV1cvQLE20QWkWF)
<br><br><br>

# How To Deploy to Server

-   Upload the unzipped build files into your server.  
    **Eg:** [yourserver.com/p2m-html5-game-cups](http://yourserver.com/p2m-html5-game-cups)

-   The entry point to the game will be [yourserver.com/p2m-html5-game-cups/index.html](http://yourserver.com/p2m-html5-game-cups/index.html)
<br><br><br>

# References

- [MarketJS - Build The Game Source Code Guide PDF](https://www.dropbox.com/s/igcjn4jlsmfx3yg/MarketJS%20-%20Build%20The%20Game%20Source%20Code%20Guide%20%28Carlton%20One%29.pdf?dl=0)
- [MarketJS - Javascript Obfuscator Guide PDF](https://www.dropbox.com/s/5t38ofp8yzk6mdm/MarketJS%20-%20Javascript%20Obfuscator%20Guide%20%28Client%20Guide%29.pdf?dl=0)