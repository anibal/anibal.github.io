# Obsidian Setup

Add a `Public` folder in the root of your vault, this folder will replace Quartz default `content/` folder later and its content will be published, also add an `index` file to this folder, Obsidian will add the `.md` extension, Quartz requires it.

![[CleanShot 2025-10-19 at 17.35.29@2x.png]]

And copy the path, full path, to the `Public` folder that will be required later when setting up Quartz:

![[CleanShot 2025-10-19 at 17.36.34@2x.png]]

In my case this is `/Users/whatever/Obsidian/Aníbal Rojas/Public`
# Github Repository Setup

Create a new repository that will host the content of your website, in this case we will follow Github convention `<username>.github.io` in this case it will `anibal.github.io` it has to be public, without a default README, .gitignore and license file:

![[CleanShot 2025-10-19 at 16.51.09@2x.png]]
If you navigate to your default website in Github (`https://<username>.github.io/`) you will get a 404 error, which is normal as the website is resolving in an empty repository that doesn't have a index file.

![[CleanShot 2025-10-19 at 17.04.22@2x.png]]

We will need the URL for this repository to configure it in Quartz, in my case I already have SSH configured, but you can use HTTPS:

![[CleanShot 2025-10-19 at 16.56.21@2x.png]]
In my case it is `git@github.com:anibal/anibal.github.io.git`.

# Quartz Setup

First clone Quartz:

```bash
❯ git clone https://github.com/jackyzha0/quartz.git
Cloning into 'quartz'...
remote: Enumerating objects: 12059, done.
remote: Counting objects: 100% (9/9), done.
remote: Compressing objects: 100% (9/9), done.
remote: Total 12059 (delta 1), reused 0 (delta 0), pack-reused 12050 (from 2)
Receiving objects: 100% (12059/12059), 37.14 MiB | 25.54 MiB/s, done.
Resolving deltas: 100% (7590/7590), done.
```

Move into the cloned folder:
```bash
cd quartz
```

Run `npm i`  to install the required dependencies:

```bash
❯ npm i

up to date, audited 578 packages in 813ms

201 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Run `npx quartz create` and select the option "Symlink an existing folder":

```bash
❯ npx quartz create

┌   Quartz v4.5.2
│
◆  Choose how to initialize the content in `/Users/whatever/quartz/content`
│  ○ Empty Quartz
│  ○ Copy an existing folder
│  ● Symlink an existing folder (don't select this unless you know what you are doing!)
└
```

When prompted to "Enter the full path to existing content folder" paste the full path to your Obsidian `Public` folder:

```bash
❯ npx quartz create

┌   Quartz v4.5.2
│
◇  Choose how to initialize the content in `/Users/whatever/quartz/content`
│  Symlink an existing folder
│
◆  Enter the full path to existing content folder
│  /Users/whatever/Obsidian/Aníbal Rojas/Public█
└
```

When prompted to "Choose how Quartz should resolve links in your content" you should choose the option matching your Obsidian settings ("Files and links"), in my case "Treat links as shortest path":

![[CleanShot 2025-10-19 at 17.48.43@2x.png]]

```bash
❯ npx quartz create

┌   Quartz v4.5.2
│
◇  Choose how to initialize the content in `/Users/whatever/quartz/content`
│  Symlink an existing folder
│
◇  Enter the full path to existing content folder
│  /Users/whatever/Obsidian/Aníbal Rojas/Public
│
◆  Choose how Quartz should resolve links in your content. This should match Obsidian's link format. You can change this later in `quartz.config.ts`.
│  ● Treat links as shortest path ((default))
│  ○ Treat links as absolute path
│  ○ Treat links as relative paths
└
```

And you should see a "You're all set!" message:

```bash
❯ npx quartz create

┌   Quartz v4.5.2
│
◇  Choose how to initialize the content in `/Users/anibal/Sandboxes/Personal/quartz/content`
│  Symlink an existing folder
│
◇  Enter the full path to existing content folder
│  /Users/anibal/Documents/Obsidian/Aníbal Rojas/Public
│
◇  Choose how Quartz should resolve links in your content. This should match Obsidian's link format. You can change this later in `quartz.config.ts`.
│  Treat links as shortest path
│
└  You're all set! Not sure what to do next? Try:
  • Customizing Quartz a bit more by editing `quartz.config.ts`
  • Running `npx quartz build --serve` to preview your Quartz locally
  • Hosting your Quartz online (see: https://quartz.jzhao.xyz/hosting)
```

And now you should have a symlink for `content` pointing to your `Public` obsidian folder:

```bash
❯ ls -la content
lrwxr-xr-x@ 1 anibal  staff  53 Oct 19 17:47 content@ -> /Users/whatever/Obsidian/Aníbal Rojas/Public
```

If you start a local server using `npx quartz build --serve` you should see:

```bash
❯ npx quartz build --serve

 Quartz v4.5.2

Cleaned output directory `public` in 1ms
Found 2 input files from `content` in 11ms

Warning: couldn't find git repository for content
Parsed 2 Markdown files in 136ms
Filtered out 0 files in 31μs
Emitted 23 files to `public` in 797ms
Done processing 2 files in 946ms
Started a Quartz server listening at http://localhost:8080
hint: exit with ctrl+c
[200] /
[200] /index.css
[200] /prescript.js
[200] /postscript.js
[200] /static/contentIndex.json
```

The warning "Warning: couldn't find git repository for content" will be fixed in. the next steps, and if you navigate to `http://localhost:8080` in your browser you should see something like:

![[CleanShot 2025-10-19 at 17.56.08@2x 1.png]]

Depending on the content of the `index` file you created inside the `Public` folder in your Obsidian vault. Shut down the server with `Control + C`, it doesn't have  to stay running.

# Setup you Repository in your Quartz clone

Executing `git remote -v` in the Quartz clone only shows the quartz Remotes:

```bash
❯ git remote -v
origin  https://github.com/jackyzha0/quartz.git (fetch)
origin  https://github.com/jackyzha0/quartz.git (push)
upstream        https://github.com/jackyzha0/quartz.git (fetch)
upstream        https://github.com/jackyzha0/quartz.git (push)
```

Now we will set the repository we created before as the `origin` executing `git remote set-url origin <your-remote-url-you-copied-before>`, in my case `git@github.com:anibal/anibal.github.io.git`:

```bash
❯ git remote set-url origin git@github.com:anibal/anibal.github.io.git
```

This should not print anything in response, and now we check again:

```bash
❯ git remote -v
origin  git@github.com:anibal/anibal.github.io.git (fetch)
origin  git@github.com:anibal/anibal.github.io.git (push)
upstream        https://github.com/jackyzha0/quartz.git (fetch)
upstream        https://github.com/jackyzha0/quartz.git (push)
```

Now we can sync the content to our repo in Github, and the upstream will allow us to update our Quartz installation. For this first time we will use the command `npx quartz sync --no-pull` to push the content to our empty repository:


